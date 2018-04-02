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
            url: '/messages',
            params: _req
        })
        return res.data
    },

    // 发送信息
    addMessage: async req => {
        if(!req) return
        if(req.receiver){
            req.receivers = req.receiver.join('##')
        }
        const res = await axios.ajax({
            method: 'post',
            url: './messages',
            data: req
        })
        return res.data
    }
};
