# app.json 配置说明

## 页面配置
`pages` 数组定义了小程序的页面路径：
- `pages/launch/launch`：启动页
- `pages/home/home`：主页
- `pages/login/login`：登录页
- `pages/index/index`：索引页
- `pages/record/record`：记录页
- `pages/withdraw/withdraw`：支取记录页
- `pages/summary/summary`：月度汇总页
- `pages/budget/budget`：预算页

## 窗口配置
`window` 对象配置了小程序窗口的样式：
- `backgroundTextStyle`：窗口文字样式，此处设置为 `light`
- `navigationBarBackgroundColor`：导航栏背景颜色，设置为 `#FF6B35`
- `navigationBarTitleText`：导航栏标题，显示为 `薪火簿`
- `navigationBarTextStyle`：导航栏文字样式，设置为 `white`
- `enablePullDownRefresh`：是否允许下拉刷新，此处设置为 `false`
- `onReachBottomDistance`：页面上拉触底事件触发时距页面底部距离，设置为 `0`

## 分包配置
`subpackages` 数组用于配置小程序的分包信息：
- `root`：分包的根目录，此处为 `subpackages/fonts`
- `pages`：分包中的页面路径，包含 `animation` 页面

## 其他配置
- `style`：小程序的样式版本，此处设置为 `v2`
- `sitemapLocation`：指定小程序的 sitemap 文件路径，此处为 `sitemap.json`
- `requiredBackgroundModes`：小程序需要在后台运行的模式，包含 `audio` 和 `location`
- `permission`：小程序需要获取的用户权限，例如 `scope.userLocation` 用于工地位置记录功能和记录账单地理位置信息
- `lazyCodeLoading`：小程序的代码加载模式，此处设置为 `requiredComponents`

## 字体授权声明
- 霞鹜文楷：遵循 [SIL Open Font License 1.1](https://scripts.sil.org/OFL)
- 允许商用及二次分发，禁止单独销售字体文件