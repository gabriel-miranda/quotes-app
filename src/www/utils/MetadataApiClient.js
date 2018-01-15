import ApiClient from './ApiClient';

const BASE_URL = '/api';

export default class MetadataApiClient extends ApiClient {
  constructor(req: ?Object) {
    super(BASE_URL, {cacheEnabled: Boolean(req)});
  }
  update = body => this.post('/update', { data: body })
}
