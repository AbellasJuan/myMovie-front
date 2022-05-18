
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.js';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/Homepage';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;