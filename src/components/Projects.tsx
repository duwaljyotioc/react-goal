import {useState, useEffect} from 'react';
import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";
import ListComponent from "@/components/ListComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectAllProjects} from "@/store/projectSlice.ts";

const ProjectList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const dispatch = useDispatch();
    const { loading, error, entities } = useSelector((state) => ({
        loading: state.projects.loading,
        error: state.projects.error,
        entities: selectAllProjects(state),
    }));

    console.log(entities)

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/projects.json');
            const data = await response.json();
            setIsLoading(false);
            setProjects(data);
        };
        fetchProjects();
    }, []);

    console.log(entities)
    return (
        <Box p={4}>
            <ListComponent
                isLoading={isLoading}
                entityList={projects}
                entity={'Projects'}
                nameProp={'name'}
                entityType={'projects'}
            ></ListComponent>
        </Box>
    )
}

export default ProjectList
