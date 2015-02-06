/* LOCAL STORAGE */

/* If counter key doesn't exist, create and initialize. */
function init(){	
    if (isNaN(parseInt(localStorage.getItem('counter')))) {
        localStorage.setItem('counter', '0');
    }
}

/* Save data in the local storage */
function save(data){
	alreadySaved = false;
	count = parseInt(localStorage.getItem('counter'));
	for(j = 1; j <= count; j++) {
		if(JSON.parse(localStorage.getItem(j+"")) !== null){
			oggetto = JSON.parse(localStorage.getItem(j+""));
			if(oggetto['link'] === data['link']){
				alreadySaved = true;
				break;
			}
		}
	}
	if(!alreadySaved){
		JString = JSON.stringify(data);
		count = parseInt(localStorage.getItem('counter'));
		localStorage.setItem('counter',(++count)+"");
		localStorage.setItem(count+"", JString);
	}	
}

function read(link) {
	count = parseInt(localStorage.getItem('counter'));
	for(j = 1; j <= count; j++) {
		if(JSON.parse(localStorage.getItem(j+"")) !== null){
			oggetto = JSON.parse(localStorage.getItem(j+""));
			if(oggetto['link'] === link){
				oggetto['read'] = 1;
				console.log(oggetto);
				break;
			}
		}
	}
}

function isRead(link) {
	alreadyRead = false;
	count = parseInt(localStorage.getItem('counter'));
	for(j = 1; j <= count; j++) {
		if(JSON.parse(localStorage.getItem(j+"")) !== null){
			oggetto = JSON.parse(localStorage.getItem(j+""));
			if(oggetto['link'] === link && oggetto['read'] === 1){
				alreadyRead = true;
				break;
			}
		}
	}
	return alreadyRead;
}

/* DEBUG ONLY */
function getData(){
	console.log('getting');
	count = parseInt(localStorage.getItem('counter'));
	for(i = 1; i <= count; i++) {
		if(JSON.parse(localStorage.getItem(i+"")) !== null){
			oggetto = JSON.parse(localStorage.getItem(i+""));
			console.log(oggetto);
		}
	}
	console.log(count);
}
