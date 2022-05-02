# Joberry Frontend

### File Structure

```
├── api
├── components
│   ├── basics
│   │   └── avatars
│   ├── data_display
│   ├── data_input
│   └── feedback
├── pages
│   ├── basic
│   ├── dist
│   ├── not_found
│   ├── post
│   ├── profile
│   ├── search
│   └── user
├── stores
├── styles
│   ├── basics
│   └── pages
├── tests
└── utils
```

### Project Basics

Running for development

- `npm install / yarn`
- configure .env files
- `npm/yarn start`

### Frontend Routes

```js
//basic routes for everyone
"/home"
"/discover"
"/search/:search"

"/users/:id"
"/posts/:id"

//login & verify routes
"/sign-in"
"/verify-user"


// routes with authorization/logged in only 
"/posts/new"
"/posts/edit/:id"
"/profile"
"/profile/settings"

// not found route
"/404"

```
