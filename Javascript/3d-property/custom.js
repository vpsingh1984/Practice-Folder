
	var shiftValue=0;
	var leftButton = document.getElementById('leftButton');
	var rightButton = document.getElementById('rightButton');

	leftButton.addEventListener("click", leftMove);
	rightButton.addEventListener("click", rightMove);

	var transitionTime = 700;
	var _cssProperty = '-webkit-transform';
	var mainContainer = $("#mainContainer");
	mainContainer.find("li.activeItem").css('width', '345px');
	
this.ajaxDTResult=null;
this.itemContainer=$("#mainContainer");
	this.circular=false;


function rightMove(){
	

cus.next();

	/*var selectedItem = mainContainer.find("li.activeItem");
	if(selectedItem.prev().length==0){return;}
	shiftValue += 240;
	
	CheckSelectedElement(selectedItem,selectedItem.prev());
	mainContainer.find(".item").css('-webkit-transition', 'all ' + transitionTime + 'ms ease-in-out');
	mainContainer.find(".item").css(_cssProperty, "translate3d(240px,0,0)");
	//AnimateCss(shiftValue);
	
	var elem=$('#mainContainer li:last');
	elem.removeAttr("style");
	elem.css(_cssProperty, "translate3d(-240px, 0, 0");
	//elem.addClass("zeroWidth");
	mainContainer.prepend(elem);
	elem.css(_cssProperty, "translate3d(0px, 0, 0");
	//elem.css('transition', 'width 3s');	
	//elem.css('width', '240px');*/

	

	
	//$('#mainContainer li:first').css(_cssProperty, "translate3d(0px, 0, 0");
}

function leftMove(){
	cus.prev();

	/*var selectedItem = mainContainer.find("li.activeItem");
	if(selectedItem.next().length==0){return;}
    shiftValue -= 240;
	CheckSelectedElement(selectedItem,selectedItem.next());
	//AnimateCss(shiftValue);*/
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


//
var custom=function(){
this.menuGrid=null;
	this.init=function(){
	this.ajaxDTResult=$('#mainContainer *[class^=item]');

		var _options = {
			gridHolderID : "mainContainer", 		//id of the item container,
			elementType : "li",		//element type of the items of container
			elementId:"item_",
			elementKlass : "item",
			activeItemKlass : "activeItem",
			pactiveItemKlass : " activeItem",
			maxVisible : "7",
			direction : "horizontal",
			displayelem : 1,
			circular : false, 					// True : linear or False : circular
			focusItemContainer : "#focusedItemContainer",
			focusItemHeightWidth : 345,
			sliderItemHeightWidth : 240,
			animationTime : 600,
			mainData:this.ajaxDTResult,
			callie:this
		};
		this.menuGrid = new BaseGrid(_options);			//base grid animation
	}


this.next=function() {
		this.menuGrid.moveNext();
}
this.prev=function() {
		this.menuGrid.movePrevious();
}

//item template creation
	this.getHtmlVerticleHub=function(arrIds) {
		var html='';
		for (var j = 0; j < arrIds.length; j++) {
			var countID=arrIds[j].split("$")[1];
			var ajaxResult = this.ajaxDTResult[countID];
			var preLicontent="",middleLicontent="",postLicontent="";			
			if (ajaxResult.isLeaf == "true") {
				middleLicontent= " data-url='CATEGORY_LIST'";
			}
			preLicontent="<li class='item_" + ajaxResult.id + "' id='item_" + ajaxResult.id + "$" + countID + "' data-isleaf='" + ajaxResult.isLeaf + "' data-category='" + ajaxResult.externalCategoryId + "'";
			postLicontent="><img src='" + ajaxResult.imageSrc + "' class='visibilityHidden poster-left-img'><span class='poster-right-heading'>" + ajaxResult.displayName + "</span></li>";
			html+=preLicontent + middleLicontent + postLicontent;
		}
		return html;
	}
	//focus item template creation
	this.createHtmlFocusedItemContainer = function(startIndex){
		var html='';
		var nodename="li";
		this.itemContainer=$("#mainContainer");
		if(this.ajaxDTResult.length > 3){
			if(parseInt(startIndex-2)<0 && !this.circular){
				this.itemContainer.find(nodename).slice(0,3).each(function(key,value){
					var classcurrent='';
					if(key==1){
						classcurrent=' current';
					}
					html += '<' + nodename + ' id="'+value.id+'" class="focusedItem'+classcurrent+'">'+value.innerHTML+'</' + nodename + '>';
				});
			}else{
				this.itemContainer.find(nodename + ":gt("+(startIndex-2)+"):lt(3)").each(function(key,value){
					var classcurrent='';
					if(key==1){
						classcurrent=' current';
					}
					html += '<' + nodename + ' id="'+value.id+'" class="focusedItem'+classcurrent+'">'+value.innerHTML+'</' + nodename + '>';
				});
			}
		}else if(this.ajaxDTResult.length == 3){
			this.itemContainer.find(nodename + ":lt(3)").each(function(key,value){
				var classcurrent='';
				if(key==1){
					classcurrent=' current';
				}
				html += '<' + nodename + ' id="'+value.id+'" class="focusedItem'+classcurrent+'">'+value.innerHTML+'</' + nodename + '>';
			});
		}else if(this.ajaxDTResult.length <= 2){
			this.itemContainer.find(nodename + ":lt(1)").each(function(key,value){
				var classcurrent='';
				classcurrent=' current';
				html += '<' + nodename + ' id="'+value.id+'" class="focusedItem'+classcurrent+'">'+value.innerHTML+'</' + nodename + '>';
			});
		}
		return html;
	}
	

}
var cus=new custom();
cus.init();