const BASE_API_URL = process.env.API_BASE_URL;
export const ENVIRONMENT = process.env.ENVIRONMENT;

if (ENVIRONMENT in ["DEVELOPMENT", "LOCAL", "TESTING"]) {
  console.log("environment", process.env.ENVIRONMENT);
  console.log("API_BASE_URL", process.env.API_BASE_URL);
}

export enum ROUTES {
  ABM_CITY = "/abm/city",
  ABM_PROVINCE = "/abm/province",
  HOME = "/",
  LOGIN = "/login",
  NO_MATCH = "*",
}

export enum METHODS {
  GET = "get",
  POST = "post",
}

export const ENDPOINTS = {
  LOGIN: BASE_API_URL + "/auth/signIn",
  ABM: BASE_API_URL + "/stats",
};
