// pages/home/home.js
const app = getApp();
// console.log(app);
import { request, toast } from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    prolist: [],
    pageCode: 1, // 默认已经加载了一次数据
    floorstatus:true
  },
  backtop() {
    wx.pageScrollTo({
      scrollTop: 0 // 0表示滚动条的位置为0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log(456);
    // 请求轮播图数据
    this.getBannerData();
    // 请求列表数据
    this.getProlistData();
  },
  // 请求轮播图数据
  async getBannerData() {
    // 请求轮播图数据
    let { data:{data}} = await request({url: '/pro/banner'});
    this.setData({
      bannerlist: data,
    });
  },
  // 请求列表数据
  getProlistData() {
    request({
      url: '/pro',
      data: {}
    }).then((res) => { // 建议使用箭头函数---this指向
      // console.log(res)
      this.setData({
        prolist: res.data.data
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(789);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    request({
      url: '/pro',
      data: {
        pageCode: 0, // 页码默认为0
        limitNum: 10 // 每页显示合数，默认为10
      }
    }).then((res) => { // 建议使用箭头函数---this指向
      console.log(res)
      this.setData({
        prolist: res.data.data,
        pageCode: 1 // 一定要记得重置页码 ---- 没有数据的提示（上拉加载提示过后）
      })
      // 真机测试的时候，下拉刷新技术需要停止 下拉刷新的操作
      wx.stopPullDownRefresh();
    }).catch((err) => {
      console.log(err)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉刷新业务逻辑
    this.requestMoreData();
  },
  requestMoreData() {
    request({
      url: '/pro',
      data: {
        // vue this.pageCode
        // minpro  this.data.pageCode
        pageCode: this.data.pageCode,
        limitNum: 10
      }
    }).then(res => {
      // 请求之后 需要判断 
      // 1.判断有没有数据
      if (res.data.code === '10000') {
        // 没有更多数据了
        // 需要给用户提示信息 https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
        // console.log('111111111111111111111111')
        // toast({title, icon, duration})
        toast({ title: '没有更多数据了' })
      } else {
        // 2.如果有数据 --- 之前的数据追加上现在请求的数据  数组合并
        // vue this.prolist = [...this.prolist, ...res.data.data]
        // minpro --- 修改数据的方式类似于 react
        // react 获取数据 处理数据 修改数据（状态）
        // 3.每一次请求完成页面要完成自动加1
        let arr = this.data.prolist // 获取数据
        let num = this.data.pageCode
        let list = [...arr, ...res.data.data] // 处理数据
        num += 1
        this.setData({ // 修改数据
          prolist: list,
          pageCode: num
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onPageScroll: function (e) {
    if (e.scrollTop > 200) {
      this.setData({
        floorstatus: false
      });
    } else {
      this.setData({
        floorstatus: true
      });
    }
  }
})