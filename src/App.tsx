import './App.css'
import {Box} from "@chakra-ui/react"
import AppRoutes from "@/store/route.tsx";
import Layout from "@/components/Layout.tsx";


function App() {

    return (
        <Box p={8}>
            <Layout>
                <AppRoutes/>
            </Layout>
        </Box>
    )
}

export default App
