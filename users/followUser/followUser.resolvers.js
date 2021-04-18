import {protectResolver} from "../users.utils";
import client from "../../client";

export default {
	Mutation: {
		followUser: protectResolver(async (_, {username}, {loggedInUser}) => {
			const existingUser = await client.user.findFirst({
				where: {
					username
				}
			});
			console.log(existingUser, '존제힘')
			
			if (!existingUser){
				return {
					ok: false,
					error: "not exist user"
				}
			}
			
			await client.user.update({
				where: {
					id: loggedInUser.id
				},
				data: {
					following: {
						connect: {
							username
						}
					}
				}
			})
			
			return{
				ok: true
			}
			
		})
	}
}