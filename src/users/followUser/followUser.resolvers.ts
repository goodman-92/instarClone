import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";


const resolvers: Resolvers = {
	Mutation: {
		followUser: protectResolver(async (_, {username}, {loggedInUser, client}) => {
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

export default resolvers