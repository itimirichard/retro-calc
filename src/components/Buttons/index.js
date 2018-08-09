import React from 'react'

const Button = props => (
  <button
    type="button"
    className={`button ${props.className ? props.className : ''}`}
    onClick={() => props.onClickAction(props)}
  >
    {props.name}
  </button>
)

export default Button
