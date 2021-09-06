import { selector } from "recoil";
import { photosAtom, photoProps } from "./atoms";

export const pageSelector = selector<number>({
  key: "page",
  get: ({ get }) => {
    let data = get(photosAtom);
    return data?.photos ? data.photos.page : 0;
  },
});

export const photosSelector = selector<photoProps[]>({
  key: "eur",
  get: ({ get }) => {
    let data = get(photosAtom);
    // console.log(data)
    return data?.photos
      ? data.photos.photo.map((img: photoProps) => {
          const { server, id, secret } = img;
          return {
            ...img,
            url: `https://live.staticflickr.com/${server}/${id}_${secret}_q.jpg`,
          };
        })
      : [];
  },
});