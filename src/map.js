// map.js
export default function MP() {
  return new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(BMap)
    }
  })
}
