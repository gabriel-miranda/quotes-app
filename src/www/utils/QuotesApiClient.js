import ApiClient from './ApiClient';

const BASE_URL = 'https://auth0-exercise-quotes-api.herokuapp.com/api';

export default class QuotesApiClient extends ApiClient {
  constructor(req: ?Object) {
    super(BASE_URL, {cacheEnabled: Boolean(req)});
  }
  quotes = {
    get: query => this.get('/quotes', { params: query }),
  }
}
