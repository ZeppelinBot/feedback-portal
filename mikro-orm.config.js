export default {
  entities: [],

  type: "postgresql",
  host: "postgres",
  dbName: "postgres",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,

  migrations: {
    path: "./migrations",
    snapshot: false,
    emit: "js",
  },

  discovery: {
    warnWhenNoEntities: false,
  },
};
