import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
//处理书籍
export const getBooksListPage = params => { return axios.get(`${base}/books/listpage`, { params: params }); };

export const removeBooks = params => { return axios.get(`${base}/books/remove`, { params: params }); };

export const batchRemoveBooks = params => { return axios.get(`${base}/books/batchremove`, { params: params }); };

export const editBooks = params => { return axios.get(`${base}/books/edit`, { params: params }); };

export const addBooks = params => { return axios.get(`${base}/books/add`, { params: params }); };
