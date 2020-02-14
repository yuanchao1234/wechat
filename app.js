//app.js
App({
  onLaunch: function () {
    // console.log(this.chao());
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //自定义的全局变量，可以是任何的数据类型 —————— 状态管理器
  globalData: {
    userInfo: null
  },
  yuan:156,
  chao(){
    console.log(this.yuan);
  },
  // 生命周期回调——监听小程序启动或切换前台
  onShow(a){
    // console.log('show',a)
  },
  // 生命周期回调——监听小程序切换后台
  onHide(){
    console.log('hide');
  },
  //小程序发生脚本错误或 API 调用报错时触发。也可以使用 wx.onError 绑定监听。
  onError(err){
    console.log('error',err)
  },
  //404
  onPageNotFound(){
    console.log('onPageNotFound');
  },

})