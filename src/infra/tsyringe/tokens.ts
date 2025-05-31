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
    HelloWorldRoute: Symbol.for('HelloWorldRoute'),
    HealthRoute: Symbol.for('HealthRoute'),
    FindAllUsersRoute: Symbol.for('FindAllUsersRoute'),
    FindOneUserRoute: Symbol.for('FindOneUserRoute'),
    DeleteUserRoute: Symbol.for('DeleteUserRoute'),
    UpdateUserRoute: Symbol.for('UpdateUserRoute'),
    'users.create': Symbol.for('users.create'),
  },
}

export { TOKENS as t }
