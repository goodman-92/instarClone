require('dotenv').config();
import {ApolloServer} from 'apollo-server';
import schema from './schema.js'


const server = new ApolloServer(
	{
		schema
	}
)

const PORT = process.env.PORT || 4000

server.listen().then(() => console.log(`server is running :http://localhost:${PORT}`))
