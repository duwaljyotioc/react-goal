// import {configureStore} from "@reduxjs/toolkit";
//
// export const projectStore = configureStore({
//     reducer: {
//         projects: proje
//     }
// })

import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const projectsAdapter = createEntityAdapter({
    // this is the way to format the data.
    selectId: (project) => project.id
})

// by creating an asyncThunk, we are creating an asychronous actions to handle
// fetchProject/pending
// fetchProjects/fulfilled
// fetchProjects/rejected

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/projects.json'); // <-- NOT fetchProjects()
            if (!res.ok) throw new Error('Failed to fetch projects');
            const data = await res.json();

            // Ensure each project has an id (adjust if your JSON already has ids)
            return data.map((p: any) => ({ id: p.id ?? p.name, ...p }));
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({loading: false, error: null}),
    reducers: {
        addProject: projectsAdapter.addOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                projectsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addProject } = projectsSlice.actions;
export const { selectAll: selectAllProjects } = projectsAdapter.getSelectors((state) => state.projects);
export default projectsSlice.reducer;
