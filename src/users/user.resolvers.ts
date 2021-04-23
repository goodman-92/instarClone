import {Resolvers} from "../types";

const resolvers: Resolvers = {
	User: {
		totalFollowing: async ({id},_,{client}) => {   // 없을때 참고한다
			return client.user.count({
				where: {
					followers: {
						some: {
							id
						}
					}
				}
			})
		},
		totalFollowers: async ({id},_,{client}) => {
			return client.user.count({
				where: {
					following: {
						some: {
							id
						}
					}
				}
			})
		},
		isMe: ({id}, _, {loggedInUser}) => {
			return loggedInUser && loggedInUser.id === id
		},
		isFollowing: async ({id}, _, {loggedInUser, client}) => {
			if (!loggedInUser){
				return false
			}
			const exists = await client.user
				.findUnique({ where: {username: loggedInUser.username}})
				.following({
					where: {id}
				});
			
			return  exists.length !== 0
		},
		photos: async ({id}, {page}, context) => {
			return context.client.user.findUnique({
				where: {
					id
				}
			}).photos()
		}
	}
}

export default resolvers;