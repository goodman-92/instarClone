import {Resolvers} from "../../types";

const resolvers: Resolvers = {
	Query: {
		seeFollowers: async (_, {username, page}, {client}) => {
			const user = client.user.findUnique({where: {username}, select: {id: true}}) // 특정부분만

			if (!user) {
				return {ok: false, error: `not found username =>${username}`}
			}

			const take = 5;
			const skip = page === 0 ? 0 : (page - 1) * 5;

			const followers = await client.user
				.findUnique({where: {username}})
				.followers({
					take,
					skip
				});

			const totalFollowers = await client.user.count({
				where: {
					following: {
						some: {username}
					}
				}
			});

			return {
				ok: true,
				followers: followers,
				totalPages: Math.ceil(totalFollowers / 5)
			}
		}
	}
}


export default resolvers