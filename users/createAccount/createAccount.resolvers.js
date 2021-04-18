import bcrypt from 'bcrypt'
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (_, {firstName, lastName, username, email, password}) => {
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [{username}, {email}]
					}
				});
				
				if (existingUser) {
					return {
						ok: false,
						error: "exist User"
					}
				}
				
				const uglyPassword = await bcrypt.hash(password, 10);
				
				const result = await client.user.create({
					data: {
						username, email, firstName, lastName, password: uglyPassword
					}
				});
				
				console.log(result, 'result');
				
				return {
					ok: true
				}
			} catch (e) {
				return {
					ok: false,
					error: JSON.stringify(e)
				}
			}
		}
	}
}