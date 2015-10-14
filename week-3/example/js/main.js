/**
 *	This JS waits until the page has loaded,
 *	 then goes and fetches all the posts
 *	 in our WordPress database, and displays
 *	 them all on our page.
 */


// Wait until the document has loaded completely
$('document').ready(function(){


	// Now, let's go fetch the WordPress posts from the API
	$.get('http://localhost/wordpress/wp-json/wp/v2/posts', function (data){
		
		// Once we get a successful response,
		//  lets just log it in our browser console.
		console.log(data);


		// SANITY CHECK!
		//  Make sure we have proper data

		/**
		 * The `if` just checks for a `true` value.
		 * Therefore, if data's length is not 0, this will be true.
		 *  (And an array's length can never be less than 0)
		 */
		if (data.length) {

			// So, now that we know we have some proper data,
			//  let's clear the waiting content wrapper of the 
			//  `loading` message:
			$('#content').html('');


			//  Secondly, we need to loop through the array

			// Use this, if you want to:
			// for (var i = 0; i < data.length; i++) {

			// or...
			//  this one loops through the data in the opposite direction
			//  starting at the last item, and moving forward
			for (var i = data.length - 1; i >= 0; i--) {
				// Assign a variable to store the current iteration
				//  note the "data[i]" <- the `i` changes on every loop,
				//  meaning we get a different post each time we run the loop.
				var post = data[i];

				// From the browser console log (above), as well as from the
				//  endpoint itself, we can gather the JSON structure.
				// Therefore, we know that the title and content sit here:

				var title = post.title.rendered;
				var content = post.content.rendered;


				// Now all that's left to do is to actually write it onto the page!
				//  So, remember, this happens FOR EACH ITERATION of the loop we're in
				//  right now!

				// Create an empty <h2>, and pop the title into it:
				var h2 = $('<h2 />').html(title);

				// Create an empty <div>, and place the content into it:
				var div = $('<div />').html(content);

				// Now, append them to the wrapper in our HTML page:
				$('#content').append(h2);
				$('#content').append(div);

				// Done! Yay!

			};
			//  and write each post onto the page

		} else {

			// Data was returned properly,
			//  but there are no posts!

			// Let's create a warning message
			var message = "Oops, there doesn't seem to be any posts yet. " +
						  "Sign into WordPress and go create some!";

			// And place it on our page!
			$('#content').append(message);

		}

	})
	
	// Handle errors with the $.get()
	.fail(function(){

		// Let's create another message
		//  to let the user know what went wrong!
		var message = "Oops, it seems the WP REST API endpoint is unreachable. " +
					  "Make sure you have Apache and MySQL running, and that you're browsing from your localhost."

		// Remember, due to scope and closure, the `message` variable
		//  doesn't exist inside this {block}, so we're free to use the same name again.

		console.warn(message);
	});


}); // END: document.ready