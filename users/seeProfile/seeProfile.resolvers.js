import client from "../../client";
import {protectResolver} from "../users.utils";

export default {
	Query: {
		seeProfile: protectResolver(async (_, {username}) => {
			console.log('hello Query')
			
			const user = await client.user.findUnique({
				where: {
					username
				},
				include: {
					following: true,
					followers: false
				}
			});
			
			return user

		}) // seeProfile 호출은 브라우저가 함, 하지만 함수가 선언된 순간에 pResolver 가 실행됨

	}
}