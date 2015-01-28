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
		document.querySelector('#article-page').className = 'current';
		document.querySelector('[data-position="current"]').className = 'left';
		fetchArticle(this.id);
	});
	
	$(document).on('click','#btn_back', function() {
		$('#res_article').empty();
		$("[data-position='current']").attr('class', 'current');
		$("[data-position='right']").attr('class', 'right');
	});
	
	$(document).on('click','#reload_home', function() {
		$('#res').empty();
		fetchData();
	});
	
	$(document).on('click','#reload_article', function() {
		alert("Non ancora implementato");
	});
});


function fetchData() {
	xhr = new XMLHttpRequest({mozSystem: true});
	url = "http://aro94.altervista.org/feed";
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert('No connection');
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
				console.log(item.textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.png/));
				if(item.textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.png/))
					img = "'" + item.textContent.match(/http:\/\/aro94\.altervista\.org\/blog\/wp-content\/uploads\/\S+\.png/)[0] + "'";
				else
					img = '/icons/placeholder.png';
				if(description.length > 100) {
					description = description.substring(0, 99) + " [...]";
				}
				console.log(img);
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
	console.log(url);
	xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open("GET", url, true);
	xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert('No connection 2');
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
        	$source = $(xhr.responseText);
        	console.log("source ok");
        	console.log($source);
        	console.log($source.find('.post-page-head-area'));      	
			$('#res_article').append($source.find('.post-page-head-area').text());
		}
	};
	xhr.send();
}

function goToCard(cardNum){
	document.querySelector('x-deck').showCard(cardNum);
}
