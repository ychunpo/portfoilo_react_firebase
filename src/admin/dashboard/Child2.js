// Child.js(子组件)
import React from "react";

export default function Child2(props) {
  const { list, deleteList } = props;
  return (
    <ul>
      {list.map((name, index) => {
        return (
          <li key={index}>
            {name}
            <span
              style={{
                marginLeft: "30px",
                textDecoration: "underline",
                cursor: "pointer"
              }}
              onClick={() => {
                deleteList(index);
              }}
            >
              删除
            </span>
          </li>
        );
      })}
    </ul>
  );
}