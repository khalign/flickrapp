import { ai } from "../plugins/axios";
import { FLICKR_API_KEY } from "../constants/Config";

export default {
  search: (tag: string, page?: number) =>
    ai.get(
      `?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${tag}&per_page=10&page=${
        page ? page : 1
      }&format=json&nojsoncallback=1`
    ),
  get: (id: string) =>
    ai.get(
      `?method=flickr.photos.getInfo&api_key=${FLICKR_API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`
    ),
};
