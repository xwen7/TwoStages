
;(function($) {
  $.fn.Slider = function(options) {
    "use strict";
  
    var settings = $.extend({
      isAuto: true,
      transTime: 2000,
      animateSpeed: 1000,  
      sliderMode: 'fade', //'slide | fade',
      pointerControl: true,
      pointerEvent: 'hover',//'hover' | 'click',
      arrowControl: true,
    }, options);
    var interval;
    var isAnimating     = false;
    var $slider         = $(this);
    var $sliderWrap     = $slider.find('.slider-inner');
    var sliderCount     = $sliderWrap.find('> .item').length;
    var sliderWidth     = $slider.width();
    var currentIndex    = 0;
  
    var sliderFun = {
      controlInit: function() {
        // pointerControl
        if (settings.pointerControl) {
          
          var html = '';
          html += '<ol class="slider-pointer">';
          for (var i = 0; i < sliderCount; i++) {
            if (i == 0) {
              html += '<li class="active"></li>'
            }else{
              html += '<li></li>'
            }
          }
          html += '</ol>'
          $slider.append(html);
            // 指示器居中
          var $pointer = $slider.find('.slider-pointer');
          $pointer.css({
            left: '50%',
            marginLeft: - $pointer.width()/2
          });
        }
        // pointerControl
    
        $slider.on('click', '.slider-control.prev', function(event) {
          sliderFun.toggleSlide('prev');
        });
        $slider.on('click', '.slider-control.next', function(event) {
          sliderFun.toggleSlide('next');
        });
      },
      // slider
      sliderInit: function() {
        sliderFun.controlInit();
        // 模式选择
        if (settings.sliderMode == 'slide') {
          // slide 模式
          $sliderWrap.width(sliderWidth * sliderCount);
          $sliderWrap.children().width(sliderWidth);
        }else{
          // mode 模式
          $sliderWrap.children().css({
            'position': 'absolute',
            'left': "-24px",
            'top': 0
          });
          $sliderWrap.children().first().siblings().hide();
        }
        // 控制事件
        if (settings.pointerEvent == 'hover') {
          $slider.find('.slider-pointer > li').mouseenter(function(event) {
            sliderFun.sliderPlay($(this).index());
          });
        }else{
          $slider.find('.slider-pointer > li').click(function(event) {
            if (currentIndex != $(this).index()) {
                  sliderFun.sliderPlay($(this).index())
              }
          });
        }
        // 自动播放
        sliderFun.autoPlay();
      },
      // slidePlay
      sliderPlay: function(index) {
        sliderFun.stop();
        isAnimating = true;
        $sliderWrap.children().first().stop(true, true);
        $sliderWrap.children().stop(true, true);
        $slider.find('.slider-pointer').children()
          .eq(index).addClass('active')
          .siblings().removeClass('active');
        if (settings.sliderMode == "slide") {
          // slide
          if (index > currentIndex) {
            $sliderWrap.animate({
          left: '-=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
      }, settings.animateSpeed, function() {
          sliderFun.stop();
          isAnimating = false;
          sliderFun.autoPlay()
      });
          } else if (index < currentIndex) {
            $sliderWrap.animate({
              left: '+=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
            }, settings.animateSpeed, function() {
              isAnimating = false;
              sliderFun.autoPlay();
            });
          } else {
            return;
          }
        }else{
          // fade
          if ($sliderWrap.children(':visible').index() == index) return;
          $sliderWrap.children().fadeOut(settings.animateSpeed)
            .eq(index).fadeIn(settings.animateSpeed, function() {
              isAnimating = false;
              sliderFun.autoPlay();
            });
        }
        currentIndex = index;
      },
      // toggleSlide
      toggleSlide: function(arrow) {
        if (isAnimating) {
          return;
        }
        var index;
        if (arrow == 'prev') {
          index = (currentIndex == 0) ? sliderCount - 1 : currentIndex - 1;
          sliderFun.sliderPlay(index);
        }else if(arrow =='next'){
          index = (currentIndex == sliderCount - 1) ? 0 : currentIndex + 1;
          sliderFun.sliderPlay(index);
        }
      },
      // autoPlay
      autoPlay: function() {
        if (settings.isAuto) {
          interval = setInterval(function () {
            var index = currentIndex;
            (currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
            sliderFun.sliderPlay(index);
          }, settings.transTime);
        }else{
          return;
        }
      },
      //stop
      stop: function() {
        clearInterval(interval);
      },
    };
    sliderFun.sliderInit();
  }
  })(jQuery);
  jQuery(document).ready(function($) {
    $('#slider').Slider();
  });


FunLazy({
  beforeLazy: function (src) {
      return src + "?id=" + Math.random().toString(36).substr(2, 10);
  }
});

// 懒加载
var list = document.querySelector(".list");
pAjax({

  /**
   *   location /api {
            proxy_pass  https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info;
        }
        
         location /lazy {
            proxy_pass  https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info;
        }
   */
// https://apiv2.pinduoduo.com/api/gindex/tf/query_tf_goods_info?tf_id=TFM00R0_252&page=1&size=100
    url:"/lazy?tf_id=TFM00R0_252&page=1&size=100",
            }).then(res => {
                res = JSON.parse(res);
                if (res.result) {
                    for(var i = 0; i < res.result.length; i++){
                      console.log(res.result[i].hd_thumb_url);   
                      var str = `
                      <li>
                          <img src="${res.result[i].hd_thumb_url}">
                          <p class="title">
                              <i class="zyIcon"></i>
                              ${res.result[i].goods_name}
                          </p>
                          <p class="price-box">
                              <span class="price"><i>¥</i><em>${res.result[i].normal_price / 100}</em></span>
                              <span class="refprice"><i>¥</i><em>${res.result[i].market_price / 100}</em></span>
                          </p>
                      </li>
                      `
                    list.innerHTML += str;
                  }
              }
  
});

