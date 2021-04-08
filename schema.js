import {loadFilesSync, mergeResolvers, mergeTypeDefs} from "graphql-tools";
import { makeExecutableSchema } from '@graphql-tools/schema';

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`)
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);

const resolvers = mergeResolvers(loadedResolvers);
const typeDefs = mergeTypeDefs(loadedTypes);

const schema = makeExecutableSchema({
	typeDefs,resolvers
})

export default schema;