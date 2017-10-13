# byob
### Pre Reqs
You should be familiar with [node.js](https://github.com/nodejs/node) as well as [express](https://expressjs.com/). You will need to set up migration through [knex](http://knexjs.org/). Make sure you are comfortable with [postgres](https://www.postgresql.org/) set up. I would reccomend downloading the application for your dashvoard as well as [postico](https://eggerapps.at/postico/) for easy to view databases. Lastly you should be comfotable with [postman](https://www.getpostman.com/) which will be a great way to test all your end points.

### DESCRIPTION
Welcome to the Colorado Public Schools API!

This API contains multiple end points to access data about counties, school districts, and schools in Colorado.

This API follows [RESTful API guidelines.](https://github.com/Microsoft/api-guidelines)

This API is secured with [JSON Web Tokens](https://jwt.io/) for user authentication and authorization.

### DATA AVAILABLE
The data should be split into three tables.

First is the counties database that will have a one to many relationship with the districts database.

The counties database should have an id, a name and a county code.
#### Example
![screen shot 2017-10-12 at 5 02 38 pm](https://user-images.githubusercontent.com/26985984/31523174-333582d0-af6f-11e7-8ff2-e9dcccf244b3.png)

The next database is the districts database. It will have a one to many relationship with the schools database.

The districts database should have an id, a name, a district code, and a county id as a foreign key for the counties database.

#### Example
![screen shot 2017-10-12 at 5 05 51 pm](https://user-images.githubusercontent.com/26985984/31523254-a718c8a6-af6f-11e7-8a08-4e63d60ccc4a.png)

The third database is the schools database.

The schools database should have an id, a name, a school code, a student count, a teacher count, a student to teacher ratio and a district id as a foreign key to the districts database.

#### Example
![screen shot 2017-10-12 at 5 09 26 pm](https://user-images.githubusercontent.com/26985984/31523350-25b6ec92-af70-11e7-9e75-8ca00bd56441.png)


### AUTHENTICATION
When sending an authentication POST request, the URL should be running on a local server.
The endpoint is '/api/v1/authentication'.
The body sent should contain an email and an appName.
#### Example:
![screen shot 2017-10-12 at 4 29 33 pm](https://user-images.githubusercontent.com/26985984/31522428-fc564e7e-af6a-11e7-9833-e8aaa61bdcbf.png)

The response should return a JWT that will give you admin authorization.
#### Example:
![screen shot 2017-10-12 at 4 29 48 pm](https://user-images.githubusercontent.com/26985984/31522474-22e68720-af6b-11e7-81c1-f64085a4d754.png)

### GET
There are three GET endpoints.
The server should be running locally.

#### Counties Database Response Example
The endpoint for the counties database is '/api/v1/counties'. There is no body sent with a GET request. The response should be an array of objects.

![screen shot 2017-10-12 at 5 20 43 pm](https://user-images.githubusercontent.com/26985984/31523607-c07a836e-af71-11e7-9273-04f8771f58a0.png)

#### Districts Database Response Example
The endpoint for the districts database is '/api/v1/districts'. The response should return an array of objects.

![screen shot 2017-10-12 at 5 22 16 pm](https://user-images.githubusercontent.com/26985984/31523646-f29bd51e-af71-11e7-8c1e-5f3b6d3ecc8a.png)


The endpoint for the schools database is '/api/v1/schools'. The response should return an array of objects.

#### Schools Database Response Example
![screen shot 2017-10-12 at 5 15 35 pm](https://user-images.githubusercontent.com/26985984/31523479-0bcace60-af71-11e7-9e19-18520d7464f3.png)

### POST
If the JSON Web Token verifies the user to be an admin, they can add a new district or school to their respective databases.

#### Districts Database POST Body Example
The end point is'/api/v1/districts/'

![screen shot 2017-10-12 at 5 25 58 pm](https://user-images.githubusercontent.com/26985984/31523808-00e3bbcc-af73-11e7-9d1a-8d74e9c34db1.png)

#### Districts Database POST Response Example
The response should be the id of the district in the database.

![screen shot 2017-10-12 at 5 26 09 pm](https://user-images.githubusercontent.com/26985984/31523836-2b3da108-af73-11e7-8ed7-c44628f37514.png)

#### Schools Database POST Body Example
The end point is'/api/v1/schools/'

![screen shot 2017-10-12 at 5 44 12 pm](https://user-images.githubusercontent.com/26985984/31524163-187ccc90-af75-11e7-8854-31258b963a73.png)

#### Schools Database POST Response Example
The response should be the id of the school in the database.
![screen shot 2017-10-12 at 5 43 53 pm](https://user-images.githubusercontent.com/26985984/31524162-174e2440-af75-11e7-9b32-a9cb102f5d70.png)


### PUT
If the JSON Web Token verifies the user to be an admin, they can edit an existing school its database.


#### Schools Database PUT Body Example
The end point is'/api/v1/schools/:id'

![screen shot 2017-10-12 at 6 13 08 pm](https://user-images.githubusercontent.com/26985984/31524790-2a6a014e-af79-11e7-8324-dfb9cbd82a9c.png)

#### Schools Database PUT Response Example
The response should be the id of the school in the database.

![screen shot 2017-10-12 at 6 13 19 pm](https://user-images.githubusercontent.com/26985984/31524780-16adfcbe-af79-11e7-9b28-53892f349847.png)



### PATCH
If the JSON Web Token verifies the user to be an admin, they can edit an existing school its database.

#### Schools Database PATCH Body Example
The end point is'/api/v1/schools/:id'

The body should just contain the specific data the user wishes to edit.

![screen shot 2017-10-12 at 6 33 18 pm](https://user-images.githubusercontent.com/26985984/31525219-dc84a116-af7b-11e7-87ab-c3fd590d4873.png)

#### Schools Database PATCH Response Example
The response should be a string to let you know it was successfully updated.

![screen shot 2017-10-12 at 6 33 24 pm](https://user-images.githubusercontent.com/26985984/31525243-12191316-af7c-11e7-82bf-00d7590c166c.png)


### DELETE
If the JSON Web Token verifies the user to be an admin, they can delete an existing school or district in its respective database.

#### Schools Database DELETE Response Example
The end point is'/api/v1/schools/:id'
The response should be a string to let you know it was successfully deleted.

![screen shot 2017-10-12 at 6 36 36 pm](https://user-images.githubusercontent.com/26985984/31525291-77cae946-af7c-11e7-8aeb-57625819fb1c.png)

#### Districts Database DELETE Response Example
The end point is'/api/v1/districts/:id'
The response should be a string to let you know it was successfully deleted.


![screen shot 2017-10-12 at 6 41 42 pm](https://user-images.githubusercontent.com/26985984/31525358-06b43be4-af7d-11e7-9e97-f63362af37c1.png)


### The Heroku App
Click our [link](https://sj-da-byob.herokuapp.com/) to see our beautiful page!
