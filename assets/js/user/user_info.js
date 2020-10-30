$(function () {
    // console.log('hi');
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "长度只能在1~6个字符之间!"
            }
        }
    })

    //用户渲染
    initUserinfo()
    //导入layer
    var layer = layui.layer
    //2封装函数  获取用户信息
    function initUserinfo() {
        //发送ajax请求
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                //判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                //成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 3重置
    // 为重置按钮绑定点击事件,也可以为表单绑定重置事件
    $('#btnReset').on('click', function (e) {
        // alert("111")
        //阻止默认提交
        e.preventDefault()
        //重新获取用户信息
        initUserinfo()
    })
    // 4修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),//快速获取表单数据
            success: function (res) {
                //判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('用户信息更改成功')
                //调用父页面的更新用户信息和头像方法
                // window指的是iframe  
                // window.parent指的是当前的整个页面index.html 
                window.parent.getUserInof()
            }

        })
    })

})