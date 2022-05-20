
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.js';
import SignIn from '../src/Pages/SignIn/SignIn.js'
import SignUp from '../src/Pages/SignUp/SignUp.js'
import HomePage from './Pages/Homepage/Homepage.js';
import UserReview from './Pages/UserReview/UserReview.js';

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/' element={<SignIn/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/review/:movieType/:movieId' element={<UserReview/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
};

export default App;