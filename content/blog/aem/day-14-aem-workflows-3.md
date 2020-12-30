---
title: 'Day 14 - AEM Workflows (Part III)'
date: 2020-8-23 23:10:00
category: 'AEM'
draft: false
---

Howdy fellow devs :wave:! In the previous two posts, we learned about basics of AEM workflows and examples of **Process** and **Participant** steps. In this post, we will cover few other concepts that a programmer usually deals with.

## MetaData Map
Sometimes we are faced with a situation where we need to pass data from one workflow step to the another. AEM's workflow API provides an easy way to achieve this using MetaDataMap.

Please note that only primitive data types like Integer, String etc. can be passed from one step to the another. If you have a requirement to pass non-primitive data then use the `byte[]` array.

<p style="color:#cc3300">Caution: If the data to be passed is too large, refrain passing InputStream. Instead, a better approach is to save the data in a JCR node in the step and retrieve it from the JCR node in a later step.</p>

A **MetaDataMap** is the data structure which acts as a value map and allows users to set and get data among the steps.

### Code Example
This use case is specific to the content pages. Here, we will select the user/group to review the pages based on the count of the children pages of the given payload. If the count is greater than zero then **Administrators** will approve the pages, otherwise the **Content Authors**.

To achieve this use case, we will first find the count of children pages of the given payload in a `process` step, then we will set the count in the `MetaDataMap` instance which will then be retrieved in the next `dynamic participant` step which will return the appropriate user to approve the page.

(Yeah, I know this use case is trivial but it is enough to show the concepts related to MetaDataMap).

1. Navigate to the `core` module of your AEM Multi Module project folder and create a class `org.redquark.aem.tutorials.core.workflows.process.FetchChildrenPagesStep` and paste following code in it - 

```java
package org.redquark.aem.tutorials.core.workflows.process;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.osgi.service.component.annotations.Reference;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.redquark.aem.tutorials.core.services.ResourceResolverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Iterator;
import java.util.Objects;

import static com.day.cq.wcm.api.NameConstants.NT_PAGE;
import static org.redquark.aem.tutorials.core.constants.AppConstants.CHILD_PAGE_COUNT;
import static org.redquark.aem.tutorials.core.constants.AppConstants.EQUALS;
import static org.redquark.aem.tutorials.core.constants.AppConstants.PROCESS_LABEL;
import static org.redquark.aem.tutorials.core.workflows.process.FetchChildrenPagesStep.PROCESS_LABEL_VALUE;

@Component(
        service = WorkflowProcess.class,
        property = {
                PROCESS_LABEL + EQUALS + PROCESS_LABEL_VALUE
        }
)
public class FetchChildrenPagesStep implements WorkflowProcess {

    protected static final String PROCESS_LABEL_VALUE = "Fetch Children Pages";
    private static final String TAG = FetchChildrenPagesStep.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(FetchChildrenPagesStep.class);

    @Reference
    ResourceResolverService resourceResolverService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        // Get the payload path of the page
        String payloadPath = workItem.getWorkflowData().getPayload().toString();
        // Get resource resolver object
        ResourceResolver resourceResolver = resourceResolverService.getResourceResolver();
        // Get resource corresponding to the given payload path
        Resource resource = resourceResolver.getResource(payloadPath);
        // Check if the type of resource is of a page
        if (Objects.requireNonNull(resource).getResourceType().equals(NT_PAGE)) {
            // Get the reference of the Page Manager class
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            // Get the reference of the Page
            Page currentPage = Objects.requireNonNull(pageManager).getPage(payloadPath);
            LOGGER.debug("{}: fetching count of children of page: {}", TAG, payloadPath);
            // Child page count
            int childPageCount = getChildrenPagesCount(currentPage, 0);
            LOGGER.debug("{}: total children pages: {}", TAG, childPageCount);
            // Set this value in the metadata map
            workItem.getWorkflow().getMetaDataMap().put(CHILD_PAGE_COUNT, childPageCount);
        }
    }

    private int getChildrenPagesCount(Page page, int count) {
        // Get the iterator which contains children of page
        Iterator<Page> pageIterator = page.listChildren();
        // Check if the Iterator has values
        while (pageIterator.hasNext()) {
            // Get the current page in the iterator
            final Page child = pageIterator.next();
            // Check if the current child also has children
            if (child.listChildren() != null) {
                count += getChildrenPagesCount(child, count);
            }
            count++;
        }
        return count;
    }
}
```

