// pages/home/home.js
const app = getApp();
// console.log(app);
import { request } from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [],
    yuan:156
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 请求轮播图数据
    this.getBannerData()
  },
  // 请求轮播图数据
  async getBannerData() {
    // 请求轮播图数据
    let { data:{data}} = await request({url: '/pro/banner'});
    this.setData({
      bannerlist: data,
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})