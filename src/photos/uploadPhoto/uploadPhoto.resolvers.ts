import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";
import {processHashtags} from "../photo.util";

const resolvers: Resolvers = {
	Mutation: {
		uploadPhoto: protectResolver(
			async (root, {file, caption}, {loggedInUser, client}) => {
				const hashtagObj = caption ? processHashtags(caption) : [];

				const result = await client.photo.create({
					data: {
						file,
						caption,
						user: {
							connect: {
								id: loggedInUser.id
							}
						},
						...hashtagObj.length && {
							hashtags: {connectOrCreate: hashtagObj}
						}
					}
				})
			})
	}
}

export default resolvers

