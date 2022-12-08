import React, { useState, useEffect } from 'react'

const TestUseState = () => {

  const [count, setCount] = useState(null);
  // const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // const incrementCount = async () => {
  //   setCount(count + 1);
  //   await delay(5000)
  //   console.log(`After waiting 5 seconds: ${count}`)
  // }
  const incrementCount6 = () => {
    // setCount(count + 1);
    // setCount(count + 2);
    // setCount(count + 3);
    setCount((count) => count + 1);
    setCount((count) => count + 2);
    setCount((count) => count + 3);
  }
  useEffect(() => {
    console.log(count)
  }, [count])


  return (
    <div>
      <p><button onClick={incrementCount6}>Count</button></p>
    </div>
  )
}

export default TestUseState
