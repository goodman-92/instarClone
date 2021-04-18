import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Mutation: {
		unFollowUser: protectResolver(async (_, {username}, {loggedInUser, client}) => {
			const existUser = await client.user.findUnique({
				where: {
					username
				}
			})
			
			if (!existUser) {
				return {
					ok: false,
					error: "user not found"
				}
			}
			await client.user.update({
				where: {
					id: loggedInUser.id
				},
				data: {
					following: {
						disconnect: {
							username
						}
					}
				}
			})
			
			return {ok: true}
		})
	}
}

export default resolvers;