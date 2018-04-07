import axios from './baseApi';

module.exports = {
    // 获取发送信息列表
    getMessageList: async req => {
        let _req = {
            limit: req.limit || 10,
            page: req.page || 1,
            title: req.title,
            sendDateStart: req.sendDateStart,
            sendDateEnd: req.sendDateEnd,
            t: new Date() * 1
        };
        const res = await axios.ajax({
            method: 'get',
            url: '/messages/list',
            params: _req
        })
        return res.data
    },

    // 获取用户信息数量
    getMyMessageCount: async req => {
        let _req = {
            accountId: req
        }
        const res = await axios.ajax({
            method:'get',
            url:'/messages/myMessageCount',
            params: _req
        })
        return res.data
    },

    // 获取用户信息
    getMyMessage: async req => {
        let _req = {
            accountId: req
        }
        const res = await axios.ajax({
            method:'get',
            url:'/messages/myMessage',
            params: _req
        })
        return res.data
    },

    // 获取信息管理信息
    getMessage: async req => {
        let _req = {
            messageId: req
        }
        const res = await axios.ajax({
            method:'get',
            url:'/messages',
            params: _req
        })
        return res.data
    },

    // 发送信息
    addMessage: async req => {
        if(!req) return
        if(req.receiver){
            req.receivers = req.receiver.join('##')
            delete req.receiver
        }
        if(req._id)delete req._id
        if(req.createTime)delete req.createTime
        const res = await axios.ajax({
            method: 'post',
            url: './messages',
            data: req
        })
        return res.data
    },

    // 删除信息
    removeMessage: async req => {
        let _req = {
            id: req.id,
            state: 0
        }
        const res = await axios.ajax({
            method: 'post',
            url: '/messages/remove',
            data: _req
        })
        return res.data
    }
};
