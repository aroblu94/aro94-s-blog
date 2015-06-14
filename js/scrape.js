var unread;

function populatingDB(db) {
	var xhr = new XMLHttpRequest({mozSystem: true});
	var url = "http://aro94.altervista.org/rss";
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("Nessuna risposta dal server. Controllare la connessione e toccare l'icona Ricarica.");
	});	
	
	/* Avoid browser caching */
	//xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onload = function(){
        if(xhr.status === 200){     
			var items = xhr.responseXML.querySelectorAll('item');
			items = Array.prototype.slice.call(items, 0);
			var datas = new Array();
			for(i = 0; i < items.length; i++) {
				var title = items[i].getElementsByTagName('title')[0].textContent;
				var description = items[i].getElementsByTagName('description')[0].textContent;
				var link = items[i].getElementsByTagName('link')[0].textContent;
				if(items[i].textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.(?:jpg|gif|png|jpeg)/))
					var img = items[i].textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.(?:jpg|gif|png|jpeg)/)[0];
				else
					var img = '/icons/placeholder.png';
				if(description.length > 100) {
					var description = description.substring(0, 99);
				}
			
				/* local storage */
				var data = {
					'link':link,
					'title':title,
					'description':description,
					'img':img,
					'read':false
				};
				datas.push(data);
			}
			db.save(datas);
		}
	};
	xhr.send(null);
}

function fetchData(start, stop, db, callback) {
	pageNavigation();
	var list = '';
	for(var i = start; i < stop; i++) {
		var link = db.get()[i].link;
		var title = db.get()[i].title;
		var description = db.get()[i].description;
		var img = db.get()[i].img;
		var unread = db.get()[i].read;
		
		if(!db.isRead(link))
			unread = '';
		else
			unread = ' hidden';
		
		var item = "<li><aside class='pack-end'><img alt='placeholder' src=" + img + "></aside>" +
				"<a href='#' id='" + link + "' class='link'><div class='article-unread" + unread + 
				"' aria-label='Unread'></div><p>" + title + "</p><p>" + description + "</p></a></li>";
		list = list + item;
	}
	document.getElementById("res").innerHTML = list;
	document.getElementById("navigation_toolbar").className = "";
	callback(db);
}

function fetchArticle(url) {
	document.getElementById("url").innerHTML = url;
	var xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("Nessuna risposta dal server. Controllare la connessione e toccare l'icona Ricarica.");
	});	
	
	/* Avoid browser caching */
	//xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onload = function(){
        if(xhr.status === 200){
        	var source = xhr.responseText;
			/* Creating a dummy XML to let me parse response as XML */
			var dummyXML = document.createElement("dummyXML");
			dummyXML.innerHTML = source;
			var head = dummyXML.querySelector(".post-page-head-area").innerHTML;
			var date = head.match(/\s{3,100}(.*)\s*↔/)[1];
			var author = head.match(/comment\s*(.*)\s*(.*)\s*/)[2];
			var title = head.match(/comment\s*(.*)\s*(.*)\s*(.*)/)[3];
			var text = dummyXML.querySelectorAll(".post-page-content")[0].innerHTML;
			dummyXML.innerHTML = title;
			title = dummyXML.querySelector("h2").innerHTML;
			var article = "<h2>" + date + "</h2><p class='text'>" + text + "</p>";//<h2>" + author + "</h2>"; 
			document.getElementById("title").innerHTML = title;
			document.getElementById("res_article").innerHTML = article;
			/* Images not clickable */
			article = document.getElementById("res_article");
			article.getElementsByTagName("img").onclick = null;
		}
	};
	xhr.send(null);
}
