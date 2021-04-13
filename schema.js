import {loadFilesSync, mergeResolvers, mergeTypeDefs} from "graphql-tools";
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);

export const resolvers = mergeResolvers(loadedResolvers);
export const typeDefs = mergeTypeDefs(loadedTypes);

// const schema = makeExecutableSchema({
// 	typeDefs,
// 	resolvers
// })