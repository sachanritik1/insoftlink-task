import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, editData, deleteData } from "./store/dataSlice";

const App = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [filter, setFilter] = useState("select");

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    console.log(data);
    dispatch(setData(data));
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const newFilteredData = data.filter((item) => {
      const first = item.title.toLowerCase().includes(value.toLowerCase());
      const second =
        filter === "select"
          ? true
          : JSON.parse(item?.completed) === JSON.parse(filter);
      return first && second;
    });
    setFilteredData(newFilteredData);
  };

  const clearSearch = () => {
    setFilteredData(data);
    setSearch("");
    setFilter("select");
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value === "select") {
      setFilter(value);
      return setFilteredData(data);
    }
    setFilter(value);
    const newFilteredData = data.filter(
      (item) =>
        item.completed === JSON.parse(value) && item.title.includes(search)
    );
    setFilteredData(newFilteredData);
  };

  const handleEdit = (item) => {
    if (editItem?.id !== item.id) return;
    dispatch(editData(editItem));
    setEditItem(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: JSON.parse(value) });
  };

  const handleDelete = (id) => {
    const val = confirm("Are you sure you want to delete?");
    if (val === false) return;
    dispatch(deleteData(id));
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-16">
        <div>
          <label>Completed: </label>
          <select
            name="cars"
            id="cars"
            value={filter}
            onChange={(e) => handleFilter(e)}
          >
            <option value="select">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        <div className="space-x-4">
          <input
            className="bg-slate-500 px-4 py-1 text-white rounded-md"
            value={search}
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="search title"
          />
          <button
            className="bg-blue-500 px-4 py-1 text-white rounded-md"
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
      </div>
      <table>
        <thead>
          <th>User Id</th>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Action</th>
        </thead>

        {filteredData.map((item) => (
          <tbody key={item?.id}>
            {editItem?.id !== item?.id ? (
              <>
                <td>{item?.userId}</td>
                <td>{item?.id}</td>
                <td>{item?.title}</td>
                <td>{item?.completed ? "Yes" : "No"}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setEditItem(item)}
                    className="bg-blue-500 px-4 py-1 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 px-4 py-1 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{item?.userId}</td>
                <td>{item?.id}</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={editItem.title}
                    onChange={(e) => handleEditChange(e)}
                  />
                </td>
                <td>
                  <label>Yes</label>
                  <input
                    name="completed"
                    type="radio"
                    value={true}
                    onChange={(e) => handleEditChange(e)}
                    checked={JSON.parse(editItem.completed)}
                  />
                  <label>No</label>
                  <input
                    name="completed"
                    type="radio"
                    value={false}
                    onChange={(e) => handleEditChange(e)}
                    checked={!JSON.parse(editItem.completed)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 px-4 py-1 text-white rounded-md"
                  >
                    Submit
                  </button>
                </td>
              </>
            )}
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default App;
