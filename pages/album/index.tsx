import { useRouter } from 'next/router';
import WatchButton from '@/components/WatchButton';
import Loading from '../loading';
import { handleRemoveTagHtml } from '@/utils/utils';
import MovieList from '@/components/MovieList';
import useMoviesDetail from '@/hooks/useMovieDetail';

const MovieAlbumScreen = () => {
  const router = useRouter();
  const { data: movie, isLoading } = useMoviesDetail(
    Object.keys(router.query) as any as string
  );

  return isLoading ? (
    <div className="h-[100vh]">
      <Loading />
    </div>
  ) : (
    <>
      <div className="relative flex-col pt-32 px-4 md:px-16 py-6 flex items-start transition duration-500 bg-zinc-900 bg-opacity-90">
        <div
          style={{
            backgroundImage: `url(${movie?.movie.poster_url})`,
          }}
          className="absolute z-9 w-[45%] h-[80%] top-30 right-0 bg-cover bg-center shadow-[inset_-2px_-2px_15px_20px_#18181b] object-contain max-w-full max-h-full pointer-events-none"
        />

        <div className="w-[50%] z-10">
          <p className="text-white font-bold text-4xl">
            {movie ? movie.movie.name : 'Đang cập nhật'}
            <span className="text-white font-bold text-2xl pl-2">
              ({movie ? movie.movie.origin_name : ''})
            </span>
          </p>

          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Trạng thái: </span>
            {movie ? movie.movie.episode_current : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Mô tả: </span>
            {movie ? handleRemoveTagHtml(movie.movie.content) : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Đạo diễn: </span>
            {movie
              ? movie.movie.director.map((item: any, index: number) => (
                  <span key={index}>
                    {item}
                    {index !== movie.movie.actor.length - 1 ? ', ' : '. '}
                  </span>
                ))
              : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Diễn viên: </span>
            {movie
              ? movie.movie.actor.map((item: any, index: number) => (
                  <span key={index}>
                    {item}
                    {index !== movie.movie.actor.length - 1 ? ', ' : '. '}
                  </span>
                ))
              : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Năm phát hành: </span>
            {movie ? movie.movie.year : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Ngôn ngữ: </span>
            {movie ? movie.movie.lang : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Chất lượng: </span>
            {movie ? movie.movie.quality : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Thời gian: </span>
            {movie ? movie.movie.time : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Thể loại: </span>
            {movie ? movie.movie.type : 'Đang cập nhật'}
          </p>
          <p className="text-white font-normal text-lg py-2">
            <span className="text-gray-400">Quốc gia: </span>
            {movie
              ? movie.movie.country.map((item: any, index: number) => (
                  <span key={index}>
                    {item.name}
                    {index !== movie.movie.country.length - 1 && ', '}
                  </span>
                ))
              : 'Đang cập nhật'}
          </p>
        </div>
        <div className="flex mt-6">
          <WatchButton path={movie?.episodes[0].server_data[0].link_embed} text="Xem phim" />
          <WatchButton style="ml-4" path={movie?.movie.trailer_url} text="Trailer" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 mt-16" />
      <div className="w-full flex flex-wrap mt-10 gap-16 px-16 pb-10">
        {movie ? (
          <MovieList
            title="Các tập phim: "
            data={movie?.episodes[0].server_data}
            posterDetailUrl={movie?.movie.poster_url}
            style="mt-10 mb-20"
            isMovieDetail
          />
        ) : (
          <div className="h-screen">
            <Loading />
          </div>
        )}
      </div>
      {/* <InfoModal visible={isOpen} onClose={closeModal} /> */}
    </>
  );
};

export default MovieAlbumScreen;
