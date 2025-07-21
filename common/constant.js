// 合同状态
export const CONTRACT_STATUS = function (value) {
    switch (value) {
        case 1:
            return '签署中'
        case 2:
            return '已完成'
        case 3:
            return '已拒签'
        case 4:
            return '已撤回'
        case 5:
            return '已过期'
        case 6:
            return '解约中'
        case 7:
            return '已解约'
        default:
            return '未知'
    }
}

// 签署状态
export const CONTRACT_SIGN_STATUS = function (value) {
    switch (value) {
        case 0:
            return '待签'
        case 1:
            return '未签'
        case 2:
            return '已签'
        case 3:
            return '拒签'
        case null:
            return '免签'
        default:
            return '未知'
    }
}

// 合同是否已读
export const CONTRACT_IS_READ = function (value) {
    switch (value) {
        case 1:
            return '已读'
        case 2:
            return '未读'
        default:
            return '未知'
    }
}

// 签署流程
export const CONTRACT_SIGN_STEPS = function (value) {
    switch (value) {
        case 0:
            return '待签署'
        case 1:
            return '未签署'
        case 2:
            return '签署完成'
        case 3:
            return '拒绝签署'
        case 4:
            return '已撤回'
        default:
            return '未知'
    }
}

export const SIGN_TYPE = function (value) {
    switch (value) {
        case 0:
            return '手绘签名'
        case 1:
            return '模板章'
        case 2:
            return '手绘签名/模板章'
    }
}
