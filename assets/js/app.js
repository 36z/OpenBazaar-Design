var pageViews = [{"page": "home", "active": true}]
var defaultPrimaryColor = "#086A9E";
var defaultSecondaryColor = "#327eb8";
var defaultTextColor = "#ffffff";
var delay = 1900; //3000
var fade = 500;
$store = {'avatar': '', 'name': '', 'description': '', 'colorprimary': '', 'colorsecondary': '', 'colortext': '', 'website': '', 'email': '', 'guid': '', 'handle': '', 'items': []};

jQuery.expr[':'].Contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

$(window).load(function(){
  var remote = require('remote');     
  // This isn't playing nice with electron's module loader
  if (!$.fn.mCustomScrollbar && typeof require !== 'undefined') {
    var path = require('path');
    require(path.join(process.cwd(), 'assets', 'js', 'extensions', 'jquery.mCustomScrollbar.min.js'))($);
  }
  $('#main, .chat-conversations, .onboarding-body, .modal-body').mCustomScrollbar({
    theme:"minimal-dark",
    scrollInertia: 0,
    // mouseWheelPixels: 850,
    callbacks:{
      onScroll: function(){
        // if( ($('.vendor').is(':visible') || $('.contract-detail').is(':visible')) && this.mcs.draggerTop >= 168){
        //   $(".vendor-navigation").addClass('vendor-navigation-docked');
        //   $(".vendor").css('margin-top', '64px');
        //   $(".contract-detail").css('margin-top', '64px');
        // }else{
        //   $(".vendor-navigation").removeClass('vendor-navigation-docked');
        //   $(".vendor").css('margin-top', '0');
        //   $(".contract-detail").css('margin-top', '0');
        // }
      }
    }
  });
});

$(function() {
  $.cssHooks.bgColor = {
    get: function(elem) {
      if (elem.currentStyle)
        var bg = elem.currentStyle["bgColor"];
      else if (window.getComputedStyle)
        var bg = document.defaultView.getComputedStyle(elem,
        null).getPropertyValue("background-color");
      if (bg.search("rgb") == -1)
        return bg;
      else {
        bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
    }
    }
  }

  // events
  $(document).on("keyup", keypress);
  // $('#main').on("scroll", scroll);

  // functions
	function start(){
    Chat.loadMessages();
    Onboarding.show();
	}

  function keypress(e){
    e.stopPropagation();
    if($('.input-search').is(":focus") && e.which == 13){ Search.find(); }
    if($('.input-chat-new-message').is(":focus") && e.which == 13) { Chat.saveMessage(); }
    if($('.bitcoin-address').is(":focus")){ $('.onboarding-button-skip').hide(); $('.onboarding-button-next').show(); }
    if($('.vendor-meta-name').is(':focus') && $('.vendor-meta-name').val() !== ""){ $('.vendor-header-2 .vendor-name').html($('.vendor-meta-name').val()); }
    if($('.vendor-meta-description').is(':focus') && $('.vendor-meta-description').val() !== ""){ $('.vendor-header-2 .vendor-description').html($('.vendor-meta-description').val()); }
    if($('.vendor-meta-avatar').is(':focus') && $('.vendor-meta-avatar').val() !== ""){ $('.vendor-header-2 .vendor-avatar').css('background', 'url(' + $('.vendor-meta-avatar').val() + ') 50% 50% / cover no-repeat'); }
    if($('.discover-vendor-search').is(':focus') ){
      var locations = $(".discover-vendors-list").find("tr").hide();
      locations.filter(":Contains('" + $('.discover-vendor-search').val() + "')").show();
    }    
    if($('.onboarding-location-search').is(':focus') ){
      var locations = $(".onboarding-location-list").find("tr").hide();
      locations.filter(":Contains('" + $('.onboarding-location-search').val() + "')").show();
    }    
    if($('.search-store').is(':focus') ){
      var search = $('.search-store').val();
      if ($('.input-search').val().indexOf(" ") > 0){
        var handle = $('.input-search').val().substring(0, $('.input-search').val().indexOf(" "));
      }else{
        var handle = $('.input-search').val();
      }
      var locations = $(".user-page-contracts .user-page-contracts-grid").find(".contract").hide();
      Navigation.setPageUrl(handle + " " + search);
      locations.filter(":Contains('" + $('.search-store').val() + "')").show();
    }    
    if($('.search-following').is(':focus') ){
      var locations = $(".user-page-following-list").find("tr").hide();
      locations.filter(":Contains('" + $('.search-following').val() + "')").show();
    }     
    if($('.transactions-order-search').is(':focus') ){
      if ($('.transactions-purchases').is(':visible')){
        var orders = $(".transactions-purchases").find("tr").hide();
      }else if($('.transactions-sales').is(':visible')){
        var orders = $(".transactions-sales").find("tr").hide();
      }else if($('.transactions-cases').is(':visible')){
        var orders = $(".transactions-cases").find("tr").hide();
      }
      orders.filter(":Contains('" + $('.transactions-order-search').val() + "')").show();
    }    
    if($('.search-followers').is(':focus') ){
      var locations = $(".user-page-followers-list").find("tr").hide();
      locations.filter(":Contains('" + $('.search-followers').val() + "')").show();
    }
    if($('.onboarding-currency-search').is(':focus') ){
      var locations = $(".onboarding-currency-list").find("tr").hide();
      locations.filter(":Contains('" + $('.onboarding-currency-search').val() + "')").show();
    }
    if($('.onboarding-timezone-search').is(':focus') ){
      var locations = $(".onboarding-timezone-list").find("tr").hide();
      locations.filter(":Contains('" + $('.onboarding-timezone-search').val() + "')").show();
    }
  }

  function scroll(){
    if( ($('.vendor').is(':visible') || $('.contract-detail').is(':visible')) && $('#main').scrollTop() >= 168){
      $(".vendor-navigation").addClass('vendor-navigation-docked');
      $(".vendor").css('margin-top', '64px');
      $(".contract-detail").css('margin-top', '64px');
    }else{
      $(".vendor-navigation").removeClass('vendor-navigation-docked');
      $(".vendor").css('margin-top', '0');
      $(".contract-detail").css('margin-top', '0');
    }
  }

  start();
});
