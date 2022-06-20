import { motion, useViewportScroll, Variants } from 'framer-motion';
import React, { useEffect } from 'react';
import { FaPlus, FaThumbsUp, FaTimes } from 'react-icons/fa';
import { useQuery } from 'react-query';
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import { fetchDetail } from '../api';
import { IDetail, IOverlayProps } from '../interface';
import { makeImagePath } from '../utils';

const Container = styled.div`
  width: 70vw;
  overflow: auto;
`;

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
`;

const BigContent = styled(motion.div)<{ top: number }>`
  width: 50vw;
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const BigImg = styled.div<{ bg: string }>`
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.bg});
  border-radius: 1em 1em 0 0;
  width: 100%;
  height: 25rem;
  position: relative;
`;

const BigCover = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1em;
`;

const BigBtns = styled.div`
  position: absolute;
  bottom: 2em;
  right: 0.5em;
  display: flex;
`;
const Bigbtn = styled(motion.button)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled(motion.button)`
  background-color: ${(props) => props.theme.black.lighter};
  position: absolute;
  top: 1em;
  right: 1em;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  position: absolute;
  bottom: 1em;
  left: 1em;
  font-size: 2rem;
`;

const InfoRow = styled.li`
  display: flex;
  margin-bottom: 1em;
`;

const BigInfo = styled.div`
  padding: 1em 1.5em;
  border-radius: 0 0 1em 1em;
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.lighter};
  display: flex;
`;

const TagLine = styled.div`
  position: relative;
  left: -1em;
  border-radius: 1em;
  padding: 0.5em;
  display: flex;

  div {
    margin-right: 0.5em;
    width: 1em;
    height: 100%;
    background-color: ${(props) => props.theme.logoColor};
  }
`;

const Genres = styled.span`
  font-size: 0.8rem;
`;

const Subtitle = styled.span`
  color: gray;
  font-size: 0.9rem;
`;

const Overview = styled.p`
  font-size: 0.8rem;
  line-height: 150%;
  margin-top: 1em;
  width: 100%;
`;

const InfoItem = styled.div``;

const LeftInfo = styled.div`
  ${InfoRow}:first-child {
    font-size: 0.9rem;
    margin-bottom: 1.5em;
  }
  ${InfoRow}:nth-child(2) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  flex-basis: 75%;
  margin-right: 0.5em;
`;

const RightInfo = styled.div`
  flex-basis: 25%;
  display: flex;
  flex-direction: column;
  ${InfoItem} {
    margin-bottom: 0.3em;
  }
`;

function Overlay({ clickedContent }: IOverlayProps) {
  const movieMatch = useMatch('/movies/:id');
  const tvMatch = useMatch('/tv/:id');
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const { data: Detail, isLoading } = useQuery<IDetail>('detail', () => {
    return fetchDetail(
      movieMatch?.params.id || tvMatch?.params.id || search.get('id')!,
      movieMatch ? 'movie' : 'tv'
    );
  });

  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const onOverlayClick = () => {
    movieMatch && navigate('/');
    tvMatch && navigate('/tv');
    search.get('keyword') &&
      navigate(`/search?keyword=${search.get('keyword')}`);
  };

  return (
    <Container>
      <Wrapper
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onOverlayClick}
      ></Wrapper>
      <BigContent
        layoutId={movieMatch?.params.id || tvMatch?.params.id}
        top={scrollY.get() + 100}
      >
        {clickedContent && (
          <>
            <BigCover>
              <BigImg
                bg={makeImagePath(
                  clickedContent?.backdrop_path! || clickedContent?.poster_path!
                )}
              >
                <BigTitle>
                  {clickedContent?.name! || clickedContent.title}
                </BigTitle>
                <CloseBtn whileHover={{ scale: 1.2 }} onClick={onOverlayClick}>
                  <FaTimes />
                </CloseBtn>
                {/* <BigBtns>
                  <Bigbtn>
                    <FaPlus />
                  </Bigbtn>
                  <Bigbtn>
                    <FaThumbsUp />
                  </Bigbtn>
                  <Bigbtn></Bigbtn>
                </BigBtns> */}
              </BigImg>
            </BigCover>
            <BigInfo>
              <LeftInfo>
                <InfoRow>
                  <TagLine>
                    <div></div>
                    {Detail?.tagline}
                  </TagLine>
                </InfoRow>
                <InfoRow>
                  <InfoItem>
                    원제: {Detail?.original_title || Detail?.original_name}
                  </InfoItem>
                  <InfoItem>
                    러닝타임:
                    {movieMatch && Detail?.runtime}
                    {tvMatch &&
                      Detail?.episode_run_time &&
                      Detail?.episode_run_time[0]}
                    분
                  </InfoItem>
                </InfoRow>

                <Overview>{Detail?.overview}</Overview>
              </LeftInfo>
              <RightInfo>
                <InfoItem>
                  <Genres>
                    <Subtitle>장르: </Subtitle>
                    {Detail?.genres &&
                      Detail?.genres.map((item) => item.name).join(',\n')}
                  </Genres>
                </InfoItem>
                {tvMatch && (
                  <InfoItem>
                    <Subtitle>시즌 수: </Subtitle>
                    {Detail?.seasons && Detail?.seasons.length}
                  </InfoItem>
                )}
                <InfoItem>
                  <Subtitle>평점: </Subtitle>
                  {Detail?.vote_average}
                </InfoItem>
              </RightInfo>
            </BigInfo>
          </>
        )}
      </BigContent>
    </Container>
  );
}

export default React.memo(Overlay);
