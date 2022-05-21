
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.js';
import SignIn from '../src/Pages/SignIn/SignIn.js'
import SignUp from '../src/Pages/SignUp/SignUp.js'
import HomePage from './Pages/Homepage/Homepage.js';
import UserReview from './Pages/UserReview/UserReview.js';
import Header from './Pages/Homepage/Header.js';
import { UserProvider } from './contexts/userContext.js';
import AllReviews from './Pages/AllReviews/AllReviews.js';

function App(){
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/sign-up' element={<SignUp/>}/>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/review/:movieType/:movieId' element={<UserReview/>}/>
            <Route path='/reviews/:id' element={<AllReviews/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  )
};

export default App;