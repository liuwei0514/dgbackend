var async = require('async'),
    keystone = require('keystone'),
    AppUser = keystone.list('AppUser'),
    Reward = keystone.list('Reward');


var getAppUser = function(req, res, next) {
    var taobaoid = req.body.taobaoid;
    var loginTel = req.body.loginTel;
    AppUser.model.find().where('taobaoid', taobaoid).exec(function(err, appUsers) {
        if (appUsers && appUsers.length > 0) {
            var appUser = appUsers[0];
            Reward.model.find().where('appUser', appUser._id).exec(function(err, rewards) {
                if (err) {
                    res.status(500).send({
                        error: "获取每月返利失败",
                        detail: err
                    });
                }
                var r = {
                    rewards: rewards,
                    appUser: appUser
                };
                res.json(r);
            });
        }
    });
};

var sendCaptcha = function(req, res, next) {
    var tel = req.body.tel;
    captcha = (Math.random() * (9999 - 1000) + 1000).toFixed(0);
    var https = require('https');
    var querystring = require('querystring');

    var postData = {
        mobile: tel,
        message: captcha + '(验证码),有效期为1小时。为了保护您的账号安全,验证短信请勿转发他人。【科云科技】'
    };

    var content = querystring.stringify(postData);

    var options = {
        host: 'sms-api.luosimao.com',
        path: '/v1/send.json',
        method: 'POST',
        auth: 'api:key-e8b78f32e85b835939e5f86323914cac',
        agent: false,
        rejectUnauthorized: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': content.length
        }
    };

    var reqx = https.request(options, function(resx) {
        resx.setEncoding('utf8');
        var r = {
            captcha: captcha
        };
        resx.on('data', function(chunk) {
            r.r = JSON.parse(chunk);
        });
        resx.on('end', function() {
            res.json(r);
        });
    });
    reqx.write(content);
    reqx.end();
};
var create = function(req, res, next) {
    var taobaoid = req.body.taobaoid;
    var tel = req.body.tel;
    var reference = req.body.reference;

    AppUser.model.find().where('taobaoid', taobaoid).exec(function(err, appUsers) {
        var appUser;
        var needGenerateRewards = 1;
        if (appUsers && appUsers.length > 0) {
            appUser = appUsers[0];
            needGenerateRewards = 0;
        } else {
            appUser = new AppUser.model();
            if (reference) {
                appUser.reference = reference;
            }
        }
        if (appUser.state != "unValidated") {
            //用户已经注册过，此次登陆创建用户必须是填写手机，而且手机要一致
            if (tel && appUser.tel == tel) {

            } else {
                res.status(502).send({
                    error: "请输入正确的手机号"
                });
            }
        }
        appUser.taobaoid = taobaoid;
        if (tel) {
            appUser.state = "nomal";
            appUser.tel = tel;
        } else {
            appUser.state = "unValidated";
        }


        appUser.save(function(err) {
            if (err) {
                res.status(500).send({
                    error: "用户保存失败"
                });
            } else {
                if(needGenerateRewards){

                    var now = new Date();
                    var year = now.getFullYear();
                    // 
                    var months = [];
                    for (var i = now.getMonth() + 1; i > 0; i--) {
                        months.push(i);
                    };
                    async.map(months, function(i, callback) {

                        var reward = new Reward.model();
                        if (now.getMonth() + 1 == i) {
                            reward.type = "valid";
                        } else {
                            reward.type = "expired";
                        }
                        reward.year = year;
                        reward.month = i;
                        reward.amount = (Math.random() * (20 - 10) + 10).toFixed(2);
                        reward.appUser = appUser._id;
                        reward.save(function(err) {
                            callback(err, null);
                        });
                    }, function(err, result) {
                        if (err) {
                            res.status(500).send({
                                error: "生成用户以往的每月返利失败"
                            });
                        } else {
                            //用户已创建完成，返回用户以及他的每月返利
                            getAppUser(req, res, next);
                        }
                    });
                }else{
                    getAppUser(req, res, next);
                }
            }
        });
    });
}

exports = module.exports = {
    getAppUser: getAppUser,
    create: create,
    sendCaptcha: sendCaptcha

}
