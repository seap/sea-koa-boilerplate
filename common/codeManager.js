export default {
  success: {
    code: 0,
    msg: '成功'
  },
  noLogin: {
    code: 1000,
    msg: '用户未登录'
  },
  noResourse: {
    code: 1001,
    msg: '没有资源权限'
  },
  paramError: {
    code: 2000,
    msg: '请求参数有误'
  },
  notExist: {
    code: 2002,
    msg: '数据不存在'
  },
  dbError: {
    code: 9000,
    msg: '数据库异常'
  },
  unknownError: {
    code: 9999,
    msg: '未知错误'
  }
}
