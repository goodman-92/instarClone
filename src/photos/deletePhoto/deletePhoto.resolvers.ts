import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
	Mutation: {
		deletePhoto: protectResolver(async (_, {id}, {client,loggedInUser: {id: userId}}) => {
			const findPhoto =  await client.photo.findUnique({
				where: { id }, select: {id:true, userId: true}
			})

			if (!findPhoto){
				return {ok: false, error: 'photo not found'}
			}

			if (findPhoto.userId !==  userId){
				return {
					ok: false,
					error: 'Not authorized'
				}
			}
			await client.photo.delete({ where: { id}})

			return {
				ok: true
			}
		})
	}
}
export default resolvers