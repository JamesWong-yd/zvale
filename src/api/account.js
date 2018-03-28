import axios from './baseApi';

module.exports = {
    getAccountList: async req => {
        let _req = {
            limit: req.limit || 10,
            page: req.page || 1,
            search: req.search
        };
        const res = await axios.ajax({
            method: 'get',
            url: '/users',
            params: _req
        })
        return res.data
    },
    addAccount: async req => {
        if(!req) return
        const res = await axios.ajax({
            method: 'post',
            url: '/user',
            data: req
        })
        return res.data
    }
};