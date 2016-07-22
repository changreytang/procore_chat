import store from 'store' 

// Generate the unique name for a channel from two user ids
export const generateUniqueChannelName = (id1, id2) => {
  if (id1 > id2) {
    return `${id2}:${id1}`
  } else {
    return `${id1}:${id2}`
  }
}

export const findOtherId = uniqueName => {
  let otherId
  const ids = uniqueName.split(':')
  ids.forEach(id => {if (id != store.getState().currentUser.id.toString()) otherId = id})
  return otherId
}