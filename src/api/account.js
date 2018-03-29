import axios from './baseApi';

module.exports = {
    getAccountList: async req => {
        let _req = {
            limit: req.limit || 10,
            page: req.page || 1,
            account: req.account,
            name: req.name,
            t: new Date()*2
        };
        const res = await axios.ajax({
            method: 'get',
            url: '/accounts',
            params: _req
        })
        return res.data
    },
    addAccount: async req => {
        if (!req) return
        const res = await axios.ajax({
            method: 'post',
            url: '/accounts',
            data: req
        })
        return res.data
    }
};