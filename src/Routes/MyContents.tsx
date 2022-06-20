import { AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Overlay from '../components/Overlay';
import Slider from '../components/Slider';

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

export default function MyContents() {
  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const keyword = search.get('keyword');

  const onBoxClicked = (kind: string, contentId: number) => {
    navigate(`/my_contents/${kind}/?keyword=${keyword}&id=${contentId}`);
  };

  // const clickedContent =
  //   (search.get('id') &&

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
                searchObj={{
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
                searchObj={{
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
