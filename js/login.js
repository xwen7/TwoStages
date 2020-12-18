
; (function () {
    // 获取元素
    let usernameInp = document.getElementById("username");
    let passwordInp = document.getElementById("password");
    let remenberInp = document.getElementById("remenberInp");
    let loginBtn = document.getElementById("loginBtn");
    // 获取本地存储的信息 
    let userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userinfo) {
        let { username, password, isRemenber } = userinfo;
        usernameInp.value = username;
        passwordInp.value = password;
        remenberInp.checked = isRemenber;
    }





    // 定义用户名和密码锁
    let username_lock = false;
    let password_lock = false;
    // 用户名验证正则
    usernameInp.onblur = function () {
        // 获取值
        let val = this.value;
        // 定义正则表达式
        let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
        // 验证
        if (reg.test(val)) {
            username_lock = true;
            this.style.borderColor = "green";
        } else {
            username_lock = false;
            this.style.borderColor = "red"
        }
        console.log(username_lock);
    }


    // 密码验证正则
    passwordInp.onblur = function () {
        // 获取用户的密码
        let val = this.value;
        // 定义正则表达式
        let reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
        
        // 验证
        if (reg.test(val)) {
            password_lock = true;
            this.style.borderColor = "green";
        } else {
            password_lock = false;
            this.style.borderColor = "red"
        }
        console.log(password_lock)
    }


   
 // 记住密码 
    remenberInp.onchange = function () {
        // 获取当前状态
        let isRemenber = this.checked;
        // 如果为真  将用户名、密码、当前元素的状态填入本地存储 
        let obj = {
            username: username.value,
            password: password.value,
            isRemenber
        }
        // 判定
        if (isRemenber) {
            localStorage.setItem("userinfo", JSON.stringify(obj))
        } else {
            localStorage.removeItem("userinfo");
        }
        console.log(isRemenber)
    }
    // 登录按钮
    loginBtn.onclick = function() {
        // 人工让事件触发
        usernameInp.onblur();
        passwordInp.onblur();
        console.log(username_lock, password_lock)
        // 判断锁是否打开
        if (!(username_lock && password_lock)) {
            // 说明至少有一个是没有打开的
            return;
        }

        ajax({
            url: '../php/login.php',
            data: {
                username: usernameInp.value,
                password: passwordInp.value
            },
            success:function(res){
                res = JSON.parse(res);
                console.log(res.error);
                if (!res.error) {
                    window.location = "../index.html" 
                }else{
                    alert("用户名或密码错误")
                }
               
                 }
        })


    }



})();

