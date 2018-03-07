import axios from 'axios';
import qs from 'qs';
let base = 'https://app.lishijie.net'; // http://172.16.185.184  https://app.lishijie.net

// comment
export const commentAdd = params => { return axios.post(`${base}/comment/add`, qs.stringify(params))};
export const commentLike = params => { return axios.get(`${base}/comment/like`, {params: params})};
export const commentList = params => { return axios.get(`${base}/comment/list`, {params: params})};
// 埋点
export const pageTracking = params => { return axios.get(`${base}/bizLog/viewRecord`, {params: params})};
export const enterAuthorPageTracking = params => { return axios.get(`${base}/bizLog/profileViewRecord2`, {params: params})};
export const installAppTracking = params => { return axios.get(`${base}/bizLog/drawActivityDownload`, {params: params})};