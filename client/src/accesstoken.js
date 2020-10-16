import queryString from 'query-string';

const value = queryString.parse(window.location.search);
export const accessToken = value.access_token;