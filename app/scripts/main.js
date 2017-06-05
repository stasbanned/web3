$(function() {
	$.ajax({
		url: '/menu.xml',
		type: 'GET',
		dataType: 'xml',
	})
	.done(function(xml) {
  	var $xml = $( xml );
  	var $container = $('#container');
  	var domStr = '<ul>';

  	$.each($xml.find('group'), function(index, head) {
  		domStr += `<li><a href="${ $(this).find('head').attr('href') }">${ $(this).find('head').text() }</a>`;
  		var items = $(this).find('item');

  		if (items.lenght !== 0) {
  			domStr += '<ul class="items">';
	  		$.each(items, function(index, item) {
	  			domStr += `<li><a href="${ $(item).attr('href') }">${ $(item).text() }</a></li>`;
	  		});
	  		domStr += '</ul>';
  		}

  		domStr += '</li>';
  	});

  	domStr += '</ul>';
  	$container.html(domStr);
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
});