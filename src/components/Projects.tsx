import {useState, useEffect} from 'react';
import {
    Box, VStack, Text, Table, Stack, Spinner, Alert, AlertIcon
} from '@chakra-ui/react';
import Loading from "@/components/Loading.tsx";
import ListComponent from "@/components/ListComponent.tsx";

const ProjectList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/projects.json');
            const data = await response.json();
            setIsLoading(false);
            setProjects(data);
        };
        fetchProjects();
    }, []);

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
