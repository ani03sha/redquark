---
title: 'Day 09 - Sling Servlets (Part I)'
date: 2020-7-22 20:15:00
category: 'AEM'
draft: false
---

Howdy fellow developers :wave:! After learning OSGi services and components, we will now dive into Servlets.

A Servlet is a class used to extend the capabilities of servers that host applications accessed by means of a **request-response** programming model. For such applications, Servlet technology defines HTTP-specific servlet classes. 

You must be thinking what's all this *jibber-jabber*, right? But fret not, in this post, we will try to understand many aspects of Servlets in detail :smile:. 

## What is a Servlet?
A servlet in its very core is a Java class, which can handle network requests (for e.g. HTTP requests). Servlets are usually used to implement web applications. This java class does not have any main() method, only some callback methods.

Servlets run on the java enabled web-server or the application server. They handle requests from the web server, process it, produce the response, then send the response back to the server. This means servlet lives and dies within a web container. A web container is responsible for invoking methods in a servlet. It knows what callback methods a servlet has.

Servlets run in a servlet container which handles the networking side (e.g. parsing an HTTP request, connection handling etc.). One of the best known open source servlet container is Tomcat.

All servlets must implement the Servlet interface, which defines life-cycle methods. When implementing a generic service, we can use or extend the GenericServlet class provided with the Java Servlet API. The HttpServlet class provides methods, such as doGet() and doPost(), for handling HTTP-specific services.

## Properties of a Servlet
1. Servlets work on the server-side
2. Servlets are capable of handling requests obtained from the webserver.

## Execution of a Servlet
It involves eight basic steps -
1. The client sends an HTTP request to the webserver.
2. The web server receives the request and forwards it to the web container.
3. Web container spins a thread for each request.
4. The web container passes the request to the corresponding servlet.
5. Since servlet cannot understand HTTP, it is a java program, it only understands objects, so web container converts the request into a valid request object.
6. The servlet processes the request and generates a response in the form of output. A servlet has callback methods for this processing (for e.g. doGet(), doPost() etc.).
7. The servlet sends the response back to the webserver.
8. The web server sends the response back to the client after converting it into HTTP response and the client browser displays it on the screen.

## Advantages of Servlet
1. Servlets provide a way to generate dynamic documents that is both easier and faster to run.
2. Provide all the powerful features of Java, such as Exception Handling, Garbage Collection etc.
3. Enables easy portability across web servers.
4. Can communicate with different servlets and servers.
5. Since all web applications are stateless protocol, servlet uses its own API to maintain the session.

## Disadvantages of Servlet
1. Designing in servlet is difficult and slows down the application.
2. Writing complex business logic makes the application difficult to understand.
3. We need a Java Runtime Environment on the server to run Servlets. CGI is a complete language independent protocol, so we can write CGIs in whatever languages available (including Java if we want to).

## What is a *Sling* Servlet?
Sling servlets are a special type of servlets which are registered as OSGi service of type `javax.servlet.Servlet`. 

### Sling Servlet Registration
A **SlingServletResolver** listens for Servlet services and - given the correct service registration properties - provides the servlets as resources in the (virtual) resource tree. Such servlets are provided as **ServletResource** instances which adapt to the `javax.servlet.Servlet` class.

For a Servlet registered as an OSGi service to be used by the Sling Servlet Resolver, either one or both of the **`sling.servlet.paths`** or the **`sling.servlet.resourceTypes`** service reference properties must be set. If neither is set, the Servlet service is ignored.

A Sling servlet can be registered in two ways - 
1. **Using Resource Types -** Using this way, we use the `sling:resourceType` property of the node. For this, we need to hit the path in the browser for which the sling:resourceType is the given one.
2. **Using Paths -** Using this way, we can directly use the path specified in the request and our servlet will be executed.

Registering a servlet via a path is relatively easier than registering it via a resource type but it is still recommended to use resource types instead of paths. Below are the reasons why - 
1. If we use paths, then we need to be extra careful as we do not want to give any path randomly. The servlets cannot be access-controlled using the default JCR ACLs.
2. No suffix handling in the path bound servlets.
3. We also need to specify the paths to the servlet consumers and change in the path can have a serious impact.

### Types of Sling Servlets
There are two types of servlets in Sling which are nothing but the classes we need to extend while creating our servlet.
1. **SlingSafeMethodsServlet -** If we want to use only the read-only methods then we use this. This base class is actually just a better implementation of the Servlet API `HttpServlet` class which accounts for extensibility. So extensions of this class have great control over what methods to overwrite. It supports GET, HEAD, OPTIONS etc methods.
2. **SlingAllMethodsServlet -** If we want to use methods that write as well, then we use this. This class extends the `SlingSafeMethodsServlet` by support for the POST, PUT and DELETE methods.

