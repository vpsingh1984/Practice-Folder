
var newArr = ["maruti","hundai","polo"];
var newObj = {maruti: "maruti12", hundai: "hundai21",polo:"polo21"};

for(i in newArr){
  console.log(newArr[i]);
}


var points = [40, 100, 1, 5, 25, 10];
 
points.sort(function(a,b){
  return a-b;
})



function checkStatus(){
	if (document.getElementById('mycheck').checked){
     alert('its checked');
	}else{
	     alert('its not checked');
	}
}






console.log(points);