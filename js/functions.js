/* Function to handle navigation links */
function pageNavigation() {
	if(start == 0) {
		document.getElementById("navigation_back").className = "hidden";
		document.getElementById("separator").className = "hidden";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "1";
	}
	else if(start == 10) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "2";
	}
	else if(start == 20) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "3";
	}
	else if(start == 30) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "4";
	}
	else if(start == 40) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "5";
	}
	else if(start == 50) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "6";
	}
	else if(start == 60) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "7";
	}
	else if(start == 70) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "8";
	}
	else if(start == 80) {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "";
		document.getElementById("navigation_forward").className = "";
		document.getElementById("res").className = "9";
	}
	else {
		document.getElementById("navigation_back").className = "";
		document.getElementById("separator").className = "hidden";
		document.getElementById("navigation_forward").className = "hidden";
		document.getElementById("res").className = "10";
	}
	/* ...and then, scroll to top of the page */
	window.scrollTo(0,0);
}

function clickableLinks(db) {
	var links = document.querySelectorAll(".link");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			db.read(this.id);
			fetchArticle(this.id);
			document.querySelector("[data-type='sidebar']").className = "hidden";
			document.querySelector("[data-position='right']").className = "current";
			document.querySelector("[data-position='current']").className = "left";
		};
	} 
}