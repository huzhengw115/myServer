var requestUrl = [{
  name: 'home',
  type: [{
    name: 'list',
    type: 'add',
    id: 1
  }]
}, {
  name: 'news',
  type: [{
    name: 'hot',
    type: 'delete',
    id: 1
  }, {
    name: 'new',
    type: 'read',
    id: 1
  }]
}, {
  name: 'goods',
  type: [{
    name: 'hot',
    type: 'change',
    id: 1
  }]
}]

exports.requestUrl = requestUrl