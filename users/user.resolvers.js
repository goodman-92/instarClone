import client from "../client";

export default {
	User: {
		totalFollowing: async ({id}) => {   // 없을때 참고한다
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
		totalFollowers: async ({id}) => {
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
		isFollowing: async ({id}, _, {loggedInUser}) => {
			if (!loggedInUser){
				return false
			}
			const exists = await client.user
				.findUnique({ where: {username: loggedInUser.username}})
				.following({
					where: {id}
				});
			
			return  exists.length !== 0
		}
	}
	
	
}
