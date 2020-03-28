// TODO: ADD LOGIC TO MODIFY BASE_URL DEPNDING OF THE ENVIRONMENT
const BASE_URL = 'https://covidapi.hackfunrosario.com/api';

export enum METHODS {
  GET = 'get',
  POST = 'post',
};

export const ENDPOINTS = {
  LOGIN: BASE_URL + '/auth/signIn',
  ABM: BASE_URL + '/stats',
};