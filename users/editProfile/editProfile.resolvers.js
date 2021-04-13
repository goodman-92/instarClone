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
			
			const { filename, createReadStream } = await avatar;
			const readStream = createReadStream();
			const writeStream = createWriteStream(`${process.cwd()}/uploads/${filename}`)
			readStream.pipe(writeStream);
			
			const password = newPassword ? await bcrypt.hash(newPassword, 10) : undefined;
			// ...(password && { password }
			
			const updateUser = await client.user.update({
				where: {
					id: loggedInUser.id,
				}, data: {
					firstName, lastName, username, email, password, bio  // undefined 알아서 체크함
				}
			})
			
			return updateUser?.id ? {ok: true} : {ok: false, error: "update failed"}
		})
	}
}