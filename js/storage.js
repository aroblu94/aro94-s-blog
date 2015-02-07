/* LOCAL STORAGE 

/* If counter key doesn't exist, create and initialize. 
function init(){	
    if (isNaN(parseInt(localStorage.getItem('counter')))) {
        localStorage.setItem('counter', '0');
    }
}

/* Save data in the local storage 
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

/* DEBUG ONLY 
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


*/





/* alternative version */
/* uso la js Object Oriented, in questo modo delego tutti i gli accessi all'oggetto DB*/
function DB() {
  
	/* ogni volta che viene creato un oggetto db si va a cercare se esiste già in memoria, se si lo si carica
	nella variabile db, altrimenti db viene inizializzato a []. questo è utile perchè la get può prendere i valori 
	anziche dal local storage dalla variabile.*/
	var db = init();
      
	/* ogni volta che viene invocato il save si riscrive l'intero oggetto db (che viene prima aggiornato) nel localstorage */    
	/* il formato presunto di obj è { link:link,read:false} */
	this.save = function(obj) {
		if(!contains(db,obj)) {
			console.log(obj);
			db[db.length] = obj;
			console.log(db);
			localStorage.setItem('mydb', JSON.stringify(db));
			console.log(db);
		}
	};

	/* la get rende direttamente db, perchè è aggiornato col valore in memoria locale */
	this.get = function() {
		return db;
	};
  
	this.read = function(link) {
		for(var i = 0; i < db.length;i++) {
			if(db[i].link == link) {
				db[i].read = true;
				localStorage.setItem('mydb', JSON.stringify(db));
			}
		}
	};
  
	this.isRead = function(link) {
		for(var i = 0; i < db.length; i++) {
			if(db[i].link == link){
				return db[i].read;
			}
		}
	};
	
	this.readAll = function() {
		for(var i = 0; i < db.length; i++) {
			db[i].read = true;
			localStorage.setItem('mydb', JSON.stringify(db));
		}
	};
	
	/* DEBUG ONLY */
	this.unreadAll = function() {
		for(var i = 0; i < db.length; i++) {
			db[i].read = false;
			localStorage.setItem('mydb', JSON.stringify(db));
		}
	};
	
	/* DEBUG ONLY */
	this.clearDB = function() {
		localStorage.clear;
	};
	
	return this;
}

function init() {
	var db = new Array();
	var initdb = JSON.stringify(db)
	if ((localStorage.getItem('mydb')) === null) {
		localStorage.setItem('mydb', initdb);
		return db;
	}
	else {
		return JSON.parse(localStorage.getItem('mydb'));
	}
}


function contains(a, obj) {
	if(a != null){
		for (var i = 0; i < a.length; i++) {
			if (a[i].link === obj.link) {
				return true;
			}
		}
	}
	return false;
};
