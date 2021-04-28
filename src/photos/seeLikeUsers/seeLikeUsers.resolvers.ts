import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seeLikeUsers: async (root, {id}, {client}) => {
			const likeInUsers = await client.like.findMany({
				where: {
					photoId: id
				},
				select: {
					user: {
						select: {
							username: true, firstName: true, lastName: true, avatar: true
						}
					}
				}
			})
			
			return likeInUsers.map(likeInUser => likeInUser.user);
		}
	}
}

export default resolvers