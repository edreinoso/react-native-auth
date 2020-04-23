# React Native Auth

![react_native_auth](https://personal-website-assets.s3.amazonaws.com/Projects/react_native_auth.png)

### Goal

Create two different authentication methods using Firebase and AWS Amplify in a Recta Native application.

### Motivation

Authentication can be a very complex implementation if it's done from scratch. Handling tokens and user sessions can be confusing and troublesome. Hence, I decided to use these open source authentication methods for a React Native application. They provide out of the box tools that can make this process a lot easier in terms of user and token management.

### Branch separation

There are going to be two branch for authentication method separation purposes.

- AWS Amplify: would have all the code for authentication with AWS service

- Firebase: would contain authentication method for Google's system

**It's best if these two are not mixed together, hence the branch separation**

### Tech stack description

The main frontend language is JavaScript with React Native framework. In addition, this repo is using Expo, which a wrapper for testing and deploying React Native applications without having to use complex React-Native CLI.

Moreover, in each of the branches there is going to be the custom code for each authentication method. For example, for signing in:

Amplify uses

```
Auth.signIn(username, passport)
```

Firebase uses:

```
url,
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: email,
    password: password,
    returnSecureToken: true
  }),
  headers: {
    'Content-Type': 'application/json'
  }
}
```

In addition, these API calls are being executed at the action level within the store. Being said that, there is going to be a Redux component for application state management.

Lastly, React-Navigation is used for navigating between the screens. Powerful library that lets stack, pop, push screens in the application.

For more info about React Native: https://reactnative.dev/docs/getting-started

For more info about Expo: https://expo.io/learn

For more info about Redux: https://redux.js.org/introduction/getting-started

For more info about React Navigation: https://reactnavigation.org/docs/getting-started

### Directory structure

The src directory is where the code is going to be located. This directory is divided by the following:
- Components: will have all components of application, such as Buttons, Text Fields, Text Inputs, etc

- Navigation: will be using React-Navigation library to handle the application navigation

- Screen: will have the code for the frame screens

- Store: will have the state management using Redux

- Styles: will have styles such as text-size, color, font-type, etc.

- Utility: will have methods for validating input fields, making sure they pass the requirements set by the methods.
