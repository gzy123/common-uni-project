import { transform } from "lodash";
import errorHandleFn from "./errorHandle";
import apiConfigList from "./apiList";
import Axios from './axios'
const apiRequestList = transform(
    apiConfigList,
    (result, value, key) => {
        result[key] = function (data = {}) {
            return Axios[value.requestType||'request'](
                Object.assign(data, {
                    url: value.url,
                    method: value.method,
                    prefix: Object.assign(value.prefix||{}, data.prefix||{}),
                })
            ).then((res) => {
                if (value?.noTip || errorHandleFn(res)) {
                    return res;
                } else {
                    let error = {
                        code: res.code,
                        msg: res.msg || '网络开小差',
                    };
                    return Promise.reject(error);
                }
            });
        };
    },
    {}
);

export const apiList = apiRequestList;

export default function (Vue) {
    if (!Vue.install) {
        Vue.API = Vue.prototype.$API = apiRequestList;
    }
}
