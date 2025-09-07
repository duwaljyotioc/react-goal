import {useEffect, useState} from "react";
import {Box} from "@chakra-ui/react";
import ListComponent from "@/components/ListComponent.tsx";

const UserList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/users.json');
            const data = await response.json();
            setIsLoading(false);
            setUsers(data);
        };
        fetchProjects();
    }, []);

    return (
        <Box p={4}>
            <ListComponent
                isLoading={isLoading}
                entityList={users}
                entity={'Users'}
                entityType={'users'}
                nameProp={'fullName'}
            ></ListComponent>
        </Box>
    )
}

export default UserList;
