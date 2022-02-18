$(function () {
    //引入layui的表单对象
    var form = layui.form;
    //引入layui的弹出层对象
    layer = layui.layer;
    //登录和注册盒子的显示与隐藏
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //通过layui提供的接口自定义表单验证
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    // 登录功能
    $('#login_form').submit((e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/api/login',
            data: $('#login_form').serialize()
        }).then((res) => {
            console.log(res);
            if (res.data.status != 0) return layer.msg('账号或密码错误，登录失败');
            localStorage.setItem('token', res.data.token);
            layer.msg('登录成功');
            setTimeout(() => {
                location.href = 'index.html';
            }, 500)

        })
    })
    //注册功能
    $('#reg_form').submit((e) => {
        e.preventDefault();
        console.log($('#reg_form').serialize());
        //验证两次密码是否一致
        if ($('[name=repwd]').val() != $('#pwd').val()) {
            return layer.msg('两次密码不一致');
        }
        axios({
            method: 'POST',
            url: '/api/reguser',
            data: $('#reg_form').serialize()
        }).then((res) => {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            layer.msg('注册成功！');
            setTimeout(() => {
                $('#link_login').click()
            }, 500)
        })
    })
})

