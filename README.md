# International Rural School Report (Backend)

## API

Section Table of Contents:
- [/auth/login POST](#authlogin-post)
- [/auth/register POST](#authregister-post)
- [/public/orgs GET](#publicorgs-get)
- [/public/roles GET](#publicroles-get)
- [/public/issue-status GET](#publicissue-status-get)
- [/issues GET](#issues-get)
- [/issues POST](#issues-post)
- [/issues/:id GET](#issuesid-get)
- [/issues/:id PUT](#issuesid-put)
- [/issues/:id DELETE](#issuesid-delete)
- [/issues/org/:org_id GET](#issuesorgorg_id-get)

### /auth/login POST

Expects an object with this format as the request body:
```
{
  "username": "User1",   //string
  "password": "password" //string
}
```
If the username doesn't exist in the `users` table or the password doesn't match, it will reject the request with a `401` HTTP status. If successful, it will return with a `201` HTTP status and an object with this format (same as register):
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc",
  "org_roles": [
    {
      "org_id": 1,
      "org_name": "Organization One",
      "roles": [
        {
          "role_id": 1,
          "role_name": "School Administrator"
        }
      ]
    }
  ]
}
```
- `token`: A JSON Web Token
- `org_roles`: An array of objects, each of those objects representing one organization at which the user has some role.
    - `org_id`: An integer representing the ID of the organization from the `orgs` table
    - `org_name`: A string representing the organization's name
    - `roles`: An array of objects, each object representing one role that the user has at the organization containing it
        - `role_id`: An integer representing the ID of the role from the `roles` table
        - `role_name`: A string representing the name of that role

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /auth/register POST

Expects an object with this format as the request body:
```
{
  "username": "User1",    // required/string/unique
  "password": "password", // required/string
  "name": "TEST",         // required/string
  "role_id": 2,           // required/number
  "org_id": 2,            // required/number
  "email": "foo@bar.com,  // optional/string/unique
  "phone": "555-555-5555" // optional/string/unique
}
```
If any of the required fields are missing, it will reject the request with a `400` HTTP status. If successful, it will return with a `201` HTTP status and an object with this format (same as login):
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc",
  "org_roles": [
    {
      "org_id": 1,
      "org_name": "Organization One",
      "roles": [
        {
          "role_id": 1,
          "role_name": "School Administrator"
        }
      ]
    }
  ]
}
```
- `token`: A JSON Web Token
- `org_roles`: An array of objects, each of those objects representing one organization at which the user has some role.
    - `org_id`: An integer representing the ID of the organization from the `orgs` table
    - `org_name`: A string representing the organization's name
    - `roles`: An array of objects, each object representing one role that the user has at the organization containing it
        - `role_id`: An integer representing the ID of the role from the `roles` table
        - `role_name`: A string representing the name of that role

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /public/orgs GET

Used to populate a dropdown of organizations for the register form. If no organizations exist in the database, it will reject the request with a `404` HTTP status. If successful, it will return a `200` HTTP status and an array of objects. Each object represents one organization in the `orgs` table:
```
[
  {
    "id": 1,
    "name": "Organization One"
  },
  {
    "id": 2,
    "name": "Organization Two"
  },
  {
    "id": 3,
    "name": "Organization Three"
  }
]
```
- `id`: An integer representing the ID of the organization in the `orgs` table
- `name`: A string representing the organization's name

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /public/roles GET
Used to populate a dropdown of roles for the register form. If no roles exist in the database, it will reject the request with a `404` HTTP status. If successful, it will return a `200` HTTP status and an array of objects. Each object represents one role in the `roles` table:
```
[
  {
    "id": 1,
    "name": "School Administrator"
  },
  {
    "id": 2,
    "name": "Board Member"
  }
]
```
- `id`: An integer representing the ID of the role in the `roles` table
- `name`: A string representing the name of that role

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /public/issue-status GET
Used to populate a dropdown of issue statuses for forms used to create or edit issues. If no status types exist in the database, it will reject the request with a `404` HTTP status. If successful, it will return a `200` HTTP status and an array of objects. Each object represents one status type in the `issue_status` table:
```
[
  {
    "id": 1,
    "name": "Done"
  },
  {
    "id": 2,
    "name": "Scheduled"
  },
  {
    "id": 3,
    "name": "Open"
  },
  {
    "id": 4,
    "name": "Ignored"
  }
]
```
- `id`: An integer representing the ID of the status in the `issue_status` table
- `name`: A string representing the name of that status

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues GET

Requires `authorization` header w/ JWT. If successful,it  will return a `200` HTTP status and an array of objects. Each object represents one issue at one of the organizations that the user belongs to (checked against org_roles stored on the token):
```
[
  {
    "id": 1,
    "name": "Issue 1",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 1,
    "status_name": "Done",
    "created_by": "user1",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user1",
    "updated_at": "2019-05-23T17:29:25.150Z"
  },
  {
    "id": 2,
    "name": "Issue 2",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 2,
    "status_name": "Scheduled",
    "created_by": "user5",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user5",
    "updated_at": "2019-05-23T17:29:25.150Z"
  }
]
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues POST

Requires `authorization` header w/ JWT. Expects an object with this format as the request body:
```
{
  "name": "User1",                // required/string
  "status_id": 1,                 // required/integer
  "comments": "Description here" // optional/string
}
```
If successful, it will return a `201` HTTP status and an array of objects. Each object represents one issue (including the one just created) at one of the organizations that the user belongs to (checked against org_roles stored on the token):
```
[
  {
    "id": 1,
    "name": "Issue 1",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 1,
    "status_name": "Done",
    "created_by": "user1",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user1",
    "updated_at": "2019-05-23T17:29:25.150Z"
  },
  {
    "id": 2,
    "name": "Issue 2",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 2,
    "status_name": "Scheduled",
    "created_by": "user5",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user5",
    "updated_at": "2019-05-23T17:29:25.150Z"
  }
]
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues/:id GET

Requires `authorization` header w/ JWT. If successful,it  will return a `200` HTTP status and an object. The object represents the issue with the ID specified in the path:
```
{
  "id": 1,
  "name": "Issue 1",
  "comments": "Description here",
  "org_id": 1,
  "org_name": "Organization One",
  "status_id": 1,
  "status_name": "Done",
  "created_by": "user1",
  "created_at": "2019-05-23T17:29:25.150Z",
  "updated_by": "user1",
  "updated_at": "2019-05-23T17:29:25.150Z"
}
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues/:id PUT

Requires `authorization` header w/ JWT. Expects an object with this format as the request body:
```
{
  "name": "User1",               // optional/string
  "status_id": 1,                // optional/integer
  "comments": "Description here" // optional/string
}
```
If successful, it will return a `200` HTTP status and an array of objects. Each object represents one issue (including the one just edited) at one of the organizations that the user belongs to (checked against org_roles stored on the token):
```
[
  {
    "id": 1,
    "name": "Issue 1",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 1,
    "status_name": "Done",
    "created_by": "user1",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user1",
    "updated_at": "2019-05-23T17:29:25.150Z"
  },
  {
    "id": 2,
    "name": "Issue 2",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 2,
    "status_name": "Scheduled",
    "created_by": "user5",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user5",
    "updated_at": "2019-05-23T17:29:25.150Z"
  }
]
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues/:id DELETE

Requires `authorization` header w/ JWT. If successful,it  will return a `200` HTTP status and an array of objects. Each object represents one of the remaining issues at one of the organizations that the user belongs to (checked against org_roles stored on the token):
```
[
  {
    "id": 1,
    "name": "Issue 1",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 1,
    "status_name": "Done",
    "created_by": "user1",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user1",
    "updated_at": "2019-05-23T17:29:25.150Z"
  },
  {
    "id": 2,
    "name": "Issue 2",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 2,
    "status_name": "Scheduled",
    "created_by": "user5",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user5",
    "updated_at": "2019-05-23T17:29:25.150Z"
  }
]
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)

### /issues/org/:org_id GET

Requires `authorization` header w/ JWT. If successful,it  will return a `200` HTTP status and an array of objects. Each object represents one issue at the organization specified in the path:
```
[
  {
    "id": 1,
    "name": "Issue 1",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 1,
    "status_name": "Done",
    "created_by": "user1",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user1",
    "updated_at": "2019-05-23T17:29:25.150Z"
  },
  {
    "id": 2,
    "name": "Issue 2",
    "comments": "Description here",
    "org_id": 1,
    "org_name": "Organization One",
    "status_id": 2,
    "status_name": "Scheduled",
    "created_by": "user5",
    "created_at": "2019-05-23T17:29:25.150Z",
    "updated_by": "user5",
    "updated_at": "2019-05-23T17:29:25.150Z"
  }
]
```
- `id`: An integer representing the ID of the issue in the `issues` table
- `name`: A string representing the issue's name/title
- `comments`: A string representing a description/comments for the issue
- `org_id`: An integer representing the ID of the organization (in the `orgs` table) to which this issue is associated
- `org_name`: A string representing the name of that organization
- `status_id`: An integer representing the ID of the current status (in the `issue_status` table) of the issue
- `created_by`: A string representing the username of the user who created the issue (populated via foreign key reference to the `users` table)
- `created_at`: A timestamp representing the time at which the issue was created
- `updated_by`: A string representing the username of the user who last updated the issue (populated via foreign key reference to the `users` table)
- `updated_at`: A timestamp representing the time at which the issue was last updated

[Top of section](#api) | [Top of page](#international-rural-school-report-backend)
