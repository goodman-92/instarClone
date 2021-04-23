import {Resolvers} from "../../types";

const resolvers: Resolvers  = {
	Query: {
		searchPhotos: (_, {keyword}, {client} ) => {
			return client.photo.findMany({
				where: {
					file: {
						startsWith: keyword
					}
				}
			})

		}

	}
}
export default resolvers