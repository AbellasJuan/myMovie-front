import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import {BsFillStarFill} from 'react-icons/bs';
import api from '../../services/api.js';
import SingleReview from './SingleReview.js';

export default function AllReviews(){
    const navigate = useNavigate();
    const { auth } = useAuth();  
    const [movieInfos, setMovieInfos] = useState([]);    

    useEffect(() => {
        const getReviews = async() => {  
        try{
            const { data } = await api.getReviewedMovies("5", auth); 
            let info = {};     
            let infoReview = [];

            for(let i = 0; i < data.length; i++){
                info = await Tmdb.getMovieInfo(data[i].movieId, 'movie');
                const teste = {...info, userReview: data[i]}
                
                infoReview.push(teste)
            };

            setMovieInfos(infoReview);

        }catch (error) {
            let errorMessage = (error);
            console.log(errorMessage)
        };
        };
        getReviews()
    },[])

    return (
        movieInfos.map((movie) => 
            <SingleReview movie={movie}/>
        )
    ); 
};