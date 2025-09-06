import {Route, Routes} from "react-router-dom";
import UserList from "@/UserList.tsx";

const AppRoutes: React.FC = () => {

    return (
        <Routes>
            <Route path='/users' element={<UserList/>}/>
        </Routes>
    );
};

export default AppRoutes;
