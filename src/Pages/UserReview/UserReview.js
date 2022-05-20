import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {BsFillStarFill} from 'react-icons/bs';
import { useParams } from "react-router-dom";

export default function UserReview(){
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { movieId, movieType } = useParams();    
    const [movieInfos, setMovieInfos] = useState([]);
   
    useEffect(() => {
        const loadMovieInfos = async () => {
            if(!auth){
                navigate('/');
            };

            let info = {};

            console.log(movieId, movieType);
            if(movieType === 'movie') {
                info = await Tmdb.getMovieInfo(movieId, 'movie');
            }else{
                info = await Tmdb.getMovieInfo(movieId, 'tv')
            }
            
            setMovieInfos(info);
        };

        loadMovieInfos();
    }, []);

    function getStars(rate){
        console.log(rate)
    };

    console.log(movieInfos)

    return (
        <div className='container'>
        
            <div className="movie-name">
               {movieInfos.name ? movieInfos.name : movieInfos.title}
            </div>
            <div className='image-and-review' >
                <div className="movie-image" style={{
                backgroundSize: 'contain',
                'backgroundRepeat': 'no-repeat',
                backgroundImage: `url(https://image.tmdb.org/t/p/w400${movieInfos.poster_path})`,
                }}/>
                
                <div className='user-review'>
                    <strong>Conte-nos sua experiência:</strong>
                    <textarea
                    placeholder="Escreva aqui!"
                    type="review"
                    name="review"
                    required
                    />
                    <div className='five-stars'>
                        <div className='star' onClick={() => getStars(1)}><BsFillStarFill/></div>
                        <div className='star'><BsFillStarFill/></div>
                        <div className='star'><BsFillStarFill/></div>
                        <div className='star'><BsFillStarFill/></div>
                        <div className='star'><BsFillStarFill/></div>
                    </div>

                    <button className='button-save'>Salvar</button>
                </div>
            </div>
        </div>
    );
};