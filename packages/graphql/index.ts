import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import * as path from 'path';
import datamodelInfo from './generated/nexus-prisma';
import { makePrismaSchema } from 'nexus-prisma';
import * as allTypes from './resolvers';
import { permissions } from './permissions';

const schema = makePrismaSchema({
    types: allTypes,

    prisma: {
        datamodelInfo,
        client: prisma,
    },

    outputs: {
        schema: path.join(__dirname, './generated/schema.graphql'),
        typegen: path.join(__dirname, './generated/nexus.ts'),
    },
    // Configure nullability of input arguments: All arguments are non-nullable by default
    nonNullDefaults: {
        input: false,
        output: false,
    },

    // Configure automatic type resolution for the TS representations of the associated types
    typegenAutoConfig: {
        sources: [
            {
                source: path.join(__dirname, './types.ts'),
                alias: 'types',
            },
        ],
        contextType: 'types.Context',
    },
});

const server = new GraphQLServer({
    schema,
    middlewares: [permissions],
    context: (request): object => {
        return {
            ...request,
            prisma,
        };
    },
});

server.start((): void => console.log(`🚀 Server ready at http://localhost:4000`));
