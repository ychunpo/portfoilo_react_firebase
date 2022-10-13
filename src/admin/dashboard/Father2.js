// App.js(父组件)
import React, { useState } from "react";
import Child2 from "./Child2.js";

export default function Father2() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const addList = () => {
    if (name !== "") {
      setList((preList) => {
        const newList = [...preList];
        newList.push(name);
        return newList;
      });
    }
  };
  const deleteList = (deleteIndex) => {
    const newList = list.filter((_, index) => index !== deleteIndex);
    setList(newList);
  };
  return (
    <div>
      <h3>Father2</h3>
      <input
        placeholder="请输入名字"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addList}>添加</button>
      <Child2 list={list} deleteList={deleteList} />
    </div>
  );
}