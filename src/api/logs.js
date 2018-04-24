import axios from './baseApi'

module.exports = {
  getLogList: async req => {
    const _req = {
      type: req.type || '',
      content: req.content || '',
      page: req.page || '',
      limit: req.limit || ''
    }
    const res = await axios({
      method: 'get',
      url: '/log',
      params: _req
    })
    return res
  }
}