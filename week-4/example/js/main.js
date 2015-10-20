
/**
 *	This script will wait until the document
 *	 is ready, and then handle the sign in form
 *	 events and responses.
 */
$('document').ready(function(){

	$('#email, #password').on('keypress', function(){
		resetFormErrors();
	});

	// Form submission handler
	$('#formSignIn').on('submit', function(event) {

		// Validate the form
		if (formIsValid()) {
			console.log('Form is valid, continue with submission.');
		} else {
			// Stop form submission
			return false;
		}

		// Intercept the submission
		//  and send it via $.ajax() instead

		var email = $('#email').val();
		var password = $('#password').val();

		var serialisedData = {
			"user": email,
			"pass": password
		};

		$('#email, #password, #formSignIn button').attr('disabled', 'disabled');

		$.ajax({
			data: serialisedData,
			url: 'api/login.json',
			type: 'POST',
			success: function(response){
				console.log('success', response);

				$('#email, #password, #formSignIn button').removeAttr('disabled');

				if (response.authorised) {

					$('.modal-title').html('Success!');
					$('.modal-body').html('You are now authorised, yay!');
					$('#myModal').modal();

				} else {

					$('.modal-title').html('Auth Failed!');
					$('.modal-body').html('Your username or password are incorrect. Please try again.');
					$('#myModal').modal();

				}

			},
			error: function(response){
				console.log('error', response);

				$('#email, #password, #formSignIn button').removeAttr('disabled');

				$('.modal-title').html('Oops, something went wrong.');
				$('.modal-body').html('Please try again later...');
				$('#myModal').modal();

			}
		});
	
		console.log('The form has been submitted!');

		// Prevent the form from actually submitting.
		return false;

	});

});


// Form validation
function formIsValid() {
	
	/**
	 *	RULES:
	 *	- No blank fields
	 *	- Password must be longer than 6 characters
	 *	- Real email address (regex)
	*/

	var error = false;
	resetFormErrors();

	// Check for no blank fields
	if ( $('#email').val().length < 1 ) {
		error = true;
		$('#email').focus().parents('.form-group').addClass('has-error');
		$('.formSignInError').html('Please enter your email address.').removeClass('hidden');
	}

	if (error) return false;

	if ( $('#password').val().length < 1 ) {
		error = true;
		$('#password').focus().parents('.form-group').addClass('has-error');
		$('.formSignInError').html('Please enter your password.').removeClass('hidden');
	}

	if (error) return false;
	

	// Check password is longer than 6 characters

	if ( $('#password').val().length < 7 ) {
		error = true;
		$('#password').focus().parents('.form-group').addClass('has-error');
		$('.formSignInError').html('Please make sure your password is longer than 6 characters.').removeClass('hidden');
	}

	// Check for a valid email address
	if ( !validateEmail( $('#email').val() ) ) {
		error = true;
		$('#email').focus().parents('.form-group').addClass('has-error');
		$('.formSignInError').html('Please enter a valid email address.').removeClass('hidden');
	}

	if (error) return false;

	return true;

}

// Email validation
function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

// Reset the form
function resetFormErrors() {
	$('.has-error').removeClass('has-error');
	$('.formSignInError').html('').addClass('hidden');
}