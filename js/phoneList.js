; (function () {
    // 定义两个变量
    // 一个变量记录一页的条数
    var dataCount = 20;
    // 一个变量记录当前是第几页
    var currentPage = 1;
    // 获取四个ul
    var uls = document.querySelector(".list-group");
    // 获取分页组件
    var pagination = document.querySelector(".pagination");
    var allData = [];
    var num = 0;

    pAjax({

        // https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info?tf_id=TFM00R0_256&page=1&size=100
                url: '/phone?tf_id=TFM00R0_256&page=1&size=100',
            }).then(res => {
                res = JSON.parse(res);
                if (res.result) {
                    for(var i = 0; i < res.result.length; i++){
                        res.result[i].sales = 0;
                    }
                    localStorage.setItem('shoppingCartInfoo', JSON.stringify(res.result,));
                    allData = res.result;
                    // 从数组中截取一段数据
                    var arr = res.result.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
                    // 传递数据 渲染结构
                    renderData(arr);
        
                    // 计算应当有多少页
                    num = Math.ceil(allData.length / 10);
                    renderPagination(currentPage);
                }
            });
    // 添加数字按钮点击事件
    pagination.onclick = function (e) {
        // 通过e判断点击到的是谁
        if (e.target.className === "leftBtn") {
            // 点击的是左按钮  让当前页--
            currentPage--;
            // 边界判定
            if (currentPage < 0) {
                currentPage = 0;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 根据数据渲染结构
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "rightBtn") {
            // 点击的是右按钮  让当前页++
            currentPage++;
            // 边界判定
            if (currentPage > num) {
                currentPage = num;
                return;
            }
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr)
            renderPagination(currentPage);
        } else if (e.target.className === "num") {
            if (currentPage === e.target.innerHTML - 1) {
                return;
            }
            // 当前页变为 点击的按钮的页数 - 1  
            currentPage = e.target.innerHTML - 1;
            // 截取数据
            var arr = allData.slice(currentPage * dataCount, currentPage * dataCount + dataCount)
            // 根据数据渲染结构
            renderData(arr);
            renderPagination(currentPage);
        }
    }

    function renderData(arr) {
            uls.innerHTML = "";
        // 循环前20条数据 分别渲染成html结构 显示在页面中
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            let str =  `
            <li class="sk_goods">
                <a href="../html/detail.html?id=${item.goods_id}&a=1">
                    <img src="${item.hd_thumb_url}" alt="">
                    <h5 class="sk_goods_title">${item.goods_name}</h5>
                </a>
                <p class="sk_goods_price"><em>￥${item.group_price / 100}</em> <del>￥${item.group_price_origin / 100}</del></p>
                <a data-id="${item.goods_id}" class="sk_goods_buy addToCart">加入购物车</a>
            </li>
            `;
            uls.innerHTML += str;
        }
    }

    function renderPagination(currentPage) {
        var str = `<li>
                <a aria-label="Previous">
                    <span class='leftBtn' aria-hidden="true">&laquo;</span>
                </a>
            </li>`
        // 判断当前页 
        if (currentPage <= 6) {
            for (var i = 0; i < 10; i++) {
                str += `<li><a class='num'>${i + 1}</a></li>`;
            }
        } else {
            var end = currentPage + 4 > num ? num : currentPage + 4;
            for (var i = currentPage - 6; i < end; i++) {
                str += `<li><a class='num'>${i + 1}</a></li>`;
            }
        }
        str += ` <li>
            <a  aria-label="Next">
                <span class='rightBtn' aria-hidden="true">&raquo;</span>
            </a>
        </li>`
        pagination.innerHTML = str;
    }

    // 使用委托模式实现添加购物车点击功能
    // 获取.list元素
    let list_group = document.querySelector(".list-group");
    // 添加点击事件
    list_group.onclick = function(e) {
            if(!(getCookie('登录成功'))){
                alert("请先登录");
                location.href = '../html/login.html'
            }
            // 通过事件对象判定触发事件的元素是谁
            if (e.target.className.includes("addToCart")) {
                // 获取当前商品的信息ID
                var goods_id = e.target.getAttribute('data-id');
                // 拿着ID去本地存储里看一看有没有
                var arr = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                var goods_item = arr.find(function(value) {
                    return value.goods_id == goods_id;
                });
                // 判断
                if (goods_item) {
                    // 如果为真 说明已经存在 
                    goods_item.number++;
                } else {
                    // 说明不存在
                    // 拿着id去大数组里找 
                    goods_item = allData.find(function(value) {
                        return value.goods_id == goods_id;
                    });
                    // 设置一个sales属性为1 然后直接往本地存储数组里存储就好了
                    goods_item.number = 1;
                    arr.push(goods_item);
                }
                // 将修改之后的数据放回本地存储
                localStorage.setItem("shoppingCart", JSON.stringify(arr));
            }
        }
       
})();