import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import qs from 'qs';
import Knex from 'knex';
import { Model } from 'objection';

import knexfile from '../db/knexfile';

// Initialize knex.
const knex = Knex(knexfile)

Model.knex(knex);

import router from './router';

const app = new Koa();

const hostname = 'localhost';
const port = 3001;
const baseUrl = `http://${hostname}:${port}`;

// @ts-ignore
app.use(cors());

app.use(bodyParser({
  strict: false
}));

app.use(logger());

// Parse query options
app.use(async (ctx, next) => {
  ctx.request.query.options = qs.parse(ctx.request.querystring) as any
  await next()
});

router.get('/', (ctx: any) => {
  ctx.body = {
    routes: router.stack.map(
      (item: any) => `${item.methods.filter((m: string) => m !== 'HEAD')[0]} ${item.path}`
    )
  };
})


const serializeError = (key: string, value: any) => {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      ...value,
    }
  }
  return value
}

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;

    // This makes non-enumerable properties like error.message visible
    // Stringyfied and parsed back to an object to let koa set the response header as JSON automatically.
    ctx.body = JSON.parse(JSON.stringify({ error }, serializeError));

    ctx.app.emit('error', error, ctx);
  }
});

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
 console.log(err)
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);

console.log(`Server running at ${baseUrl}`);