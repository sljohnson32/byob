## BYOB (Build Your Own Backend)
### API of Colorado Public Schools data build out as full-stack application with Node, Express, Knex, vanilla JS/jQuery front-end and server-side testing with mocha, chai, and chai-http. 

### API docs below!

### DESCRIPTION
Welcome to the Colorado Public Schools API!

This API contains multiple end points to access data about counties, school districts, and schools in Colorado.

This API follows [RESTful API guidelines.](https://github.com/Microsoft/api-guidelines)

This API is secured with [JSON Web Tokens](https://jwt.io/) for user authentication and authorization.

***

### DATA AVAILABLE
The data is split into three tables.
- counties
- districts
- schools

#### Counties Table
First is the counties table that has a one to many relationship with the districts table. The counties table has the following columns:
- id (increments/primary key)
- name (string)
- county_code (string)

##### Table Example
![screen shot 2017-10-12 at 5 02 38 pm](https://user-images.githubusercontent.com/26985984/31523174-333582d0-af6f-11e7-8ff2-e9dcccf244b3.png)

#### Districts Table
The next table is the districts table. It has a one to many relationship with the schools table.  The districts table has the following columns:
- id (increments/primary key)
- name
- district_code (string)
- county_id (integer) - foreign key to the counties table

##### Table Example
![screen shot 2017-10-12 at 5 05 51 pm](https://user-images.githubusercontent.com/26985984/31523254-a718c8a6-af6f-11e7-8a08-4e63d60ccc4a.png)

#### Schools Table
The third table is the schools table. The schools table has the following columns:
 - id (increments/primary key)
 - name (string)
 - school_code (string) - requires a unique value
 - student_count (float)
 - teacher_count (float)
 - student_teacher_ratio (float)
 - district_id (integer) - foreign key to the districts table

##### Table Example
![screen shot 2017-10-12 at 5 09 26 pm](https://user-images.githubusercontent.com/26985984/31523350-25b6ec92-af70-11e7-9e75-8ca00bd56441.png)

***

### AUTHENTICATION
In order to use the POST, PUT, PATCH and DELETE endpoints, you must provide a JWT to authenticate.  We suggest using best practice and including authentication in the Header but this API can also manage authentication in the body and as a query parameter.

To receive a JWT, please visit our website here: https://sj-da-byob.herokuapp.com.

#### Example JWT
![screen shot 2017-10-12 at 4 29 48 pm](https://user-images.githubusercontent.com/26985984/31522474-22e68720-af6b-11e7-81c1-f64085a4d754.png)

***

### API ENDPOINTS
All endpoints can be accessed using the root https://sj-da-byob.herokuapp.com

- All endpoints will return data as JSON
- GET endpoints do not require authentication
- POST, PUT, PATCH, and DELETE endpoints require a JWT for authentication in the header (preferred), the body, or as a query parameter


### GET
There are three GET endpoints.

#### Counties table
The endpoint for the counties table is **'/api/v1/counties'**. There is no body required for a GET request.

**Here is a sample JSON response:**

![screen shot 2017-10-12 at 5 20 43 pm](https://user-images.githubusercontent.com/26985984/31523607-c07a836e-af71-11e7-9273-04f8771f58a0.png)

#### Districts table
The endpoint for the districts table is **'/api/v1/districts'**. There is no body required for a GET request.

**Here is a sample JSON response:**

![screen shot 2017-10-12 at 5 22 16 pm](https://user-images.githubusercontent.com/26985984/31523646-f29bd51e-af71-11e7-8c1e-5f3b6d3ecc8a.png)

#### Schools table
The endpoint for the schools table is **'/api/v1/schools'**. There is no body required for a GET request.

**Optional Query Parameters**

The schools GET endpoint will accept two query parameters for **rationMin** and **ratioMax** - they can be added individually or together using proper syntax. These query parameters allow the user to select schools with a min and/or max value in the **student_teacher_ratio** column of the table.

Example schools GET requests with query params: ***'/api/v1/schools?ratioMin=3&ratioMax=6'***

**Here is a sample JSON response:**

![screen shot 2017-10-12 at 5 15 35 pm](https://user-images.githubusercontent.com/26985984/31523479-0bcace60-af71-11e7-9e19-18520d7464f3.png)


### POST
If the JSON Web Token verifies the user to be an admin, they can add a new district or school to their respective tables.

#### Districts POST
The end point is **'/api/v1/districts'**.

A district POST request body must include the following data in JSON:
- name
- district_code (string)
- county_id (integer) - foreign key to the counties table

**Sample district POST request body:**

![screen shot 2017-10-12 at 5 25 58 pm](https://user-images.githubusercontent.com/26985984/31523808-00e3bbcc-af73-11e7-9d1a-8d74e9c34db1.png)

**District POST response example:**

The response will return JSON with the id of the record created.

![screen shot 2017-10-12 at 5 26 09 pm](https://user-images.githubusercontent.com/26985984/31523836-2b3da108-af73-11e7-8ed7-c44628f37514.png)


#### Schools POST
The end point is **'/api/v1/schools'**

A school POST request body must include the following data in JSON:
- name (string)
- school_code (string) - requires a unique value
- student_count (float)
- teacher_count (float)
- student_teacher_ratio (float)
- district_id (integer) - foreign key to the districts table

**Sample schools POST request body**

![screen shot 2017-10-12 at 5 44 12 pm](https://user-images.githubusercontent.com/26985984/31524163-187ccc90-af75-11e7-8854-31258b963a73.png)

**School POST response example**

The response will return JSON with the id of the record created.

![screen shot 2017-10-12 at 5 43 53 pm](https://user-images.githubusercontent.com/26985984/31524162-174e2440-af75-11e7-9b32-a9cb102f5d70.png)


### PUT
If the JSON Web Token verifies the user to be an admin, they can edit individual records in the schools table.

#### Schools PUT
The end point is **'/api/v1/schools/:id'**

A school PUT request must include ***ALL*** of the following:

***Request Parameter***
- id (for the school record being updated)

***Body***
- name (string)
- school_code (string) - requires a unique value
- student_count (float)
- teacher_count (float)
- student_teacher_ratio (float)
- district_id (integer) - foreign key to the districts table

**Sample schools PUT request body**

![screen shot 2017-10-12 at 6 13 08 pm](https://user-images.githubusercontent.com/26985984/31524790-2a6a014e-af79-11e7-8324-dfb9cbd82a9c.png)

**School POST response example**

The response will return JSON with the id of the record created.

![screen shot 2017-10-12 at 6 13 19 pm](https://user-images.githubusercontent.com/26985984/31524780-16adfcbe-af79-11e7-9b28-53892f349847.png)


### PATCH
If the JSON Web Token verifies the user to be an admin, they can edit specific columns for records in the schools table.

#### Schools PATCH
The end point is **'/api/v1/schools/:id'**

A school PUT request must have the id of the school to be updated in the request parameter and one or more data points to be updated in the table:

***Request Parameter*** - REQUIRED
- id (for the school record being updated)

***Body*** - MUST INCLUDE ONE OR MORE OF THE FOLLOWING
- name (string)
- school_code (string) - requires a unique value
- student_count (float)
- teacher_count (float)
- student_teacher_ratio (float)
- district_id (integer) - foreign key to the districts table

**Sample schools PATCH request body**

![screen shot 2017-10-12 at 6 33 18 pm](https://user-images.githubusercontent.com/26985984/31525219-dc84a116-af7b-11e7-87ab-c3fd590d4873.png)

**School PATCH response example**

The response will return JSON with the id of the record created.

![screen shot 2017-10-12 at 6 33 24 pm](https://user-images.githubusercontent.com/26985984/31525243-12191316-af7c-11e7-82bf-00d7590c166c.png)


### DELETE
If the JSON Web Token verifies the user to be an admin, they can delete an existing school or district record in its respective table.

#### Schools DELETE
The end point is **'/api/v1/schools/:id'**

A school DELETE request must include the id of the school to be deleted as a request parameter.

**Sample schools DELETE response example**

![screen shot 2017-10-12 at 6 36 36 pm](https://user-images.githubusercontent.com/26985984/31525291-77cae946-af7c-11e7-8aeb-57625819fb1c.png)

#### Districts Database DELETE Response Example
The end point is **'/api/v1/districts/:id'**

A Districts DELETE request must include the id of the district to be deleted as a request parameter.

**Sample districts DELETE response example**

![screen shot 2017-10-12 at 6 41 42 pm](https://user-images.githubusercontent.com/26985984/31525358-06b43be4-af7d-11e7-9e97-f63362af37c1.png)
