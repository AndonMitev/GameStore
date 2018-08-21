const BASE_URL: string = 'https://baas.kinvey.com/';
const APP_KEY: string = '/kid_B1R1z3uSX/';
export const GENERATE_BASE_URL = (endPoint: string, currentModule: string) =>
  BASE_URL + currentModule + APP_KEY + endPoint;