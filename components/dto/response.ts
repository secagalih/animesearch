export interface AnimeSearchResponse {
  pagination: Pagination;
  data:       Datum[];
}

export interface AnimeDetailResponse {
  data: Data;
}

export interface Data {
  mal_id:          number;
  url:             string;
  images:          { [key: string]: Image };
  trailer:         Trailer;
  approved:        boolean;
  titles:          Title[];
  title:           string;
  title_english:   string;
  title_japanese:  string;
  title_synonyms:  string[];
  type:            string;
  source:          string;
  episodes:        number;
  status:          string;
  airing:          boolean;
  aired:           Aired;
  duration:        string;
  rating:          string;
  score:           number;
  scored_by:       number;
  rank:            number;
  popularity:      number;
  members:         number;
  favorites:       number;
  synopsis:        string;
  background:      string;
  season:          string;
  year:            number;
  broadcast:       Broadcast;
  producers:       Demographic[];
  licensors:       Demographic[];
  studios:         Demographic[];
  genres:          Demographic[];
  themes:          Demographic[];
  demographics:    Demographic[];
}

export interface Datum {
  mal_id:          number;
  url:             string;
  images:          { [key: string]: Image };
  trailer:         Trailer;
  approved:        boolean;
  titles:          Title[];
  title:           string;
  title_english:   string;
  title_japanese:  string;
  title_synonyms:  string[];
  type:            string;
  source:          string;
  episodes:        number;
  status:          string;
  airing:          boolean;
  aired:           Aired;
  duration:        string;
  rating:          string;
  score:           number;
  scored_by:       number;
  rank:            number;
  popularity:      number;
  members:         number;
  favorites:       number;
  synopsis:        string;
  background:      string;
  season:          string;
  year:            number;
  broadcast:       Broadcast;
  producers:       Demographic[];
  licensors:       Demographic[];
  studios:         Demographic[];
  genres:          Demographic[];
  themes:          Demographic[];
  demographics:    Demographic[];
}

export interface Aired {
  from:   Date;
  to:     Date;
  prop:   Prop;
  string: string;
}

export interface Prop {
  from: From;
  to:   From;
}

export interface From {
  day:   number;
  month: number;
  year:  number;
}

export interface Broadcast {
  day:      string;
  time:     string;
  timezone: string;
  string:   string;
}

export interface Demographic {
  mal_id: number;
  type:   Type;
  name:   string;
  url:    string;
}

export enum Type {
  Anime = "anime",
}

export interface Image {
  image_url:       string;
  small_image_url: string;
  large_image_url: string;
}

export interface Title {
  type:  string;
  title: string;
}

export interface Trailer {
  youtube_id: null;
  url:        null;
  embed_url:  string;
  images:     Images;
}

export interface Images {
  image_url:         null;
  small_image_url:   null;
  medium_image_url:  null;
  large_image_url:   null;
  maximum_image_url: null;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page:     boolean;
  current_page:      number;
  items:             Items;
}

export interface Items {
  count:    number;
  total:    number;
  per_page: number;
}
