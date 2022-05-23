import {ImStarFull} from 'react-icons/im';

export default function SingleReview({movie}){

    return (
            <div className='container'>            
                <div className="movie-name">
                {movie.name ? movie?.name : movie?.title}
                </div>
                <div className='image-and-review' >
                    <div className="movie-image" style={{
                    backgroundSize: 'contain',
                    'backgroundRepeat': 'no-repeat',
                    backgroundImage: `url(https://image.tmdb.org/t/p/w400${movie?.poster_path})`,
                    }}/>
                    
                    
                    <div className='user-review'>
                        <p>{movie?.userReview.comment}</p>
                        <div className='five-stars'>
                            {
                                Array.from({length: movie?.userReview.grade}).map(() => 
                                    <div className='star'><ImStarFull/></div>) 
                            }
                        </div>
                    </div>
                </div>
            </div>
    ); 
};