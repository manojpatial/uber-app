# User Registration Endpoint

## `POST /users/register`

Registers a new user and returns the created user together with an authentication token.

### Request body

Send a JSON object with the following fields:

| Field | Required | Rules |
|---|---|---|
| `fullname.firstname` | Yes | At least 3 characters |
| `fullname.lastname` | No | If provided, at least 3 characters |
| `email` | Yes | Must be a valid email address |
| `password` | Yes | At least 6 characters |

Example:

```json
{
  "fullname": {
    "firstname": "Alex",
    "lastname": "Morgan"
  },
  "email": "alex@example.com",
  "password": "secure123"
}
```

`fullname.lastname` may be omitted:

```json
{
  "fullname": {
    "firstname": "Alex"
  },
  "email": "alex@example.com",
  "password": "secure123"
}
```

### Responses

**`201 Created`** — Registration succeeded. The response contains the created user and an authentication token:

```json
{
  "user": {
    "_id": "672a1b2c3d4e5f6789012345",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com",
    "password": "<bcrypt-hashed password>",
    "socketId": null,
    "__v": 0
  },
  "token": "<JWT>"
}
```

**`400 Bad Request`** — One or more request fields failed validation. The response contains an `errors` array with validation details:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "Firstname must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

**`500 Internal Server Error`** — An unexpected server or database error occurred.

## `POST /captains/register`

Registers a captain with their vehicle details and returns the created captain together with an authentication token.

### Request body

Send a JSON object with the following fields:

| Field | Required | Rules |
|---|---|---|
| `fullname.firstname` | Yes | At least 3 characters |
| `fullname.lastname` | No | If provided, at least 3 characters |
| `email` | Yes | Must be a valid email address |
| `password` | Yes | At least 6 characters |
| `vehicle.color` | Yes | Must not be empty |
| `vehicle.plate` | Yes | At least 3 characters |
| `vehicle.capacity` | Yes | Integer of at least 1 |
| `vehicle.vehicleType` | Yes | Must be `car`, `bike`, or `auto` |

Example:

