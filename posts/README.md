# Posts

An Apollo Server API built to expose a number of posts stored in an array structure.

## Installation

Use the package manager npm to install the project.

```bash
npm install
```

## Usage

This project will work as a read-only API out-of-the-box and can be run using npm.

```bash
npm start
```

You can then navigate to http://localhost:4001/ to access the GraphQL Playground hosted by this service.

## Next steps

With the project installed, add a mutation to create a new post with the following details:

- Accept two string arguments of 'content' and 'authorId'
- Generate a UUID for the 'id' field of the post
- Set 'createTime' to now

Push the newly created post to the 'posts' array.
