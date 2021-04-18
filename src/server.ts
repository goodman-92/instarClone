import * as express from "express"
import {getUser} from "./users/users.utils";
require('dotenv').config();
import {ApolloServer} from 'apollo-server-express';
import {resolvers, typeDefs} from './schema'
import * as logger from "morgan";
import client from "./client";

const apollo = new ApolloServer(
	{
		resolvers,
		typeDefs,
		context: async ({req}) => {
			return {
				loggedInUser: await getUser(req.headers.token),
				client
			}
		}
	}
)
const app = express();
app.use(logger("tiny", {}));
apollo.applyMiddleware({ app });
app.use("/static",express.static('uploads'));

const PORT = process.env.PORT || 4000

app.listen({port: PORT}, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT} ✅  `)
})