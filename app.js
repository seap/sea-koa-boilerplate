import Koa from 'koa'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import logger from './common/logger'
import { port, sessionKeys, cookieKey } from './config'
import router from './router'

const app = new Koa()

app.keys = sessionKeys
app.use(convert(session({ key: cookieKey })))
app.use(convert(bodyParser()))
app.use(router.routes())
app.use(router.allowedMethods())

// app.use(async ctx => {
//   ctx.throw(404, 'Not Found')
// })

app.on('error', (err, ctx) => {
  if (err.status !== 404) {
    logger.log('error', 'server error', err)
  }
  ctx.status = err.status || 500
  ctx.message = err.message || 'server error'
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
