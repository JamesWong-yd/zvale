import axios from 'axios';
import qs from 'qs';

// 设置基础后台请求url
const ajaxUrl = 'http://localhost:3000';

let b = {};

b.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        data = qs.stringify(data);
        return data;
    }]
});

export default b;