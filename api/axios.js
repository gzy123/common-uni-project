import axiosConfig from "../config"
import { getParamStr, getToken, getQueryStr, getUrlParam } from "@/common/util"
import md5 from "js-md5"
const filterParamsNull = params => {
    Object.keys(params).forEach(key => {
        if (params[key] == null) {
            delete params[key]
        }
    })
    return params
}
/**
 * 封装request方法
 * @param hasLoading 是否显示loading
 * @param prefix 当前模块
 * @param query 接口参数
 * @param param 其他参数 url等
 * @returns {Promise}
 */
const request = ({ hasLoading = true, prefix, query = {}, ...param }) => {
    hasLoading &&
        uni.showLoading({
            title: "请稍后",
            mask: true
        })

    const { id, pwd, appver, signType, device } = axiosConfig
    const header = {
        "content-type": prefix.contentType ?? axiosConfig.contentType
    }
    let token
    /* #ifdef H5 */
    token = getToken() || getUrlParam("token")
    /* #endif */
    /* #ifndef H5 */
    token = getToken()
    /* #endif */

    // token 放请求头
    if (token) {
        header["Authorization"] = `Bearer ${token}`
        header.Authorization = `Bearer ${token}`
    }
    // FIXME: 和后端约束好，null, undefined不传
    query = filterParamsNull(query)
    // 接口参数
    const paramsStr = JSON.stringify(query || {})
    let httpUrl = param.url
    const timestamp = String(new Date().getTime()) // 时间戳
    let paramData
    if ((param.method + "").toUpperCase() === "POST") {
        const sign = md5(paramsStr !== "{}" ? `id=${id}&pwd=${pwd}&timestamp=${timestamp}&${getQueryStr(query)}` : `id=${id}&pwd=${pwd}&timestamp=${timestamp}`) // 签名
        paramData = Object.assign(
            {},
            {
                timestamp,
                sign,
                id,
                appver
            },
            query || {}
        )
    } else {
        const sign = md5(`id=${id}&pwd=${pwd}&timestamp=${timestamp}`) // 签名
        httpUrl = getParamStr(
            param.url,
            Object.assign(
                {
                    timestamp,
                    sign,
                    id,
                    appver
                },
                query
            )
        ).replace(/\s+/g, "")
    }
    return new Promise((resolve, reject) => {
        try {
            uni.request({
                url: axiosConfig.baseURL + httpUrl,
                method: (param.method + "").toUpperCase(),
                header,
                data: paramData,
                sslVerify: false,
                success: res => {
                    resolve(res.data)
                },
                fail: err => {
                    uni.showToast({
                        title: err.message || err.errorMsg || "网络开小差",
                        icon: "none",
                        duration: axiosConfig.messageDuration
                    })
                    reject(err)
                },
                complete: () => {
                    hasLoading && uni.hideLoading()
                }
            })
        } catch (error) {
            setTimeout(() => {
                hasLoading && uni.hideLoading()
                reject(error)
            }, 1000)
        }
    })
}

const uploadFile = ({ hasLoading = true, prefix, query = {}, ...param }) => {
    const { filePath, ...formData } = query
    hasLoading &&
        uni.showLoading({
            title: "请稍后",
            mask: true
        })
    const header = {}
    const token = getToken()

    // token 放请求头
    if (token) {
        header["Authorization"] = `Bearer ${token}`
        header.Authorization = `Bearer ${token}`
    }
    return new Promise((resolve, reject) => {
        try {
            uni.uploadFile({
                url: axiosConfig.baseURL + param.url,
                filePath,
                name: "file",
                header,
                formData,
                success: uploadFileRes => {
                    resolve(JSON.parse(uploadFileRes.data))
                },
                fail: err => {
                    uni.showToast({
                        title: err.message || err.errorMsg || "网络开小差",
                        icon: "none",
                        duration: axiosConfig.messageDuration
                    })
                    reject(err)
                },
                complete: () => {
                    hasLoading && uni.hideLoading()
                }
            })
        } catch (error) {
            setTimeout(() => {
                hasLoading && uni.hideLoading()
                reject(error)
            }, 1000)
        }
    })
}
export default {
    request,
    uploadFile
}
