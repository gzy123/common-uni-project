import axiosConfig from '../config'

const { successCode, messageDuration } = axiosConfig
export default ({ code, msg }) => {
    if (successCode.includes(Number(code))) {
        return true 
    } else if (([1024].includes(Number(code))) && !uni.getStorageSync('limitReq')) {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfoStore')
        uni.setStorageSync('limitReq', true)
        uni.navigateTo({url: '/subpackages/Login/index'})
        // 避免 limitReq状态残留，延迟自动清除
        setTimeout(() => {
            uni.removeStorageSync('limitReq')
        }, 300)
        return false
    } else {
        uni.removeStorageSync('limitReq')
        uni.showToast({
            title: msg || '网络开小差',
            icon: 'none',
            duration: messageDuration
        })
    }
    
}