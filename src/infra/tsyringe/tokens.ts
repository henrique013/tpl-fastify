const TOKENS = {
  libs: {
    Redis: Symbol.for('Redis'),
    PgPool: Symbol.for('PgPool'),
    DrizzlePg: Symbol.for('DrizzlePg'),
  },
  repos: {
    IUsersRepo: Symbol.for('IUsersRepo'),
  },
  routes: {
    'hello-world': Symbol.for('hello-world'),
    health: Symbol.for('health'),
    'users.find-all': Symbol.for('users.find-all'),
    'users.find-one': Symbol.for('users.find-one'),
  },
}

export { TOKENS as t }
