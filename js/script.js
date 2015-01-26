$(document).ready(function(){
	console.log("I'm alive!");
	fetchData();
});


function fetchData() {
	console.log("Let's start");
	var xhr = new XMLHttpRequest({mozSystem: true});
	var url = "http://aro94.altervista.org/feed";
	xhr.open("GET", url, true);
    xhr.timeout = 5750;
	xhr.addEventListener('timeout', function() {
		alert('No connection');
	});	
	
	/* Avoid browser caching */
	xhr.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");
	
	xhr.onreadystatechange = function(){
		console.log("Loaded");
        if(xhr.status === 200 && xhr.readyState === 4){
			console.log(xhr.responseText);
			console.log("Hey there, I'm in!");
			list = '';      
			var items = xhr.responseXML.querySelectorAll('item');
			items = Array.prototype.slice.call(items, 0);
			items.forEach(function(item) {
				var title = item.getElementByTagName('title')[0].textContent;
				var description = item.getElementByTagName('description')[0].textContent;
				console.log(title);
				console.log(description);
				var item = "<li class='table-view-cell media'><a class='navigate-right' href='#'><img class='media-object pull-left' src='" + img + 
							"'><div class='media-body'>" + title + "<p>" + description + "</p></div></a></li>";
				console.log(item);
				list = list + item;
				document.getElementById('list').appendChild(item);
				console.log("appended!");
			});
			$('#res').append(list);
		}
	};
	xhr.send();
}
