export const ROUTES = {
  COUNTER: {
    PATH: "/api/counter",
    GET: "/",
  },
  NOTES: {
    PATH: "/api/notes",
    GET: "/",
    POST: "/",
    PUT: "/:id",
    DELETE: "/:id",
  },
  REDIS: {
    PATH: "/api/redis",
    GET_ALL: "/keys",
    GET_ONE: "/keys/:key",
    POST: "/",
    DELETE: "/keys/:key",
  },
};
