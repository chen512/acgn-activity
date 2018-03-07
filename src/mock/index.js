/*import Enum from '../components/common/enum';*/
const pathRegexp = nodeRequire('path-to-regexp');
const Mock = nodeRequire('mockjs/src/mock');

let i = 24;
let ids = [];
let names = [];
while(i) {
    ids.unshift(200 + i);
    names.unshift('奖品' + i);
    i--;
}
const AWARD_IDS = [0].concat(ids);
const AWARD_NAMES = names;

function normalizeResult(keys, matches) {
    let res = {};
    keys.forEach(function(item, index) {
        res[item.name] = matches[index + 1];
    });
    return res;
}

function Chain() {
    this._routes = [];
}

Chain.prototype.add = function(pattern, cb) {
    let keys = [];
    let re = pathRegexp(pattern, keys);
    this._routes.push({
        re,
        keys,
        cb
    });
};

Chain.prototype.exec = function(req, fn) {
    let len = this._routes.length;
    for(let i = 0; i < len; i++) {
        let route = this._routes[i];
        let matches = route.re.exec(req.params[0]);
        if(!matches) {
            continue;
        } else {
            return fn(route.cb(req, normalizeResult(route.keys, matches)));
        }
    }
};

let chain = new Chain();
//Activity.getMyAwardsCallback({"code":200,"message":"","redirect":"","value":[{"award_count":1,"award_date":1494348516000,"award_id":7881,"award_name":"暖心券"}]})
chain.add('public/activity/award/user/:activityId', function(req, params) {
    return Mock.mock({
        "code|1": [ 200, -1, 200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value|0-6": [
            {
                "award_count|1-99": 1,
                "award_name|1": [
                    "超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                    "正常奖品名称"
                ],
                "award_id|1": req.query.awardIds || AWARD_IDS,
                "award_date": Date.now(),
                "icon|1": [Mock.Random.dataImage('200x200', '奖品图'), Mock.Random.dataImage('600x600', '超大奖品图')],
                "type":'COUPON'
            }
        ]
    })
});

chain.add('public/activity/award/latest/:activityId', function(req, params) {
    return Mock.mock({
        "code|1": [ 200, -1, 200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value|0-20": [
            {
                "award_count|1-99": 1,
                "award_name|1": [
                    "超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦",
                    "正常奖品名称"
                ],
                "award_id|1": [201, 202, 203, 204, 205, 206, 207, 208],
                "award_date": Date.now(),
                "nickname|1": [
                    "超长昵称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦拉拉啦啦啦啦啦啦啦啦啦拉拉啦啦啦",
                    "正常昵称",
                    "tain335",
                    "逗比娟"
                ],
                "price|0-100": 20
            }
        ]
    })
});

chain.add('oauth/activity/player_info/get', function() {
    return Mock.mock({
        "code|1": [ 200, -1, 200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value": {
            "address|1": ["南山区南龙苑", "超长地址啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦", ""], 
            "imei|1": ['', 15465465445654, 454654564564, 45646545656665],
            "message": null,
            "mobile|1": ["", "18899759075"],
            "postcode|1": ["", "528053"],
            "recipient|1": ["", "詹泽娟", "逗比娟"], 
            "uid": 113536086
        }
    })
});

