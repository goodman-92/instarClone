import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
	Mutation: {
		createComment: protectResolver(async (root, {photoId, payload}, {loggedInUser: {id: userID}, client}) => {
			const ok = await client.photo.findUnique({
				where: {id: photoId}, select: {id: true}
			})

			if (!ok) {
				return {ok: false, error: 'Photo not found'}
			}
			
			await client.comment.create({
				data: {
					payload,
					photo: {connect: {id: photoId}},
					user: {connect: {id: userID}}
				}
			})
			return {
				ok: true
			}
		})
	}
}

export default resolvers