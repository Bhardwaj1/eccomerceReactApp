import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetData, PostData, PutData, DeleteData } from '../../services/api';

export const getAllCategory = createAsyncThunk(
  'category/getAll',
  async (_, thunkAPI) => {
    try {
      return await GetData('/categories');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/create',
  async (newCategory, thunkAPI) => {
    try {
      return await PostData('/categories', newCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await PutData(`/categories/${id}`, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      await DeleteData(`/categories/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
