"use strict";!function(){var n=location.search.slice(1).split("&"),l="";n.forEach(function(n){"id"===n.split("=")[0]&&(l=n.split("=")[1])});var s=[],a=document.querySelector(".product_intro");pAjax({url:"/phone?tf_id=TFM00R0_256&page=1&size=100"}).then(function(n){n=JSON.parse(n),s=n.result;var i=n.result.filter(function(n){return n.goods_id==l});console.log(i[0]);var t='\n            <div class="preview_wrap fl">\n            <div class="preview_img">\n                <img src="'+i[0].hd_thumb_url+'" alt="">\n            </div>\n            <div class="preview_view"  style="display: none">\n                <img src="'+i[0].hd_thumb_url+'" alt="">\n            </div>\n\n            <div class="preview_list">\n                <a href="#" class="arrow_prev"></a>\n                <a href="#" class="arrow_next"></a>\n                 <ul class="list_item">\n                     <li>\n                         <img src="'+i[0].hd_thumb_url+'" alt="">\n                     </li>\n                     <li class="current">\n                         <img src="'+i[0].hd_thumb_url+'" alt="">\n                     </li>\n                     <li>\n                         <img src="'+i[0].hd_thumb_url+'" alt="">\n                     </li>\n                     <li>\n                         <img src="'+i[0].hd_thumb_url+'" alt="">\n                     </li>\n                     <li>\n                         <img src="'+i[0].hd_thumb_url+'" alt="">\n                     </li>\n                 </ul>\n            </div>\n        </div>\n        <div class="itemInfo_wrap fr">\n            <div class="sku_name">\n            '+i[0].goods_name+'\n            </div>\n            <div class="summary">\n                <dl class="summary_price" style="padding:8px">\n                    <dt style="float:left; font-size:14px; margin-right:10px">价格</dt>\n                    <dd style="margin-top:-6px">\n                        <i class="price" style="color:red">￥<b style="font-size:20px">'+i[0].group_price/100+'</b> </i>\n                        <div class="remark" style="margin-top:20px;font-size:14px;">'+i[0].sales_tip+'</div>\n                    </dd>\n                </dl>\n                <dl class="buycount">\n                    <a data-id="'+i[0].goods_id+'" class="addToCart">加入购物车</a>\n                    <a href="../html/shoppingCart.html" class="ToCart">进入购物车</a>\n                </dl>\n            </div>\n        </div> ';a.innerHTML+=t;var r=document.querySelector(".addToCart");console.log(r),r.onclick=function(n){var i=n.target.getAttribute("data-id"),t=JSON.parse(localStorage.getItem("shoppingCart"))||[],r=t.find(function(n){return n.goods_id==i});r?r.number++:((r=s.find(function(n){return n.goods_id==i})).number=1,t.push(r)),localStorage.setItem("shoppingCart",JSON.stringify(t))}})}();