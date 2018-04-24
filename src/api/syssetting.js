import axios from './baseApi'

module.exports = {
  addHeaderModel: async req => {
    if (req.logoContent && req.newUploadUrl) {
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
      method: 'get',
      url: '/base/headermodel',
      params: _req
    })
    return res
  },

  editHeaderModel: async req => {
    if (req.logoContent && req.newUploadUrl) {
      req.logoContent = req.newUploadUrl
      delete req.newUploadUrl
    }
    const res = await axios({
      method: 'post',
      url: '/base/headermodel/edit',
      data: req
    })
    return res
  },

  deleteHeaderModel: async req => {
    const _req = {
      headerId: req
    }
    const res = await axios({
      method: 'post',
      url: '/base/headermodel/delete',
      params: _req
    })
    return res
  },

  // footer
  addFooterModel: async req => {
    const res = await axios({
      method: 'post',
      url: '/base/footermodel',
      data: req
    })
    return res
  },

  getFooterModelList: async req => {
    const _req = {
      page: req.page || 1,
      limit: req.limit || 5
    }
    const res = await axios({
      method: 'get',
      url: '/base/footermodel',
      params: _req
    })
    return res
  },

  editFooterModel: async req => {
    const res = await axios({
      method: 'post',
      url: '/base/footermodel/edit',
      data: req
    })
    return res
  },

  deleteHeaderModel: async req => {
    const _req = {
      footerId: req
    }
    const res = await axios({
      method: 'post',
      url: '/base/footermodel/delete',
      params: _req
    })
    return res
  },

  baseSetting: async req => {
    
  }


}