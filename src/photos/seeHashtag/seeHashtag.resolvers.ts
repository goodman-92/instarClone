import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seeHashtag: async (_, { hashtag }, { client }) => {
			return client.hashTag.findUnique({
				where: {
					hashtag
				}
			})
		}
	}
}

export default resolvers;