## Code example
Phew :sweat: too much theory! But it was important to understand the concepts of Servlets. Now we have gotten to know about the nitty gritty details of servlets, it's time for us to do the fun part - CODING!!! :heart_eyes:

Let's say we want to get nodes and properties of certain node type and under a specified path. We can achieve this by writing a simple servlet which can be called as an API with `nodeType` and `path` as the two parameters.

1. Go to your core bundle in IDE and create a new class `org.redquark.aem.tutorials.core.servlets.ListNodesServlet` and paste the following code in it - 

```java
package org.redquark.aem.tutorials.core.servlets;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Property;
import javax.jcr.PropertyIterator;
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
                "sling.servlet.paths=" + "/bin/aemtutorials/listassets"
        }
)
public class ListNodesServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 7762806638577908286L;
    private static final String TAG = ListNodesServlet.class.getSimpleName();
    private static final Logger LOGGER = LoggerFactory.getLogger(ListNodesServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) {
        // JCR Session
        Session session = null;
        try {
            // Get path from the request object
            String path = request.getParameter("path");
            // Get node type
            String nodeType = request.getParameter("nodeType");
            // Getting the ResourceResolver from the current request
            ResourceResolver resourceResolver = request.getResourceResolver();
            // Getting the session instance by adapting ResourceResolver
            session = resourceResolver.adaptTo(Session.class);
            // Get the instance of QueryManager from the JCR workspace
            QueryManager queryManager = Objects.requireNonNull(session).getWorkspace().getQueryManager();
            // This query will look for all the assets under the given path
            String queryString = "SELECT * FROM [" + nodeType + "] WHERE ISDESCENDANTNODE('" + path + "')";
            // Converting the String query into an executable query object
            Query query = queryManager.createQuery(queryString, "JCR-SQL2");
            // Executing the query
            QueryResult queryResult = query.execute();
            // This will behave as a cursor pointing to the current row of results
            RowIterator rowIterator = queryResult.getRows();
            JSONObject jsonObject = new JSONObject();
            int count = 0;
            // Loop for all the rows in the result and return them as json
            while (rowIterator.hasNext()) {
                Row row = rowIterator.nextRow();
                PropertyIterator propertyIterator = row.getNode().getProperties();
                JSONObject properties = new JSONObject();
                while (propertyIterator.hasNext()) {
                    Property property = propertyIterator.nextProperty();
                    properties.put(property.getName(), property.getValue());
                }
                jsonObject.put("todo-" + (++count), properties);
            }
            // Printing the response to the browser window
            response.getWriter().println(jsonObject.toString());
        } catch (Exception e) {
            LOGGER.error("{}: Exception occurred: {}", TAG, e.getMessage());
        } finally {
            if (session != null) {
                session.logout();
            }
        }
    }
}
```

This code is pretty simple. Since we are making only `GET` request, we are extending from `SlingSafeMethodsServlet` class for the reasons discussed above. If you notice, the `@Component` annotation has the `service` property (which is similar as the normal OSGi service). This means a Servlet is also a service of type `javax.servlet.Servlet`. We are registering this servlet via **path** hence, we are using `sling.servlet.paths` property.

In the `doGet()` method, we are getting `nodeType` and `path` parameters from the request object which is later being passed in query string. The `QueryManager` API will query the JCR based on the query string.

The results we are obtaining from executing the query are being put in JSON object which is then being printed on the browser window.

2. After deploying the code to AEM, go to any REST client like **Postman** or in the browser and hit the following request - [http://localhost:4502/bin/aemtutorials/listassets?path=/aemtutorials/data/todo&nodeType=nt:unstructured](http://localhost:4502/bin/aemtutorials/listassets?path=/aemtutorials/data/todo&nodeType=nt:unstructured).
We will get the following results (provided we stored the data from the external API as discussed in [Day 08](https://redquark.org/aem/day-08-osgi-components-services/) or you can try with any other values of `nodeType` and `path`) - 

```json
{
  "todo-40": {
    "jcr:primaryType": "nt:unstructured",
    "completed": "false",
    "id": "66",
    "title": "rerum eum molestias autem voluptatum sit optio",
    "userId": "4"
  },
  "todo-42": {
    "jcr:primaryType": "nt:unstructured",
    "completed": "true",
    "id": "76",
    "title": "sequi dolorem sed",
    "userId": "4"
  },
  .
  .
  .
}
```

## Conclusion
Congratulations!! 🙋 we have created our first servlet. So, this is Part 1. We will continue our discussion in our next post and will see other details specifically how can we create a servlet using `resourceType`.

As always, you can find the complete code of this project on my [GitHub](https://github.com/ani03sha/AEM-Tutorials). Feel free to fork or open issues, if any.

I would love to hear your thoughts on this and would like to have suggestions from you to make it better. 

Happy coding and Namaste :smile:.