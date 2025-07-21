## 项目简介

准数移动端通用项目

### toast 封装

```
1.引入
import { toast } from '@/common/util'

2.使用
  txt  必传 | String
  time 非必传 | number  [default 1200ms]

toast(txt, time)
```

### 获取手机号组件

```
<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
```

### 复制文本组件

```
1.引入
import { copyTxt } from '@/common/util'

2.使用
txt 必传 | String
copyTxt(txt)
```

### 路由跳转封装

```
1.引入
import { router } from '@/common/util'

2.使用
taabbar 非必传 | String  (传了tabbar可以跳转到tabbar页面)
router('/pages/xxx', 'tabbar')
```

### 使用字体图标

```
1.使用
<view class="iconfont icon-zqq-guanbi"></view>
或
<text class="iconfont icon-zqq-guanbi"></text>
```

### uv-ui 按需引入

```
1.进入官方文档(链接如下)，点击需要使用的组件 点击下载&安装 即可跳转至uniapp插件市场进行导入

https://www.uvui.cn/components/form.html
```

### 全局无数据组件

```
1.无需引入，直接页面使用，可传入图标路径
 <empty-list
    title="暂无数据"
  />
```
