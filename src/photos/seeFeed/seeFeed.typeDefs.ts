import {gql} from "apollo-server";

export default gql`
	type Query {
		seeFeed(id: Int): [Photo]
	} 
`