/* By disablig this debug menu will not appear in-app */
debug = false;

/* Some useful global vars */
start = 0;
stop = 10;

window.onload = function() {
	var first = false;
	var db = new DB();
	if(db.get().length == 0)
		first = true;
	else
		first = false;

	isDebug(debug, db, document);
	populatingDB(db);
	// Check if first launch from Firefox OS
	if(first && navigator.userAgent.indexOf('Firefox') > -1 && navigator.userAgent.indexOf("Mobile") > -1) {
		alert("Benvenuto! Essendo il primo avvio, l'app si riavvierà automaticamente per leggere correttamente il database. Premi 'OK' per continuare.");
		/* 1st method */
		first = false;
		if(!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload(true);
		}
		/* 2nd method
		first = false;
		location.reload(true);*/
	}
	fetchData(start, stop, db, clickableLinks);
	
	/* 
	 * Redundant scraping... used to correctly show
	 * new articles while app opens
	 */
	document.getElementById("navigation_toolbar").className = "hidden";
	document.getElementById("res").innerHTML = "";
	fetchData(0, 10, db, clickableLinks);
	
	/* Appending a counter for unread posts on the header */
	if(db.countUnread() == 0)
		document.getElementById("count_unread").className = "hidden";
	else {
		document.getElementById("count_unread").className = "";
		document.getElementById("count_unread").innerHTML = db.countUnread();
	}
	
	document.getElementById("btn_social").onclick = function() {
		document.querySelector("[data-position='current']").className = "nodrawer";
		document.querySelector("[data-position='down']").className = "current";
	};

	document.getElementById("close_down").onclick = function() {
		document.querySelector("[data-position='down']").className = "down";
		setTimeout(function(){document.querySelector("[data-type='sidebar']").className = "";}, 1000);
	};
	
	document.getElementById("mailme").onclick = function() {
		new MozActivity({
			name: "new",
			data: {
        	    type: "mail",
            	url: "mailto:aroblu94@gmail.com"
            }
        });
	};
	
	document.getElementById("btn_back").onclick = function() {
		document.getElementById("res_article").innerHTML = "";
		document.getElementById("title").innerHTML = "";
		document.getElementById("url").innerHTML = "";
		document.querySelector("[data-position='current']").className = "current";
		document.querySelector("[data-position='right']").className = "right";
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		if(document.getElementById("res").className == "1")
			fetchData(0, 10, db, clickableLinks);
		else if(document.getElementById("res").className == "2")
			fetchData(10, 20, db, clickableLinks);
		else if(document.getElementById("res").className == "3")
			fetchData(20, 30, db, clickableLinks);
		else if(document.getElementById("res").className == "4")
			fetchData(30, 40, db, clickableLinks);
		else if(document.getElementById("res").className == "5")
			fetchData(40, 50, db, clickableLinks);
		else if(document.getElementById("res").className == "6")
			fetchData(50, 60, db, clickableLinks);
		else if(document.getElementById("res").className == "7")
			fetchData(60, 70, db, clickableLinks);
		else if(document.getElementById("res").className == "8")
			fetchData(70, 80, db, clickableLinks);
		else if(document.getElementById("res").className == "9")
			fetchData(80, 90, db, clickableLinks);
		else
			fetchData(90, 100, db, clickableLinks);
		/* refreshing unread counter */
		document.getElementById("count_unread").innerHTML = "";
		if(db.countUnread() == 0)
			document.getElementById("count_unread").className = "hidden";
		else {
			document.getElementById("count_unread").className = "";
			document.getElementById("count_unread").innerHTML = db.countUnread();
		}
		setTimeout(function(){document.querySelector("[data-type='sidebar']").className = "";}, 1000);
	};
	
	document.getElementById("reload_home").onclick = function() {
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		if(document.getElementById("res").className == "1")
			fetchData(0, 10, db, clickableLinks);
		else if(document.getElementById("res").className == "2")
			fetchData(10, 20, db, clickableLinks);
		else if(document.getElementById("res").className == "3")
			fetchData(20, 30, db, clickableLinks);
		else if(document.getElementById("res").className == "4")
			fetchData(30, 40, db, clickableLinks);
		else if(document.getElementById("res").className == "5")
			fetchData(40, 50, db, clickableLinks);
		else if(document.getElementById("res").className == "6")
			fetchData(50, 60, db, clickableLinks);
		else if(document.getElementById("res").className == "7")
			fetchData(60, 70, db, clickableLinks);
		else if(document.getElementById("res").className == "8")
			fetchData(70, 80, db, clickableLinks);
		else if(document.getElementById("res").className == "9")
			fetchData(80, 90, db, clickableLinks);
		else
			fetchData(90, 100, db, clickableLinks);
		utils.status.show("Feed ricaricato");
		/* refreshing unread counter */
		document.getElementById("count_unread").innerHTML = "";
		if(db.countUnread() == 0)
			document.getElementById("count_unread").className = "hidden";
		else {
			document.getElementById("count_unread").className = "";
			document.getElementById("count_unread").innerHTML = db.countUnread();
		}
	};
	
	document.getElementById("reload_article").onclick = function() {
		document.getElementById("res_article").innerHTML = "";
		document.getElementById("title").innerHTML = "";
		var url = document.getElementById("url").innerHTML;
		document.getElementById("url").innerHTML = "";
		fetchArticle(url);
		utils.status.show("Articolo ricaricato");
	};
	
	document.getElementById("menu").onclick = function() {
		if(document.querySelector("[data-position='current']").className == "nodrawer" ||
			document.querySelector("[data-position='current']").className == "" ||
			document.querySelector("[data-position='current']").className == "current")
			document.querySelector("[data-position='current']").className = "drawer";
		else
			document.querySelector("[data-position='current']").className = "nodrawer";
	};

	document.getElementById("close_drawer").onclick = function() {
		document.querySelector("[data-position='current']").className = "nodrawer";
	};
	
	document.getElementById("navigation_back").onclick = function() {
		start = start - 10;
		stop = stop - 10;
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		fetchData(start, stop, db, clickableLinks);
	};
	
	document.getElementById("navigation_forward").onclick = function() {
		start = start + 10;
		stop = stop + 10;
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		fetchData(start, stop, db, clickableLinks);
	};
	
	document.getElementById("go_home").onclick = function() {
		start = 0;
		stop = 10;
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		fetchData(start, stop, db, clickableLinks);
		utils.status.show("Torno alla Home");
		/* refreshing unread counter */
		document.getElementById("count_unread").innerHTML = "";
		if(db.countUnread() == 0)
			document.getElementById("count_unread").className = "hidden";
		else {
			document.getElementById("count_unread").className = "";
			document.getElementById("count_unread").innerHTML = db.countUnread();
		}
		document.querySelector("[data-position='current']").className = "nodrawer";
	};
	
	document.getElementById("mark_all_read").onclick = function() {
		db.readAll();
		document.getElementById("navigation_toolbar").className = "hidden";
		document.getElementById("res").innerHTML = "";
		fetchData(0, 10, db, clickableLinks);
		utils.status.show('Hai letto tutti gli articoli');
		/* empty and hide unread counter */
		document.getElementById("count_unread").innerHTML = "";
		document.getElementById("count_unread").className = "hidden";
		document.querySelector("[data-position='current']").className = "nodrawer";
	};
};
