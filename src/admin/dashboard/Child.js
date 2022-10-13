import React, { useState } from 'react'

export default function Child(props) {
  console.log(props)
  const [msg, setMsg] = useState('Aa子组件的值')
  return (
    <React.Fragment>
      <div>{props.name}</div>
      <div>
        {
          props.arr.map((item, i) =>
            <li key={i}>父组件传递过来的arr里面遍历过来的第{i + 1}值:{item}。</li>
          )
        }
      </div>
      <br />
      <button onClick={() => send(1)}>传值给父组件</button>
    </React.Fragment>
  )
  function send(i) {
    console.log(i);
    props.msg(msg, i)
  }
}