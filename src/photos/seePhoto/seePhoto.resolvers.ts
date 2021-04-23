import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seePhoto: async (_, {id}, {client}) => {

			return await client.photo.findUnique({
				where: {
					id
				}
			})
		}
	}
}

export default resolvers