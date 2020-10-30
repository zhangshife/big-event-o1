$(function () {
    //定义效验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            //value表示是新密码,旧密码需要获取
            //判断
            if (value == $("[name=oldPwd]").val()) {
                return "新密码不能和就密码相同"
            }
        },
        rePwd: function (value) {
            // value 表示是再次输入的密码  新密码需要重新获取
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码输入不一致,请重新输入"
            }
        }
    })

    //2 修改密码
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交事件
        e.preventDefault()
        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                //清空密码框
                $('.layui-form')[0].reset()
            }
        })
    })
})