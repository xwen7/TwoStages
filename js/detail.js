;(function() {

    // 获取URL
    var arr = location.search.slice(1).split("&");
    var id = "";
    arr.forEach(function(value) {
        if (value.split('=')[0] === "id") {
            id = value.split('=')[1];
        }
    });

    var allData = [];
 
    var product_intro = document.querySelector(".product_intro");

    pAjax({
            url: '/phone?tf_id=TFM00R0_256&page=1&size=100',
         }).then(res => {
                res = JSON.parse(res);
                allData = res.result;
                var sum = res.result.filter(function(value) {
                    return value.goods_id == id;
                });
console.log(sum[0]);
            let str = `
            <div class="preview_wrap fl">
            <div class="preview_img">
                <img src="${sum[0].hd_thumb_url}" alt="">
            </div>
            <div class="preview_view"  style="display: none">
                <img src="${sum[0].hd_thumb_url}" alt="">
            </div>

            <div class="preview_list">
                <a href="#" class="arrow_prev"></a>
                <a href="#" class="arrow_next"></a>
                 <ul class="list_item">
                     <li>
                         <img src="${sum[0].hd_thumb_url}" alt="">
                     </li>
                     <li class="current">
                         <img src="${sum[0].hd_thumb_url}" alt="">
                     </li>
                     <li>
                         <img src="${sum[0].hd_thumb_url}" alt="">
                     </li>
                     <li>
                         <img src="${sum[0].hd_thumb_url}" alt="">
                     </li>
                     <li>
                         <img src="${sum[0].hd_thumb_url}" alt="">
                     </li>
                 </ul>
            </div>
        </div>
        <div class="itemInfo_wrap fr">
            <div class="sku_name">
            ${sum[0].goods_name}
            </div>
            <div class="summary">
                <dl class="summary_price" style="padding:8px">
                    <dt style="float:left; font-size:14px; margin-right:10px">价格</dt>
                    <dd style="margin-top:-6px">
                        <i class="price" style="color:red">￥<b style="font-size:20px">${sum[0].group_price / 100}</b> </i>
                        <div class="remark" style="margin-top:20px;font-size:14px;">${sum[0].sales_tip}</div>
                    </dd>
                </dl>
                <dl class="buycount">
                    <a data-id="${sum[0].goods_id}" class="addToCart">加入购物车</a>
                    <a href="../html/shoppingCart.html" class="ToCart">进入购物车</a>
                </dl>
            </div>
        </div> `;
        product_intro.innerHTML += str;


        let addToCart = document.querySelector(".addToCart");
        console.log(addToCart);


           addToCart.onclick = function(e) {
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

    })


})();