This is a simple Workflow process step which is using the `Page` API to calculate the total number of child pages of the page represented by the payload. We are setting the count in the MetaDataMap via this line - 

```java
// Set this value in the metadata map
workItem.getWorkflow().getMetaDataMap().put(CHILD_PAGE_COUNT, childPageCount);
```

2. Now, create a new class named `org.redquark.aem.tutorials.core.workflows.participant.ReviewChildrenPagesStep` and paste the following code in it - 

```java
package org.redquark.aem.tutorials.core.workflows.participant;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.redquark.aem.tutorials.core.constants.AppConstants.ADMINISTRATORS;
import static org.redquark.aem.tutorials.core.constants.AppConstants.CHILD_PAGE_COUNT;
import static org.redquark.aem.tutorials.core.constants.AppConstants.CHOOSER_LABEL;
import static org.redquark.aem.tutorials.core.constants.AppConstants.CONTENT_AUTHORS;
import static org.redquark.aem.tutorials.core.constants.AppConstants.EQUALS;
import static org.redquark.aem.tutorials.core.workflows.participant.ReviewChildrenPagesStep.CHOOSER_LABEL_VALUE;

@Component(
        service = ParticipantStepChooser.class,
        property = {
                CHOOSER_LABEL + EQUALS + CHOOSER_LABEL_VALUE
        }
)
public class ReviewChildrenPagesStep implements ParticipantStepChooser {

    protected static final String CHOOSER_LABEL_VALUE = "Review Children Pages";
    private static final String TAG = ReviewChildrenPagesStep.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(ReviewChildrenPagesStep.class);

    @Override
    public String getParticipant(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) {
        // Get the count of the children pages in the workflow
        int childPagesCount = workItem.getWorkflow().getMetaDataMap().get(CHILD_PAGE_COUNT, 0);
        LOGGER.debug("{}: child pages count: {}", TAG, childPagesCount);
        // Return the user group based on the number of child pages
        return childPagesCount > 0 ? ADMINISTRATORS : CONTENT_AUTHORS;
    }
}
```

This is even simpler, we are getting the stored value from the MetaDataMap using the same key with which we saved it. Based on the returned values, we will receive the notification in one of the user's inbox.

3. Deploy the code to your AEM instance using maven.

