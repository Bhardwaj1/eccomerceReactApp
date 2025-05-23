// src/redux/features/categorySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetData, PutData, DeleteData, PostDataMultipart } from '../services/index';

// Async thunk for GET with pagination & search
export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async ({ page = 1, pageSize = 10, search = '' }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({ page, pageSize, search }).toString();
      const response = await GetData(true, `/categories?${query}`);
      // Expecting response.payload = { data: [], totalCount: number }
      return response.payload;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Async thunk for CREATE
// export const createCategory = createAsyncThunk(
//   'category/create',
//   async (newCategory, { rejectWithValue }) => {
//     try {
//       const response = await PostDataMultipart(true, '/categories', newCategory);
//       return response.payload;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("triggered");
      // formData must be a FormData instance here, not JSON
      const res = await PostDataMultipart("/products/category/", formData);
      console.log("triggered again ");
      return res.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for UPDATE
export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await PutData(true, `/categories/${id}`, updatedData);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Async thunk for DELETE
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue }) => {
    try {
      await DeleteData(true, `/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  totalCount: 0,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  search: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1; // reset page on search change
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
      state.page = 1; // reset page on page size change
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally add the new category to the list or refetch list
        state.categories.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Update the category in the list
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Remove deleted category from list
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearch, setPage, setPageSize, clearError } = categorySlice.actions;

export default categorySlice.reducer;
