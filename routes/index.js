/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// var restful = require('restful-keystone')(keystone);
// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
    views: importRoutes('./views'),
    api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {
    app.all('/api*', keystone.middleware.cors);
    app.options('/api*', function(rep,res){
        res.status(200).end();
    });
    
    // Views
    app.get('/', routes.views.index);
    app.get('/blog/:category?', routes.views.blog);
    app.get('/blog/post/:post', routes.views.post);
    app.get('/gallery', routes.views.gallery);
    app.all('/contact', routes.views.contact);
    app.get('/api/v2/jhs/:category?', keystone.middleware.api, routes.api.JHS.list);
    app.post('/api/v3/jhs', keystone.middleware.api, routes.api.JHS.create);
    app.get('/api/v2/jhscategories', keystone.middleware.api, routes.api.JHSCategories.list);

    app.get('/api/v2/qing/:category?', keystone.middleware.api, routes.api.Qing.list);
    app.post('/api/v3/qing', keystone.middleware.api, routes.api.Qing.create);
    app.get('/api/v2/qingcategories', keystone.middleware.api, routes.api.QingCategories.list);

    app.get('/api/v2/qiang/:category?', keystone.middleware.api, routes.api.Qiang.list);
    app.post('/api/v3/qiang', keystone.middleware.api, routes.api.Qiang.create);
    app.get('/api/v2/qiangcategories', keystone.middleware.api, routes.api.QiangCategories.list);

    app.get('/api/v2/tejia/:category?', keystone.middleware.api, routes.api.Tejia.list);
    app.post('/api/v3/tejia', keystone.middleware.api, routes.api.Tejia.create);
    app.get('/api/v2/tejiacategories', keystone.middleware.api, routes.api.TejiaCategories.list);

    app.get('/api/v2/ziying/?', keystone.middleware.api, routes.api.Ziying.list);

    //新增用户，只是记录了taobao账号，时间，同时 初始化用户每月返利
    app.post('/api/v2/AppUser', keystone.middleware.api, routes.api.AppUser.create);
    // app.post('/api/v3/Reward', keystone.middleware.api, routes.api.Reward.create);
    app.get('/api/v2/Reward/:appUserId', keystone.middleware.api, routes.api.Reward.list);

    app.post('/api/v2/sendCaptcha', keystone.middleware.api, routes.api.AppUser.sendCaptcha);

    //流量页面浏览
    app.post('/api/v2/ViewLog', keystone.middleware.api, routes.api.ViewLog.create);
    // //下载
    app.post('/api/v2/DownloadLog', keystone.middleware.api, routes.api.DownloadLog.create);

   // //获取验证码
   //  app.get('/api/v3/getCAPTCHA', keystone.middleware.api, routes.api.AppUser.getCAPTCHA);
   //  //修改手机号，（先验证手机号，必须是之前没手机号码才能修改）
   //  app.get('/api/v3/updateTel', keystone.middleware.api, routes.api.AppUser.updateTel);

    //分享
    // app.post('/api/v2/SharedLog', keystone.middleware.api, routes.api.SharedLog.create);
    //分享被点击
    app.post('/api/v2/ShareViewedLog', keystone.middleware.api, routes.api.ShareViewedLog.create);
    //分享被下载
   //  app.post('/api/v3/ShareDownloadLog', keystone.middleware.api, routes.api.ShareDownloadLog.create);
   //  //分享被下载
   //  app.post('/api/v3/ShareDownloadLog', keystone.middleware.api, routes.api.ShareDownloadLog.create);


    // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
    // app.get('/protected', middleware.requireUser, routes.views.protected);

};
