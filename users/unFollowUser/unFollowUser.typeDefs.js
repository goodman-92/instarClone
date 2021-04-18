import {gql} from "apollo-server";

export default gql`
	type UnFollowUserReslut{
		ok: Boolean!
		error: String
	}
	type Mutation{
		unFollowUser(username: String!): UnFollowUserReslut
	}
`