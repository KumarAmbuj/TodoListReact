import { useState } from "react";

import "./App.css";
import { FaTrash, FaCheck, FaPen } from "react-icons/fa";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let todoList = [];
if (localStorage.getItem("todoList") == null) {
  localStorage.setItem("todoList", JSON.stringify([]));
} else {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
function App() {
  const [val, setVal] = useState("");
  const [data, setData] = useState([...todoList]);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(data));
  }, [data]);
  function addHandler() {
    if (val.length > 0) {
      let obj = {
        id: `${new Date().getTime().toString()}`,
        value: val,
        mark: false,
      };
      let x=[...data];
      x.unshift(obj);
      setData(x)
      //setData([...data, obj]);
      toast.info(`task ${val} added !!`);
      setVal("");
    }
  }

  function handleDelte(id, value) {
    let x = data.filter((val, ind) => val.id != id);
    toast.error(`task ${value} deleted !!`);
    setData(x);
    //localStorage.setItem("todoList", JSON.stringify(data));
  }
  function markHandler(id, value, mark) {
    if (mark === false) {
      toast.success(`task ${value} completed !!`);
    } else {
      toast.warning(`task ${value} incomplete !!`);
    }
    let x = data.map((val) => {
      if (val.id !== id) {
        return val;
      } else {
        val = { ...val, mark: !val.mark };
        return val;
      }
    });
    setData(x);
    //localStorage.setItem("todoList", JSON.stringify(data));
  }
  return (
    <>
      <ToastContainer theme="colored" />
      <div className="headerParent">
        <h1 className="header">To Do List</h1>
      </div>
      <div className="inputBox">
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <div className="addBtn">
          <button onClick={addHandler}>Add</button>
        </div>
      </div>
      <div className="todoItems">
        {data.length > 0 &&
          data.map((val, index) => (
            <div className="item" key={val.id} id={val.id}>
              <div className={val.mark === true ? "lineThrough" : ""}>
                {val.value}
              </div>
              <div className="btns">
                <FaCheck
                  className="fa"
                  onClick={() => markHandler(val.id, val.value, val.mark)}
                />

                <FaTrash
                  className="fa"
                  onClick={() => {
                    handleDelte(val.id, val.value);
                  }}
                />
              </div>
            </div>
          ))}
        {/*
        <div className="item">
          <div>Heyyyy</div>
          <div className="btns">
            <FaCheck className="fa" />

            <FaTrash className="fa" />
          </div>
        </div>
        */}
      </div>
    </>
  );
}

export default App;
