import { AnimatePresence } from 'framer-motion';
import { useMatch, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MovieMyContents, tvMyContents } from '../atoms';
import Overlay from '../components/Overlay';
import Slider from '../components/Slider';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 200vh;
  background-color: ${(props) => props.theme.black.darker};
`;

const Wrapper = styled.div`
  position: relative;
  top: 5em;
`;

const Sliders = styled.ul``;

export default function MyContents() {
  const navigate = useNavigate();

  const movies = useRecoilValue(MovieMyContents);
  const tvs = useRecoilValue(tvMyContents);
  const tvMatch = useMatch('/my_contents/tv/:id');
  const movieMatch = useMatch('/my_contents/movie/:id');
  const onBoxClicked = (kind: string, contentId: number) => {
    navigate(`/my_contents/${kind}/${contentId}`);
  };

  const clickedContent =
    (tvMatch && tvs.find((item) => item.id + '' === tvMatch.params.id!)) ||
    (movieMatch &&
      movies.find((item) => item.id + '' === movieMatch.params.id));

  console.log(movies);
  console.log(tvs);

  return (
    <Container>
      <Wrapper>
        <Sliders>
          {movies && (
            <Slider
              contents={movies}
              infoObj={{ keyword: '내가 찜한', title: '영화', type: 'movie' }}
              setClickedContent={onBoxClicked}
            ></Slider>
          )}
          {tvs && (
            <Slider
              contents={tvs}
              infoObj={{ keyword: '내가 찜한', title: 'TV 시리즈', type: 'tv' }}
              setClickedContent={onBoxClicked}
            ></Slider>
          )}
        </Sliders>
        <AnimatePresence>
          {tvMatch && <Overlay clickedContent={clickedContent!}></Overlay>}
          {movieMatch && <Overlay clickedContent={clickedContent!}></Overlay>}
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
}
