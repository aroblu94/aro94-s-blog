/* DEBUG ONLY */

function isDebug(debug, db, document) {
	if(!debug) {
		var dbg = document.querySelectorAll(".debug-class");
		for(i = 0; i < dbg.length; i++) {
			dbg[i].className = "debug-class hidden";
		}
	}

	document.getElementById("mark_all_unread").onclick = function() {
		db.unreadAll();
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		if(document.getElementById("res").className == "1")
			fetchData(0, 10, db);
		else if(document.getElementById("res").className == "2")
			fetchData(10, 20, db);
		else if(document.getElementById("res").className == "3")
			fetchData(20, 30, db);
		else if(document.getElementById("res").className == "4")
			fetchData(30, 40, db);
		else if(document.getElementById("res").className == "5")
			fetchData(40, 50, db);
		else if(document.getElementById("res").className == "6")
			fetchData(50, 60, db);
		else if(document.getElementById("res").className == "7")
			fetchData(60, 70, db);
		else if(document.getElementById("res").className == "8")
			fetchData(70, 80, db);
		else if(document.getElementById("res").className == "9")
			fetchData(80, 90, db);
		else
			fetchData(90, 100, db);
		document.querySelector("[data-position='current']").className = "nodrawer";
	};

	document.getElementById("clear_db").onclick = function() {
		document.querySelector("[data-position='current']").className = "nodrawer";
		db.clearDB();
		alert("Database pulito. Riavviare l'app");
	};
}
