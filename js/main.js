$(function(){

  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });
});

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}



function getRequest(searchTerm){
  var params = {  // why do we need to put quotes around part, key, q, maxResults?
    category_filter: "restaurants",
    limit: 5,
    radius_filter: 1000,
    sort: 2,
    location: searchTerm,
    oauth_consumer_key:"purfxwXXiuS0V0T4XSISGQ",
    oauth_token:"u2i_WgP-3sGAAD3smF99LsGACNq5VkX0",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: new Date().getTime(),
    oauth_nonce:randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
  };
  var url = 'https://api.yelp.com/v2/search/';
  var consumerSecret = 'mz3gtxlFbItGKmnm7dYYOThKzPs'; 
  var tokenSecret = 'dElyP8659EWaOeJTXPz0LtFeGOk';
  var method = 'GET';
  var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
  params['oauth_signature'] = signature;


  $.getJSON(url, params, function(data){
    console.log(data);
    showResults(data.businesses);
  });
}

function showResults(businesses){
  var html = "";
  $.each(businesses, function(index,business){
    // console.log(resturant.name);
      html += "<li><p class= 'results'>" + video.snippet.title +
      "</p> <a href='https://www.youtube.com/watch?v=" + video.id.videoId +"'> <img src='" +  video.snippet.thumbnails.medium.url+ "'/></a></li>" ;

      html += "<li>" + business.name + "<br><img href='" + business.image_url + "' /><br><a href='" + business.url + "'>Site</a></li>";
  });
  $('.results').html(html);
}

