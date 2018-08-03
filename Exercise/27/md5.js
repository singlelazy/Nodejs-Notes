const common=require('./libs/common')

var str='123456'
str=common.md5(str+common.MD5_SUFFIX)

console.log(str)
console.log(11+'11')