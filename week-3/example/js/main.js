

$('document').ready(function(){


	$.get('http://localhost/wordpress/wp-json/wp/v2/posts',
	function (data){

		console.log(data);

		// check for things to do with arrays
		if (data.length) {

			// loop through the data
			//  and write each post onto the page

		} else {

			// throw an error
			//  and tell the user something went wrong

		}

	});












});