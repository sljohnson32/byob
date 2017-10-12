# byob
DESCRIPTION

Welcome to the Colorado Public Schools API!

This API contains multiple end points to access data about counties, school districts, and schools in Colorado.

This API follows RESTful API [guidelines.](https://github.com/Microsoft/api-guidelines)

This API is secured with JSON Web Tokens for user authentication and authorization.

DATA AVAILABLE

AUTHENTICATION
When sending an authentication POST request, the URL should be running on a local server. 
The endpoint is '/api/v1/authentication'.
The body sent should contain an email and an appName.
### Example:
![screen shot 2017-10-12 at 4 29 33 pm](https://user-images.githubusercontent.com/26985984/31522428-fc564e7e-af6a-11e7-9833-e8aaa61bdcbf.png)

The response should return a JWT that will give you admin authorization.
### Example:
![screen shot 2017-10-12 at 4 29 48 pm](https://user-images.githubusercontent.com/26985984/31522474-22e68720-af6b-11e7-81c1-f64085a4d754.png)

GET

POST

PUT

PATCH

DELETE
