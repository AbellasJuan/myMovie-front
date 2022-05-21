import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {BsFillStarFill} from 'react-icons/bs';
import { useParams } from "react-router-dom";
import api from '../../services/api.js';

export default function UserReview(){
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { movieId, movieType } = useParams();    
    const [movieInfos, setMovieInfos] = useState([]);
    const [rated, setRated] = useState(0)
    const [description , setDescription] = useState('');
      

    async function sendReview(){
        const data = 
        {
            userId: 5,
            movieId: movieId ,
            comment: description ,
            grade: rated
        };
        
        try{
            return await api.postReview(data, auth);
        }catch (error) {
            let errorMessage = (error);
            console.log(errorMessage)
        };
    };

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
        setRated(rate)
    };

    console.log(description, rated)

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
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                    <div className='five-stars'>
                        <div className='star' onClick={() => getStars(1)}><BsFillStarFill/></div>
                        <div className='star' onClick={() => getStars(2)}><BsFillStarFill/></div>
                        <div className='star' onClick={() => getStars(3)}><BsFillStarFill/></div>
                        <div className='star' onClick={() => getStars(4)}><BsFillStarFill/></div>
                        <div className='star' onClick={() => getStars(5)}><BsFillStarFill/></div>
                    </div>

                    <button className='button-save' onClick={() => sendReview()}>Salvar</button>
                </div>
            </div>
        </div>
    );
};