import Config from '../Core/PageConfig';
import Deviceinfo from './Deviceinfo';
import LCBStorage from './LCBStorage';
import {
    Platform
} from 'react-native';
import {
    uuid
} from './Uuid.js';

let lcb_client_id;

async function getLcbClientId() {
    if (!Deviceinfo.getClientId) { return ''; }
    return Deviceinfo.getClientId();
}

const getUserParams = () => {
    const { store } = require('../Store/Store');
    const { saasUserInfo } = store.getState();
    const token = saasUserInfo && saasUserInfo.token;
    if (!token) { return void 0; }
    const defaultShop = saasUserInfo && saasUserInfo.defaultShopInfo || {};
    return {
        token,
        groupId: defaultShop.groupId,
        groupType: defaultShop.groupType,
    };
};

const addUserInfo = params => {
    return {
        ...getUserParams(),
        ...params
    };
};

const defaultOptions = {
    timeout: 8000,
    cache: false,
    expires: '10M'
};

export async function postJson(
    urlPath,
    params,
    options = {}
) {
    params = addUserInfo(params);
    options = { ...defaultOptions, ...options };
    if (!lcb_client_id) {
        lcb_client_id = await getLcbClientId();
    }
    let host = Config.env || 'https://m.lechebang.com/';
    let url = host + urlPath;
    return _fetch(store_fetch(url, params, options), options.timeout, url);
}

export async function get(host, path, params, timeout) {
    let url = host + path;
    var abort_fn = null;
    var abort_promise = new Promise((resolve, reject) => {
        abort_fn = function () {
            reject({
                statusCode: -1,
                url,
                msg: '请求超时'
            });
        };
    });
    let query = params && Object.keys(params).map(key => {
        return key + '=' + params[key];
    }).reduce((prev, curr) => prev + '&' + curr);
    url += query && `?${query}`;
    if (__DEV__) {
        console.log(url);
    }
    var fetch_promise = fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json()).catch(error => error);

    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function () {
        abort_fn();
    }, timeout || defaultOptions.timeout);
    return abortable_promise.then(result => {
        return result;
    }).catch(error => error);
}

function _fetch(fetch_promise, timeout, url) {
    var abort_fn = null;
    var abort_promise = new Promise((resolve, reject) => {
        abort_fn = function () {
            reject({
                statusCode: -1,
                url,
                msg: '请求超时'
            });
        };
    });
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);
    setTimeout(function () {
        abort_fn();
    }, timeout);

    return abortable_promise.then(result => {
        if (result.statusCode + '' === '200') {
            return { result: result.result };
        } else if (['904', '8800111'].includes(result.statusCode + '')) {
            const { store } = require('../Store/Store');
            const { action } = require('../Redux');
            store.dispatch(action.user.invalidToken());
            return { result: null, error: true };
        } else {
            return { error: result };
        }
    }).catch(error => {
        return { error };
    });
}

function setExpires(time) {
    var str = time + '';
    var count = 0;

    str.replace(/(\d+)([DHMS])/g, function (match, $1, $2) {
        $1 = parseInt($1, 10);
        switch ($2) {
            case 'D':
                count += $1 * 24 * 3600;
                break;
            case 'H':
                count += $1 * 3600;
                break;
            case 'M':
                count += $1 * 60;
                break;
            case 'S':
                count += $1;
                break;
        }
    });

    time = count ? count : time;

    return time * 1000;
}

function store_fetch(url, params, options) {
    if (!options.cache) {
        return fetch_promise(url, params);
    }
    let key = 'fetch:' + url + JSON.stringify(params);
    // key不允许有下划线，所以统一替换成$
    key = key.replace(/_/g, '$');
    return LCBStorage.load({ key })
        .then(data => {
            if (__DEV__) {
                console.log(`load stored ${url} fetch data success!`);
            }
            return data;
        })
        .catch(err => {
            if (__DEV__) {
                switch (err.name) {
                    case 'NotFoundError':
                    case 'ExpiredError':
                        console.log(err.message);
                        break;
                    default:
                        console.warn(err.message);
                }
            }
            return fetch_promise(url, params)
                .then(data => {
                    const expires = setExpires(options.expires);
                    LCBStorage.save({
                        key,
                        data,
                        expires
                    });
                    return data;
                });
        });
}

function fetch_promise(url, params) {
    const body = JSON.stringify({
        ...params,
        'appCode': Platform.OS === 'android' ? '1010' : '1011',
        'lcb_client_id': lcb_client_id,
        'lcb_request_id': uuid()
    });
    if (__DEV__) {
        console.log('request:' + url + '\n' + body);
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Request-Info': Object.entries({
                'appCode': Platform.OS === 'android' ? '1010' : '1011',
                ...getUserParams()
            })
                .map(([key, val]) => `${key}=${val}`)
                .join(';')
        },
        body
    }).then((response) => {
        if (__DEV__) {
            console.log('response:' + url + '\n' + JSON.stringify(response));
        }
        return response.json();
    }).catch((error) => {
        if (__DEV__) {
            console.warn(error);
        }
        throw {
            statusCode: -2,
            url,
            msg: '网络错误'
        };
    }).then(result => {
        return result;
    });
}
