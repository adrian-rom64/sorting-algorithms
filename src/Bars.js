import React from 'react'

const Bars = props => {

  const array = props.array.map((value, index) => {
    const highlight = () => {
      if (!props.pointers || !props.running) return 'var(--olive)'
      if (props.pointers[0] === index) return 'var(--red)'
      if (props.pointers[1] === index) return 'var(--blue)'
      return 'var(--olive)'
    }
    const amount = props.array.length
    const style = {
      height: value.toString() + '%',
      width: `calc(80% / ${amount})`,
      left: `calc(${index} * 20% / ${amount} * 5 + 20% / ${amount} / 2)`, // WTF
      backgroundColor: highlight()
    }
    return (
      <div key={index} className='bar' style={style} />
    )
  })

  return (
    <div className='bars-container'>
      <div className='bars'>
        {array}
      </div>
      <div className='bottom-border' />
    </div>
  )
}

export default Bars