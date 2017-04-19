function add () {
  console.log('add')
}

function deletes () {
  console.log('delete')
}

function read () {
  console.log('read')
}

function change () {
  console.log('change')
}

var operation = {
  // 增
  add: add,
  // 删
  delete: deletes,
  // 查
  read: read,
  // 改
  change: change
}

exports.operation = operation