// src/redux/features/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetData,
  DeleteData,
  PostDataMultipart,
  PutDataMultipart,
} from "../../services/index";

// Async thunk for GET with pagination & search
export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async ({ page = 1, pageSize = 10, search = "" }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({ page, pageSize, search }).toString();
      const response = await GetData(`/products-category/?${query}`);
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
      const res = await PostDataMultipart("/products-category/", formData);
      return res.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ _id, data }, { rejectWithValue }) => {
    try {
      const response = await PutDataMultipart(`/products-category/${_id}`, data);
      if (response.status === 200) {
        return response.payload;
      } else {
        return rejectWithValue({
          message: response.message || "Update failed",
          status: response.status,
          errors: response.errors || [],
        });
      }
    } catch (error) {
      const responseData = error?.response?.data || {};
      return rejectWithValue({
        message: responseData.message || error.message || "Something went wrong",
        status: error?.response?.status || 500,
        errors: responseData.errors || [],
      });
    }
  }
);


// Async thunk for DELETE
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await DeleteData(true, `/products-category/${id}`);
      return res.payload;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isInsertSuccess: false,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
  message:"",
  isError: null,
  search: "",
  pagination: {},
};

const categorySlice = createSlice({
  name: "category",
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
    clearState(state) {
      state.isError = false;
      state.isInsertSuccess = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isDeleteSuccess = false;
      state.isUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // CREATE
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally add the new category to the list or refetch list
        state.isInsertSuccess = true;
        state.categories.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // UPDATE
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        // Update the category in the list
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isUpdateSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message= action.payload.message || "Update failed";
      })

      // DELETE
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted category from list
        state.isDeleteSuccess = true;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
        state.totalCount -= 1;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { setSearch, setPage, setPageSize, clearState } =
  categorySlice.actions;

export default categorySlice.reducer;
