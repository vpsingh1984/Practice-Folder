
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
	shiftValue += 240;
	CheckSelectedElement(selectedItem,selectedItem.prev());
	AnimateCss(shiftValue);
}

function leftMove(){
	var selectedItem = mainContainer.find("li.activeItem");
	if(selectedItem.next().length==0){return;}
    shiftValue -= 240;
	CheckSelectedElement(selectedItem,selectedItem.next());
	AnimateCss(shiftValue);
}

//Common function for Left Right Animation

function AnimateCss(shiftValue){
			var _endValue = "translate3d(" + shiftValue + "px,0,0)";
			mainContainer.css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
			mainContainer.css(_cssProperty, _endValue);
}

//check for selected Element
function CheckSelectedElement(currentItem,nxtSelectedItem){
		currentItem.removeClass('activeItem');
		currentItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		currentItem.css('width', '');

		nxtSelectedItem.css('-webkit-transition', 'all ' + '600ms' + ' ease-in-out');
		nxtSelectedItem.css('width', '345px');
		nxtSelectedItem.addClass('activeItem');
}