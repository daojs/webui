const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


app.use(router.routes()).use(router.allowedMethods());

app.use(serve('./'));

module.exports = app.listen(8080);
