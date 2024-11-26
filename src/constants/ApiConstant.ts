
const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE;

const routesObj = {
  "api-testing": `${BACKEND_API_SERVICE}/test`,
  "create-workspace": `${BACKEND_API_SERVICE}/workspace/create-workspace`,
};

export default routesObj;