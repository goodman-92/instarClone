import {gql} from "apollo-server";


export default gql`
	type Photo {
		id: Int!
		user: User!
		file: String!
		caption: String
        hashtags: [HashTag]
		likes: Int!
		comments: Int!
		isMine: Boolean
		createdAt: String
		updatedAt: String
	}
	
#	의존성을 기준으로 모듈을 삼는다
	type HashTag {
		id: Int!
        hashtag: String
		photos(page: Int!): [Photo]
        totalPhotos: Int
        createdAt: String!
		updateAt: String!
	}
	
	type Like {
		id: Int!
		photo: Photo!
		user: User!
		createdAt: String!
		updatedAt: String!
	}

`