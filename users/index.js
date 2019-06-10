const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: "user1",
    name: "Darrell"
  },
  {
    id: "user2",
    name: "Chris"
  },
  {
    id: "user3",
    name: "Charlie"
  },
  {
    id: "user4",
    name: "Emma"
  }
];

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    user(id: String!): User!
    users: [User!]!
  }
`;

const resolvers = {
  Query: {
    user: (obj, args) => {
      return users.filter(user => {
        return user.id === args.id;
      })[0];
    },
    users: () => {
      return users;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
