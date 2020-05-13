export const bubbleSort = (arr, handlers) => {
  let switched = true
  while (switched)
  {
    switched = false
    for (let k = 0; k < arr.length - 1; k += 1)
    {
      handlers.pointer1(k)
      if (arr[k + 1] < arr[k]) {
        [arr[k + 1], arr[k]] = [arr[k], arr[k + 1]]
        handlers.append(arr)
        switched = true
      }
    }
  }
  handlers.append(arr)
  return arr
}

export const insertionSort = (arr, handlers) => {
  for (let k = 1; k < arr.length; k += 1) {
    let i = k
    while (i > 0 && arr[i - 1] > arr[i]) {
      handlers.pointer1(i)
      // [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]] IDK doesnt work
      const tmp = arr[i - 1]
      arr[i - 1] = arr[i]
      arr[i] = tmp
      handlers.append(arr)
      i -= 1
    }
  }
  handlers.append(arr)
  return
}

export const selectionSort = (arr, handlers) => {
  let pointer = 0
  while (pointer !== arr.length)
  {
    let min = Number.MAX_SAFE_INTEGER
    let minIndex = 0
    for (let k = pointer; k < arr.length; k += 1)
    {
      handlers.pointer1(k)
      if (arr[k] < min)
      {
        min = arr[k]
        minIndex = k
      }
    }
    [arr[pointer], arr[minIndex]] = [arr[minIndex], arr[pointer]]
    handlers.append(arr)
    pointer += 1
  }
  handlers.append(arr)
}

export const quickSort = (arr, handlers) => {
  const partition = (start, end) => {
    let x = arr[start]
    let l = start
    let r = end

    while (true) {
      while (arr[l] < x) {
        l += 1
        handlers.pointer1(l)
      }
      while (arr[r] > x) {
        r -= 1
        handlers.pointer2(r)
      }
      if (l < r) {
        [arr[l], arr[r]] = [arr[r], arr[l]]
        handlers.append(arr)
        l += 1
        r -= 1
        handlers.pointer1(l)
        handlers.pointer2(r)
      } else return r
    }
  }
  const sort = (start, end) => {
    if (start < end) {
      let pivot = partition(start, end)
      sort(start, pivot)
      sort(pivot + 1, end)
    }
  }
  sort(0, arr.length - 1)
  handlers.append(arr)
}

export const bogoSort = (arr, handlers) => {
  const MAX_ITERATIONS = 20000

  const randomIndex = currentIndex => {
    const rand = Math.floor(Math.random() * arr.length)
    if (rand === currentIndex) return randomIndex(currentIndex)
    else return rand
  }
  const checkIfSorted = () => {
    let sorted = true
    for (let k = 0; k < arr.length - 1; k += 1) {
      if (arr[k + 1] < arr[k]) sorted = false
    }
    return sorted
  }
  for (let k = 0; k < MAX_ITERATIONS; k += 1) {
    if (checkIfSorted()) break
    const currentIndex = randomIndex()
    const substitute = randomIndex(currentIndex)
    handlers.pointer1(currentIndex)
    handlers.pointer2(substitute)
    const tmp = arr[substitute]
    arr[substitute] = arr[currentIndex]
    arr[currentIndex] = tmp
    handlers.append(arr)
  }
  return arr
}

export const mergeSort = (arr, handlers) => {
  
  const merge = (start, center, end) => {
    let left = start
    let right = center + 1
    let tmp = []

    while (left <= center && right <= end)
    {
      if (arr[right] < arr[left])
      {
        tmp.push(arr[right])
        right += 1
      }
      else
      {
        tmp.push(arr[left])
        left += 1
      }
      handlers.pointer1(left)
      handlers.pointer2(right)
    }
    while (left <= center)
    {
      tmp.push(arr[left])
      left += 1
      handlers.pointer1(left)
    }
    while (right <= end)
    {
      tmp.push(arr[right])
      right += 1
      handlers.pointer2(right)
    }
    for (let k = 0; k <= end - start; k += 1) {
      arr[start + k] = tmp[k]
      handlers.append(arr)
      handlers.pointer1(k)
    }
  }

  const sort = (start, end) => {
    if (start < end)
    {
      const center = Math.floor((start + end) / 2)
      sort(start, center)
      sort(center + 1, end)
      merge(start, center, end)
    }
  }

  sort(0, arr.length - 1)
  handlers.append(arr)
  return arr
}