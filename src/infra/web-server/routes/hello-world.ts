import { RouteOptions } from 'fastify'

export const routeOpt: RouteOptions = {
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          endpoints: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                method: { type: 'string' },
                path: { type: 'string' },
                description: { type: 'string' },
              },
              required: ['method', 'path', 'description'],
            },
          },
        },
        required: ['message', 'endpoints'],
      },
    },
  },
  handler: async function (_request, reply) {
    reply.send({
      message: 'Template API - Lista de Endpoints Disponíveis',
      endpoints: [
        {
          method: 'GET',
          path: '/',
          description: 'Lista todos os endpoints disponíveis na API',
        },
        {
          method: 'GET',
          path: '/health',
          description: 'Verificação de saúde da aplicação. Parâmetro opcional: ?uptime=true',
        },
        {
          method: 'GET',
          path: '/users',
          description: 'Lista todos os usuários cadastrados',
        },
        {
          method: 'GET',
          path: '/users/:id',
          description: 'Obtém um usuário específico pelo ID',
        },
        {
          method: 'POST',
          path: '/users',
          description: 'Cria um novo usuário',
        },
        {
          method: 'PUT',
          path: '/users/:id',
          description: 'Atualiza um usuário existente',
        },
        {
          method: 'DELETE',
          path: '/users/:id',
          description: 'Remove um usuário pelo ID',
        },
      ],
    })
  },
}
