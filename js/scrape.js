var link, title, description, img, unread;

function populatingDB(db) {
	xhr = new XMLHttpRequest({mozSystem: true});
	url = "http://aro94.altervista.org/rss";
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("Nessuna risposta dal server. Controllare la connessione e toccare l'icona Ricarica.");
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onload = function(){
        if(xhr.status === 200){     
			var items = xhr.responseXML.querySelectorAll('item');
			items = Array.prototype.slice.call(items, 0);
			var datas = new Array();
			for(i = 0; i < 100; i++) {
				title = items[i].getElementsByTagName('title')[0].textContent;
				description = items[i].getElementsByTagName('description')[0].textContent;
				link = items[i].getElementsByTagName('link')[0].textContent;
				if(items[i].textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.(?:jpg|gif|png|jpeg)/))
					img = items[i].textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.(?:jpg|gif|png|jpeg)/)[0];
				else
					img = '/icons/placeholder.png';
				if(description.length > 100) {
					description = description.substring(0, 99);
				}
			
				/* local storage */
				data = {
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
	xhr.send();
}

function fetchData(start, stop, db) {
	pageNavigation();
	console.log("pageNavigation() done");
	var list = '';
	for(i = start; i < stop; i++) {
		console.log(i);
		console.log(db.get()[i]);
		link = db.get()[i].link;
		title = db.get()[i].title;
		description = db.get()[i].description;
		img = db.get()[i].img;
		unread = db.get()[i].read;
		
		if(!db.isRead(link))
			unread = '';
		else
			unread = ' hidden';
		
		var item = "<li><aside class='pack-end'><img alt='placeholder' src=" + img + "></aside>" +
				"<a href='#' id='" + link + "' class='link'><div class='article-unread" + unread + 
				"' aria-label='Unread'></div><p>" + title + "</p><p>" + description + "</p></a></li>";
		list = list + item;
	}
	$('#res').append(list);
	$('#navigation_toolbar').attr('class', '');
}

function fetchArticle(url) {
	$('#url').append(url);
	xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("Nessuna risposta dal server. Controllare la connessione e toccare l'icona Ricarica.");
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
        	$source = $(xhr.responseText);
        	date = $source.find('.post-page-head-area').text().match(/\s{3,100}(.*)\s*↔/)[1];
        	title = $source.find('.post-page-head-area').text().match(/comment\s*(.*)\s*(.*)\s*/)[2];
        	author = $source.find('.post-page-head-area').text().match(/comment\s*(.*)\s*(.*)\s*(.*)/)[3];
        	text = $source.find('.post-page-content')[0].innerHTML;
        	article = "<h2>" + date + "</h2><p class='text'>" + text + "</p><h2>" + author + "</h2>"; 
        	$('#title').append(title);    	
			$('#res_article').append(article);
		}
	};
	xhr.send();
}
