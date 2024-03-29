import axios from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // api的base_url
  timeout: 20000 // 请求超时时间
});

// 设置 post、put 默认 Content-Type
service.defaults.headers.post["Content-Type"] = "application/json";

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === "post" || config.method === "put") {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data);
    }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
    let info = {},
      { status, statusText, data } = error.response;

    if (!error.response) {
      info = {
        code: 5000,
        msg: "Network Error"
      };
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      };
    }
  }
);

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default {
  get: (url, params) =>
    new Promise((resolve, reject) => {
      service
        .get(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }),

  post: (url, data, params) =>
    new Promise((resolve, reject) => {
      service
        .post(url, data, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    })
};
