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
- [/issues/org/:org_id GET](#issuesorgorgid-get)

### /auth/login POST

Expects an object with this format:
```
{
  "username": "User1",   //string
  "password": "password" //string
}
```
If successful, will return with a '201' HTTP status and an object with this format (same as register):
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

### /auth/register POST

Expects an object with this format:
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
If successful, will return with a '201' HTTP status and an object with this format (same as login):
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

### /public/orgs GET

Used to populate a dropdown of organizations for the register form. If successful, will return a '200' HTTP status and an array of objects. Each object represents one organization in the `orgs` table:
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

### /public/roles GET
Used to populate a dropdown of roles for the register form. If successful, will return a '200' HTTP status and an array of objects. Each object represents one role in the `roles` table:
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

### /public/issue-status GET
Used to populate a dropdown of issue statuses for forms used to create or edit issues. If successful, will return a '200' HTTP status and an array of objects. Each object represents one status type in the `issue_status` table:
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

### /issues/ GET

Requires `authorization` header w/ JWT.

### /issues/ POST

Requires `authorization` header w/ JWT.

### /issues/:id GET

Requires `authorization` header w/ JWT.

### /issues/:id PUT

Requires `authorization` header w/ JWT.

### /issues/:id DELETE

Requires `authorization` header w/ JWT.

### /issues/org/:org_id GET

Requires `authorization` header w/ JWT.
