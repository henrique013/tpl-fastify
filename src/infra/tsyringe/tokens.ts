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
    HealthRoute: Symbol.for('HealthRoute'),
    'users.find-all': Symbol.for('users.find-all'),
    'users.find-one': Symbol.for('users.find-one'),
    'users.delete': Symbol.for('users.delete'),
    'users.update': Symbol.for('users.update'),
    'users.create': Symbol.for('users.create'),
  },
}

export { TOKENS as t }
