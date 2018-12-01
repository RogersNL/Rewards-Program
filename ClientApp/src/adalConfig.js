import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  tenant: 'iLinkRewards.onmicrosoft.com',
  clientId: '91c3a52c-01b6-4f88-97a9-a3fda7b8772b',
  endpoints: {
    api: 'https://graph.microsoft.com/',
  },
  cacheLocation: 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);

export const getToken = () => {
 return authContext.getCachedToken(authContext.config.clientId);
};
