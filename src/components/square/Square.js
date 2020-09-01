import React from 'react'

const Square = ({children}) => {
  return (
    <div style={{
      backgroundColor: 'white', color: 'black', width: '100%', height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </div>
  )
}

export default Square;