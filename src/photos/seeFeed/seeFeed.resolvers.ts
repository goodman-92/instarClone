import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
	Query: {
		seeFeed: protectResolver(async (_, __, {client, loggedInUser: {id}}) => {
			return await client.photo.findMany({
				where: {
					OR: [{
							user: {
								followers: {
									some: {
										id
									}
								}
							}
						},
						{
							user: {
								id
							}
						}],
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		})
	}
}
export default resolvers