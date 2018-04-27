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
