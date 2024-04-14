import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for loading JSON data
export const loadStepPageJsonData = createAsyncThunk(
  'data/loadStepPageJsonData',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    stepPageJsonData: {},
    loading: false,
    error: null,
  },
  reducers: {
    modifyData: (state, action) => {
      const { key, value } = action.payload;
      if (key in state.stepPageJsonData) {
        state.stepPageJsonData[key] = value;
      }
    },
    addData: (state, action) => {
      const { key, value } = action.payload;
      state.stepPageJsonData[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStepPageJsonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadStepPageJsonData.fulfilled, (state, action) => {
        state.stepPageJsonData = action.payload;
        state.loading = false;
      })
      .addCase(loadStepPageJsonData.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { modifyData, addData } = dataSlice.actions;
export default dataSlice.reducer;
