// src/index.js
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