4. Create a new workflow model using the above two workflow steps. The final structure will look like below — (see [last post](https://redquark.org/aem/day-13-aem-workflows-2/) for more details).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
    jcr:isCheckedOut="{Boolean}true"
    jcr:primaryType="cq:WorkflowModel"
    jcr:uuid="30186572-923a-4f86-890a-e6214423c92f"
    sling:resourceType="cq/workflow/components/model"
    description="No Description"
    title="Review Content">
    <metaData
        cq:generatingPage="/conf/global/settings/workflow/models/review-content/jcr:content"
        cq:lastModified="{Long}1598200156161"
        cq:lastModifiedBy="admin"
        jcr:primaryType="nt:unstructured"/>
    <nodes jcr:primaryType="nt:unstructured">
        <node0
            jcr:primaryType="cq:WorkflowNode"
            title="Start"
            type="START">
            <metaData jcr:primaryType="nt:unstructured"/>
        </node0>
        <node1
            jcr:primaryType="cq:WorkflowNode"
            description="This step fetches the count of children pages of the payload"
            title="Fetch Children Pages"
            type="PROCESS">
            <metaData
                jcr:primaryType="nt:unstructured"
                PROCESS="org.redquark.aem.tutorials.core.workflows.process.FetchChildrenPagesStep"
                PROCESS_AUTO_ADVANCE="true"/>
        </node1>
        <node2
            jcr:primaryType="cq:WorkflowNode"
            description="This step chooses the user/group to review content based on the count of the children pages of the payload"
            title="Review Children Pages"
            type="DYNAMIC_PARTICIPANT">
            <metaData
                jcr:primaryType="nt:unstructured"
                DYNAMIC_PARTICIPANT="org.redquark.aem.tutorials.core.workflows.participant.ReviewChildrenPagesStep"/>
        </node2>
        <node3
            jcr:primaryType="cq:WorkflowNode"
            title="End"
            type="END">
            <metaData jcr:primaryType="nt:unstructured"/>
        </node3>
    </nodes>
    <transitions jcr:primaryType="nt:unstructured">
        <node0_x0023_node1
            jcr:primaryType="cq:WorkflowTransition"
            from="node0"
            rule=""
            to="node1">
            <metaData jcr:primaryType="nt:unstructured"/>
        </node0_x0023_node1>
        <node1_x0023_node2
            jcr:primaryType="cq:WorkflowTransition"
            from="node1"
            rule=""
            to="node2">
            <metaData jcr:primaryType="nt:unstructured"/>
        </node1_x0023_node2>
        <node2_x0023_node3
            jcr:primaryType="cq:WorkflowTransition"
            from="node2"
            to="node3">
            <metaData jcr:primaryType="nt:unstructured"/>
        </node2_x0023_node3>
    </transitions>
</jcr:root>
```

5. Run this workflow model on two types of pages - one with children pages other which doesn't have children pages. You will receive notifications in your inbox accordingly. That's it! Cool, eh?


## Trigger Workflow Programmatically

Usually, triggering a workflow is a manual task. Whenever the content authors need, they go to the workflow console and trigger a specific workflow according to their requirement. 

However, sometimes we wish to run a workflow programmatically. 

### Code Example

For e.g., the business wants to notify a specific group of users as soon as a some external service calls AEM. In this section, we will cater this case. We will create a **Sling Servlet** which when called, will execute a workflow (in our case, the workflow we created above).

1. Navigate to the `core` module of AEM Multi Module project and create a new class `org.redquark.aem.tutorials.core.servlets.ExecuteReviewContentServlet` and paste the following code in it - 

```java
package org.redquark.aem.tutorials.core.servlets;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.model.WorkflowModel;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.Objects;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_METHODS;
import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;
import static org.redquark.aem.tutorials.core.constants.AppConstants.EQUALS;
import static org.redquark.aem.tutorials.core.servlets.ExecuteReviewContentServlet.PATHS;

@Component(
        service = Servlet.class,
        property = {
                SLING_SERVLET_METHODS + EQUALS + HttpConstants.METHOD_GET,
                SLING_SERVLET_PATHS + EQUALS + PATHS
        }
)
public class ExecuteReviewContentServlet extends SlingSafeMethodsServlet {

    protected static final String PATHS = "/bin/aemtutorials/executeWorkflow";
    private static final long serialVersionUID = 4235730140092282985L;
    private static final String TAG = ExecuteReviewContentServlet.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(ExecuteReviewContentServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        try {
            // Get the payload path from the request
            String payloadPath = request.getParameter("path");
            if (!StringUtils.isEmpty(payloadPath)) {
                // Getting the resource resolver
                final ResourceResolver resolver = request.getResourceResolver();
                // Get the workflow session from the resource resolver
                final WorkflowSession workflowSession = resolver.adaptTo(WorkflowSession.class);
                // Workflow model path - This is the already created workflow
                final String model = "/var/workflow/models/aemtutorials/review-content";
                // Get the workflow model object
                final WorkflowModel workflowModel = Objects.requireNonNull(workflowSession).getModel(model);
                // Create a workflow Data (or Payload) object pointing to a resource via JCR
                // Path (alternatively, a JCR_UUID can be used)
                final WorkflowData workflowData = workflowSession.newWorkflowData("JCR_PATH", payloadPath);
                // Start the workflow!
                workflowSession.startWorkflow(workflowModel, workflowData);
                LOGGER.info("Workflow: {} started", model);
                response.getWriter().println("Workflow Executed");
            } else {
                response.getWriter().println("Payload path is not present in the query parameter");
            }
        } catch (IOException | WorkflowException e) {
            LOGGER.error("{}: exception occurred: {}", TAG, e.getMessage());
        }
    }
}
```

Following things are needed for this -

- Payload path - the payload on which we wish to run the workflow
- Workflow session - this is taken from the Resource Resolver.
- Workflow model - the path of the workflow model that is going to be run on the payload.
- Workflow data - the data (if any) that we are needed to pass in the workflow.
- In the end, we start the workflow.

2. In the browser, hit the following end point - [http://localhost:4502/bin/aemtutorials/executeWorkflow?path=/content/we-retail/language-masters/en](http://localhost:4502/bin/aemtutorials/executeWorkflow?path=/content/we-retail/language-masters/en).

3. Since the page has children, the notification will be received by the people in `Administrators` group only.

## Conclusion

So, we saw that it is pretty easy to trigger a workflow programmatically. This post shows how to run a workflow from a servlet, but we can easily use this code in a service/component/sling model etc.

We also saw how we can propagate our data between workflow steps using MetaDataMap API. 

As usual, you can find the complete code on my [GitHub](https://github.com/ani03sha/AEM-Tutorials). If you find it useful, consider giving it a star :star:.

Happy Learning 😊 and Namaste :pray:.