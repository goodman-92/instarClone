import {gql} from "apollo-server";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email:String!
        bio: String
        avatar: String
        createdAt: String!
        updatedAt: String!
        following: [User]
        follower: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isFollowing: Boolean!
        isMe: Boolean!
    }
`;
