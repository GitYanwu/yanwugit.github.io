// 获取窗口高度 自适应
$(document).ready(function(){
  var height = $(window).height() || $(document).height() || $(document.body).height() || $(document.body).outerHeight(true);
  if(!height || height <= 0){
    height = 727;
  }else{
    height = height - 192;
  }
  $('.main-data').css('min-height',height + 'px');

  mainPjax();

  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/android/i) == "android" || ua.match(/iPhone/i) == "iphone" || ua.match(/iPad/i) == "ipad") {
      $("#pcBox").css("display","none");
      $("#mobileBox").css("display","block");
  }else{
      $("#pcBox").css("display","block");
      $("#mobileBox").css("display","none");
  }
})
function mainPjax(){
  // 局部刷新
  $(document).pjax('a', '#pjax-container');
}

// 兼容性用JQ实现吸顶效果
$(window).scroll(function() {
    if($(window).scrollTop() > 120){
        $("#rightFooterFixed").attr("class","right-footer-fixed");
    }else{
        $("#rightFooterFixed").attr("class","right-footer-unset");
    }
});

// 解析xml文件,进行站内搜索
var searchFunc = function (path, text) {
    'use strict';
    // 搜索框显示搜索关键字
    $('#mainSearchText').val(text);
    $.ajax({
      // 0x01. load xml file
      url: path,
      dataType: "xml",
      success: function (xmlResponse) {
        var datas = $("entry", xmlResponse).map(function () {
          return {
            title: $("title", this).text(),
            content: $("content", this).text(),
            url: $("url", this).text()
          };
        }).get();
        var htmlStr = ""; 
        // 记录匹配的数据条数
        var matchNumber = 0;
        for(var i = 0;i< datas.length;i++){
          var title = datas[i].title;
          // 匹配标题数据
          if(title && title.length > 0 && title.match(new RegExp(text,'gi'))){
            title = title.replace(new RegExp(text,'gi'),function(value){
              return '<span class="lb-color-red bg-fff">' + value + '</span>';
            });
            matchNumber += 1;
          }else{
            continue;
          }
          var content = datas[i].content;
          var url = datas[i].url;
          htmlStr += '<div class="bg-fff m10 dis-flex">'+
                        '<div class="main-search-title-search-result-item-icon-box">'+
                            '<div class="main-search-result-item-tips"></div>'+
                        '</div>'+
                        '<div class="main-search-result-item-content">'+
                            '<a class="bg-fff main-search-title-search-result-item-title" href="' + url + '">' + title + '</a>'+
                            '<div class="bg-fff main-search-title-search-result-item-content">'+ content + '</div>'+
                            '<div class="main-search-title-search-result-item-black"></div>'+
                        '</div>'+
                        '<div class="main-search-title-search-result-item-icon-box"></div>'+
                    '</div>';
        }
        //如果不存在对应的数据
        if(matchNumber <= 0){
          htmlStr += '<div class="bg-fff main-search-no-data-box">' +
                        '<span class="bg-fff main-search-no-data-icon-box">' +
                          '<span class="iconfont icon-kulian bg-fff main-search-no-data-tips-icon"></span>' +
                          '<span class="bg-fff main-search-no-data-tips-text">暂无相关数据</span>' +
                        '</span>' +
                      '</div>';
        }else if(matchNumber > 7){
          htmlStr += '<div class="main-search-result-more-tips">没有更多数据了</div>';
        }
        $('#searchResultContent').html(htmlStr);
      }
    });
  }
