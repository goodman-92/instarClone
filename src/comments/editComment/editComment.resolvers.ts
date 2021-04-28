import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
	Mutation: {
		editComment: protectResolver(async (root, {id, payload}, {client,loggedInUser})=>{
			const findComment = await client.photo.findUnique({where: {id}, select: {userId: true}})
			if (!findComment){
				return {
					ok: false,
					error: 'comment Not found'
				}
			}
			if (findComment.userId !== loggedInUser.id){
				return  {
					ok: false,
					error: "fail auth"
				}
			}
			await client.comment.update({
				where:{id},data:{payload}
			})
			
			return {ok:true}

		})
	}
}
export default resolvers