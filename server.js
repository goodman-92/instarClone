import {getUser} from "./users/users.utils";

require('dotenv').config();
import {ApolloServer} from 'apollo-server';
import {resolvers, typeDefs} from './schema.js'

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



const PORT = process.env.PORT || 4000

server.listen().then(() => console.log(`server is running :http://localhost:${PORT}`))
