const Koa = require('koa')
const KoaRouter = require('koa-router')
const json = require('koa-json')
const path = require('path');
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new KoaRouter()

//Replace DB
const countries = ['Japan', 'Korea', 'Bali', 'Hong Kong', 'Spain', 'England', 'Amsterdam']
app.use(json())
app.use(bodyParser())
//Simple Middleware Example
//app.use(async ctx => (ctx.body = {msg: 'Hello World'}))
app.context.user = "Magic"
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache:false,
    debug:false
})

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

async function index(ctx){
    await ctx.render('index', {
        title: 'Countries on my map:',
        countries: countries
    });
}

async function showAdd(ctx){
    await ctx.render('add');
}

async function add(ctx){
    const body = ctx.request.body;
    countries.push(body.country);
    ctx.redirect('/')
}



router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}!`))
//Router Middleware
app.use(router.routes()).use(router.allowedMethods())

app.listen(8000, ()=> console.log("Server started..."))