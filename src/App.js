
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import { AuthProvider } from './contexts/authContext.js';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;