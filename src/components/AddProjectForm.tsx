import { useRef, useState } from 'react';
import { Box, Button, Input, VStack, Text, useToast } from '@chakra-ui/react';
import {addProject} from "@/store/projectSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const AddProjectForm = ({ onAddProject }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assigneeName: '',
        ownerName: ''
    });
    const dispatchInstance = useDispatch();
    const navigateInstance = useNavigate();

    // useRef for direct DOM access - doesn't cause re-renders
    const nameInputRef = useRef(null);
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            // Focus the name input if validation fails
            nameInputRef.current?.focus();
            toast({
                title: 'Error',
                description: 'Project name is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        handleAddProject(formData);
        setFormData({ name: '', description: '', assigneeName: '', ownerName: '' });
        // Focus back to name input after successful submission
        nameInputRef.current?.focus();
    };

    const handleAddProject = async (projectData) => {
        const result = await dispatchInstance(addProject({
            id: `temp-${Date.now()}`,
            ...projectData
        }))

        console.log('Project added successfully:', result);
        navigateInstance('/projects'); // Only runs on success
    };

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Add New Project</Text>
            <form onSubmit={handleSubmit}>
                <VStack spacing={3}>
                    <Input
                        ref={nameInputRef}
                        placeholder="Project Name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        isRequired
                    />
                    <Input
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange('description')}
                    />
                    <Input
                        placeholder="Assignee Name"
                        value={formData.assigneeName}
                        onChange={handleInputChange('assigneeName')}
                    />
                    <Input
                        placeholder="Owner Name"
                        value={formData.ownerName}
                        onChange={handleInputChange('ownerName')}
                    />
                    <Button type="submit" colorScheme="blue" width="full">
                        Add Project
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default AddProjectForm;
