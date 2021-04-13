import express from "express"
import {getUser} from "./users/users.utils";
require('dotenv').config();
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from './schema.js'
import logger from "morgan";

const server = new ApolloServer(
	{
		resolvers,
		typeDefs,
		context: async ({req}) => {
			return {
				loggedInUser: await getUser(req.headers.token)
			}
		}
	}
)
const app = express();
app.use(logger("tiny", {}));
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000

app.listen({port: PORT}, () => {
	console.log(`🚀Server is running on http://localhost:${PORT}✅`)
})