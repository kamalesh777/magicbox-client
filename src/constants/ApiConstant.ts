
const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE;

const routesObj = {
  "api-testing": `${BACKEND_API_SERVICE}/`,
  "home-api-testing": `${BACKEND_API_SERVICE}/home`,
};

export default routesObj;