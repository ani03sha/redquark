---
title: 'Day 10 - Sling Servlets (Part II)'
date: 2020-7-25 19:48:00
category: 'AEM'
draft: false
---

Howdy fellow devs :wave:! In the [previous post](https://redquark.org/aem/day-09-sling-servlets-1/), we discussed concepts of Sling Servlets in AEM. We also saw how can we create a servlet using `paths` property. In this post, we will take our discussion further and see how can we create servlets using `resourceTypes`.

## What is a resource?
From the [official docs](https://sling.apache.org/documentation/the-sling-engine/resources.html),
> The Resource is one of the central parts of Sling. Extending from JCR's everything is `Content`, Sling assumes everything is a `Resource`.

Each resource has a `resourceType` which is used by the Servlet and Script resolver to find the appropriate Servlet or Script to handle the request for the Resource.

This means there can be many servlets in our application with unique resource types. Whenever our application uses that `resourceType`, that corresponding servlet will be executed.

## Code Example
So, without further ado, let's dive into an example of Sling Servlet which leverages `resourceType`. Let's say, we have a **TODO** component that lists all the TODOs we have in our JCR repository (remember we stored the TODOs from external API in Day 08 - [OSGi Components and Services](https://redquark.org/aem/day-08-osgi-components-services/)).

We want that as soon as our component is added on the page, a servlet should be executed which will query the JCR and lists the required data on the page. For querying the data, we will use the same approach that we used in the [last post](https://redquark.org/aem/day-09-sling-servlets-1/).

Following are the steps to do this - 
1. Navigate to `/apps/aemtutorials/components/content` and create a new component named **todo**. How? see [here](https://redquark.org/aem/day-05-develop-components-templates/). The approach is similar. Following will be the properties for your reference -

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    jcr:description="This components calls sling servlet on load"
    jcr:primaryType="cq:Component"
    jcr:title="TODO"
    componentGroup="AEM Tutorials"/>
```

2. Create a new node **cq:dialog** of type **nt:unstructured** under the `/apps/aemtutorials/components/content/todo` node.

And that's it, our component is ready. Notice that we do not have any HTL file for this component. This is because we will use our Sling Servlet as the script to render this component. Pretty cool, eh :sunglasses:?

3. Now, create a new class named `org.redquark.aem.tutorials.core.servlets.FetchTODOServlet` and paste the following code in it - 

```java
package org.redquark.aem.tutorials.core.servlets;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import javax.jcr.query.Row;
import javax.jcr.query.RowIterator;
import javax.servlet.Servlet;
import java.util.Objects;

@Component(
        service = Servlet.class,
        property = {
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.resourceTypes=" + "aemtutorials/components/content/todo"
        }
)
public class FetchTODOServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 7762806638577903486L;
    private static final String TAG = FetchTODOServlet.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(FetchTODOServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        try {
            // Getting the ResourceResolver from the current request
            ResourceResolver resourceResolver = request.getResourceResolver();
            // Getting the session instance by adapting ResourceResolver
            Session session = resourceResolver.adaptTo(Session.class);
            // Get the instance of QueryManager from the JCR workspace
            QueryManager queryManager = Objects.requireNonNull(session).getWorkspace().getQueryManager();
            // This query will look for all the assets under the given path
            String queryString = "SELECT * FROM [nt:unstructured] WHERE ISDESCENDANTNODE('/aemtutorials/data/todo')";
            // Converting the String query into an executable query object
            Query query = queryManager.createQuery(queryString, "JCR-SQL2");
            // Executing the query
            QueryResult queryResult = query.execute();
            // This will behave as a cursor pointing to the current row of results
            RowIterator rowIterator = queryResult.getRows();
            // Output
            StringBuilder output = new StringBuilder();
            // Add heading of the results
            output.append("<h2>").append("TODO List:").append("</h2>");
            // Loop for all the rows in the result and return them as json
            while (rowIterator.hasNext()) {
                Row row = rowIterator.nextRow();
                output.append("<p>").append("ID: ")
                        .append(row.getNode().getProperty("id").getLong())
                        .append(", ")
                        .append("Title: ").append(row.getNode().getProperty("title").getString())
                        .append("</p>");
            }
            // Printing the response to the browser window
            response.getWriter().println(output.toString());
        } catch (Exception e) {
            LOGGER.error("{}: Exception occurred: {}", TAG, e.getMessage());
        }
    }
}
```

Check the properties in this case. You will see that we have `resourceType = aemtutorials/components/content/todo` which is the relative path of the component in the JCR. Sling Resource Resolution will work on this path now.

The logic of getting the data from JCR is similar as we discussed before. The only difference is that at this time, we are using a `StringBuilder` instead of a JSON object to send the response.

4. Add the **TODO** component on the page, you will see it will render with the TODO data.

That's it :smile:! We are able to invoke a serlvet based on the `resourceType`. Awesome :sunglasses:!!!

## Concept of serialVersionUID

A version number is attached to each serializable class by the serialization runtime. This version number is called **serialVersionUID** which is used during deserialization to verify that the sender and receiver of a serialized object have loaded classes for that object that are compatible with respect to serialization.

If the receiver has loaded a class for the object that has a different **serialVersionUID** than that of the corresponding sender's class, then deserialization will result in an **InvalidClassException**.

A serializable class can declare its own **serialVersionUID** explicitly by declaring a field named **serialVersionUID** that must be static, final, and of type long:

```java
ANY-ACCESS-MODIFIER static final long serialVersionUID = 42L;
```

If a serializable class does not explicitly declare a **serialVersionUID**, then the serialization runtime will calculate a default **serialVersionUID** value for that class based on various aspects of the class, as described in the Java(TM) Object Serialization Specification.

However, it is strongly recommended that all serializable classes explicitly declare **serialVersionUID** values, since the default **serialVersionUID** computation is highly sensitive to class details that may vary depending on compiler implementations, and can thus result in unexpected **InvalidClassException** during deserialization.

Therefore, to guarantee a consistent **serialVersionUID** value across different java compiler implementations, a serializable class must declare an explicit **serialVersionUID** value. It is also strongly advised that explicit **serialVersionUID** declarations use the private modifier where possible since such declarations apply only to the immediately declaring class **serialVersionUID** fields are not useful as inherited members.


## Conclusion
So, we have discussed two types of sling servlet registration in Part 1 and Part 2. I hope you enjoyed this post and it helped in making things more clear. There is further to Sling Servlets that what we have discussed which you can find in the [official docs](https://sling.apache.org/documentation/the-sling-engine/servlets.html).

As always, you can find the complete code of this project on my [GitHub](https://github.com/ani03sha/AEM-Tutorials). Feel free to fork or open issues, if any.

I would love to hear your thoughts on this and would like to have suggestions from you to make it better. 

Happy coding and Namaste :smile:.