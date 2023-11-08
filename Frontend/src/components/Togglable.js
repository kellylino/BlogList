import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hidewhenvisible = { display: visible ? 'none' : '' }
  const showwhenvisible = { display: visible ? '' : 'none' }

  const togglaVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      togglaVisibility
    }
  })

  return (
    <div>
      <div style={hidewhenvisible}>
        {props.buttonLabels && <button onClick={togglaVisibility}> {props.buttonLabels[0]} </button>}
      </div>
      <div style={showwhenvisible}>
        {props.children}
        {props.buttonLabels && <button onClick={togglaVisibility}> {props.buttonLabels[1]} </button>}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabels: PropTypes.arrayOf(PropTypes.string)
}

export default Togglable