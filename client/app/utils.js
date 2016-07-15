export const generateUniqueChannelName = (id1, id2) =>
	id1 < id2 ? `${id1}:${id2}` : `${id2}:${id1}`