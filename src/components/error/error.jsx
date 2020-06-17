import React from 'react'
import PropTypes from 'prop-types'

// If user want a add empty note this component will show
const Error = (props) => {
  const { isShow, message } = props
  return <>{isShow && <p className="error">{message}</p>}</>
}

Error.propTypes = {
  isShow: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
}

export default Error
