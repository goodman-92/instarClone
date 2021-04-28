import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

interface likePhotoResult {
	ok: Boolean,
	error?: String
}

const resolvers: Resolvers = {
	Mutation: {
		toggleLike: protectResolver(async (root, {id: photoId}, {client, loggedInUser: {id: userId}}): Promise<likePhotoResult> => {

			const existPhoto = await client.photo.findUnique({where: {id: photoId}})
			
			const likeWhere = {
				photoId_userId: {
					userId, photoId
				}
			}

			if (!existPhoto) {
				return {
					ok: false,
					error: 'photo Not Found'
				}
			}

			const alreadyLike = await client.like.findUnique({where: likeWhere})

			if (alreadyLike) {
				await client.like.delete({where: likeWhere})
				return {
					ok: true
				}
			}

			await client.like.create({
				data: {
					user: {
						connect: {id: userId}
					},
					photo: {
						connect: {id: photoId}
					}
				}
			})

			return {
				ok: true
			}
		})
	}
}

export default resolvers