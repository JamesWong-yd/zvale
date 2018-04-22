import axios from 'axios';
import qs from 'qs';
import {
    router
} from '@/router/index';
import {
    Message
} from 'iview';
import Cookies from 'js-cookie';
import ajaxUrl from './service';

let ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        data = qs.stringify(data);
        return data;
    }]
});

// 发起拦截器
ajax.interceptors.request.use(
    config => {
        if (config.method === 'get') {
            config.params.t = new Date() * 1;
        }
        if (config.method === 'post') {
            config.data.t = new Date() * 1;
        }
        // jwt token
        if (localStorage._rma) {
            config.headers.Authorization = localStorage._rma;
        }

        return config
    },
    err => {
        return Promise.reject(err);
    }
);

// 接收拦截器
ajax.interceptors.response.use(
    res => {
        return res.data;
    },
    err => {
        if (!err.response) {
            Message.warning('请求超时');
        }
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    Message.warning(err.response.data.msg);
                    // 返回 401 清除token信息并跳转到登录页面
                    Cookies.remove('_rma');
                    router.replace({ replace: true, name: 'login' });
                    break;
                case 500:
                    router.replace({ replace: true, path: '/500' });
                    break;
                // case 404:    
                //     router.push({ replace: true, path: '/404' });
                //     break;
            }
        }
        return Promise.reject(err);
    }
);

export default ajax;
