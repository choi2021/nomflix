import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ISliderProps } from '../interface';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { makeImagePath } from '../utils';
import { useMatch } from 'react-router-dom';

const ArrowBtn = styled.button`
  position: absolute;
  height: 100%;
  width: 4em;
  z-index: 50;
  svg {
    width: 2rem;
    height: 2rem;
  }
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity ease-in 0.3s;
  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div<{ started: boolean; search: boolean }>`
  position: relative;
  padding-left: ${(props) => (props.started ? '0em' : '3em')};
  top: ${(props) => (props.search ? '3em' : '-100px')};
  width: 100%;
  height: 20rem;
  margin-bottom: 5em;
  ${ArrowBtn}:first-child {
    left: 0;
  }
  ${ArrowBtn}:last-child {
    right: 0;
  }
`;

const Keyword = styled.span``;

const Title = styled.h2<{ started: boolean }>`
  padding-left: ${(props) => (props.started ? '2em' : '0em')};
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1em;
  ${Keyword} {
    color: ${(props) => props.theme.logoColor};
  }
`;

const Box = styled(motion.div)<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-size: cover;
  width: 13rem;
  height: 100%;
  color: ${(props) => props.theme.textColor};
  border-radius: 1em;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  ${Box}:first-child {
    transform-origin: center left;
  }
  ${Box}:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  width: 100%;
  padding: 1em;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  bottom: 0;
  border-radius: 0 0 0.5em 0.5em;
  h4 {
    text-align: center;
  }
`;

const Message = styled.span`
  font-size: 1.2rem;
`;

const RowVariant: Variants = {
  hidden: (isBack: boolean) => {
    return { x: !isBack ? window.outerWidth + 10 : -window.outerWidth - 10 };
  },
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => {
    return { x: !isBack ? -window.outerWidth - 10 : window.outerWidth + 10 };
  },
};

const BoxVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
  },
};

const InfoVariant: Variants = {
  hover: {
    opacity: 1,
  },
};

export default function Slider({
  contents,
  title,
  setClickedContent,
  searchObj,
}: ISliderProps) {
  const movieMatch = useMatch('/');
  const tvMatch = useMatch('/tv');
  const searchMatch = useMatch('/search');
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  const [direction, setDirection] = useState(false);
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(0);

  const handlePage = (direction: string) => {
    if (contents) {
      if (leaving) {
        return;
      }
      const totalcontents = contents?.length - 1;
      const maxPage = Math.floor(totalcontents / offset) - 1;
      setStarted(true);
      toggleLeaving();

      if (direction === 'left') {
        setDirection(true);
        setPage((prev) => (prev === 0 ? maxPage : prev - 1));
      }
      if (direction === 'right') {
        setDirection(false);
        setPage((prev) => (prev === maxPage ? 0 : prev + 1));
      }
    }
  };
  const toggleLeaving = () =>
    setLeaving((prev) => {
      return !prev;
    });

  return (
    <Container started={started} search={Boolean(searchObj)}>
      <Title started={started}>
        {searchObj && (
          <>
            <Keyword>{searchObj?.keyword} </Keyword>
            <span>{searchObj?.title}</span>
          </>
        )}
        <span>{title}</span>
      </Title>
      {contents.length === 0 ? (
        <Message>관련 항목을 찾을 수 없습니다.😅</Message>
      ) : (
        <>
          {started && (
            <ArrowBtn onClick={() => handlePage('left')}>
              <FaAngleLeft></FaAngleLeft>
            </ArrowBtn>
          )}
          <AnimatePresence
            custom={direction}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              custom={direction}
              variants={RowVariant}
              initial='hidden'
              animate='visible'
              transition={{ type: 'tween', duration: 1 }}
              exit='exit'
              key={page}
            >
              {contents
                .slice(1)
                .slice(page * offset, page * offset + offset)
                .map((content) => (
                  <Box
                    onClick={() => {
                      if (tvMatch) {
                        setClickedContent('tv', content.id);
                      } else if (movieMatch) {
                        setClickedContent('movies', content.id);
                      } else if (searchObj) {
                        setClickedContent(searchObj.type, content.id);
                      }
                    }}
                    variants={BoxVariants}
                    key={content.id}
                    initial='normal'
                    whileHover='hover'
                    layoutId={content.id + ''}
                    transition={{
                      delay: 0.3,
                      type: 'tween',
                      ease: 'easeOut',
                    }}
                    bg={makeImagePath(content.poster_path, 'w500')}
                  >
                    <Info
                      variants={InfoVariant}
                      transition={{
                        delay: 0.3,
                        type: 'tween',
                        ease: 'easeOut',
                      }}
                    >
                      <h4>{content.title || content.name}</h4>
                    </Info>
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
          <ArrowBtn onClick={() => handlePage('right')}>
            <FaAngleRight></FaAngleRight>
          </ArrowBtn>
        </>
      )}
    </Container>
  );
}
