import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Routes/ProtectedRoute'
import PageNotFound from './Pages/PageNotFound'
import Signup from './Pages/Signup'
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import Destination from './Pages/Destination';
import UNESCO from './Pages/UNESCO';
import News from './Pages/News';

const App = () => {
  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <Routes>
          <Route path='/signin' element={<SignIn/>} exact/>
          <Route path='/signup' element={<Signup/>} exact/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<Home/>} path='/' exact/>
            <Route element={<Destination/>} path='/destinations' exact/>
            <Route element={<UNESCO/>} path='/unesco-site' exact/>
            <Route element={<News/>} path='/news' exact/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/"/>}/>
        </Routes>
      </AuthContextProvider>
    </>
  )
}

export default App