
	var shiftValue=0;
	var leftButton = document.getElementById('leftButton');
	var rightButton = document.getElementById('rightButton');

	leftButton.addEventListener("click", leftMove);
	rightButton.addEventListener("click", rightMove);

	var transitionTime = 500;
	var _cssProperty = '-webkit-transform';
	var mainContainer = $("#mainContainer");
	mainContainer.find("li.activeItem").css('width', '345px');
	

function rightMove(){
	var selectedItem = mainContainer.find("li.activeItem");
	if(selectedItem.prev().length==0){return;}
    var dir = 'right';
	shiftValue += 240;

    var _options = {
    	shiftValue: shiftValue,
    	dir: dir
    }
	CheckSelectedElement(dir,selectedItem);
	AnimateCss(_options);
}

function leftMove(){
	var selectedItem = mainContainer.find("li.activeItem");
	if(selectedItem.next().length==0){return;}
    shiftValue -= 240;
	var dir = 'left';

    var _options = {
    	shiftValue: shiftValue,
    	dir: dir
    }
	CheckSelectedElement(dir,selectedItem);
	AnimateCss(_options);
}

//Common function for Left Right Animation
function AnimateCss(_options){
	var shiftValue = _options.shiftValue;
	var dir = _options.dir;

	if (dir == 'right') {
		var _endValue = "translate3d(" + shiftValue + "px,0,0)";
		mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
		mainContainer.css(_cssProperty, _endValue);
	}else if(dir == 'left') {
		var _endValue = "translate3d(" + shiftValue + "px,0,0)";
		mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
		mainContainer.css(_cssProperty, _endValue);
	}else{
		alert("No Right and Left");
	}
	
}

//check for selected Element
function CheckSelectedElement(dir,selectedItem){
	if (dir == 'right') {
		selectedItem.removeClass('activeItem');

		selectedItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.css('width', '');

		selectedItem.prev().css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.prev().css('width', '345px');

		selectedItem.prev().addClass('activeItem');
	}else{
		selectedItem.removeClass('activeItem');

		selectedItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.css('width', '');

		selectedItem.next().css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		selectedItem.next().css('width', '345px');

		selectedItem.next().addClass('activeItem');
	}
}