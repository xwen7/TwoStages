// 获取元素
var user = document.getElementById("username");
var pass = document.getElementById("password");
var password1 = document.getElementById("password1");
var submitBtn = document.getElementById("submitBtn");
// 定义两个锁tel_lock
  let usernames_lock = false;
  let passwords_lock = false;
// 验证用户的手机号
user.onblur = function () {
          // 获取值
          let val = this.value;
          // 定义正则表达式
          let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
          // 验证
          if (reg.test(val)) {
            ajax({
                url:"../php/checktel.php",
                data:{
                  usernames:val
                },
                success:function(data){
                      data = JSON.parse(data);
                      console.log(data);
                      if (!data.error) {
                        usernames_lock = true;
                        user.style.borderColor = "green"
                        alert(data.data);

                      } else {
                        usernames_lock = false;
                        user.style.borderColor = "red"
                        alert(data.data);
                      }
                  }
            })
  
          } else {
              usernames_lock = false;
              user.style.borderColor = "red"

          }
      }
pass.onfocus = function () {
    password1.value = "";
}
// 验证密码
pass.onblur = function () {
    // 获取用户输入的密码
    var val = password.value;
    // 定义正则表达式 
    var reg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
    // 使用正则验证输入的值 如果符合提示用户输入正确 如果不符合提示用户输入错误
    passwordTips.style.color = reg.test(val) ? "green" : "red";

    if (!reg.test(val)) {
        password_lock = false;
        passwordTips.style.color = 'red';
        return;
    }
    password_lock = true;
}
password1.onblur = function () {
    // 获取密码的第一次输入
    var val = password.value;
    // 获取密码的第二次输入
    var val1 = password1.value;
    // 定义正则表达式 
    var reg =/^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/;
    if (!reg.test(val1)) {
        password_lock = false;
        password1Tips.innerHTML = "×";
        password1Tips.style.color = "red";
        return;
    }
    password1Tips.innerHTML = val === val1 ? "√" : "×";
    password1Tips.style.color = val === val1 ? "green" : "red";
    password_lock = val === val1;
}
submitBtn.onclick = function() {
    if (!(usernames_lock && password_lock)) {
        console.log(tel_lock, password_lock);
        alert("请重新检查");
        return;
    }
    // 获取手机号
    var use = user.value;
    // 获取密码
    var pass = password.value;
    // 发送ajax到注册接口
    console.log(pass);
    ajax({
            url: '../php/register.php',
            data: {
                usernames: use,
                passwords: pass,
            },
            success:function(res){
                console.log(res);
                if (!res.error) {
                    alert("注册成功")
                    window.location = "../html/login.html" 

                }else{
                    alert("注册失败")
                }
            }
        
        })
}


