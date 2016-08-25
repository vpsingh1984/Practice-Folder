
//$(document).ready(function(){
	var shiftValue=0;
	var leftButton = document.getElementById('leftButton');
	var rightButton = document.getElementById('rightButton');

	leftButton.addEventListener("click", leftMove);
	rightButton.addEventListener("click", rightMove);

	var transitionTime = 500;
	var _cssProperty = '-webkit-transform';
	var _endValue = "translate3d(" + shiftValue + "px,0,0)";
	var leftShiftValue = 240;
	var rightShiftValue = -240;
	var mainContainer = $("#mainContainer");
	var selectedItem= mainContainer.find("li.activeItem");
	selectedItem.css('width', '345px');
	//var ulContainer = $(".top-menu");
	

//});


function rightMove(){
	var dir = 'right';
	selectedItem= mainContainer.find("li.activeItem");
//check for next Element
	if(selectedItem.next().length==0){
	    return;
    }
    //check for selected Item
	CheckSelectedElement(dir,selectedItem);

//Passing the parameters to animate the boxes
	AnimateCss(_options);
	
	mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
	var _cssProperty = '-webkit-transform';
	shiftValue -= 240;
	var _endValue = "translate3d(" + shiftValue + "px,0,0)";
	mainContainer.css(_cssProperty, _endValue);
	
}

function leftMove(){
	var dir = 'left';
	//var selectedItem = mainContainer.find("li.activeItem");

//check for next Element
	if(selectedItem.prev().length==0){
	    return;
    }	
//check for selected Item
	CheckSelectedElement(dir,selectedItem);

//Passing the parameters to animate the boxes
	AnimateCss(_options);

	mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
	var _cssProperty = '-webkit-transform';
	shiftValue += 240;
	var _endValue = "translate3d(" + shiftValue + "px,0,0)";
	mainContainer.css(_cssProperty, _endValue);
	
}

//Common function for Left Right Animation
function AnimateCss(){
	var selectedItem = mainContainer.find("li.activeItem");

//check for selected Item
	CheckSelectedElement(dir,selectedItem);

	mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
	var _cssProperty = '-webkit-transform';
	shiftValue += 240;
	var _endValue = "translate3d(" + shiftValue + "px,0,0)";
	mainContainer.css(_cssProperty, _endValue);
}

//check for selected Element
function CheckSelectedElement(dir,selectedItem){
	if (dir == 'right') {
		selectedItem.removeClass('activeItem');

		selectedItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.css('width', '');

		selectedItem.next().css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.next().css('width', '345px');

		selectedItem.next().addClass('activeItem');
	}else{
		selectedItem.removeClass('activeItem');

		selectedItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.css('width', '');

		selectedItem.prev().css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.prev().css('width', '345px');

		selectedItem.prev().addClass('activeItem');
	}
}