```json
{
  "fullname": {
    "firstname": "Jordan",
    "lastname": "Lee"
  },
  "email": "jordan@example.com",
  "password": "secure123",
  "vehicle": {
    "color": "blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Responses

**`201 Created`** — Registration succeeded. The response contains the created captain and a JWT that expires after 24 hours:

```json
{
  "captain": {
    "_id": "672a1b2c3d4e5f6789012345",
    "fullname": {
      "firstname": "Jordan",
      "lastname": "Lee"
    },
    "email": "jordan@example.com",
    "password": "<bcrypt-hashed password>",
    "socketId": null,
    "status": "unavailable",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "createdAt": "2026-10-30T12:00:00.000Z",
    "updatedAt": "2026-10-30T12:00:00.000Z"
  },
  "token": "<JWT>"
}
```

**`400 Bad Request`** — One or more request fields failed validation:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "ab",
      "msg": "Firstname must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

The same status is returned if a captain with the submitted email already exists:

```json
{
  "message": "Captain already exists"
}
```

**`500 Internal Server Error`** — An unexpected server or database error occurred.

## `POST /captains/login`

Authenticates an existing captain. On success, the endpoint sets a `token` cookie and returns the captain record and authentication token.

### Request body

| Field | Required | Rules |
|---|---|---|
| `email` | Yes | Must be a valid email address |
| `password` | Yes | Must not be empty |

Example:

```json
{
  "email": "jordan@example.com",
  "password": "secure123"
}
```

### Responses

**`200 OK`** — Login succeeded:

```json
{
  "token": "<JWT>",
  "captain": {
    "_id": "672a1b2c3d4e5f6789012345",
    "fullname": {
      "firstname": "Jordan",
      "lastname": "Lee"
    },
    "email": "jordan@example.com",
    "password": "<bcrypt-hashed password>",
    "socketId": null,
    "status": "unavailable",
    "vehicle": {
      "color": "blue",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**`400 Bad Request`** — One or more request fields failed validation:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "not-an-email",
      "msg": "Email is invalid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**`401 Unauthorized`** — The email or password is incorrect:

```json
{
  "message": "Invalid email or password"
}
```

## `GET /captains/profile`

Returns the authenticated captain's profile. Provide the authentication token in the `token` cookie or in the `Authorization` header. No request body is required.

### Responses

**`200 OK`** — The captain profile is returned without the password:

```json
{
  "_id": "672a1b2c3d4e5f6789012345",
  "fullname": {
    "firstname": "Jordan",
    "lastname": "Lee"
  },
  "email": "jordan@example.com",
  "socketId": null,
  "status": "unavailable",
  "vehicle": {
    "color": "blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**`401 Unauthorized`** — The token is missing, invalid, or blacklisted:

```json
{
  "message": "No token provided"
}
```

**`404 Not Found`** — The token is valid, but its captain no longer exists:

```json
{
  "message": "Captain not found"
}
```

## `GET /captains/logout`

Logs out the authenticated captain by blacklisting the current token and clearing the `token` cookie. Blacklisted tokens are automatically removed after 24 hours. Provide a token in the `token` cookie or in the `Authorization` header. No request body is required.

### Responses

**`200 OK`** — Logout succeeded:

```json
{
  "message": "Logged out successfully"
}
```

**`401 Unauthorized`** — The token is missing, invalid, or blacklisted. The response message identifies the reason, for example:

```json
{
  "message": "Token is blacklisted"
}
```

**`404 Not Found`** — The token is valid, but its captain no longer exists:

```json
{
  "message": "Captain not found"
}
```

## `GET /users/profile`

Returns the authenticated user's profile. The route requires a valid authentication token, provided either as the `token` cookie or in the `Authorization` header.

### Request

No request body is required.

Provide the token in the `token` cookie or in the `Authorization` header.

### Responses

**`200 OK`** — Authentication succeeded. The response is the user profile; the password is excluded:

```json
{
  "_id": "672a1b2c3d4e5f6789012345",
  "fullname": {
    "firstname": "Alex",
    "lastname": "Morgan"
  },
  "email": "alex@example.com",
  "socketId": null,
  "__v": 0
}
```

**`401 Unauthorized`** — The token is missing, invalid, or blacklisted:

```json
{
  "message": "Invalid token"
}
```

**`404 Not Found`** — The token is valid, but its user no longer exists:

```json
{
  "message": "User not found"
}
```

## `GET /users/logout`

Logs out the authenticated user by clearing the `token` cookie and blacklisting the current token. The blacklisted token is automatically removed after 24 hours.

### Request

No request body is required. Provide the token using the `token` cookie or the `Authorization` header, as described for [`GET /users/profile`](#get-usersprofile).

### Responses

**`200 OK`** — Logout succeeded:

```json
{
  "message": "Logged out successfully"
}
```

**`401 Unauthorized`** — The token is missing, invalid, or already blacklisted. The response message identifies the reason, for example:

```json
{
  "message": "No token provided"
}
```

**`404 Not Found`** — The token is valid, but its user no longer exists:

```json
{
  "message": "User not found"
}
```

**`500 Internal Server Error`** — An unexpected server or database error occurred.

## `POST /users/login`

Authenticates an existing user and returns the user record together with an authentication token.

### Request body

Send a JSON object with these fields:

| Field | Required | Rules |
|---|---|---|
| `email` | Yes | Must be a valid email address |
| `password` | Yes | Must not be empty |

Example:

```json
{
  "email": "alex@example.com",
  "password": "secure123"
}
```

### Responses

**`200 OK`** — Login succeeded:

```json
{
  "user": {
    "_id": "672a1b2c3d4e5f6789012345",
    "fullname": {
      "firstname": "Alex",
      "lastname": "Morgan"
    },
    "email": "alex@example.com",
    "password": "<bcrypt-hashed password>",
    "socketId": null,
    "__v": 0
  },
  "token": "<JWT>"
}
```

**`400 Bad Request`** — One or more request fields failed validation:

```json
{
  "errors": [
    {
      "type": "field",
      "value": "not-an-email",
      "msg": "Email is invalid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**`401 Unauthorized`** — The email or password is incorrect:

```json
{
  "message": "Invalid email or password"
}
```

**`500 Internal Server Error`** — An unexpected server or database error occurred.
