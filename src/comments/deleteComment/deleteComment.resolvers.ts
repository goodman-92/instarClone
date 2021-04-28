import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
	Mutation: {
		deleteComment: protectResolver(async (_, {id}, {client,loggedInUser: {id: userId}}) => {
			const findComment =  await client.comment.findUnique({
				where: { id }, select: {id:true, userId: true}
			})

			if (!findComment){
				return {ok: false, error: 'comment not found'}
			}

			if (findComment.userId !==  userId){
				return {
					ok: false,
					error: 'Not authorized'
				}
			}

			await client.comment.delete({where: {id}})
			return {ok: true}
			
		})
	}
}
export default resolvers;