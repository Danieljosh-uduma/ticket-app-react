import AppRouter from './router'
import { makeServer } from './server/server.js'
import "./App.css"
import { AuthProvider } from './hooks/auth.js'

makeServer()

function App() {

    return (
        <>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </>
  )
}

export default App
