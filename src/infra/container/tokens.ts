const TOKENS = {
  libs: {
    Redis: Symbol.for('Redis'),
    PgPool: Symbol.for('PgPool'),
    DrizzlePg: Symbol.for('DrizzlePg'),
  },
  repos: {
    IUsersRepo: Symbol.for('IUsersRepo'),
  },
  services: {
    IUserService: Symbol.for('IUserService'),
  },
}

export { TOKENS as t }
