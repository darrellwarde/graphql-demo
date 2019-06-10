# GraphQL Demo

A small demo project to walkthrough building a GraphQL schema around some existing data and writing your first mutation, as well as to demonstrate schema stitching.

This repository contains two small services:

- [users](users/): A service containing the details of users stored in an array
- [posts](posts/): A service containing the details of posts stored in an array

This project at the top-level contains a service which will stitch together these two services to offer a view across the two entity types with links inbetween them.

## Installation

At the top-level, the schema stitching gateway can be installed using npm.

```bash
npm install
```

## Usage

Once the [users](users/) and [posts](posts/) APIs are up and running, you can start this server using npm.

```bash
npm start
```

You can then navigate to http://localhost:4002/ to access the GraphQL Playground hosted by this service.
