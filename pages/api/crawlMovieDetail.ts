// pages/api/setup.js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cron from 'node-cron';
import mongoClient from '@/lib/db';

const MAX_MOVIES_PER_CYCLE = 24;
let processedMovieCount = 0;

async function crawlMovieDetail(movie: any) {
  try {
    const response = await axios.get(`https://ophim1.com/phim/${movie.slug}`);
    const movieData = response.data;
    const movieDetailCollection = (await mongoClient).collection('moviedetails');
    await movieDetailCollection.insertOne(movieData);
    console.log('Save: ', movie._id);
    processedMovieCount++;
  } catch (error: any) {
    console.error(`Error crawling details for movie ID: ${movie._id}`, error.message);
  }
}

async function crawlAndStoreData() {
  try {
    const moviesCollection = (await mongoClient).collection('movies');
    const movies = await moviesCollection.find({}).toArray();
    if (movies.length && processedMovieCount < movies.length) {
      for (
        let i = 0;
        i < Math.min(MAX_MOVIES_PER_CYCLE, movies.length - processedMovieCount);
        i++
      ) {
        await crawlMovieDetail(movies[processedMovieCount + i]);
      }
    } else {
      console.log('Finished crawling all movies. Stopping cron job.');
      cronJob.stop();
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

const cronJob = cron.schedule(
  '*/2 * * * * *',
  () => {
    crawlAndStoreData();
  },
  {
    scheduled: false,
  },
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    cronJob.start();
    return res.status(200).send({ message: 'Cron job is working!!!' });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
