import {Route, Routes} from "react-router-dom";
import UserList from "@/UserList.tsx";
import {LandingPage} from "@/LandingPage.tsx";
import ProjectList from "@/components/Projects.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/users' element={<UserList/>}/>
            <Route path='/projects' element={<ProjectList/>}/>
        </Routes>
    );
};

export default AppRoutes;
