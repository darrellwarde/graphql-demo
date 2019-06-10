const {
  makeRemoteExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require("graphql-tools");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const { ApolloServer, gql } = require("apollo-server");

async function makeMergedSchema() {
  // Introspect the User schema and create an executable schema
  const UserLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    fetch
  });
  const UserSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(UserLink),
    link: UserLink
  });

  // Introspect the Post schema and create an executable schema
  const PostLink = createHttpLink({
    uri: "http://localhost:4001/graphql",
    fetch
  });
  const PostSchema = makeRemoteExecutableSchema({
    schema: await introspectSchema(PostLink),
    link: PostLink
  });

  // A small string schema extensions to add links between schemas
  const LinkSchema = gql`
    extend type User {
      posts: [Post!]!
    }

    extend type Post {
      author: User!
    }
  `;

  // Time to merge these schema together!
  const mergedSchema = mergeSchemas({
    // Firstly, specify the schemas to be merged together in an array
    schemas: [UserSchema, PostSchema, LinkSchema],
    // Then we add in the resolvers for our link schema
    resolvers: {
      // Let's get all of the posts authored by a user
      User: {
        posts: {
          fragment: "fragment UserFragment on User { id }",
          resolve(parent, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: PostSchema,
              operation: "query",
              fieldName: "posts",
              args: {
                authorId: parent.id
              },
              context,
              info
            });
          }
        }
      },
      // And then let's get the author details of a post!
      Post: {
        author: {
          fragment: "fragment PostFragment on Post { authorId }",
          resolve(parent, args, context, info) {
            return info.mergeInfo.delegateToSchema({
              schema: UserSchema,
              operation: "query",
              fieldName: "user",
              args: {
                id: parent.authorId
              },
              context,
              info
            });
          }
        }
      }
    }
  });

  return mergedSchema;
}

makeMergedSchema().then(schema => {
  const server = new ApolloServer({ schema });

  server.listen({ port: 4002 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
