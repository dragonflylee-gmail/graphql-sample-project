# graphql-sample-project

Prerequisites:
Node.js and npm installed.
Basic understanding of JavaScript, Node.js, and GraphQL.
Steps to Create a Sample GraphQL Project
1. Initialize the Node.js Project
bash
.
mkdir graphql-sample-project
cd graphql-sample-project
npm init -y
This will generate a package.json file.

2. Install Dependencies
Install the necessary packages:

bash
.
npm install express apollo-server-express graphql prisma-client
npm install nodemon --save-dev
express: A minimal web framework for Node.js.
apollo-server-express: To integrate Apollo Server with Express.
graphql: The GraphQL library.
prisma-client: Prisma ORM client to interact with a database.
nodemon: For hot-reloading during development (optional).
3. Set Up Prisma
Prisma is an ORM to interact with a database. First, initialize Prisma:

bash
.
npx prisma init
This will generate a prisma folder containing schema.prisma. In this file, define your data models. For example:

prisma
.
// prisma/schema.prisma

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model Link {
  id          Int      @id @default(autoincrement())
  description String
  url         String
}
This example uses SQLite for simplicity.

Next, run Prisma commands to set up the database:

bash
.
npx prisma migrate dev --name init
npx prisma generate
migrate dev: Runs migrations to create the database and schema.
generate: Generates the Prisma client to be used in the project.
4. Create the GraphQL Server
Now, create the files for the GraphQL server.

Create a src folder:
bash
.
mkdir src
Set Up the Server in src/index.js:
javascript
.
// src/index.js

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Initialize Express and Apollo Server
const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      prisma,
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
5. Define the GraphQL Schema
Create a src/schema.js file for your GraphQL schema:

javascript
.
// src/schema.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Link {
    id: ID!
    description: String!
    url: String!
  }

  type Query {
    feed: [Link!]!
  }

  type Mutation {
    post(description: String!, url: String!): Link!
  }
`;

module.exports = { typeDefs };
This schema defines:

A Link type with fields id, description, and url.
A Query to fetch all Link objects.
A Mutation to create new Link entries.
6. Implement Resolvers
Create a src/resolvers.js file for the logic behind the schema:

javascript
.
// src/resolvers.js

const resolvers = {
  Query: {
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: async (parent, args, context) => {
      const newLink = await context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
      return newLink;
    },
  },
};

module.exports = { resolvers };
The feed query returns all the links.
The post mutation creates a new link in the database.
7. Run the Project
You can use nodemon to automatically restart the server on file changes. Add this script to your package.json:

json
.
"scripts": {
  "start": "nodemon src/index.js"
}
Then, run the server:

bash
.
npm start
The server will be running at http://localhost:4000/graphql.

8. Test the GraphQL API
Go to http://localhost:4000/graphql and test your GraphQL queries.

For example:

Query:
graphql
.
{
  feed {
    id
    description
    url
  }
}
Mutation:
graphql
.
mutation {
  post(description: "A cool link", url: "https://example.com") {
    id
    description
    url
  }
}
Summary
This basic GraphQL project includes:

A simple Node.js server using Express.
Apollo Server for handling GraphQL queries and mutations.
Prisma ORM to handle database operations.
You can extend this project by adding authentication, more complex types, and queries to fit your application's needs.
