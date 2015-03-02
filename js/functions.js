/* Function to handle navigation links */
function pageNavigation() {
	//$('#navigation_page').empty();
	if(start == 0) {
		$('#navigation_back').attr('class', 'hidden');
		$('#separator').attr('class', 'hidden');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '1');
		$('#navigation_page').append(' 1 ');
	}
	else if(start == 10) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '2');
		$('#navigation_page').append(' 2 ');
	}
	else if(start == 20) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '3');
		$('#navigation_page').append(' 3 ');
	}
	else if(start == 30) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 4 ');
	}
	else if(start == 40) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 5 ');
	}
	else if(start == 50) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 6 ');
	}
	else if(start == 60) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 7 ');
	}
	else if(start == 70) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 8 ');
	}
	else if(start == 80) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		$('#navigation_page').append(' 9 ');
	}
	else {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', 'hidden');
		$('#navigation_forward').attr('class', 'hidden');
		$('#res').attr('class', '10');
		$('#navigation_page').append(' 10 ');
	}
}
