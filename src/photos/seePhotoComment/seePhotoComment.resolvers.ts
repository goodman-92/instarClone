import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seePhotoComment: async (_,{id},{client}) => {
			return await client.comment.findMany({
				where: {
					photoId: id
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		}
	}
};

export default resolvers;