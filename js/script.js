var xhr, url, title, description, link, img;

$(document).ready(function(){
	fetchData();
	
	$(document).on('click','#admin', function() {
		new MozActivity({
			name: "view",
			data: {
				type: "url",
				url: "http://aro94.altervista.org/blog/wp-admin/"
			}
		});
	});
	
	$(document).on('click','.link', function() {
		document.querySelector('#article-page').className = 'skin-dark current';
		document.querySelector('[data-position="current"]').className = 'skin-dark left';
		fetchArticle(this.id);
	});
	
	$(document).on('click','#btn_back', function() {
		$('#res_article').empty();
		$('#title').empty();
		$('#url').empty();
		$("[data-position='current']").attr('class', 'skin-dark current');
		$("[data-position='right']").attr('class', 'skin-dark right');
	});
	
	$(document).on('click','#reload_home', function() {
		$('#res').empty();
		fetchData();
		utils.status.show('Feed ricaricato');
	});
	
	$(document).on('click','#reload_article', function() {
		$('#res_article').empty();
		$('#title').empty();
		url = $('#url').text();
		$('#url').empty();
		fetchArticle(url);
		utils.status.show('Articolo ricaricato');
	});
});


function fetchData() {
	xhr = new XMLHttpRequest({mozSystem: true});
	url = "http://aro94.altervista.org/feed";
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert("Nessuna risposta dal server. Controllare la connessione e toccare l'icona Ricarica.");
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
			var list = '';      
			var items = xhr.responseXML.querySelectorAll('item');
			items = Array.prototype.slice.call(items, 0);
			items.forEach(function(item) {
				title = item.getElementsByTagName('title')[0].textContent;
				description = item.getElementsByTagName('description')[0].textContent;
				link = item.getElementsByTagName('link')[0].textContent;
				if(item.textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.png/))
					img = "'" + item.textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.png/)[0] + "'";
				else
					img = '/icons/placeholder.png';
				if(description.length > 100) {
					description = description.substring(0, 99);
				}
				var item = "<li><aside class='pack-end'><img alt='placeholder' src=" + img + "></aside>" +
						"<a href='#' id='" + link + "' class='link'><p>" + title + "</p><p>" + description + "</p></a></li>";
				list = list + item;
			});
			$('#res').append(list);
		}
	};
	xhr.send();
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
        	title = $source.find('.post-page-head-area').text().match(/comments\s*(.*)\s*/)[1];
        	author = $source.find('.post-page-head-area').text().match(/comments\s*(.*)\s*(.*)\s*/)[2];
        	text = $source.find('.post-page-content')[0].innerHTML;
        	article = "<h2>" + date + "</h2><p>" + text + "</p><h2>" + author + "</h2>"; 
        	$('#title').append(title);    	
			$('#res_article').append(article);
		}
	};
	xhr.send();
}
