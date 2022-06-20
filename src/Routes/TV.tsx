import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import { useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchPopularShows,
  fetchTopRatedShows,
  fetchUpcomingAiringTodayShows,
} from '../api';
import Overlay from '../components/Overlay';
import Slider from '../components/Slider';
import { IContents } from '../interface';
import { makeImagePath } from '../utils';
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
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1em;
`;

const Overview = styled.p`
  font-size: 1rem;
  width: 70%;
`;

const Sliders = styled.ul``;

export default function TV() {
  const navigate = useNavigate();
  const tvMatch = useMatch('/tv/:id');

  const { data: airingToday, isLoading: airingTodayLoading } =
    useQuery<IContents>(['tv', 'AiringToday'], fetchUpcomingAiringTodayShows);

  const { data: popular, isLoading: popularLoading } = useQuery<IContents>(
    ['tv', 'popular'],
    fetchPopularShows
  );

  const { data: topRated, isLoading: topRatedLoading } = useQuery<IContents>(
    ['tv', 'topRated'],
    fetchTopRatedShows
  );

  const clickedTV =
    (tvMatch?.params.id &&
      popular?.results.find((tv) => tv.id + '' === tvMatch?.params.id)) ||
    airingToday?.results.find((tv) => tv.id + '' === tvMatch?.params.id) ||
    topRated?.results.find((tv) => tv.id + '' === tvMatch?.params.id);

  const onBoxClicked = (kind: string, movieId: number) => {
    navigate(`/${kind}/${movieId}`);
  };

  const isLoading = topRatedLoading || airingTodayLoading || popularLoading;

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner bg={makeImagePath(popular?.results[0].backdrop_path || '')}>
            <Title>{popular?.results[0].name}</Title>
            <Overview>{popular?.results[0].overview}</Overview>
          </Banner>
          <Sliders>
            <Slider
              setClickedContent={onBoxClicked}
              title={'인기 TV 시리즈'}
              contents={popular?.results!}
            ></Slider>
            <Slider
              setClickedContent={onBoxClicked}
              title={'방영중인 TV시리즈'}
              contents={airingToday?.results!}
            ></Slider>
            <Slider
              setClickedContent={onBoxClicked}
              title={'평점 높은 TV 시리즈'}
              contents={topRated?.results!}
            ></Slider>
          </Sliders>

          <AnimatePresence>
            {tvMatch && <Overlay clickedContent={clickedTV as any}></Overlay>}
          </AnimatePresence>
        </>
      )}
    </Container>
  );
}
