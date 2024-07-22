export function getPhoneNumber(number) {
  // 입력값을 문자열로 변환하고 공백 제거
  const numberStr = String(number).replace(/\s+/g, "");

  // 10자리일 경우
  if (numberStr.length === 10) {
    return `(${numberStr.slice(0, 3)}) ${numberStr.slice(
      3,
      6
    )}-${numberStr.slice(6)}`;
  }

  // 11자리일 경우
  return `(${numberStr.slice(0, 3)}) ${numberStr.slice(3, 7)}-${numberStr.slice(
    7
  )}`;
}
