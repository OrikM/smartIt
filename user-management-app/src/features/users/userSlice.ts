import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  users: [],
  filteredUsers: [],
  loading: false,
  error: null,
  filters: {
    name: '',
    username: '',
    email: '',
    phone: ''
  }
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ field: string, value: string }>) => {
      state.filters[action.payload.field as keyof UserState['filters']] = action.payload.value;
      state.filteredUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(state.filters.name.toLowerCase()) &&
        user.username.toLowerCase().includes(state.filters.username.toLowerCase()) &&
        user.email.toLowerCase().includes(state.filters.email.toLowerCase()) &&
        user.phone.includes(state.filters.phone)
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
