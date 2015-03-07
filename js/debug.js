/* DEBUG ONLY */

function isDebug(debug, db, document) {
	if(!debug) {
		$('.debug-class').attr('class', 'debug-class hidden');
	}

	$(document).on('click', '#mark_all_unread', function() {
		db.unreadAll();
		$('#navigation_toolbar').attr('class', 'hidden');
		$('#res').empty();
		if($('#res').attr('class') == '1')
			fetchData(0, 10, db);
		else if($('#res').attr('class') == '2')
			fetchData(10, 20, db);
		else if($('#res').attr('class') == '3')
			fetchData(20, 30, db);
		else if($('#res').attr('class') == '4')
			fetchData(30, 40, db);
		else if($('#res').attr('class') == '5')
			fetchData(40, 50, db);
		else if($('#res').attr('class') == '6')
			fetchData(50, 60, db);
		else if($('#res').attr('class') == '7')
			fetchData(60, 70, db);
		else if($('#res').attr('class') == '8')
			fetchData(70, 80, db);
		else if($('#res').attr('class') == '9')
			fetchData(80, 90, db);
		else
			fetchData(90, 100, db);
		$("#menu-page").hide();
		$("#home").show();
		utils.status.show('Unread all');
	});

	$(document).on('click', '#clear_db', function() {
		db.clearDB();
		alert("Database pulito. Riavviare l'app");
	});
}
