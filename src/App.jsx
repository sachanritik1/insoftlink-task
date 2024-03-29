import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store/dataSlice";

const App = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
    dispatch(setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex gap-16">
        <div>
          <label>Completed: </label>
          <select name="cars" id="cars">
            <option value="volvo">Select</option>
            <option value="volvo">Yes</option>
            <option value="audi">No</option>
          </select>
        </div>

        <div>
          <input
            className="bg-slate-500 px-4 py-1 text-white rounded-md"
            type="text"
            placeholder="search title"
          />
        </div>
      </div>
      <table>
        <tr>
          <th>User Id</th>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>

        {data.map((item) => (
          <tr>
            <td>{item?.userId}</td>
            <td>{item?.id}</td>
            <td>{item?.title}</td>
            <td>{item?.completed ? "Yes" : "No"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default App;
