export interface IContent {
  poster_path: string;
  adult?: boolean;
  overview: string;
  release_date?: string;
  genre_ids: number[];
  id: number;
  original_title?: string;
  original_language: string;
  title?: string;
  name?: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video?: boolean;
  vote_average: number;
}

export interface IContents {
  page: number;
  results: IContent[];
  dates?: {
    maximum: string;
    minimum: string;
  };

  total_pages: number;
  total_results: number;
}

export interface IForm {
  keyword: string;
}

export interface ISliderProps {
  contents: IContent[];
  title?: string;
  searchObj?: {
    keyword: string;
    title: string;
    type: string;
  };
  setClickedContent: (kind: string, contentId: number) => void;
}

export interface IOverlayProps {
  clickedContent: IContent;
}

export interface IGenere {
  id: number;
  name: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: object;
  episode_run_time: number[];
  first_air_date: string;
  genres: IGenere[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: object;
  last_air_date: string;
  last_episode_to_air: object;
  name: string;
  next_episode_to_air: object;
  networks: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: object;
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  seasons: ISeason[];
  spoken_languages: object;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
}

export interface ISearchResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ISearch {
  page: number;
  results: IContent[];
  total_pages: number;
  total_results: number;
}
