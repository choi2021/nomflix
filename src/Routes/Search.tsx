import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { parseMutationArgs } from 'react-query/types/core/utils';
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { queryClient } from '..';
import { fetchSearchMovies, fetchSearchTV } from '../api';
import Overlay from '../components/Overlay';
import Slider from '../components/Slider';
import { ISearch } from '../interface';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 200vh;
  background-color: ${(props) => props.theme.black.darker};
`;

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  padding-top: 3em;
  margin-bottom: 1em;
  text-align: center;
  span {
    color: ${(props) => props.theme.logoColor};
  }
`;

const Sliders = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const keyword = search.get('keyword');
  const { data: movies, isLoading: movieLoading } = useQuery<ISearch>(
    ['search', 'movies', keyword],
    () => fetchSearchMovies(` ${keyword && keyword}`)
  );
  const { data: tv, isLoading: tvLoading } = useQuery<ISearch>(
    ['search', 'tv', keyword],
    () => fetchSearchTV(` ${keyword && keyword}`)
  );

  const onBoxClicked = (kind: string, contentId: number) => {
    navigate(`/search/${kind}/?keyword=${keyword}&id=${contentId}`);
  };

  const isLoading = movieLoading || tvLoading;

  const clickedContent =
    (search.get('id') &&
      movies?.results.find(
        (content) => content.id + '' === search.get('id')
      )) ||
    tv?.results.find((content) => content.id + '' === search.get('id'));

  console.log(search.get('id'));

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <Wrapper>
          <Sliders>
            <Title>
              <span>{search.get('keyword')}</span> 관련된 검색결과 입니다😃
            </Title>
            {movies && (
              <Slider
                contents={movies.results}
                infoObj={{
                  keyword: search.get('keyword') || '',
                  title: '관련된 영화',
                  type: 'movies',
                }}
                setClickedContent={onBoxClicked}
              ></Slider>
            )}
            {tv && (
              <Slider
                contents={tv.results}
                infoObj={{
                  keyword: search.get('keyword') || '',
                  title: '관련된 TV 시리즈',
                  type: 'tv',
                }}
                setClickedContent={onBoxClicked}
              ></Slider>
            )}
          </Sliders>
          <AnimatePresence>
            {search.get('id') && (
              <Overlay clickedContent={clickedContent!}></Overlay>
            )}
          </AnimatePresence>
        </Wrapper>
      )}
    </Container>
  );
}
