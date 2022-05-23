import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import {BsFillStarFill} from 'react-icons/bs';
import { useParams , useNavigate} from "react-router-dom";
import api from '../../services/api.js';
import useUserInfo from '../../hooks/useUserInfo';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function UserReview(){
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user } = useUserInfo();
    const { movieId, movieType } = useParams();    
    const [movieInfos, setMovieInfos] = useState([]);
    const [description , setDescription] = useState('');
    const [value, setValue] = useState(0);

    async function sendReview(){
        const data = 
        {
            userId: user?.id,
            movieId: movieId ,
            comment: description ,
            grade: value
        };
        
        try{
            await api.postReview(data, auth);
            navigate(`/reviews/${user?.id}`);
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

    console.log(description, value)

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
                            <Box  >
                                <Rating
                                    sx={{
                                        textAlign: 'center',
                                        background: '#9999',
                                        borderRadius: '5px',
                                        fontSize: "40px",
                                    }}
                                    className='star'
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                />
                            </Box>   
                    </div>

                    <button className='button-save' onClick={() => sendReview()}>Salvar</button>
                </div>
            </div>
        </div>
    );
};