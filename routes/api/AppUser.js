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
                if(err){
                    res.status(500).send({
                        error: "获取每月返利失败",
                        detail:err
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

var create = function(req, res, next) {
    var taobaoid = req.body.taobaoid;
    var tel = req.body.tel;

    AppUser.model.find().where('taobaoid', taobaoid).exec(function(err, appUsers) {
        if (appUsers && appUsers.length > 0) {
            //用户已存在，返回用户以及他的每月返利
            getAppUser(req, res, next);
        } else {
            var appUser = new AppUser.model();
            appUser.taobaoid = taobaoid;
            if(tel){
                appUser.state = "nomal";
                appUser.tel = tel;
            }else{
                appUser.state = "unValidated";
            }
            
            appUser.save(function(err) {
                if (err) {
                    res.status(500).send({
                        error: "用户保存失败"
                    });
                } else {
                    var now = new Date();
                    var year = now.getFullYear();
                    // 
                    var months = [];
                    for (var i = now.getMonth()+1; i > 0; i--) {
                        months.push(i);
                    };
                    async.map(months, function(i, callback) {
                        
                        var reward = new Reward.model();
                        if(now.getMonth()+1==i){
                            reward.type = "valid";
                        }else{
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
                        }else{
                            //用户已创建完成，返回用户以及他的每月返利
                            getAppUser(req, res, next);
                        }
                    });
                }
            });
        }
    });
}

exports = module.exports = {
    getAppUser: getAppUser,
    create: create
}
