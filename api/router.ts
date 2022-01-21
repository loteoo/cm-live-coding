import Router from '@koa/router';
import Pizza from './models/Pizza';

const router = new Router();

router
  .get('/pizzas', async (ctx) => {
    const query = Pizza.query()

    if (ctx.query.select) {
      query.select(ctx.query.select);
    }

    ctx.body = await query;
  })
  .get('/pizzas/:id', async (ctx, next) => {
    const pizza = await Pizza.query()
      .findById(ctx.params.id);

    if (!pizza) {
      ctx.status = 404;
      return await next()
    }

    ctx.body = pizza;
  });
  
export default router