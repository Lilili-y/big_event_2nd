$(function () {
    function getUserInfo() {
        axios({
            method: 'GET',
            url: '/my/userinfo',
        }).then((res) => {
            console.log(res);
            if (res.data.status != 0) return layui.layer.msg('获取用户信息失败！');
            renderAvatar(res.data)
        })
    }
})