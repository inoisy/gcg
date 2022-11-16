class GraphQLFetcher {
  constructor(instance) {
    this.instance = instance;
  }

  query(payload) {
    return new Promise((resolve, reject) => {
      if (!payload) {
        console.error('🚀 ~ file: axios.js ~ line 28 ~ invalid query');
        reject(new Error('no payload'));
      }
      const { query, variables, options } = payload;
      if (!query?.loc?.source?.body) {
        console.error('🚀 ~ file: axios.js ~ line 28 ~ invalid query');
        reject(new Error('invalid query'));
      }
      const data = {
        query: query.loc.source.body,
      };
      if (variables) {
        data.variables = variables;
      }
      resolve(this.instance.$post('/graphql', data, options));
    });
  }
}
function processAxiosInstance(axios, req) {
  // axios.defaults.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  const headers = req && req.headers ? Object.assign({}, req.headers) : {};
  axios.setHeader('X-Forwarded-Host', headers['x-forwarded-host']);
  axios.setHeader('X-Forwarded-Port', headers['x-forwarded-port']);
  axios.setHeader('X-Forwarded-Proto', headers['x-forwarded-proto']);
}
export default ({ $config, $axios, req, app }, inject) => {
  const graphqlAxiosInstance = $axios.create();
  const graphqlEndpoint = $config.API_URL;
  // console.log('📎 file ~ plugins/axios.js:43 $config ===', $config);
  // console.log('🚀 ~ file: axios.js ~ line 22 ~ graphqlEndpoint', graphqlEndpoint);
  processAxiosInstance(graphqlAxiosInstance, req);
  graphqlAxiosInstance.setBaseURL(graphqlEndpoint);

  const graphql = new GraphQLFetcher(graphqlAxiosInstance);
  inject('graphql', graphql);
  app.$graphql = graphql;
};
