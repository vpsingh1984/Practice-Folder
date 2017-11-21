
let dog = {
	sound: "woof",
	talk: function(){
		alert(this.sound);
	}
}

let button = document.getElementById("btn3");



button.addEventListener('click', function(){
dog.talk()

});


//console.log(fName(person));


