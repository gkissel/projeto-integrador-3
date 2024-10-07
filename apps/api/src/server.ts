import { app } from './app'
import { env } from './infra/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server is listening on port ${env.PORT}`)
  })
