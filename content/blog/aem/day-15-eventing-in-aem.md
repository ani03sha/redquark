---
title: 'Day 15 - Eventing In AEM'
date: 2020-8-26 21:46:00
category: 'AEM'
draft: false
---

Howdy fellow devs :wave:! Capturing events in a very common use case in any software system and AEM is no exception. There are many use cases where we need to perform some operation when something specific happens in AEM. 

There are various ways by which event handling can be done in AEM -

1. Event Listener - JCR level events with the observation (discussed in this post)
2. Event Handler - Sling level events (discussed in this post)
3. Workflow and Launchers (discussed in previous three posts)
4. Schedulers with cron expressions (will be discussed in the next post)

## Event Handlers
We can create an Event Handler by following below steps -
1. Write a service class that implements the `EventHandler` interface.
2. Register the service with property `EventConstants.EVENT_TOPIC`.
3. Implement the `handleEvent(Event event)` method to trigger the job.

### Example
Let us create a custom event handler that will be triggered when a page is activated and executes a workflow on the path for which the replication is triggered. The main thing to see here is how we capture the event. Execution of the workflow has the same logic we discussed in the last post discussing [trigger workflow programmatically](https://redquark.org/aem/day-14-aem-workflows-3/#trigger-workflow-programmatically).

1. Navigate to the `core` bundle in the project and create a new class named `org.redquark.aem.tutorials.core.events.handler.PageActivationEvenHandler` and paste the following code in it - 

```java
package org.redquark.aem.tutorials.core.events.handler;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.model.WorkflowModel;
import com.day.cq.replication.ReplicationAction;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.redquark.aem.tutorials.core.services.ResourceResolverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Objects;

import static org.redquark.aem.tutorials.core.constants.AppConstants.EQUALS;

@Component(
        immediate = true,
        service = EventHandler.class,
        property = {
                Constants.SERVICE_DESCRIPTION + "= This event handler listens the events on page activation",
                EventConstants.EVENT_TOPIC + EQUALS + ReplicationAction.EVENT_TOPIC
        }
)
public class PageActivationEvenHandler implements EventHandler {

    private static final String TAG = PageActivationEvenHandler.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(PageActivationEvenHandler.class);

    @Reference
    ResourceResolverService resourceResolverService;

    @Override
    public void handleEvent(Event event) {
        LOGGER.debug("{}: event is registered: {}", TAG, event.getTopic());
        try {
            // Get the payload path from the request
            String[] paths = (String[]) event.getProperty("paths");
            // Get the payload path as the first page
            String payloadPath = paths[0];
            if (!StringUtils.isEmpty(payloadPath)) {
                // Getting the resource resolver
                final ResourceResolver resolver = resourceResolverService.getResourceResolver();
                // Get the workflow session from the resource resolver
                final WorkflowSession workflowSession = resolver.adaptTo(WorkflowSession.class);
                // Workflow model path - This is the already created workflow
                final String model = "/var/workflow/models/aemtutorials/update_referenced_assets";
                // Get the workflow model object
                final WorkflowModel workflowModel = Objects.requireNonNull(workflowSession).getModel(model);
                // Create a workflow Data (or Payload) object pointing to a resource via JCR
                // Path (alternatively, a JCR_UUID can be used)
                final WorkflowData workflowData = workflowSession.newWorkflowData("JCR_PATH", payloadPath);
                // Start the workflow!
                workflowSession.startWorkflow(workflowModel, workflowData);
                LOGGER.info("Workflow: {} started", model);
            } else {
                LOGGER.error("{}: Payload path is not valid", TAG);
            }
        } catch (WorkflowException e) {
            LOGGER.error("{}: exception occurred: {}", TAG, e.getMessage());
        }
    }
}
```

2. Notice that we have registered this Event Handler as a service of type `EventHandler.class`. Also, the  `EVENT_TOPIC` is set to the `ReplicationAction.EVENT_TOPIC` which will trigger this event handler when a page is replicated.

3. In the `handleEvent (Event event)` method, we are getting the path on which this event handler is triggered (this is ultimately the same path on which we performed the replication).

4. We then execute the `update-referenced-asset` workflow programmatically (Remember we created this workflow in [Day 13 - AEM Workflows Part II](https://redquark.org/aem/day-13-aem-workflows-2/#use-case)).

5. Deploy the code to the AEM and navigate to sites console and Publish a page.

6. You will see that the workflow is executed for the same page which you replicated. You can test this in the [Workflow Console](http://localhost:4502/libs/cq/workflow/admin/console/content/instances.html)'s instances window (you may have to check in the archive window if the workflow completes quickly).

7. And that's it! We just created our first custom event handler which triggers on sling level events. In the next section, we will see how we can tackle JCR level events.

## Event Listener

We can achieve event handling at the JCR level by implementing the `EventListener` interface in a class. **JCR Observer** is the lowest-level event handling in AEM. As its name indicates, it is at the JCR level and allows to listen to JCR-level events, gathered in sets (corresponding to persistence transactions). The `javax.jcr.observation.Event` lists the following types - 

```
1. Event.NODE_ADDED
2. Event.NODE_MOVED
3. Event.NODE_REMOVED
4. Event.PERSIST
5. Event.PROPERTY_ADDED
6. Event.PROPERTY_CHANGED
7. Event.PROPERTY_REMOVED
```

### Example
Let us create an event listener that listens to the event when a new node is added at a specified path (`/aemtutorials/data/todo` in our case).

1. Create a new class named `` and paste following code in it - 

```java
package org.redquark.aem.tutorials.core.events.listener;

import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.redquark.aem.tutorials.core.services.ResourceResolverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.observation.Event;
import javax.jcr.observation.EventIterator;
import javax.jcr.observation.EventListener;
import java.util.Objects;

@Component(service = EventListener.class, immediate = true)
public class PropertyEventListener implements EventListener {

    private static final String TAG = PropertyEventListener.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(PropertyEventListener.class);

    @Reference
    ResourceResolverService resourceResolverService;

    @Activate
    protected void activate() {
        try {
            // Getting the resource resolver
            ResourceResolver resourceResolver = resourceResolverService.getResourceResolver();
            // Adapting the Resource Resolver to Session
            Session session = resourceResolver.adaptTo(Session.class);
            // Adding the event listener
            Objects.requireNonNull(session).
                    getWorkspace().
                    getObservationManager().
                    addEventListener(
                            this, Event.PROPERTY_ADDED,
                            "/aemtutorials/data/todo", true, null,
                            null, false
                    );
        } catch (RepositoryException e) {
            LOGGER.error("{}: exception occurred: {}", TAG, e.getMessage());
        }
    }

    @Override
    public void onEvent(EventIterator events) {
        try {
            // Loop through all the events
            while (events.hasNext()) {
                // Get the current event
                Event event = events.nextEvent();
                LOGGER.info("{}: Event was added by: {} at path: {}", TAG, event.getUserID(), event.getPath());
            }
        } catch (RepositoryException e) {
            LOGGER.error("{}: exception occurred: {}: ", TAG, e.getMessage());
        }
    }
}
```

2. An event listener is nothing but a service of type `EventListener.class`. We need to implement the `onEvent(EventIterator events)` method in which we will write our business logic.

3. But before that, in the `activate()` method we need to register the listener. While registering it, we are providing the JCR path under which we want to listen in case a property is added.

4. In the `onEvent` method, we are iterating over the iterator and logging who triggered this event and at what path.

5. Now, navigate to [CRX DE](http://localhost:4502/crx/de/index.jsp), under path `/aemtutorials/data/todo`, create a new property in any child node and you will see that the event is logged in the logs.

## Conclusion
Congratulations!! 🙋 we have successfully created event handlers and event listeners to understand JCR and Sling level events. I hope you enjoyed this post.

I would love to hear your thoughts on this and would like to have suggestions from you to make it better. 

As usual, you can find the complete code on my [GitHub](https://github.com/ani03sha/AEM-Tutorials). If you find it useful, consider giving it a star :star:.

Happy Learning 😊 and Namaste :pray:.