import { selector } from "recoil";
import { photosAtom, photoProps } from "./atoms";

export const pageSelector = selector<number>({
  key: "page",
  get: ({ get }) => {
    let data = get(photosAtom);
    return data ? data.page : 0;
  },
});

export const photosSelector = selector<photoProps[] | null>({
  key: "photos",
  get: ({ get }) => {
    let data = get(photosAtom);

    return data?.photo
      ? data.photo.map((img: photoProps) => {
          const { server, id, secret } = img;
          return {
            ...img,
            url: `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`,
          };
        })
      : null;
  },
});
