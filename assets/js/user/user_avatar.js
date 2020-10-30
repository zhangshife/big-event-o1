$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2点击上传按钮触发文件选择框的触发事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    // 3修改裁剪区域
    var layer = layui.layer
    $("#file").on('change', function (e) {
        // 3.1拿到用户选择的文件
        var file = e.target.files[0]
        // 前端非空效验
        if (file === undefined) {
            return layer.msg("请选择图片")
        }
        // 3.2根据选择的文件,创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file)
        //3.3先销毁就得裁剪区域,再重新设置图片路径,再重新创建裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 4为确定按钮绑定点击事件
    $("#btnUpload").on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        //发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功')
                //调通父页面的
                window.parent.getUserInof()
            }
        })
    })
})