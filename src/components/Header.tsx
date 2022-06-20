import {
  AnimatePresence,
  motion,
  useAnimation,
  useViewportScroll,
  Variants,
} from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IForm } from '../interface';

const Nav = styled(motion.nav)`
  z-index: 1;
  position: fixed;
  height: 5rem;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin: 0 2rem;
  width: 5rem;
  height: 5rem;
  path {
    stroke-width: 10;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 1.5rem;
  position: relative;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.div)`
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.logoColor};
`;

const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1em;
`;

const Input = styled(motion.input)`
  color: ${(props) => props.theme.textColor};
  left: -10rem;
  position: absolute;
  transform-origin: right center;
  border: 2px solid ${(props) => props.theme.white.lighter};
  background-color: transparent;
  padding: 0.2em 0.5em;
`;

const SVG = styled(motion.svg)`
  cursor: pointer;
`;

const pathVariant: Variants = {
  hidden: {
    pathLength: 0,
    fill: 'rgba(216, 31, 38, 0)',
  },
  visible: {
    pathLength: 1,
    fill: '#8ca799',
  },
  hover: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariant: Variants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};
export default function Header() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const homeMatch = useMatch('/');
  const TVMatch = useMatch('/tv');
  const myMatch = useMatch('/my_contents');
  const [headerPos, setHeaderPos] = useState('top');
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useViewportScroll();
  const navigate = useNavigate();
  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
    setValue('keyword', '');
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        setHeaderPos('scroll');
      } else {
        setHeaderPos('top');
      }
    });
  }, [scrollY]);

  console.log(myMatch);

  return (
    <Nav variants={navVariant} animate={headerPos}>
      <Column>
        <Logo xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 276.742'>
          <motion.path
            variants={pathVariant}
            initial='hidden'
            animate='visible'
            whileHover='hover'
            transition={{
              fill: { duration: 1.7, ease: [1, 0, 0.8, 1] },
            }}
            d='M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z'
          />
        </Logo>
        <Items>
          <Item>
            <Link to='/'>
              <span>HOME</span>
            </Link>
            {homeMatch && <Circle layoutId='circle' />}
          </Item>
          <Item>
            <Link to='/tv'>
              <span>TV SHOW</span>
            </Link>

            {TVMatch && <Circle layoutId='circle' />}
          </Item>
          <Item>
            <Link to='/my_contents'>
              <span>My Contents</span>
            </Link>
            {myMatch && <Circle layoutId='circle' />}
          </Item>
        </Items>
      </Column>
      <Column>
        <Search onSubmit={handleSubmit(onValid)}>
          <SVG
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: 'tween' }}
            stroke='#8ca799'
            fill='#8ca799'
            strokeWidth='0'
            viewBox='0 0 512 512'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
          </SVG>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            placeholder='내가 원하는 영화, 드라마'
            initial={{ scaleX: 0 }}
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ duration: 0.3, type: 'tween' }}
          ></Input>
        </Search>
      </Column>
    </Nav>
  );
}
