# backend

## /auth/login POST

Expects an object with this format:
```
{
  "username": "User1",
  "password": "password"
}
```
If successful, will return with a '201' HTTP status and an object with this format:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc",
  "org_roles": {
    "Organization One": [
      "School Administrator",
      "Board Member"
    ],
    "Organization Two": [
      "School Administrator",
      "Board Member"
    ]
  }
}
```

## /auth/register POST

Expects an object with this format:
```
{
	"username": "User1",    // required
	"password": "password", // required
	"name": "TEST",         // required
	"role_id": 2,           // required
	"org_id": 2,            // required
  "email": "foo@bar.com,  // required
  "phone": "555-555-5555" // required
}
```
If successful, will return with a '201' HTTP status and an object with this format:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTU4Mjk1NDg4LCJleHAiOjE1NTgzMDI2ODh9.Lwz-Wfyzto2JJOSJjRqalbonNSwhXSLmNyxMWH-aVRc",
  "org_roles": {
    "Organization One": [
      "School Administrator",
      "Board Member"
    ],
    "Organization Two": [
      "School Administrator",
      "Board Member"
    ]
  }
}
```
