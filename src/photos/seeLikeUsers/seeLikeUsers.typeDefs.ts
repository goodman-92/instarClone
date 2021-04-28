import {gql} from "apollo-server";

export default gql`
	type Query {
		seeLikeUsers(id: Int!): [User] 
	}
`
