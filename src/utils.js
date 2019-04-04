export function getListFromLike(listLike) {
  if (!listLike) {
    return
  }
  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }
  return list
}

export function text2Voice(tip, lan){
  let obj = {
    lan,
    ie: 'UTF-8',
    spd: '4',
    per: 4,
    text: tip
  }
  return 'http://tts.baidu.com/text2audio' + axiosObj(obj)
}


// 解析
function axiosObj (paramObj) {
  var url = ''
  for (var key in paramObj) {
    if (url.indexOf('?')) {
      url += '?' + camelCase2underScore(key) + '=' + paramObj[key]
    } else {
      url += '&' + camelCase2underScore(key) + '=' + paramObj[key]
    }
  }
  return url
}

// 驼峰命名转换成下划线命名
function camelCase2underScore (str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}
