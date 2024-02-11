import React from 'react'
import { Card } from 'react-bootstrap'

const LikeButton = () => {
 return (
  <div>
   <Card>
    {values.watch
     ? <i className="fa-regular fa-heart"></i>
     : <i className="fa-regular fa-heart"></i>}
    <span>{values.unwatch}</span>
   </Card>
  </div>
 )
}

export default LikeButton