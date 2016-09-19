/*	File 	: base_grid.js
 * 	Purpose	: grid slider library 
 * 	Author 	: Mr. Satendar
 * 	Date	: 
 * ****************************************************
 * 			Rivision History
 * ****************************************************
 * Name				Date			Purpose
 * Vikash Kumar		22/08/2016		modification for generalization (cases : linear and circular sliding in horizontal and vertical directions)		
 */




var BaseGrid = function(_options){
    this.itemContainerID = _options.gridHolderID;
    this.itemContainer=$("#" + this.itemContainerID);
    this.elementType=_options.elementType;
    this.elementKlass = _options.elementKlass;
    var elementId=_options.elementId;
    this.activeItemKlass = _options.activeItemKlass;
    this.pactiveItemKlass = _options.pactiveItemKlass;
    
    var focusItemContainer=$(_options.focusItemContainer);
    var focusItemHeightWidth=_options.focusItemHeightWidth;
    var sliderItemHeightWidth=_options.sliderItemHeightWidth;
    
    this.circular = _options.circular;
    this.focusedAnimationType = _options.focusedAnimationType ? _options.focusedAnimationType : "normal";
    this.slideValue = _options.slideValue ? _options.slideValue : 45;
    this.itemSlide;
    
    this.selectedItemIndex = _options.displayelem;
    this.maxVisible = _options.maxVisible;
    this.direction = _options.direction ? _options.direction : "horizontal";
    this.items = {};
    this.mainData=_options.mainData;
    this.callie=_options.callie;
    var intIndexActiveVHN;		//active elem
    
    //need to veryfy these methods if are of use or not--start
    this.onItemChange=_options.onItemChange;
    this.onItemSelection = _options.onItemSelection;
    this.arrowKeysDisabled=_options.arrowKeysDisabled;
    this.referenceCaller=_options.referenceCaller;
    this.beforeIndex;
    //need to veryfy these methods if are of use or not--end
    
    var translateDir= this.direction=="horizontal" ? "xValue" : "yValue";
    
    
    
   
    
    
   
    var cssAnimHelperObj = null;
   
    var lengthVHN;
    var countVHNReplace;
	var intVHNReplaced;
	var intPositionActiveVHN;
	var lengthLeftsideVHN;
	var animationTime=_options.animationTime;
	
	
	var arrAllChannels=[];
	
	
	
    this.init = function(){
        cssAnimHelperObj = new CSSAnimationHelper();
        if(this.itemContainer.hasClass('vertical')){
            this.direction = 'vertical';
        }
        
        if(this.circular == null || this.circular == 'undefined'){
            this.circular = false;
        }
        
        this.items=$('#'+this.itemContainerID+' *[class^='+this.elementKlass+']');
        
        if(this.selectedItemIndex == null || this.selectedItemIndex == 'undefined' || this.selectedItemIndex < 0){
            this.selectedItemIndex = 0;
        }

        if(this.selectedItemIndex > (this.items.length-1)){
            this.selectedItemIndex = (this.items.length-1);
        }
        
        if(this.maxVisible == null || this.maxVisible == 'undefined' || this.maxVisible <= 0){
            this.maxVisible = this.items.length;
        }
        
        if(this.maxVisible > this.items.length){
            this.maxVisible = this.items.length;
        }
    };
    
    this.getSelectedItem=function(){
        return $(this.items[this.selectedItemIndex]);
    };
    
    this.getSelectedItemIndex=function(){
        return this.selectedItemIndex;
    };

    this.handleKey=function(e){
        //var evtobj = window.event ? event : e;
        var evtobj = e;
        var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
        
        if(this.arrowKeysDisabled){
            return;
        }
        this.selectedItemIndex	=this.itemContainer.find(this.elementType + "." + this.activeItemKlass).index();
        if(this.direction == 'vertical'){
            if(unicode==KeyCodes.VK_UP){
                this.movePrevious();
            }

            if(unicode==KeyCodes.VK_DOWN){
                this.moveNext();
            }
            
            if(unicode==KeyCodes.VK_ENTER){
                this.sendOnItemSelect();
            }
        } else {
            if(unicode==KeyCodes.VK_LEFT){
                this.movePrevious();
            }

            if(unicode==KeyCodes.VK_RIGHT){
                this.moveNext();
            }
            
            if(unicode==KeyCodes.VK_ENTER){
                this.sendOnItemSelect();
            }
        }
    };

    //set focus on selected item
    this.setFocus=function(){
    	this.items=$('#'+this.itemContainerID +' *[class^='+this.elementKlass+']');
        if(this.pactiveItemKlass!=null&&this.pactiveItemKlass!='undefined'){
            $(this.items[this.selectedItemIndex]).removeClass(this.pactiveItemKlass);
        }
        $(this.items[this.selectedItemIndex]).addClass(this.activeItemKlass);
    }

    //remove focus from item
    this.removeFocus=function(){
    	this.items=$('#'+this.itemContainerID+' *[class^='+this.elementKlass+']');
    	this.selectedItemIndex=this.itemContainer.find(this.elementType + "." + this.activeItemKlass).index();
    	if(this.pactiveItemKlass!=null&&this.pactiveItemKlass!='undefined'){
            $(this.items[this.selectedItemIndex]).removeClass(this.pactiveItemKlass);
        }
        $(this.items[this.selectedItemIndex]).removeClass(this.activeItemKlass);
    }
    
    this.initiateContainer=function(){
    	var midPosition=1;		//1st channel will be positioned in the center if channels are greater than 6

    	if(this.direction != 'vertical'){
	    	if(!this.mainData){
                this.mainData=[];
                this.mainData=$('#'+this.itemContainerID +' *[class^='+this.elementKlass+']'); 
            }
            
         
	    	 for(var i=0;i<this.mainData.length;i++){
                arrAllChannels.push("#" + this.mainData[i].id + "$" + i);
             }
	    	
	    	if(this.circular){
	    		if(arrAllChannels.length >= 11){
					lengthVHN=11;
					
				}else if(arrAllChannels.length >= 9 && arrAllChannels.length < 11){
					lengthVHN=arrAllChannels.length ;
					
				}else{				//case when arrAllChannels length is 1 to 6
					lengthVHN=11;
					this.itemContainer.closest("div#rowContainer").addClass("maskItem"+(arrAllChannels.length));
					var startFrom=-(Math.ceil(arrAllChannels.length/2)-1);	
					var temparrAllChannels=this.getListIdsVerticleHub(arrAllChannels,arrAllChannels.length,startFrom)
					arrAllChannels=temparrAllChannels;
					
					/*****logic for main container is modified to 7 element Start****/
					if(arrAllChannels.length == 1){
						var arr=this.getArrayRepeatCount(arrAllChannels,lengthVHN);
						flagForOneCategoryItem=true;
					}else{
						var arr=this.getArrayRepeatCount(arrAllChannels,this.getRepeatTimes(arrAllChannels.length,lengthVHN));
					}
					/*****logic for main container is modified to 7 element End****/
					midPosition=Math.ceil(arrAllChannels.length/2);    //position is calculated dynamically as list items are added dynamically for the case less than 7 channels
				}
	    	}else{
	    		lengthVHN=arrAllChannels.length;
	    		midPosition=Math.ceil(lengthVHN/2);
	    	}
			
			
			
			intPositionActiveVHN=Math.ceil(lengthVHN/2);
			countVHNReplace=Math.floor((lengthVHN-this.maxVisible)/2);
			intVHNReplaced=Math.floor((lengthVHN-this.maxVisible)/2);
			lengthLeftsideVHN=intPositionActiveVHN-1;
			intIndexActiveVHN=intPositionActiveVHN-1;
			this.itemSlide=lengthLeftsideVHN+1;
			firstId=arrAllChannels[midPosition-1].replace("#", "");
			//screenHandler.replaceVHN(firstId);		/*First category should be in middle*/
			//screenHandler.resetList();
			
			var HtmlfocusItemContainer=this.createHtmlFocusedItemContainer();
			focusItemContainer.html(HtmlfocusItemContainer);
			//reset focus item container
			Global.setTranslate3d(focusItemContainer,0,0);
    	}
		this.init();

    }
    
    this.resetList = function(){
		intVHNReplaced=countVHNReplace;
		var xValue=-(sliderItemHeightWidth*lengthLeftsideVHN);
		//this.setTranslate3dX(this.itemContainer,xValue);
		Global.setTranslate3d(this.itemContainer,xValue,0);
		var heightorwidthProp;
		if(this.direction=="horizontal"){
			heightorwidthProp="width";	
		}else{
			heightorwidthProp="height";
		}
		this.itemContainer.find(this.elementType + ":nth-child("+intPositionActiveVHN+")").addClass(this.activeItemKlass).css(heightorwidthProp,focusItemHeightWidth+"px");
	}
    
    this.getArrayRepeatCount=function(arr,count){
		var retArr = [];
		for (var i=0; i<=count-1; i++) {
			retArr = retArr.concat(arr);
		};
		return retArr;
	}
    this.getRepeatTimes = function(arrlength,lengthVHN){
		var repeatTimes = 1;
        var calculate=function() {
        	repeatTimes = repeatTimes + 2;
            return arrlength * repeatTimes > lengthVHN ? repeatTimes : calculate();
        }
        return calculate();
	}
    
    //re-create 
    this.replaceVHN=function(currentItemId) {
		if(currentItemId==''){
			currentItemId = this.itemContainer.find(this.elementType + "." + this.activeItemKlass).attr("id");
		}else{
			currentItemId = currentItemId;
		}
		
		var startFrom=arrAllChannels.indexOf("#"+currentItemId)-lengthLeftsideVHN;
		var idsVerticleHub=screenHandler.getListIdsVerticleHub(arrAllChannels,lengthVHN,startFrom);
		
		var html=this.callie.getHtmlVerticleHub(idsVerticleHub);
		this.itemContainer.html('');
		this.itemContainer.append(html);
	}
    
    
    this.getListIdsVerticleHub=function(arrIds,n,indexFrom) {
		
		if(indexFrom < 0 ){
			var i = arrIds.length+indexFrom;
		}else{
			var i = indexFrom;
		}
		var subarr = [];
		for (var j = 0; j < n; j++) {
			subarr.push(arrIds[(i+j) % arrIds.length]);
		}
		return subarr;
	}
    this.resetFIC = function(){
    	//this.setTranslate3dX(focusItemContainer,0);
    	Global.setTranslate3d(focusItemContainer,0,0);
	}
    this.setTranslate3dX = function(obj,xValue){
		obj.css({"transform":"translate3d("+xValue+"px,0,0)"});	
	}
    //re-create focus item template
    this.createHtmlFocusedItemContainer = function(){
    	var startIndex=intPositionActiveVHN-(countVHNReplace-intVHNReplaced+1);
    	var html=this.callie.createHtmlFocusedItemContainer(startIndex);
    	return html;
	}
    
 //apply properties on the item(s)
    this.applyProps=function(objProps){
    	for(var prop in objProps){
    		if(objProps.hasOwnProperty(prop)){
    			var innerProp=objProps[prop];
    			var propNames = Object.getOwnPropertyNames(innerProp);
    			var animOptions = {};
    			propNames.forEach(function(item){
    				animOptions[item]=innerProp[item];
    			});
    			cssAnimHelperObj.animateCSSAll(animOptions);
    		}
    	}
    }
    //collect information about the properties to be applied on item(s)
    this.implementProps=function(direction){
    	var activeItemElem=this.itemContainer.find(this.elementType + "." + this.activeItemKlass);
    	intIndexActiveVHN=activeItemElem.index();
    	var curTranslate3d =Global.getTranslate3d(this.itemContainer)[translateDir];
		var endValue,endValueFocus,itemTranslate,focusTranslate;
		var curTranslate3dFocus =Global.getTranslate3d(focusItemContainer)[translateDir];
		
		var currentItemElem;
		if(direction=="previous"){
    		intVHNReplaced--;
    		itemTranslate=parseInt(curTranslate3d+sliderItemHeightWidth);
    		focusTranslate=parseInt(curTranslate3dFocus+focusItemHeightWidth);
    		currentItemElem=activeItemElem.next();
    	}else if(direction=="next"){
    		intVHNReplaced++;
    		itemTranslate=parseInt(curTranslate3d-sliderItemHeightWidth);
    		focusTranslate=parseInt(curTranslate3dFocus-focusItemHeightWidth);
    		currentItemElem=activeItemElem.prev();
    	}
		
		endValue="translate3d("+itemTranslate+"px,0,0)";
		endValueFocus="translate3d("+focusTranslate+"px,0,0)";
			if(this.circular){	//for cyclic
				objProps={A: {"elem" : activeItemElem,"cssProperty" : "width","endValue" : focusItemHeightWidth+"px","transitionTime" : animationTime},
		    			B: {"elem" : currentItemElem,"cssProperty" : "width","endValue" : "","transitionTime" : animationTime},
		    			C: {"elem" : this.itemContainer,"cssProperty" : "-webkit-transform","endValue" : endValue,"transitionTime" : animationTime, "completeFunc" : this.AreplaceVHNWithReset.bind(this) /*bind this object to the function*/},
		    			D: {"elem" : focusItemContainer,"cssProperty" : "-webkit-transform","endValue" : endValueFocus,"transitionTime" : animationTime,"completeFunc" : this.BreplaceFICWithReset.bind(this) /*bind this object to the function*/}
		    	}
			}else{		//for linear
				objProps={A: {"elem" : activeItemElem,"cssProperty" : "width","endValue" : focusItemHeightWidth+"px","transitionTime" : animationTime},
		    			B: {"elem" : currentItemElem,"cssProperty" : "width","endValue" : "","transitionTime" : animationTime},
		    			C: {"elem" : this.itemContainer,"cssProperty" : "-webkit-transform","endValue" : endValue,"transitionTime" : animationTime},
		    			D: {"elem" : focusItemContainer,"cssProperty" : "-webkit-transform","endValue" : endValueFocus,"transitionTime" : animationTime,"completeFunc" : (intIndexActiveVHN == 0 || intIndexActiveVHN == lengthVHN) ? "" : this.BreplaceFICWithReset}
		    	}
			}
    	
    	this.applyProps(objProps);
    }
    
   
 
    this.getTranslate3dX = function(obj,container){
		var currTrans = obj.css('-webkit-transform').split(/[()]/)[1];
		var posx = currTrans.split(',')[4];
		return parseInt(posx);
	}
    this.AreplaceVHNWithReset=function() {
		if( (intVHNReplaced%countVHNReplace)==0){		//Replace when remainder is zero
			screenHandler.replaceVHN(this.itemContainer.find(this.elementType + ":nth-child("+(parseInt(intPositionActiveVHN)+parseInt(intVHNReplaced)-parseInt(countVHNReplace))+")").attr("id"));
			screenHandler.resetList();
		}
	}
    this.BreplaceFICWithReset=function() {
		var html=screenHandler.createHtmlFocusedItemContainer();
		focusItemContainer.html(html).css("transform","translate3d(0px,0,0)");
	}// Move the DTV grid in left direction
    
    
    this.movePrevious=function(){
    	cssAnimHelperObj.finishAnimationAll();
        this.beforeIndex=this.selectedItemIndex	//=this.itemContainer.find(this.elementType + "." + this.activeItemKlass).index();
        if(this.circular){
            this.removeFocus();
            this.selectedItemIndex--;
            if(this.circular && this.selectedItemIndex == 0){
                this.selectedItemIndex = this.items.length;
            }
            this.setFocus();
            this.doAnimation("previous");
        }else{
            if(this.selectedItemIndex > 0 || this.itemSlide>0){
            	if(intIndexActiveVHN<=0){
    				return;
    			}	
                this.removeFocus();
                this.selectedItemIndex--;
                this.itemSlide--;
                this.setFocus();
                this.doAnimation("previous");
            }
        }
        
        if(this.beforeIndex!=this.selectedItemIndex){
            this.sendOnItemChange();
        }

    };

    this.moveNext=function(){
    	cssAnimHelperObj.finishAnimationAll();
        this.beforeIndex=this.selectedItemIndex	//=this.itemContainer.find(this.elementType + "." + this.activeItemKlass).index();
        if(this.circular){
            this.removeFocus();
            this.selectedItemIndex++;
            if(this.circular && this.selectedItemIndex == (this.items.length)){
                this.selectedItemIndex = 0
            }            
            this.setFocus();
            this.doAnimation("next");
        }else{
            if(this.selectedItemIndex < this.items.length-1 || this.itemSlide<=arrAllChannels.length){
            	if(intIndexActiveVHN>=lengthVHN-1){
    				return;
    			}
                this.removeFocus();
                this.selectedItemIndex++;
                this.itemSlide++;
                this.setFocus();
                this.doAnimation("next");
            }
        }
        
        if(this.beforeIndex!=this.selectedItemIndex){
            this.sendOnItemChange();
        }
    };
    
    this.sendOnItemChange=function(){
        if(this.onItemChange!=null && this.onItemChange!='undefined'){
            this.onItemChange(this.selectedItemIndex,this.items[this.selectedItemIndex],this.referenceCaller);
        }
    };

    this.pactive=function(){
        if(this.pactiveItemKlass!=null&&this.pactiveItemKlass!='undefined'){
            $(this.items[this.selectedItemIndex]).removeClass(this.activeItemKlass);
        }
        $(this.items[this.selectedItemIndex]).addClass(this.pactiveItemKlass);
    };
    
    this.doAnimation=function(_direction){
        var animOptions = null;
        var endValue = '';

        if(this.focusedAnimationType == "slide"){	//for text slider
            var yTranslate3DValue = new WebKitCSSMatrix($("#" + this.itemContainerID).css("-webkit-transform")).f;
            if(_direction == "previous"){
                endValue = "translate3d(0px," + (yTranslate3DValue + this.slideValue) +"px, 0px)";
            }else if(_direction == "next"){
                endValue = "translate3d(0px," + (yTranslate3DValue - this.slideValue) +"px, 0px)";
            }
            animOptions = {"elem" : $("#" + this.itemContainerID),
                        "cssProperty" : "-webkit-transform",
                        "endValue" : endValue,
                        "transitionTime" : 400
                        };
            cssAnimHelperObj.animateCSSPropertyOnly(animOptions);
        }else{					//for image slider
        	this.implementProps(_direction)
        }
    };
    
    this.getIsVisible = function(){
       // return this.isVisible;
    };
    
    this.sendOnItemSelect = function(){
        if(this.onItemSelection!=null && this.onItemSelection!='undefined'){
            this.onItemSelection();
        }
    };
    var screenHandler = this;
    this.initiateContainer();
};
