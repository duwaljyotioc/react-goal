// Define the user interface
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    email: string;
}

// Define the state type
interface UserState {
    users: User[];
    selectedUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<User>) => {
            state.selectedUser = action.payload;
        },
    },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
