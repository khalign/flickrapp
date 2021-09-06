import { atom } from "recoil";

export type photoProps = {
  server: string;
  id: string;
  secret: string;
  url?: string;
};

export type photosData = {
  photos: {
    page: number;
    photo: photoProps[];
  };
};

export const photosAtom = atom<photosData | null>({
  key: "photosData",
  default: null,
});
