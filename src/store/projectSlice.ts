// import {configureStore} from "@reduxjs/toolkit";
//
// export const projectStore = configureStore({
//     reducer: {
//         projects: proje
//     }
// })

import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const projectsAdapter = createEntityAdapter({
    selectId: (project) => project.name
})

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const reponse = await fetchProjects('/projects.json');
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState: projectsAdapter.getInitialState({loading: false, error: null}),
    reducers: {
        addProject: projectsAdapter.addOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => { state.loading = true; })
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
