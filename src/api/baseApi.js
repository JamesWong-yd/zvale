import axios from 'axios';

// 设置基础后台请求url
const ajaxUrl = 'http://localhost:3000';

let b = {};

b.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default b;
