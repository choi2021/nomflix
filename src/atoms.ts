import { atom, selector } from 'recoil';
import { IContent } from './interface';

interface IMyContent {
  movies: IContent[];
  tv: IContent[];
}

export const myContentsAtom = atom<IMyContent>({
  key: 'selected',
  default: {
    movies: [],
    tv: [],
  },
});

export const MovieMyContents = selector({
  key: 'movie',
  get: ({ get }) => {
    const contents = get(myContentsAtom);
    return contents.movies;
  },
});
export const tvMyContents = selector({
  key: 'tv',
  get: ({ get }) => {
    const contents = get(myContentsAtom);
    return contents.tv;
  },
});
