/* LOCAL STORAGE */

/* Using js Object Oriented */
function DB() {
	var db = init();
   
	/* il formato presunto di obj è { link:link, title:title, description:description, img:img, read:false} */
	this.save = function(obj) {
		if(!contains(db, obj)) {
			db[db.length] = obj;
			localStorage.setItem('mydb', JSON.stringify(db));
		}
	};

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
	
	this.addToHead = function() {
	
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
		localStorage.removeItem('mydb');
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
