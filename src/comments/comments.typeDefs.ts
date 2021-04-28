import {gql} from "apollo-server";

export default gql`
	type Comment {
		id: Int!
		payload: String!
		user: User
		photo: Photo
		isMine: String!
		createdAt: String!
		updatedAt: String!
	}
	
`