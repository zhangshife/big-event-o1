$(function () {
    // 1.1点击去注册账号,隐藏登录界面,显示注册界面
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()


    })
    // 1.2点击去登录,显示登录页面 隐藏注册页面
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    // 2自定义效验规则
    var form = layui.form
    form.verify({
        //定义规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //value代表确认密码的值
            //获取注册表单密码框的值
            var pwd = $(".reg-box input[name=password]").val()
            //判断
            if (value !== pwd) {
                return "两次密码输入不一致  请重新输入"
            }

        }
    })
    /// 3监听注册表单的提交事件
    var layer = layui.layer
    $('#form-reg').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                //   console.log(res);
                //判断
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg(res.message)
                }
                //提交成功后处理代码
                // alert(res.message)
                layer.msg('注册成功,请登录!')
                //手动切换到登录页面
                $('#link-login').click()
                //清空注册表单的内容
                $('#form-reg')[0].reset()
            }
        })
    })
    // 4登录功能(给#form-login绑定事件,button按钮触发提交事件)
    $('#form-login').submit(function (e) {
        //终止表单默认提交
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: "POST",
            url: '/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                //错误判断
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //登录提示,保存token,跳转页面
                layer.msg('恭喜你,登录成功')
                //保存token,未来的接口要使用token
                localStorage.setItem('token', res.token)
                //跳转
                location.href = '/index.html'
                console.log(token);
            }
        })
    })

})