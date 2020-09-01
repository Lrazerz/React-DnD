import React from 'react'

interface Props {
  children: any;
}

const Square = ({children}: Props) => {
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

//@ts-ignore
export default Square;