# Users

An Apollo Server API built to expose the details of a number of users stored in an array structure.

## Installation

Use the package manager npm to install the project.

```bash
npm install
```

## Usage

Upon checkout, this project contains purely an array of users. After following the 'Next steps' section below you can run the project using npm.

```bash
npm start
```

You can then navigate to http://localhost:4000/ to access the GraphQL Playground hosted by this service.

## Next steps

This project contains nothing but an array of users and required an Apollo Server to be created to expose the data over a GraphQL endpoint. The [posts](../posts/) API can be used to help you build this. The following steps need to happen:

- Import the 'ApolloServer' and 'gql' objects from 'apollo-server'
- Create some type definitons representing the 'users' array contained within the file already
- Create some resolvers to allow for query of user by ID and to return a list of all users
- Set Apollo Server to listen on its default port
