import './App.css'
import {Box} from "@chakra-ui/react"
import AppRoutes from "@/store/route.tsx";


function App() {

  return (
        <Box p={8}>
            <AppRoutes />
        </Box>
  )
}

export default App
