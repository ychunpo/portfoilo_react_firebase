import React, { useState } from 'react'
import Child from './Child'

export default function Father() {

  const [msg, setMsg] = useState('这是父组件需要传递的信息');
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
  const [msg1, setMsg1] = useState("");
  return (
    <div>
      <h3>Father1</h3>
      <Child name={msg} arr={arr} msg={get}></Child>
      <hr />
      <div>{msg1}</div>
    </div>
  )
  function get(a, b) {
    console.log(a, b);
    setMsg1(a + b)
  }
}