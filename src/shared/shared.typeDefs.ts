import {gql} from "apollo-server";

export default gql`
	type MuatationResponsse{
		ok: Boolean,
		errror: String
	}
`