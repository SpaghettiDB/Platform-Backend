# Team Routes Documentation

## Introduction

The `teamRoutes` module provides API endpoints for managing teams within an application. These routes handle operations such as creating, updating, and deleting teams, as well as adding and removing members from teams. Authentication is required for accessing these routes.

## Installation

This module relies on Express.js and certain middleware functions. Ensure that these dependencies are installed in your project.

```bash
npm install express
npm install express-async-handler

## Usage
```Import the necessary modules and middleware functions, and include the teamRoutes router in your Express application.

import express from "express";
import { tokenAuth } from "../middlewares/authMiddleware.js";
import * as teamController from "../controllers/teamController.js";

const router = express.Router();

// Define routes here...

export default router;
```

## API Endpoints
Get All Teams of User
Get a list of all teams associated with the authenticated user.

URL: /api/teams
Method: GET
Middleware: tokenAuth
Example Response:
json

```[
  {
    "role": "LEADER",
    "teamName": "Development Team"
  },
  {
    "role": "MEMBER",
    "teamName": "Marketing Team"
  }
]```
## Create Team
Create a new team.

URL: /api/teams
Method: POST
Middleware: tokenAuth
Request Body:
teamName (string): The name of the team.
Example Request:
```
{
  "teamName": "New Team"
}```
## Update Team
Update the name of an existing team.

URL: /api/teams
Method: PUT
Middleware: tokenAuth
Request Body:
newName (string): The new name for the team.
Example Request:
```
{
  "newName": "Updated Team Name"
}```

## Delete Team
Delete an existing team.

URL: /api/teams
Method: DELETE
Middleware: tokenAuth
Add Member to Team
Add a member to an existing team.

URL: /api/teams/member
Method: PUT
Middleware: tokenAuth
Request Body:
memberEmail (string): The email of the member to add.
teamId (string): The ID of the team.
Example Request:

```{
  "memberEmail": "newmember@example.com",
  "teamId": "team_id"
}```
## Delete Member from Team
Remove a member from an existing team.

URL: /api/teams/member
Method: DELETE
Middleware: tokenAuth
Request Body:
memberEmail (string): The email of the member to remove.
teamId (string): The ID of the team.
Example Request:
```
{
  "memberEmail": "member@example.com",
  "teamId": "team_id"
}```
### Join Team with Code
Join a team using a team code.

URL: /api/teams/code
Method: PUT
Middleware: tokenAuth
Request Body:
teamId (string): The ID of the team.
**Example Request:**

```{
  "teamId": "team_id"
}```
Generate Token for Team
Generate a unique token for a team.

URL: /api/teams/token
Method: PUT
Middleware: tokenAuth
Request Body:
teamId (string): The ID of the team.
Example Request:

```{
  "teamId": "team_id"
}```
Get Team Members
Get a list of members in a team.

URL: /api/teams/member
Method: GET
Middleware: tokenAuth
Request Body:
teamId (string): The ID of the team.
Example Response:

```["member1@example.com", "member2@example.com"]
```
### Error Handling
If a request fails, the server will respond with an appropriate error message and status code.
Error responses include status codes such as 401 (Unauthorized), 402 (Payment Required), and 409 (Conflict).
### Authentication
These routes require authentication using a token. Ensure that the user is logged in and authorized to perform the specified actions.

## Security
Protect sensitive information such as passwords and tokens.
Implement proper authentication and authorization mechanisms to secure access to these routes.
## License
This module is distributed under the MIT License