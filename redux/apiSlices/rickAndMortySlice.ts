import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface RootState {
  info: _Info;
  results: [
    {
      name: string;
      url: string;
      image:string,
      id:number,
      status:string
    }
  ];
}

interface _Info {
  count: number;
  next: any;
  pages: number;
  prev: string;
}
interface RickAndMorty {
  data: RootState | null;
  loading: boolean;
  error: string;
}

const initialState: RickAndMorty = {
  data: null,
  loading: false,
  error: "",
};

export const fetchMorty = createAsyncThunk("fetch", async (page:number) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return response.data;
});

const mortySlice = createSlice({
  name: "morty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMorty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMorty.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMorty.rejected, (state) => {
      (state.loading = false), (state.error = "Bir hata meydana geldi");
    });
  },
});

export default mortySlice.reducer;
