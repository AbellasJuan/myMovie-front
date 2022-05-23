import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import api from '../../services/api.js';
import SingleReview from './SingleReview.js';
import useUserInfo from '../../hooks/useUserInfo';
import { useLocation } from 'react-router-dom';

export default function AllReviews(){
    const { auth } = useAuth();  
    const { user } = useUserInfo();
    const [movieInfos, setMovieInfos] = useState([]);    
    const [friendId, setFriendId] = useState([]);   
    
    const {search} = useLocation();

    useEffect(() => {
            setFriendId(search.replace('?friendId=', ''));
    }, [search]);

    useEffect(() => {
        const getReviews = async() => {  
        
        try{
            const { data } = await api.getReviewedMovies(user?.id, auth, friendId); 
            let info = {};     
            let infoReview = [];

            for(let i = 0; i < data.length; i++){
                info = await Tmdb.getMovieInfo(data[i]?.movieId, 'movie');
                const response = {...info, userReview: data[i]}
                
                infoReview.push(response)
            };

            setMovieInfos(infoReview);

        }catch (error) {
            let errorMessage = (error);
            console.log(errorMessage)
        };
        };
        getReviews()
    // eslint-disable-next-line
    },[friendId])

    return (
        movieInfos?.map((movie, index) => 
            <SingleReview key={index} movie={movie}/>
        )
    ); 
};