import { legacy_createStore } from "redux";
import "./App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

const reduxReducer = (state, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":{
      const newdata = state.filter((ele) => {
        if (ele.id != action.payload) {
          return ele;
        }
      });
      return newdata;
    }
    case "EDIT":{
      const newdata1 = state.map((ele) => {
        if (ele.id == action.payload) {
          ele.status = !ele.status;
        }
        return ele
      });
      return newdata1;
    }
    default:
      return state;
  }
};

export const store = legacy_createStore(reduxReducer, []);

function App() {
  const [data, setData] = useState([]);
  const [toDo, setToDo] = useState({
    title: "",
    status: false,
    id: "",
  });
  const dispatch = useDispatch();

  const mapStateToProps = () => {
    let data1 = JSON.stringify(store.getState());
    console.log(data);
    setData(JSON.parse(data1));
  };
  const dispatcher = (a) => {
    dispatch({ type: a, payload: toDo });
    mapStateToProps();
  };
  const delete1 = (a, id) => {
    dispatch({ type: a, payload: id });
    mapStateToProps();
  };

  return (
    <>
      <h1>To Do App using React-Redux</h1>
      <hr />
      <input
        type="text"
        name=""
        id=""
        placeholder="Add to do"
        style={{ fontSize: "30px" }}
        value={toDo.title}
        onChange={(e) =>
          setToDo({
            ...toDo,
            title: e.target.value,
            status: true,
            id: Math.floor(Math.random() * (1000 + 1)) + 1,
          })
        }
      />
      <button onClick={() => dispatcher("ADD")}>Add</button>
      <h3>To do List</h3>
      <hr />
      {/* {mapStateToProps()} */}
      {data.map((ele) => {
        return (
          <div key={ele.id} style={{ border: "1px solid white" }}>
            <h4>{ele.title}</h4>
            <p> {ele.status ? "completed" : "pending"}</p>
            <p> {ele.id}</p>
            <button onClick={() => delete1('DELETE',ele.id)}>Delete</button>
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => delete1("EDIT", ele.id)}
            >
              Click to change status
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
