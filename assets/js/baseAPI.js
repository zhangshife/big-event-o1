// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 1在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //对需要权限的接口配置信息
    //必须以my开头才行
    // 2
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 3拦截所有的响应 判断身份认证信息
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            //  强制清空 token
            localStorage.removeItem('token')
            //强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})
