import AppRouter from './router'
import { makeServer } from './server/server'
import "./App.css"

makeServer()

function App() {

    return (
        <>
            <AppRouter />
        </>
  )
}

export default App
