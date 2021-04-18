import {protectResolver} from "../users.utils";
import client from "../../client";

export default {
	Mutation: {
		unFollowUser: protectResolver(async (_, {username}, {loggedInUser}) => {
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