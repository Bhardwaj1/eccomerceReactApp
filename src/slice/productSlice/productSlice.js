// src/redux/features/productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GetData,
  DeleteData,
  PostDataMultipart,
  PutDataMultipart,
} from "../../services/index";

// Async thunk for GET with pagination & search
export const getAllProducts = createAsyncThunk(
  "product/getAll",
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
// export const createProduct = createAsyncThunk(
//   'category/create',
//   async (newCategory, { rejectWithValue }) => {
//     try {
//       const response = await PostDataMultipart(true, '/product', newCategory);
//       return response.payload;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data || error.message);
//     }
//   }
// );

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await PostDataMultipart("/products-category/", formData);
      return res.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
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
export const deleteProduct = createAsyncThunk(
  "product/delete",
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
  product: [],
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

const productSlice = createSlice({
  name: "product",
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
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // CREATE
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally add the new category to the list or refetch list
        state.isInsertSuccess = true;
        state.product.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // UPDATE
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        // Update the category in the list
        const index = state.product.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isUpdateSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message= action.payload.message || "Update failed";
      })

      // DELETE
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove deleted category from list
        state.isDeleteSuccess = true;
        state.product = state.product.filter(
          (cat) => cat.id !== action.payload
        );
        state.totalCount -= 1;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const { setSearch, setPage, setPageSize, clearState } =
  productSlice.actions;

export default productSlice.reducer;
