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
		}
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