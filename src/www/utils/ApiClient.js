import axios from 'axios';

export default class ApiClient {
  static METHODS = ['get', 'post', 'put', 'patch', 'del'];

  constructor(baseUrl, {before, after, cacheEnabled} = {}) {
    ApiClient.METHODS.forEach((method) => {
      this.baseUrl = baseUrl;
      this[method] = async (
        path,
        {
          params = {},
          data = {},
        } = {},
      ) => {
        const request = axios[method](`${baseUrl}${path}`, {params, data});
        if (before) {
          await before(request);
        }
        const response = await request;
        if (after) {
          await after(request, response);
        }
        return response.data;
      };
    });

    if (cacheEnabled) {
      // Dumb cache implementation:
      //   Cache all GET requests.
      //   Clear the whole cache when a non-GET request is sent.
      const cache = new Map();
      ApiClient.METHODS.forEach((method) => {
        const fetch = this[method];
        this[method] = method === 'get' ?
          async (...args) => {
            const key = JSON.stringify(args);
            if (!cache.has(key)) {
              cache.set(key, await fetch(...args));
            }
            return cache.get(key);
          } :
          async (...args) => {
            cache.clear();
            return await fetch(...args);
          };
      });
    }
  }
}
