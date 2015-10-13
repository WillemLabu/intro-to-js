
/**
 *	This file loads content from a different
 *	file and plonks them on the page.
 */ 


$('document').ready(function(){


	$.get('content/featured.html', function(data){
		$('#wrap').html(data);
	})
	.fail(function() {
		console.warn('Something went wrong!');
	});

	/*

	The code above is (functionally) the exact same thing as below:

	$.ajax({
		type: 'GET',
		url: 'content/featured.html',
		success: function (data) {
			console.log('Got the content!');

			// Put the data into the container!
			$('#wrap').html(data);

		},
		error: function () {
			console.warn('Something went wrong!');
		}

	});
	*/

});