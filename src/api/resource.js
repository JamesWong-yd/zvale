import axios from './baseApi'

module.exports = {
  getResource: async req => {
    const _req = {
      originalname: req.originalname || '',
      mimetype: '',
      page: req.page || 1,
      limit: req.limit || 10
    }
    if (req.mimetype) {
      _req.mimetype = 'image/' + req.mimetype
    }
    const res = await axios({
      method: 'get',
      url: '/resource',
      params: _req
    })
    return res
  },
  deleteResource: async req => {
    const _req = {
      staticId: req
    }
    const res = await axios({
      method: 'post',
      url: '/resource/delete',
      data: _req
    })
    return res
  }
}