export const generateRandomArray = (amount) => {
  let arr = []
  for (let index = 0; index < amount; index++) {
    arr.push(Math.floor(Math.random() * 100 + 1))
  }
  return arr
}

export const copyArray = array => {
  let newArray = []
  array.forEach(item => {
    newArray.push(item)
  })
  return newArray
}