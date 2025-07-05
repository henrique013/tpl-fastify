const TOKENS = {
  libs: {
    Redis: Symbol.for('Redis'),
    PgPool: Symbol.for('PgPool'),
    DrizzlePg: Symbol.for('DrizzlePg'),
  },
  providers: {
    ICacheProvider: Symbol.for('ICacheProvider'),
  },
  repos: {
    IUsersRepo: Symbol.for('IUsersRepo'),
  },
  services: {
    UserService: Symbol.for('UserService'),
  },
}

export { TOKENS as t }
