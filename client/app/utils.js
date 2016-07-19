export const generateUniqueChannelName = (id1, id2) => {
  if (id1 > id2) {
    return `${id2}:${id1}`
  } else {
    return `${id1}:${id2}`
  }
}
