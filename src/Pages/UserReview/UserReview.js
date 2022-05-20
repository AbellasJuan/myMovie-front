import React, { useEffect , useState} from 'react';
import useAuth from '../../hooks/useAuth.js';
import Tmdb from '../Homepage/Tmdb.js';
import './index.css';
import { useNavigate } from 'react-router-dom';

export default function UserReview(){
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [movieInfos, setMovieInfos] = useState([]);

    useEffect(() => {
        const loadMovieInfos = async () => {
            if(!auth){
                navigate('/');
            };

            const movieId = '1571'
            const info = await Tmdb.getMovieInfo(movieId, 'tv');
            
            setMovieInfos(info);
        }

        loadMovieInfos();
    }, []);

    console.log(movieInfos)

    return (
        <div className='container'>
        
            <div className="movie-name">
               {movieInfos.name}
            </div>
            <div className='image-and-review' >
                <div className="movie-image" style={{
                backgroundSize: 'contain',
                'backgroundRepeat': 'no-repeat',
                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movieInfos.poster_path})`,
                }}/>
                
                <div className='yourReview-and-input'>
                    <strong>SEU REVIEW:</strong>
                    <textarea
                    placeholder="review"
                    type="review"
                    name="review"
                    required
                    />
                </div>
            </div>
            <div>5 star icons</div>

            <button>SALVAR</button>

        </div>
    )
}