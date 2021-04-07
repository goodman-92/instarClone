import {ApolloServer, gql} from 'apollo-server';
import pkg from '@prisma/client';

const {PrismaClient} = pkg;

const client = new PrismaClient();

// graphql 은 선택사항이다
const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createTime: String!
        updateTime: String!
    }

    type Query {
        movies: [Movie],
        movie(id: Int!): Movie
    }
    type Mutation {
	    createMovie(title: String!, year: Int!, genre: String): Movie
	    deleteMovie(id: Int!): Movie
	    updateMovie(id: Int!, year: Int!): Movie
    }

`;

const resolvers = {
	Query: {
		movies: () => client.movie.findMany(),
		movie: (_, {id}) => client.movie.findUnique({ where: {id}}),
	},
	Mutation: {
		createMovie: (_, { title, year, genre }) => client.movie.create({data: {
			title, year, genre
		}
		}),
		deleteMovie: (_, {id}) => {
			return client.movie.delete({where: { id}})
		},
		updateMovie: (_, {id, year}) => {
			console.log(id, year, 'console print')
			return client.movie.update({
				where: {
					id
				},
				data: {
					year
				}
			})
		}
	}
}


const server = new ApolloServer({
	typeDefs,
	resolvers
})

server.listen().then(() => console.log('server is running :http://localhost:4000'))
