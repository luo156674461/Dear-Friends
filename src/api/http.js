 import Vuex from 'vuex'
import store from '../vuex/store'
import des from '../tools';
//配置接口地址
var root = "https://www.onetwoshare.net/api";
// var login = 'https://www.onetwoshare.net/login';
var axios = require('axios');
// var request = require('superagent');


// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
//参数过滤函数
// function filter_null(o) {
//     for (var key in o) {
//         if (o[key] == null) {
//             delete o[key]
//         }
//         if (toType(o[key]) == 'string') {
//             o[key] = o[key].trim()
//             if (o[key].length == 0) {
//                 delete o[key]
//             }
//         }
//     }
//     return o
// }
function filter_null (o) {
 for (var key in o) {
   if (o[key] === null) {
     delete o[key]
   }
   if (toType(o[key]) === 'string') {
     o[key] = o[key].trim()
   } else if (toType(o[key]) === 'object') {
     o[key] = filter_null(o[key])
   } else if (toType(o[key]) === 'array') {
     o[key] = filter_null(o[key])
   }
 }
 return o
}

// function _api_base(method, url, params, success, failure) {
//     var r = request(method, url).type('application/json;charset=UTF-8')
//     if (params) {
//         //params = filter_null(params);
//         if (method === 'POST' || method === 'PUT') {
//             if (toType(params) == 'object') {
//                 params = JSON.stringify(params);

//             } 

//             r = r.send(params)
//         } else if (method == 'GET' || method === 'DELETE') {
//             r = r.query(params)
//         }
//     }
//     r.end(function(err, res) {
//         if (err) {
//             success(res.body);
//             return;
//         };
//         if (res.status == '201' || res.status == '200' || res.status == '202') {
//             if (success) {
//                 //console.log(res.status)
//                 success(res.body);
//             }
//         } else {
//             if (failure) {
//                 failure(res.body);
//             } else {
//                 alert('error: ' + JSON.stringify(res.body));
//             }
//         }
//     });
// };

function _api_base(method, url, params, success, failure) {
    if (params) {
        params = filter_null(params)
    }
   var r = axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: false
        })
        r.then(function(res) {
            if (res.data.success === true) {
                if (success) {
                    success(res.data)
                }
            } else {
                if (failure) {
                    failure(res.data)
                } else {
                    success(res.data)
                    // window.alert('error: ' + JSON.stringify(res.data))
                }
            }
        })
        r.catch(function(err) {
            let res = err.response
            if (err) {
                success(res.data)
                return;
                // window.alert('api error, HTTP CODE: ' + res.status)
            }
        })
}

function _init() {
    let mess = store.state.mess
    let user_name = mess.user
    let init_token = mess.token
    let time = new Date().getTime()
    let cache = des.encrypt(`${user_name}:${init_token}:${time}`)
    return _api_base('GET', root + '/' + `cache_deny/?cache=${cache}`, {}, r => {
        if (r.state === 400) {
            // window.location.href = login;
            store.dispatch('inchange')
        }
    })
};

function verify(url) {
    let zhu = ['user_info', 'register', 'set_register_cache']
    if (!(url.split('/')[0] in zhu)) {
        return false
    } else {
        return true
    }
}
// 返回在vue模板中的调用接口
export default {
    show_root: root,
    router_check: function(url, params, success, failure) {
        if (url.indexOf('?') != -1) {
            return _api_base(
                'GET',
                root + '/' + url + '&format=json',
                params,
                success,
                failure
            )
        } else {
            return _api_base(
                'GET',
                root + '/' + url + '?format=json',
                params,
                success,
                failure
            )
        }
    },
    login: function(url, params, success, failure) {
        if (url.indexOf('?') != -1) {
            return _api_base(
                'POST',
                root + '/' + url + '&format=json',
                params,
                success,
                failure
            )
        } else {
            return _api_base(
                'POST',
                root + '/' + url + '?format=json',
                params,
                success,
                failure
            )
        }
    },
    gaing: function(url, params, success, failure) {
        if (url.indexOf('?') != -1) {
            return _api_base(
                'POST',
                root + '/' + url + '&format=json',
                params,
                success,
                failure
            )
        } else {
            return _api_base(
                'POST',
                root + '/' + url + '?format=json',
                params,
                success,
                failure
            )
        }
    },
    get: function(url, params, success, failure) {
        if (verify(url)) { _init() };
        if (url.indexOf('?') != -1) {
            return _api_base(
                'GET',
                root + '/' + url + '&format=json',
                params,
                success,
                failure
            )
        } else {
            return _api_base(
                'GET',
                root + '/' + url + '?format=json',
                params,
                success,
                failure
            )
        }
    },
    post: function(url, params, success, failure) {
        if (verify(url)) { _init() };
        if (url.indexOf('?') != -1) {
            return _api_base(
                'POST',
                root + '/' + url + '&format=json',
                params,
                success,
                failure
            )
        } else {
            return _api_base(
                'POST',
                root + '/' + url + '?format=json',
                params,
                success,
                failure
            )
        }
    },
    delete: function(url, params, success, failure) {
        return _api_base('DELETE', root + '/' + url, params, success, failure)
    },
    put: function(url, params, success, failure) {
        return _api_base('PUT', root + '/' + url, params, success, failure)
    }
}