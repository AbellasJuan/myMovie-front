import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import MovieRow from '../Homepage/MovieRow.js';
import '../../styles/app.css';
import FeaturedMovie from '../Homepage/FeaturedMovie.js';
import Header from '../Homepage/Header.js';
import styled from 'styled-components';
import loading from '../../assets/cinemeloading.gif';
import { useNavigate } from 'react-router-dom';


export default function App() { 
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      if(!auth){
        navigate('/');
      };
    
      const list = await Tmdb.getHomeList();
      setMovieList(list);
    
      let originals = list.filter(item => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'movie');
      
      setFeaturedData(chosenInfo);
    }
    setTimeout(() => {
      loadAll();
    },1000);
  }, [auth, navigate]);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
    window.removeEventListener('scroll', scrollListener);
    }
  }, [blackHeader]);

    return (
      <div className="page">

        <Header black={blackHeader}/>
        {featuredData && <FeaturedMovie item={featuredData}/>}

        <section className="lists" >
          {movieList.map((item, key) => ( 
            item.slug !== 'originals' &&
            <MovieRow key={key} title={item.title} items={item.items}/>
          ))}
        </section>
        <Footer>
            Dados pegos do site Themoviedb.org
        </Footer>

        {
        movieList.length <= 0 &&    
            <div className="loading">
              <img src={loading} alt="Carregando" />
            </div>
        }
      </div>
    );
};

const Footer = styled.div`  
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  padding-bottom: 40px;
  overflow: hidden;
`