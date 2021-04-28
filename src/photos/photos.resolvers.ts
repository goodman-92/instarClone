import {Resolvers} from "../types";

const resolvers: Resolvers = {
	Photo: {
		user: async (root, _, {client}) => {

			const {userId: id} = root

			return await client.user.findUnique({
				where: {
					id
				}
			});
		},
		hashtags: async (root, _, {client}) => {
			const {id} = root

			return client.hashTag.findMany({
				where: {
					photos: {
						some: {
							id
						}
					}
				}
			})
		},
		comments: ({id}, _, {client}) => client.comment.count({where: {photoId: id}}),
		likes: ({id}, _, {client}) => client.like.count({where: {photoId: id}}),
		isMine: ({userId}, _, {client, loggedInUser }) => userId === loggedInUser?.id
	},
	HashTag: {
		photos: async ({id}, {page}, {client}) => {
			return client.hashTag.findUnique({
				where: {
					id
				}
			}).photos() // 배열로 전달
		},
		totalPhotos: async ({id}, _, {client}) => {
			return await client.photo.count({
				where: {
					hashtags: {
						some: {
							id
						}
					}
				}
			})

		}
	}
}

export default resolvers