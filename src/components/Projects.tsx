import {useState, useEffect} from 'react';
import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";
import ListComponent from "@/components/ListComponent.tsx";
import AddProjectForm from "@/components/AddProjectForm.tsx";
import TimerComponent from "@/components/TimerComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {addProject, fetchProjects, selectAllProjects} from "@/store/projectSlice.ts";

const ProjectList = () => {
    const dispatchInstance = useDispatch();
    const { loading, error, entities } = useSelector((state) => ({
        loading: state.projects.loading,
        error: state.projects.error,
        entities: selectAllProjects(state),
    }));

    useEffect(() => {
        console.log('calls thunk here')
        // call the async thunk here
        dispatchInstance(fetchProjects())
            .unwrap()
            .then(() => {
                // dispatch(addProject({
                //     id: 'temp-1',
                //     name: 'Hero Project',
                //     description: '...',
                //     assigneeName: 'Alice',
                //     ownerName: 'Bob'
                // }));
            })
            .catch(console.error);
    }, [dispatchInstance]);

    return (
        <Box p={4}>
            <VStack spacing={6} align="stretch">
                {/*<TimerComponent />*/}
                {/*<AddProjectForm onAddProject={handleAddProject} />*/}
                <ListComponent
                    isLoading={loading}
                    entityList={entities}
                    entity={'Projects'}
                    nameProp={'name'}
                    entityType={'projects'}
                    addEntityRoute={'add/'}
                />
            </VStack>
        </Box>
    )
}

export default ProjectList
