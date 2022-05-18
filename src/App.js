
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';
import HomePage from './Pages/Homepage/Homepage.js';

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