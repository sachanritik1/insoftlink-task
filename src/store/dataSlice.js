import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    setData: (state, action) => (state = action.payload),
    editData: (state, action) => {
      const { id } = action.payload;
      console.log(action.payload);
      const index = state.findIndex((item) => item.id === id);
      console.log(index);
      state[index] = { ...action.payload };
    },
    deleteData: (state, action) => {
      const id = action.payload;
      console.log(id);
      return (state = state.filter((item) => item.id !== id));
    },
  },
});

export const { setData, editData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
