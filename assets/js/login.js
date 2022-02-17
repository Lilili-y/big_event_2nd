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
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    // 注册请求
    $('#login_form').submit((e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/api/login',
            data: $('#login_form').serialize()
        }).then((res) => {
            console.log(res);
            if (res.status != 0) return layer.msg('账号或密码错误，登录失败');
            localStorage.setItem('token', res.token);
            layer.msg('登录成功');
            setTimeout(() => {
                location.href = 'index.html';
            }, 500)

        })
    })
})

// if ($('[name=repwd]'.val() != $('[name=password]'))) {
//     return layer.msg('两次密码不一致');
// }