import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";
import {processHashtags} from "../photo.util";

const resolvers: Resolvers = {
	Mutation: {
		editPhoto: protectResolver(async (root, {id, caption}, context, info) => {
			const photo = await  context.client.photo.findFirst({
				where: {
					id,   // findUnique 는 유니크한 속성아 아니면 where 절에 안쓰인다
					userId: context.loggedInUser.id
				},
				include: {
					hashtags: {
						select: {
							hashtag: true
						}
					}
				}
			})


			if (!photo){
				return {
					ok: false,
					error: 'not found Photo'
				}
			}

			const newHashtags = caption ? processHashtags(caption) : [];
			// const disconnectedHashTags = photo.hashtags.length ? photo.hashtags.map(h => )  null;

			// if (photo.userId !== context.loggedInUser.id){ return { ok: false, error: 'user file not found' } }


			// 바로 가면 안되고, 사진의 소유주를 확인해야하니 셀렉트를 해야지
			const result = await context.client.photo.update({
				data: {
					caption,
					hashtags: {
						...photo.hashtags.length && {disconnect: photo.hashtags},
						...newHashtags.length && { connectOrCreate: newHashtags }
					}
				},
				where: {
					id
				}
			})
			console.log(result)

			return {
				ok: true
			}

		})
	}
}
export default resolvers