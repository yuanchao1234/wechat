// pages/kind/kind.js
import {
  request
} from './../../utils/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    titles: [],
    brandlist: [],
    kindlist: [], // 大分类下的品牌下的数据列表
    activeKey: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //tab栏大分类的初始化(顶部)
    this.loadTopCategory();
  },
  //tab栏大分类的初始化(顶部)
  loadTopCategory() {
    request({
      url: '/kind/category',
      data: {
        type: 'type'
      }
    }).then(res => {
      let {
        data
      } = res.data;
      this.setData({
        titles: data
      })
      //商品小分类初始化
      this.requestCategoryToBrand(data[this.data.active]);
    })
  },
  //商品小分类初始化
  async requestCategoryToBrand(title) {
    let fenglei = await request({
      url: '/kind/categorybrand',
      data: {
        type: title
      }
    });
    let data = fenglei.data.data;
    // console.log(fenglei);
    this.setData({
      brandlist: data
    });
    //商品列表初始化(右边)
    this.list();
  },
  //商品列表初始化(右边)
  async list(){
    let h = await request({
      url: '/kind/categorylist',
      data: {
        type: this.data.titles[this.data.active],
        brand: this.data.brandlist[this.data.activeKey].brand
      }
    });
    let list = h.data.data;
    this.setData({
      kindlist: list
    });
  },
  //点击顶部tab
  onChange(event) {
    const {
      index,
      name,
      title
    } = event.detail;
    console.log(event);
    this.setData({
      active: index
    });
    //商品小分类
    this.requestCategoryToBrand(title)
  },
  //点击左侧小分类
  async onChange2(event) {
    let {
      detail
    } = event;
    //获取到大分类tab
    let titles = this.data.titles[this.data.active];
    //获取小分类
    let brand = this.data.brandlist[detail].brand;
    let {
      data: {
        data
      }
    } = await request({
      url: '/kind/categorylist',
      data: {
        type: titles,
        brand
      }
    });
    this.setData({
      kindlist: data
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})