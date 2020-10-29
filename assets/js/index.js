//入口函数
$(function () {
    //1获取用户信息,渲染头像和用户名
    getUserInof()

    //2退出登录
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提供询问狂
        layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //2.1 清空本地token
            localStorage.removeItem('token')
            //2.2跳转到登录页面
            location.href = '/login.html'
            // 2.3 关闭询问狂(框架自带)
            layer.close(index);
        });

    })


})

//获取用户信息必须封装成全局函数(写到入口函数之外)
//后面其他的页面要调用
function getUserInof() {
    //发起ajax 请求
    $.ajax({
        // method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem("token") || ""
        },
        success: function (res) {
            // console.log(res);
            //判断状态
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功,渲染用户头衔信息
            renderAvatar(res.data)
        }

    })
}
// 封装用户头像渲染函数
function renderAvatar(user) {
    //1用户名(昵称优先  没有昵称就用username)
    var name = user.nickname || user.username
    $('#welcome').html("欢迎&nbsp;&nbsp;" + name)
    // 2用户头像
    if (user.user_pic !== null) {
        //有头像
        $('.layui-nav-img').show().attr("src", user.user_pic)
        $('.text-avatar').hide()
    } else {
        //没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}