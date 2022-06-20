import { AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '../api';
import { IContents } from '../interface';
import { makeImagePath } from '../utils';

import Slider from '../components/Slider';
import Overlay from '../components/Overlay';

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.black.darker};
  overflow: hidden;
  position: relative;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bg: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bg});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 3rem;
  position: relative;
`;

const BannerInfo = styled.div`
  position: absolute;
  bottom: 10rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1em;
`;

const Overview = styled.p`
  font-size: 0.9rem;
  line-height: 150%;
  width: 50%;
`;

const Sliders = styled.ul``;

export default function Home() {
  const navigate = useNavigate();
  const movieMatch = useMatch('/movie/:id');

  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IContents>(['movies', 'nowPlaying'], fetchNowPlayingMovies);

  const { data: topRated, isLoading: topRatedLoading } = useQuery<IContents>(
    ['movies', 'TopRated'],
    fetchTopRatedMovies
  );

  const { data: upcoming, isLoading: upcomingLoading } = useQuery<IContents>(
    ['movies', 'upcoming'],
    fetchUpcomingMovies
  );

  const clickedMovie =
    (movieMatch?.params.id &&
      nowPlaying?.results.find(
        (movie) => movie.id + '' === movieMatch.params.id
      )) ||
    topRated?.results.find(
      (movie) => movie.id + '' === movieMatch?.params.id
    ) ||
    upcoming?.results.find((movie) => movie.id + '' === movieMatch?.params.id);

  const onBoxClicked = (kind: string, movieId: number) => {
    navigate(`/${kind}/${movieId}`);
  };

  const isLoading = nowPlayingLoading || topRatedLoading || upcomingLoading;

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bg={makeImagePath(nowPlaying?.results[0].backdrop_path || '')}
          >
            <BannerInfo>
              <Title>{nowPlaying?.results[0].title}</Title>
              <Overview>{nowPlaying?.results[0].overview}</Overview>
            </BannerInfo>
          </Banner>
          <Sliders>
            <Slider
              setClickedContent={onBoxClicked}
              title={'현재 상영작'}
              contents={nowPlaying?.results!}
            ></Slider>
            <Slider
              setClickedContent={onBoxClicked}
              title={'평점 높은 영화'}
              contents={topRated?.results!}
            ></Slider>
            <Slider
              setClickedContent={onBoxClicked}
              title={'상영 예정영화'}
              contents={upcoming?.results!}
            ></Slider>
          </Sliders>

          <AnimatePresence>
            {movieMatch && <Overlay clickedContent={clickedMovie!}></Overlay>}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
}
