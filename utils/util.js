const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//校验手机号码
function checkPhoneNumber(phoneNumber) {
  if (phoneNumber == null) {
    return false
  }
  phoneNumber = phoneNumber.replace(/\s/ig, '');
  var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (reg.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}
//校验身份证号
function checkIdNumber(IdNumber) {
  if (IdNumber == null) {
    return false
  }
  IdNumber = IdNumber.replace(/\s/ig, '');
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(IdNumber)) {
    return true;
  } else {
    return false;
  }
}
// 比较微信sdk版本
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}
//字符串不为空  返回true
function chekString(str) {
  if (typeof(str) == 'undefined' || str == null) {
    return false;
  }
  str = str.replace(/\s/ig, '');
  if (str == null || str.length == 0 || str == "") {
    return false;
  } else {
    return true;
  }
}

function canvasWorkBreak(maxWidth, fontSize, text) {
  const maxLength = maxWidth / fontSize
  const textLength = text.length
  let textRowArr = []
  let tmp = 0
  while (1) {
    textRowArr.push(text.substr(tmp, maxLength))
    tmp += maxLength
    if (tmp >= textLength) {
      return textRowArr
    }
  }
}
function rpx2px(rpx, windowWidth) {
  return Math.round(rpx / 750 * windowWidth);
}


module.exports = {
  formatTime: formatTime,
  verifyPhone: checkPhoneNumber,
  verifyIDcard: checkIdNumber,
  compareVersion: compareVersion,
  chekString: chekString,
  canvasWorkBreak: canvasWorkBreak,
  rpx2px:rpx2px
}