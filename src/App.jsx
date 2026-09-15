import { RouterProvider } from "react-router"
import { router } from "./routing/router"

function App() {


  return (
    <>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </>
  )
}
export default App