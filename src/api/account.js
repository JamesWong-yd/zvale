import axios from './baseApi';

module.exports = {

    // 获取账号信息
    getAccount: async req => {
        let _req = {
            accountId: req
        }
        const res = await axios({
            method: 'get',
            url: '/accounts',
            params: _req
        })
        return res
    },

    // 获取账号列表
    getAccountList: async req => {
        let _req = {
            limit: req.limit || 10,
            page: req.page || 1,
            account: req.account,
            name: req.name
        };
        if (req.state) _req.state = req.state
        const res = await axios({
            method: 'get',
            url: '/accounts/list',
            params: _req
        })
        return res
    },

    // 创建账号
    addAccount: async req => {
        if (!req) return
        const res = await axios({
            method: 'post',
            url: '/accounts',
            data: req
        })
        return res
    },

    // 修改账号信息
    editAccount: async req => {
        const res = await axios({
            method: 'post',
            url: '/accounts/edit',
            data: req
        })
        return res
    },

    // 验证账号是否存在
    accountValidate: async req => {
        let _req = {
            account: req.account
        }
        const res = await axios({
            method: 'get',
            url: '/accounts/validate',
            params: _req
        })
        return res
    },

    // 更新账号状态
    accountState: async req => {
        let _req = {
            id: req._id,
            state: req.state
        }
        const res = await axios({
            method: 'post',
            url: '/accounts/updateState',
            data: req
        })
        return res
    },

    // 登录
    login: async req => {
        let _req = {
            account: req.userName,
            pwd: req.password
        }
        const res = await axios({
            method: 'post',
            url: '/login',
            data: _req
        })
        return res
    }
};