chain.add('oauth/activity/player_info/save', function() {
    return Mock.mock({
        "code|1": [ 200, -1, 200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value": {}
    })
});
chain.add('oauth/activity/zippo/do/:activityId', function(req, params) {
    if(req.query.__mockAward__ && req.query.__mockAward__ != 'RAND') {
        return Mock.mock({
            "code": 200,
            "message": "",
            "value": [
                {
                    "award_icon|1": [Mock.Random.dataImage('200x200', '奖品图'), Mock.Random.dataImage('600x600', '超大奖品图')],
                    "award_type": req.query.__mockAward__,
                    "award_id": function() {

                    },
                    "price|0-99": 0,
                    "zippo_id|1": [1276, 1277, 1278, 1279],
                    "idx|1":[0,1,2,3,4,5,6,7]
                }
            ]
        });
    } else {
        return Mock.mock({
            "code|1": [ 200, -1, 200, 200, 200, 200, 200, 200],
            "message": function() { this.code == 200 ? '' : '服务器错误' },
            "value|1-3": [
                {
                    "award_icon|1": [Mock.Random.dataImage('200x200', '奖品图'), Mock.Random.dataImage('600x600', '超大奖品图')],
                    //"award_id|1": req.query.awardIds || AWARD_IDS,
                    "award_id|1": req.query.__awardIds__ || AWARD_IDS,
                    "award_name|1": ["正常奖品名称", "超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦", "魅族PRO6", "魅蓝E", "魅蓝X"],
                    "award_type|1": function() {
                        if(this.award_id != 0) {
                            return Mock.mock({"type|1": AWARD_TYPES})["type"];
                        } else {
                            return "NOTHING";
                        }
                    }, 
                    "price|0-99": 0,
                    "zippo_id|1": [1276, 1277, 1278, 1279],
                    "idx|1":[0,1,2,3,4,5,6,7]
                }
            ] 
        });
    }
});

chain.add('oauth/activity/zippo/times/:activityId', function() {
    return Mock.mock({
        "code|1": [200, -1, 200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value": {
             "userInfo": {
                "consumePrice": 0,
                "email": "649397393@qq.com",
                "flyme": "tain335",
                "icon": "",
                "lastLoginIp": -1408105428,
                "lastLoginTime": 1497838310000,
                "nickname": "用户30723300",
                "phone": "",
                "regDate": 1445829671000,
                "regIp": "172.16.140.20",
                "userId": 7680825
            },
            "zippoTimes|1-3": [{
                "zippo_id|1": [1276, 1277, 1278, 1279],
                "times|0-10": 0
            }],
            "tasks|0-3": [1001, 1002, 1003]
        }
    })
});

chain.add('oauth/activity/charge/do/:activityId', function() {
    return Mock.mock({
        //, 113000, 113002, 120030, 120028, 120031, 120026, 120032, 120024, 120029, 321, 11, 319
        "code|1": [200, 200, 200,200, 200, 200, 200, 200, 200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value|1-1": [
            {
                "awardName": "30元话费"
            }
        ]
    })
});

chain.add('oauth/activity/task/do/:activityId', function() {
    return Mock.mock({
        "code|1": [200],
        "message": function() { this.code == 200 ? '' : '服务器错误' },
        "value": null
    });
});

chain.add('awards', function(req, params) {
    let awardCount = req.query.count;
    if(!awardCount) awardCount = 1;
    awardCount = awardCount - 1;
    let key = 'value|' + awardCount;
    let obj = {};
    let start = Math.floor(Math.random() * awardCount);
    obj[key] = [{
        "id": function() {
            return AWARD_IDS[start++ % awardCount + 1];
        },
        "name|1": AWARD_NAMES,
        "icon|1": [Mock.Random.dataImage('200x200', '奖品图'), Mock.Random.dataImage('600x600', '超大奖品图')], 
        "type|1": AWARD_TYPES
    }];
    let awards = Mock.mock(obj).value;
    awards.splice(start, 0, {
        "id": 0,
        "name": "谢谢参与",
        "icon": Mock.Random.dataImage('200x200', '谢谢参与'),
        "type": "INTEGRATION"
    });
    return {
        code: 200,
        message: '',
        value: awards
    }
});


chain.add('apps', function(req, params) {
    return Mock.mock({
        code: 200,
        message: '',
        'value|5-12': [
            {
                "appId": 3110788,
                "category_name": "11月子分类", 
                "evaluate_count": 26, 
                "icon": Mock.Random.dataImage('100x100', '游戏'),
                "images": [
                    {"height":480,"id":null,"image":"","imageWebp":null,"otherHeight":null,"otherWidth":null,"small":"","smallWebp":null,"sortOrder":null,"status":null,"versionId":6957785,"width":270}
                ],
                "name|1": ["coupon测试1", "超长APP名称啦啦啦啦啦了", "测试APP"], 
                "packageName":"com.coupon1.test.mz",
                "size": 246811,
                "star": 50,
                "taskId": 7957,
                "type":"OPEN",
                "desc":"AAA",
                "limitDay": 3
            }
        ]
    });
});

chain.add('oauth/subscribe/:game_id/subscribed',function() {
  return Mock.mock({
    "code|1":[200,100],
    "value|1":[true,false]
  })
});

chain.add('oauth/subscribe/add/:game_id',function() {
  return Mock.mock({
    "code|1":[200,100],
    "value|1":[25082145]
  })
});

chain.add('public/detail/:game_id',function() {
  return Mock.mock({
    "code|1":[200,100],
    "value":{
      'subscribe_count': 45,
      'star': 50
    }
  })
});

chain.add('public/activity/prize/list/:activityId', function() {
    return Mock.mock({
        "code|1": [200, 200, 200, 200, 200, 200],
        "value": {
            "prizes|5-12": [
                {
                    awardId: 123, 
                    "awardName|1": ['魅族PRO6', '超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'], 
                    "prizeId|0-9999": 123,
                    awardIcon: Mock.Random.dataImage('100x100', '游戏'),
                    "count|500-9999": 300, 
                    "send|500-9999": 300,
                    "winner": 114525,
                    "winnerCode|1": ['', 123333333333],
                    "nickname|1": ['逗比娟', '超级逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比'],
                    "winDate": Date.now() / 1000
                }
            ]
        }
    })
});

chain.add('oauth/activity/user/prizes/:activityId', function() {
    return Mock.mock({
        "code|1": [200, 200, 200, 200, 200, 200],
        "value": {
            "userPrizes|0-6": [
                {
                    awardId: 123,
                    "awardName|1": ['魅族PRO6', '超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'],
                    awardIcon: Mock.Random.dataImage('100x100', '游戏'),
                    "prizeId|0-9999": 123,
                    "codes|1-10": [8889],
                    "going|1": [true, false],
                    "winner|1": [true, false],
                    "winnerCode": 8889
                }
            ]
        }
    });
});

chain.add('public/activity/prize/latest/:activityId', function() {
    return Mock.mock({
        "code|1": [200, 200, 200, 200, 200, 200],
        "value": {
            "prizes|0-6": [
                {
                    awardId: 123,
                    "awardName|1": ['魅族PRO6', '超长奖品名称啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦'],
                    awardIcon: Mock.Random.dataImage('100x100', '游戏'),
                    "prizeId|0-9999": 123,
                    "winnerCode|1": [8889,8890,8891,8892,8893,8894,8895,8896,8897,8899,8900],
                    "nickname|1": ['逗比娟', '超级逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比逗比'],
                    "date": Date.now() / 1000
                }
            ]
        }
    });
});

chain.add('oauth/activity/prize/add/:prizeId', function() {
    return Mock.mock({
        "code|1": [120041, 120041, 200, 200, 120042, 120042, -1, -1],
        "value": {
            "codes|1-10": [8889],
            "going|1": true,
            "winner|1": false
        }
    })
}); 

export default function(req, res, next) {
    chain.exec(req, function(result) {
        if(req.query.jsonpCallback) {
            res.send(`${req.query.jsonpCallback}(${JSON.stringify(result)})`);
        } else {
            res.json(result);
        }
        next();
    }) 
}

// export function mockAwards(awardCount) {
//     if(!awardCount) awardCount = 1;
//     awardCount = awardCount - 1;
//     let key = 'value|' + awardCount;
//     let obj = {};
//     let start = Math.floor(Math.random() * awardCount);
//     obj[key] = [{
//         "id": function() {
//             return AWARD_IDS[start++ % awardCount];
//         },
//         "name|1": AWARD_NAMES,
//         "icon|1": [Mock.Random.dataImage('200x200', '奖品图'), Mock.Random.dataImage('600x600', '超大奖品图')], 
//         "type|1": AWARD_TYPES
//     }];
//     let awards = Mock.mock(obj).value;
//     awards.splice(start, 0, {
//         "id": 0,
//         "name": "谢谢参与",
//         "icon": Mock.Random.dataImage('200x200', '谢谢参与'),
//         "type": "INTEGRATION"
//     })
//     return awards;
// }
