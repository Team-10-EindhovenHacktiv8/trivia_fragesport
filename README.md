# TRIVIA FRAGESPORT
Aplikasi ini berisikan tebak-tebakan mini dari berbagai kategori ilmu.

&nbsp;

## TRIVIA FRAGESPORT ROUTES

### POST /register  

> Register

_Request Body_
```
{
  "first_name" : [STRING],
  "last_name" : [STRING],
  "email" : [STRING],
  "password" : [STRING]
}
```

_Response (201)_ : CREATED
```
{
  "first_name" : <first name>,
  "last_name" : <last name>,
  "email" : <email>
} 
```
_Response (400 - BAD REQUEST)_
```
{
  "message": "Email has already registered"
}
```

_Response (500 - INTERNAL SERVER ERROR)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login  

> Login

_Request Body_
```
{
  "email" : [STRING],
  "password" : [STRING]
}
```

_Response (200)_ : OK
```
{
  "access_token" : <access_token>
  "first_name": <first_name>
} 
```
_Response (401 - UNAUTHORIZED)_
```
{
  "message": "Wrong email/password"
}
```
_Response (500 - INTERNAL SERVER ERROR)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /salut  

> Get random salut in many languages

_Response (200)_ : OK
```
[
  {
    "code" : <language>
    "hello" : <salut-in-language>
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error."
}
```

---
### POST/googleLogin

> Google login
_Request Body_
```
{
  "google_access_token": <google-access-token>
}
```

_Response (200 - OK)_
```
{
  "access_token": <access-token>
  "first_name": <first-name>
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error."
}
```
---
### POST/trivia

> Get questions

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
   "idCategory" = <idCategory>
   "amountQuestion" = <amountQuestion>
   "difficulty" = <difficulty>
}
```

_Response (200 - OK)_
```
[
  {
    "category": "General Knowledge",
    "type": "multiple",
    "difficulty": "easy",
    "question": "What is the most common surname Wales?",
    "correct_answer": "Jones",
    "incorrect_answers": [
      "Williams",
      "Davies",
      "Evans"
    ]
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```
---
### GET/categories

> Get categories of the questions

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Response (200 - OK)_
```
[
  {
    "id"  : <id>,
    "name": <category>
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "<validation error message>"
}
```
_Response (404 - Not Found)_
```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error. <show error>"
}
```

---
### GET/excited

> Get winning gif

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Response (200 - OK)_
```
<url> 

```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error."
}
```

### GET/lose

> Get the losing gif 

_Request Header_
```
{
  "access_token": <your access token>
}
```

_Response (200 - OK)_
```
<url> 

```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error."
}
```