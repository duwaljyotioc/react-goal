import {useState, useEffect} from 'react';
import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";
import ListComponent from "@/components/ListComponent.tsx";
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
            <ListComponent
                isLoading={loading}
                entityList={entities}
                entity={'Projects'}
                nameProp={'name'}
                entityType={'projects'}
            ></ListComponent>
        </Box>
    )
}

export default ProjectList
