var CSSAnimationHelper = function(){
    
    var _self = this;
    var TAG="CSSAnimationHelper";
    
    /*
    keyNames : ulShowCaseActiveItem_showcaseLeft ulShowCaseActiveItem_showcaseRight
    uSlider_showcaseLeft uSlider_showcaseRight
    */
    var animatedElementsDict = {};
    
    this.addToAnimatedDict = function(_key, _props){
        if(animatedElementsDict[_key]){
            this.finishAnimation(_key);
        }
        animatedElementsDict[_key] = _props;
    };
    
    this.finishAnimation = function(_key){
        var obj = animatedElementsDict[_key];
        if(obj){
            _self.removeFromAnimatedDict(obj.elem.attr("id"));
            obj.elem.css('-webkit-transition', "");
            obj.elem.unbind("webkitTransitionEnd");
            obj.elem.css(obj.property, obj.endValue);
            
            if(obj.endCB){
            	if(obj.endCBParameters){
            		//All parameters should be sent  
            		obj.endCB(obj.endCBParameters);
                    /*if(obj.endCBParameters.length == 1){
                        obj.endCB(obj.endCBParameters[0]);
                    }else if(obj.endCBParameters.length == 2){
                        obj.endCB(obj.endCBParameters[0], obj.endCBParameters[1]);
                    }*/
                }else{
                    obj.endCB();
                }
            }
        }
    };
    
    this.finishAnimationAll = function(){
        for(key in animatedElementsDict){
            var obj = animatedElementsDict[key];
            if(obj){
                this.finishAnimation(key);
            }
        }
        animatedElementsDict = {};
    };
    
    this.removeFromAnimatedDict = function(_key){
        animatedElementsDict[_key] = "";
    }
    
    this.transitionEndCB = function(){
        //"this" reference is passed to the transitionEndCB function 
        var obj = animatedElementsDict[$(this).attr("id")];
        if(obj && obj.endCB){
            _self.removeFromAnimatedDict(obj.elem.attr("id"));
            obj.elem.css('-webkit-transition', "");
            obj.elem.unbind("webkitTransitionEnd");
            if(obj.endCBParameters){
            	obj.endCB(obj.endCBParameters);
                /*if(obj.endCBParameters.length == 1){
                    obj.endCB(obj.endCBParameters[0]);
                }else if(obj.endCBParameters.length == 2){
                    obj.endCB(obj.endCBParameters[0], obj.endCBParameters[1]);
                }*/
            }else{
                obj.endCB();
            }
        }else{
            //_self.doFinishAnimation($(this));
            _self.removeFromAnimatedDict($(this).attr("id"));
            $(this).css('-webkit-transition',"");
            $(this).unbind("webkitTransitionEnd");
        }
    };
    
    this.doFinishAnimation = function(_elem){
        _self.removeFromAnimatedDict(_elem.attr("id"));
        _elem.css('-webkit-transition',"");
        _elem.unbind("webkitTransitionEnd");
    };
    
    this.animateCSS = function(_$elem, _cssProperty, _endValue, _animTime/* in millis*/, _completeFunc, _completeFuncParams){    	
    	Global.logger.d(TAG," _completeFuncParams "+_completeFuncParams);
        _$elem.bind("webkitTransitionEnd", this.transitionEndCB);
        
        var _options = {"elem" : _$elem,
                        "property" : _cssProperty,
                        "endValue" : _endValue,
                        "endCB" : _completeFunc,
                        "endCBParameters" : _completeFuncParams};
        this.addToAnimatedDict(_$elem.attr("id"), _options);
		//XXX all to ??
        _$elem.css('-webkit-transition','all '+ _animTime +'ms ease-out');
        _$elem.css(_cssProperty, _endValue);
    };
    
    this.animateCSSPropertyOnly = function(_$elem, _cssProperty, _endValue, _animTime/* in millis*/, _completeFunc, _completeFuncParams){
        _$elem.bind("webkitTransitionEnd", this.transitionEndCB);
        
        var _options = {"elem" : _$elem,
                        "property" : _cssProperty,
                        "endValue" : _endValue,
                        "endCB" : _completeFunc,
                        "endCBParameters" : _completeFuncParams};
        this.addToAnimatedDict(_$elem.attr("id"), _options);
		//XXX all to ??
        _$elem.css('-webkit-transition', _cssProperty + ' ' + _animTime + 'ms ease-out');
        _$elem.css(_cssProperty, _endValue);

    };
	
	this.animateCSSPropertyOnlyNew = function(_$elem, _cssProperty, _endValue, _animTime/* in millis*/, _completeFunc, _completeFuncParams){
        _$elem.bind("webkitTransitionEnd", this.transitionEndCB);
        
        var _options = {"elem" : _$elem,
                        "property" : _cssProperty,
                        "endValue" : _endValue,
                        "endCB" : _completeFunc,
                        "endCBParameters" : _completeFuncParams};
        this.addToAnimatedDict(_$elem.attr("id"), _options);
		//XXX all to ??
		_animTime = 500;
        _$elem.css('-webkit-transition', _cssProperty + ' ' + _animTime + 'ms ease-out');
        _$elem.css(_cssProperty, _endValue);

    };
}
