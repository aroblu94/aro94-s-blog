/* Function to handle navigation links */
function pageNavigation() {
	//$('#navigation_page').empty();
	if(start == 0) {
		$('#navigation_back').attr('class', 'hidden');
		$('#separator').attr('class', 'hidden');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '1');
		//$('#navigation_page').append('1');
	}
	else if(start == 10) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '2');
		//$('#navigation_page').append('2');
	}
	else if(start == 20) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '3');
		//$('#navigation_page').append('3');
	}
	else if(start == 30) {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', '');
		$('#navigation_forward').attr('class', '');
		$('#res').attr('class', '4');
		//$('#navigation_page').append('4');
	}
	else {
		$('#navigation_back').attr('class', '');
		$('#separator').attr('class', 'hidden');
		$('#navigation_forward').attr('class', 'hidden');
		$('#res').attr('class', '5');
		//$('#navigation_page').append('5');
	}
}
