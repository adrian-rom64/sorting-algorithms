import React from 'react'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

const ControlBar = props => {

  const algorithms = [
    { value: 'bubbleSort', label: 'Bubble Sort' },
    { value: 'insertionSort', label: 'Insertion Sort' },
    { value: 'selectionSort', label: 'Selection Sort'},
    { value: 'quickSort', label: 'Quick Sort'},
    { value: 'bogoSort', label: 'Bogo Sort' },
    { value: 'mergeSort', label: 'Merge Sort' }
  ]

  const stopButton = (
    <Button
      label='Stop'
      onClick={props.stopHandler}
      disabled={!props.running}
      className='p-button-danger'
    />
  )

  const startButton = (
    <Button
      label='Start'
      onClick={props.startHandler}
      disabled={props.running}
      className='p-button-success'
    />
  )

  return (
    <div className='control-bar'>
      <div className='dropdown-container section'>
        <Dropdown
          options={algorithms}
          value={props.algorithm}
          onChange={e => props.setAlgorithm(e.value)}
          disabled={props.running}
        />
      </div>
      <div className='slider-container section'>
        <div className='value'>Amount: {props.amount}</div>
        <div className='slider'>
          <Slider
            value={props.amount}
            onChange={!props.running ? e => props.setAmount(e.value) : null}
            max={200}
            min={5}
            disabled={props.running}
          />
        </div>
      </div>
      <div className='slider-container section'>
        <div className='value '>Speed: {props.speed}</div>
        <div className='slider'>
          <Slider
            value={props.speed}
            onChange={!props.running ? e => props.setSpeed(e.value) : null}
            max={100}
            min={5}
            disabled={props.running}
          />
        </div>
      </div>
      <div className='buttons-container section'>
        {props.running ? stopButton : startButton}
      </div>
    </div>
  )
}

export default ControlBar