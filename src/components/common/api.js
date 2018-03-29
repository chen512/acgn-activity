// import axios from 'axios';
require('es6-promise').polyfill();
var axios = require('axios');
import qs from 'qs';
//let base = 'https://app.lishijie.net'; // http://172.16.185.184  https://app.lishijie.net
let base = 'https://app.lishijie.net'; // http://172.16.185.184  https://app.lishijie.net
axios.defaults.timeout = 10000;
// comment
export const commentAdd = params => { return axios.post(`${base}/comment/add`, qs.stringify(params))};
export const commentLike = params => { return axios.get(`${base}/comment/like`, {params: params})};
export const commentList = params => { return axios.get(`${base}/comment/list`, {params: params})};

// 关注作者列表
export const userFocusList = params => { return axios.get(`${base}/user/listFocusStatus`, {params: params})};

// 埋点
  //进入活动页面
export const pageTracking = params => { return axios.get(`${base}/bizLog/viewRecord`, qs.stringify(params))};
  //进入作者主页
export const enterAuthorPageTracking = params => { return axios.get(`${base}/bizLog/profileViewRecord2`, {params: params})};
  // 关注作者
export const viewAuthorTracking = params => { return axios.get(`${base}/bizLog/profileViewRecord3`, {params: params})};
export const installAppTracking = params => { return axios.get(`${base}/bizLog/drawActivityDownload`, {params: params})};


//咨询与浏览器推广详情页面
export const getDetail = params => { return axios.get(`${base}/api/content/view/${params.id}`)};