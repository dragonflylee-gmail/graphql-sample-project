// src/resolvers.js

const resolvers = {
    Query: {
        feed: async (parent, args, context) => {
            return context.prisma.link.findMany();
        },
    },
    Mutation: {
        post: async (parent, args, context) => {
            return await context.prisma.link.create({
                data: {
                    description: args.description,
                    url: args.url,
                },
            });
        },
        deleteLink: async (_, {id}, context) => {
            return await context.prisma.link.delete({
                where: {id: Number(id)},
            });
        },
    },
};

module.exports = {resolvers};
