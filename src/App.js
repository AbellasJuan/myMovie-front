import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext.js';
import { UserProvider } from './contexts/userContext.js';
import Header from './Pages/Main/Header/Header.js';
import HomePage from '../src/Pages/Main/HomePage/HomePage.js';
import SignIn from '../src/Pages/SignIn/SignIn.js';
import SignUp from '../src/Pages/SignUp/SignUp.js';
import UserReview from '../src/Pages/UserReview/UserReview.js';
import AllReviews from '../src/Pages/Reviews/AllReviews.js';

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