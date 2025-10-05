import {Route, Routes} from "react-router-dom";
import UserList from "@/UserList.tsx";
import {LandingPage} from "@/LandingPage.tsx";
import ProjectList from "@/components/Projects.tsx";
import UseRefExamples from "@/components/UseRefExamples.tsx";
import AddProjectForm from "@/components/AddProjectForm.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/users' element={<UserList/>}/>
            <Route path='/projects' element={<ProjectList/>}/>
            <Route path='/projects/add' element={<AddProjectForm/>}/>
            <Route path='/useref-examples' element={<UseRefExamples/>}/>
        </Routes>
    );
};

export default AppRoutes;
