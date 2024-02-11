import React, { useState } from 'react'

const PrivacyScreen = () => {
 const [count, setCount] = useState(0)
 const handleClick = () => {
  setCount(count + 1)
  // console.log('clicked');
 }

 return (
  <div>
   <p>Privacy Page</p>
   <button onClick={handleClick}>Count {count} </button>
  </div>

 )
}

export default PrivacyScreen