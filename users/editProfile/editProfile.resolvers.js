import {createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import {protectResolver} from "../users.utils";

export default {
	Mutation: {
		editProfile: protectResolver(async (_, args, {loggedInUser}) => {
			const {
				firstName,
				lastName,
				username,
				email,
				password: newPassword,
				bio,
				avatar
			} = args
			
			let avatarUrl = null;
			if (avatar){
				const { filename, createReadStream } = await avatar;
				const readStream = createReadStream();
				const newFileName  = `${loggedInUser.id}-${Date.now()}-${filename}`
				const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFileName}`);
				readStream.pipe(writeStream);
				avatarUrl = `http://localhost:4000/static/${newFileName}`
			}
			
			const  uglyPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null;
			
			const updateUser = await client.user.update({
				where: {
					id: loggedInUser.id,
				}, data: {
					firstName, lastName, username, email, bio,  // undefined 알아서 체크함
					...(uglyPassword && { password: uglyPassword }),
					...(avatarUrl && { avatar: avatarUrl})
				}
			})
			
			return updateUser?.id ? {ok: true} : {ok: false, error: "update failed"}
		})
	}
}