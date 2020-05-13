import React, { useState, useEffect } from 'react'
import ControlBar from './ControlBar'
import Bars from './Bars'
import * as Algorithms from './Algorithms'
import * as Utils from './Utils'

const Sort = () => {

  const [array, setArray] = useState([])
  const [amount, setAmount] = useState(50)
  const [speed, setSpeed] = useState(100)
  const [running, setRunning] = useState(false)
  const [arrayIsSorted, setArrayIsSorted] = useState(false)
  const [algorithm, setAlgorithm] = useState('mergeSort')
  const [pointers, setPointers] = useState([null, null])

  const resetArray = () => setArray(Utils.generateRandomArray(amount))

  useEffect(() => {
    if (!running) resetArray()
  }, [amount])

  const getIterations = arr => {
    let set = []
    const handlers = {
      append: arr => set.push({type: 'array', arr: Utils.copyArray(arr)}),
      pointer1: index => set.push({type: 'pointer', id: 1, index: index}),
      pointer2: index => set.push({type: 'pointer', id: 2, index: index}),
    }
    Algorithms[algorithm](Utils.copyArray(arr), handlers)
    return set
  }
  
  const startHandler = () => {
    let set = []
    if (arrayIsSorted) {
      const newArray = Utils.generateRandomArray(amount)
      setArray(newArray)
      setArrayIsSorted(false)
      set = getIterations(newArray)
    } else {
      set = getIterations(array)
    }
    setRunning(true)
    global.SORT_EXECUTION = true
    stepForward(0, set)
  }

  const stopHandler = () => {
    setRunning(false)
    global.SORT_EXECUTION = false
    resetArray()
    setPointers([null, null])
  }

  const stepForward = (step, set) => {
    if (!set[step] || !global.SORT_EXECUTION) {
      setRunning(false)
      global.SORT_EXECUTION = false
      setArrayIsSorted(true)
      setPointers([null, null])
      return
    }
    if (set[step].type === 'array') {
      setArray(set[step].arr)
    }
    if (set[step].type === 'pointer') {
      if (set[step].id === 1) setPointers(pointers => [set[step].index, pointers[1]])
      if (set[step].id === 2) setPointers(pointers => [pointers[0], set[step].index])
    }
    setTimeout(() => stepForward(step + 1, set), 100 - speed)
  }

  return (
    <div className='sort'>
      <ControlBar
        amount={amount}
        setAmount={setAmount}
        speed={speed}
        setSpeed={setSpeed}
        running={running}
        setRunning={setRunning}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        startHandler={startHandler}
        stopHandler={stopHandler}
      />
      <Bars array={array} pointers={pointers} running={running}/>
    </div>
  )
}

export default Sort