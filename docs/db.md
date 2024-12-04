#  Database Endpoints Documentation

This document outlines the endpoints for interacting with our database service.

## Endpoints


### 1. Get database

- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Retrieve database information by the project ID as it first checks the existence of this project by the project ID then checks the existence of the user in the specified project if everything is successful, the function returns a JSON response with a 200 status code containing the list of databases associated with the project.
- **Parameters**:
  - `projectId `: The unique identifier of the project.
   - `user_id  `: The unique identifier of the user in that project.

- **Error Handling**: 
   - 404 : if project doesn't exist.
   - 403 : if user doesn't exist in the project.

- **Example Request**:
**GET** `http://localhost:3000/database/

```json
{
    "databases": "databases"
 }
```

### 2. Create a database
This endpoint allows users to create a new database within a project.

- **Endpoint**: `/create`
- **Method**: `POST`  
- **Description**: At first it checks the existence of this project by the project ID then checks the existence of the team memeber in the specified project, after that it checks the role of the member if the team member's role is "MEMBER" then he isn't allowed to create a database. If all checks pass, the function creates a new database with the given database Name. It then returns a JSON response with a 201 status code, indicating that the database was created successfully, along with the information of the created database.
- **Parameters**:
  - `projectId `: The unique identifier of the project.
   - `databaseName `: The name of the database to be created.

- **Error Handling**: 
   - 404 : if project doesn't exist.
   - 403 : 
        - if user doesn't exist in the project.
        - if user doesn't have permissions to create a database

- **Example Request**:


```json
{
    "projectId": "project id",
    "databaseName": "database name"
}
```
-**Respond**
```json
{
  "message": "database created successfully"
}
```
-**if user not found**:
```json
{
  "message": "user doesn't exist in the project"
}
```
### 3. Update database
This endpoint allows users to update an existing database within a project.

- **Endpoint**: `/update`
- **Method**: `PUT`
- **Description**: At first it checks the existence of this project by the project ID then checks the existence of the team memeber in the specified project, after that it checks the role of the member if the team member's role is "MEMBER" then he isn't allowed to update a database. if all checks pass it then returns a JSON response with a 200 status code, indicating that the database was updated successfully, along with the details of the updated database.

- **Parameters**:
  - `databaseId`: The unique identifier of the database to be updated.
  - `databaseName`: The database name.
  

- **Error Handling**: 
   - 404 : if project doesn't exist.
   - 403 : 
        - if user doesn't exist in the project.
        - if user doesn't have permissions to update a database

- **Example Request**:
**PUT** `http://localhost:3000/database/update`

```json
{
    "databaseId": "database id",
    "databaseName": "database name"
}
```
- **Respond**:
```json
{
"message": "database updated successfully"
}
```
-**if database Not found**:
```json
{
"message": "database doesn't exist"
}
```

### 3. Delete a database
This endpoint allows users to delete an existing database within a project.

- **Endpoint**: `/delete`
- **Method**: `DELETE`
- **Description**: At first it checks the existence of this project by the project ID then checks the existence of the team memeber in the specified project, after that it checks the role of the member if the team member's role is "MEMBER" then he isn't allowed to delete a database. if all checks pass it then returns a response with a 204 status code, indicating that the database was deleted successfully.

- **Parameters**:
  -- `databaseId`: The unique identifier of the database to be deleted.
  

- **Error Handling**: 
   - 404 : if project doesn't exist.
   - 403 : 
        - if user doesn't exist in the project.
        - if user doesn't have permissions to delete a database

- **Example Request**:
**DELETE** `http://localhost:3000/database/delete`

```json
{
    "databaseId": "database id"
}
```
-**if database Not found**:
```json
{
"message": "database doesn't exist"
}
```
-**if user Not found**:
```json
{
"message":
"user doesn't exist in the project"
}
```