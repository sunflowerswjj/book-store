import axios from "axios";
axios.defaults.baseURL="http://localhost:5000";
axios.interceptors.response.use(res=>res.data);
export  let getSliders=()=>{
  return axios.get("/sliders");
};
export let getHotBooks=()=>{
  return axios.get("/hot");
};
export let getBook=()=>{
  return axios.get("/book");
};
export let findOneBook=(id)=>{
  return axios.get(`/page?id=${id}`);
};
export let removeBook=(id)=>{
  return axios.delete(`/book?id=${id}`);
};
export  let addBook=(data)=>{
  return axios.post(`/book`,data);
};
export let updata=(id,data)=>{
  return axios.put(`/book?id=${id}`,data)
};
export let getAll=()=>{
  return axios.all([getSliders(),getHotBooks()])
};
export let getPageNation=(offset)=>{
      return axios.get(`/page?offset=${offset}`);
};
