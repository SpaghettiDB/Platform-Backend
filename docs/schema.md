# Prisma Schema Documentation

## Overview

This is a a comprehensive overview of the database schema used in the platform, including entities, relationships, enums, diagrams and additional notes for proper usage and maintenance.

### Technologies Used

**Database Management System:** PostgreSQL

- PostgreSQL is scalable open-source relational database management system known for SQL compliance,
  advanced concurrency control, extensibility, and strong security.

**ORM:** Prisma

- Prisma is a Node.js and Typescript ORM with an intuitive data model, automated migrations, type-safety,
  and auto-completion. It defines the main configuration of the data models in a file called `schema.prisma`

## Schema Description

### Generator

Specifies how Prisma generates client code for interacting with the database, such as Prisma Client.

```prisma
generator client {
  provider = "prisma-client-js"
}
```

### Data Source

Defines the database connection details, including the provider (in our case PostgreSQL), and URL, which is stored in an environment variable.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Entities

#### Structure

The schema consists of the following entities:

- **User:** Represents users of the system.

  ```prisma
  model User {
    id       Int           @id @default(autoincrement())
    email    String        @unique
    name     String
    password String
    role     UserRole      @default(USER)
    teams    TeamMembers[]
  }
  ```

- **Team:** Represents teams with members and projects.

  ```prisma
  model Team {
    id       Int           @id @default(autoincrement())
    name     String
    members  TeamMembers[]
    projects Project[]
  }
  ```

- **TeamMembers:** Represents the relationship between users and teams, including their roles.

  ```prisma
  model TeamMembers {
    teamId Int
    userId Int
    team   Team       @relation(fields: [teamId], references: [id], onDelete: Cascade)
    user   User       @relation(fields: [userId], references: [id], onDelete: Cascade)
    role   MemberRole @default(MEMBER)

    @@id([teamId, userId])
  }
  ```

- **Project:** Represents projects belonging to teams.

  ```prisma
  model Project {
    id        Int        @id @default(autoincrement())
    name      String
    teamId    Int
    team      Team       @relation(fields: [teamId], references: [id], onDelete: Cascade)
    databases Database[]
    uuid      String     @default(uuid())
  }
  ```

- **Database:** Represents databases associated with projects.

  ```prisma
  model Database {
    id        String   @id @default(uuid())
    name      String
    createdAt DateTime @default(now())
    storage   Int
    projectId Int
    project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
    status    status   @default(INACTIVE)
  }
  ```

#### Entity Details

##### User

- `id`: Auto-incremented unique identifier for the user.
- `email`: Unique email address of the user.
- `name`: Name of the user
- `password`: Hashed password of the user
- `role`: Role of the user, default: `USER`
- Relationships:
  - `teams` Many-to-many relationship with Team entity through TeamMembers property

###### Suggestions

- implementing a unique constraint on the email column
- Adding an image column for profile pictures of users
- Adding a column to store the user's preferred language and another for his preferred timezone

##### Team

- `id` Auto-incremented unique identifier for the team
- `name` Name of the team
- Relationships:
  - `members` One-to-many relationship with team members
  - `projects` One-to-many relationship with projects

###### Suggestions

- Adding a column to store a description of the team and its goals

##### TeamMembers

- `teamId` Foreign key referencing the id column of the Team table, pointing to the team that the member belongs to
- `userId` Foreign key referencing the id column of the User table, pointing to the user that is a member of the team
- `role` Role of the member in the team, default: `MEMBER`
- Relationships:
  - `team` Many-to-one relationship with teams
  - `user` Many-to-one relationship with users

##### Project

- `id` Auto-incremented unique identifier for the project
- `name` Name of the project
- `teamId` Foreign key referencing the id column of the Team table, pointing to the team that created the project
- `uuid` Unique UUID identifier for the project
- Relationships:
  - `team` Many-to-one relationship with the team that creates the projects
  - `databases` One-to-many relationship with databases associated with the project

###### Suggestions

- Adding a column to store a description of the project
- Combining the `id` and `uuid` columns in a single column `id` that uses a uuid to identify the project

##### Database

- `id` Unique UUID identifier for the database
- `name`Name of the database
- `createdAt` Timestamp indicating the creation time of the database
- `storage` Storage capacity of the database
- `projectId` Foreign key referencing the id column of the Project table, pointing to the project that the database belongs to
- Relationships:
  - `project` Many-to-one relationship with the project

### Enums

#### UserRole

- `USER`: Regular user
  - Regular user with standard access privileges on teams and projects.
- `ADMIN`: Admin user
  - User with elevated access rights for system administration of the platform.

```prisma
enum UserRole {
  USER
  ADMIN
}
```

#### MemberRole

- `MEMBER`: Regular member
  - Regular team member with access to the team's projects
- `LEADER`: Leader member
  - The user that created the team and has the privileges to create and delete projects.

```prisma
enum MemberRole {
  LEADER
  MEMBER
}
```

#### Status

- `ACTIVE`: Active database
  - Database that is online and fully responsive
- `INACTIVE`: Inactive database
  - Database that hasn't been used for a while but still responsive
- `SLEEP`: Sleeping database
  - Database that was `INACTIVE` for a certain amount of time and entered an offline mode, and it must be activated in order to be responsive for queries

```prisma
enum status {
  ACTIVE
  INACTIVE
  SLEEP
}
```

### ERD Diagram

![1707762267097](./prisma-erd.svg)
