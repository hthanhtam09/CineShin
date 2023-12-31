import React from 'react';

import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';
import { MovieDetailInterface } from '@/types';

interface MovieListProps {
  data: MovieDetailInterface[];
  title?: string;
  style?: string;
  isMovieDetail?: boolean;
  posterDetailUrl?: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, style, isMovieDetail, posterDetailUrl }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className={style}>
        {title ? <p className="text-white text-2xl font-bold">{title}</p> : null}
        <div className='grid grid-cols-6 gap-9'>
          {data.map((movie: any, index: number) => (
            <MovieCard key={index} data={movie} isMovieDetail={isMovieDetail} posterDetailUrl={posterDetailUrl}/>
          ))}
        </div>
    </div>
  );
};

export default MovieList;
