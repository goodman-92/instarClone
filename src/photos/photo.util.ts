
const processHashtags = (caption: string): Array<any> => {
	const hashtags = caption.match(/#[\w]+/g) || [];
	return hashtags.map(hashtag => ({where: {hashtag}, create: {hashtag}}));
}

export {
	processHashtags
}