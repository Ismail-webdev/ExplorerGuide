import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'; // Import Suspense and lazy
import { AuthContextProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Routes/ProtectedRoute'
import PageNotFound from './Pages/PageNotFound'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Home = lazy(() => import('./Pages/Home'));
const Signup = lazy(() => import('./Pages/Signup'));
const Destination = lazy(() => import('./Pages/Destination'));
const UNESCO = lazy(() => import('./Pages/UNESCO'));
const News = lazy(() => import('./Pages/News'));
const SignIn = lazy(() => import('./Pages/SignIn'));

const App = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <Toaster />
      <AuthContextProvider>
        <Suspense fallback={<div>Loading...</div>}> {/* Add Suspense with fallback */}
          <Routes>
            <Route index path='/signin' element={<SignIn/>} exact/>
            <Route path='/signup' element={<Signup/>} exact/>
            <Route element={<ProtectedRoute/>}>
              <Route element={<Home/>} path='/' exact/>
              <Route element={<Destination/>} path='/destinations' exact/>
              <Route element={<UNESCO/>} path='/unesco-site' exact/>
              <Route element={<News/>} path='/news' exact/>
              <Route path='*' element={<PageNotFound/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </Suspense>
      </AuthContextProvider>
    </>
  )
}

export default App
