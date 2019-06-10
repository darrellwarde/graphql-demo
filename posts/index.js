const { ApolloServer, gql } = require("apollo-server");
const { GraphQLDateTime } = require("graphql-iso-date");
const moment = require("moment");
const uuid = require("uuid/v4");

const posts = [
  {
    id: "post1",
    content: "I really hope I don't mess up this demo!",
    createTime: moment("2019-10-06 07:51").format(),
    authorId: "user1"
  },
  {
    id: "post2",
    content: "He is absolutely going to mess up this demo.",
    createTime: moment("2019-10-06 07:53").format(),
    authorId: "user2"
  },
  {
    id: "post3",
    content: "Hi guys!",
    createTime: moment("2019-10-06 09:54").format(),
    authorId: "user4"
  },
  {
    id: "post4",
    content:
      "*sigh* Did you not get the message that these posts are purely to mock Darrell's demo?!",
    createTime: moment("2019-10-06 09:55").format(),
    authorId: "user3"
  },
  {
    id: "post5",
    content: "Thanks guys. -_-",
    createTime: moment("2019-10-06 09:56").format(),
    authorId: "user1"
  }
];

const typeDefs = gql`
  scalar DateTime

  type Post {
    content: String!
    createTime: DateTime!
    authorId: String!
  }

  input CreatePostInput {
    content: String!
    authorId: String!
  }

  type CreatePostMutationResponse {
    success: Boolean
    message: String
    post: Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): CreatePostMutationResponse!
  }

  type Query {
    post(id: String!): Post
    posts(authorId: String): [Post!]!
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    createPost: (obj, args) => {
      const input = args.input;
      const post = {
        id: uuid(),
        content: input.content,
        createTime: moment().format(),
        authorId: input.authorId
      };
      posts.push(post);
      return {
        success: true,
        message: "Post created successfully!",
        post
      };
    }
  },
  Query: {
    post: (obj, args) => {
      return posts.filter(post => {
        return post.id === args.id;
      })[0];
    },
    posts: (obj, args) => {
      if (args.authorId) {
        return posts.filter(post => {
          return post.authorId === args.authorId;
        });
      }
      return posts;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
