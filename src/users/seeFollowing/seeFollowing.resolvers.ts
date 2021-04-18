import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seeFollowing: async (_, {username, lastId}, {client}) => {
			const user = client.user.findUnique({ where: { username}, select: { id: true }}) // 특정부분만
			
			if (!user){
				return {ok: false, error: `not found username =>${username}`}
			}
			
			const following = await client.user
				.findUnique({where: {username}})
				.followers({
					take: 5,
					skip: lastId ? 1 : 0,
					...(lastId && { cursor: {id: lastId}})
				});
			
			return {
				ok: true,
				following
			}
		}
	}
}

 export default resolvers