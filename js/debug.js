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
		else
			fetchData(40, 50, db);
		$("#menu-page").hide();
		$("#home").show();
		utils.status.show('Unread all');
	});

	$(document).on('click', '#clear_db', function() {
		db.clearDB();
		alert("Database pulito. Riavviare l'app");
	});
}
