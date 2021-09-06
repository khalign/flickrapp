import { ai } from "../plugins/axios";
import { FLICKR_API_KEY } from "../constants/Config";

export default {
  search: (tag: string) =>
    ai.get(
      `?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&tags=${tag}&format=json&nojsoncallback=1`
    ),
};
