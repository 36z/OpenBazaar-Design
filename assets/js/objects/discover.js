$(function() {
  window.Discover.initialize();
});

window.Discover = {
  initialize: function(){
  },

  contracts: function contracts(updatePageViews, backwards){
    if (updatePageViews){
      pageViews.push({"page": "home", "active": true});
      Navigation.unsetActivePage();
    }
    Helper.hideAll();
    $('.ob-icon').show();
    
    if (backwards){
      $('.loading-icon').hide();
      $('.loading-message').html(_.shuffle(messages)[0]);
      $('.connecting').fadeIn();
      Connect.load();
      setTimeout(function(){  
        Discover.populateFeed();
        $('.connecting').hide();
        $('.discover').fadeIn('fast');
      }, 1000);
    }else{
      $('.loading-message').html('Connecting to stores...');
      $('.loading-icon').hide();
      $('.connecting').fadeIn();
      Connect.load();
      setTimeout(function(){  
        Discover.populateFeed();
      }, delay);
    }
    Helper.setDefualtColors(false);
  },

  populateFeed: function populateFeed(){
    $('.connecting').hide();
    $('.discover, .discover-contracts').show();
    _.each(_.shuffle(users), function(user){
      _.each(_.shuffle(user.contracts), function(contract){
        Contract.renderGridContract(user, contract, '.discover-contracts');
      });
    });
  }  
}