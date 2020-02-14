const baseUrl = 'http://daxun.kuboy.top/api';
export function request(options){
  const { url, data } = options;
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseUrl + url,
      data: data || {},
      success: (res) => {
        // 异步操作成功调用resolve
        resolve(res)
      },
      fail: (err) => {
        // 异步操作失败调用reject
        reject(err)
      },
      complete: () => {
        // 成功也好，失败也罢，都是已完成
        wx.hideLoading()
      }
    })
  });
}
export function toast(options) {
  const { title, icon, duration } = options
  wx.showToast({
    title,
    icon: icon || 'none', // success loading
    duration: duration || 2000
  })
}