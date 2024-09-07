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
