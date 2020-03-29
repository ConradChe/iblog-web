//判断是否为手机号
export function isPoneAvailable(poneInput) {
  let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(poneInput)) {
    return false;
  } else {
    return true;
  }
}

export function isEmpty(val) {
  if (val == null || val.length === 0){
    return true;
  } else {
    return false;
  }
}
