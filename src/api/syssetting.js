import axios from './baseApi'

module.exports = {
  addHeaderModel: async req =>{
    if(req.logoContent && req.newUploadUrl){
      req.logoContent = req.newUploadUrl
      delete req.newUploadUrl
    }
    const res = await axios({
      method: 'post',
      url: '/base/headermodel',
      data: req
    })
    return res
  },

  getHeaderModelList: async req => {
    const _req = {
      page: req.page || 1,
      limit: req.limit || 5
    }
    const res = await axios({
      method:'get',
      url: '/base/headermodel',
      params: _req
    })
    return res
  }
}