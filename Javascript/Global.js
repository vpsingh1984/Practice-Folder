"use strict";
//Global variable for bindaing layer
/**
 * Satendar Kumar
 */
var BindingAPI=null;
try{
	BindingAPI=BL_IPTV;
	
}catch(error){
	
}
var Global = (function(){
	//Private methods/varibles
	
	//Storage Keys.
	
	var KEY_CURRENT_CHANNEL='KEY_CURRENT_CHANNEL';
	var KEY_ALL_CHANNEL='KEY_ALL_CHANNEL';
	var CURRENT_LOCALE='CURRENT_LOCALE';
	var TAG='Global';
	var defaultLocale='nl';
	var jqueryI18nInstance=null;
	var progressTimeOut;
	var currentProgressBarValue;
	var currentProgressBarMaxValue;
	var objProgressBarPlayer=window.parent.$("#playerDiv progress");
	var gbObject;
	
	//var SETTING_EPG = "SETTING_EPG";
	//var defaultSettingEPG = Settings.EPG;//{"type":"1", "backgroundColor":"1", "fontColor":"1"};
	
	//Refrence to parent jQuery Object
	var getJqueryInstance = function (_documentContent){
		return function (_selector) {
			return parent.jQuery(_selector, _documentContent); 
		};
	}

	/**
	 * 
	 */
	var logger = (function () {
		var mode = "";					 
		return {
			d: function (_tag,_message) {mode='DEBUG' /*console.log(mode+':'+_tag+':'+_message); */},
			i: function (_tag,_message) {mode='INFO' /*console.log(mode+':'+_tag+':'+_message);*/ }
		}
	})();
	
	//log helper
	var storeData =function (_key,_value) {
		if(localStorage){
			localStorage.setItem(_key, _value);
		}else{
			 if(isEmpty(gbObject)){
             	gbObject=new Object();
             }
            gbObject[_key]=_value; 
			Global.logger.d(TAG," localStorage is not available");
		}
	};
	
	var getData = function(_key){
		if(localStorage){
			return localStorage[_key];
		}else{
			if(isEmpty(gbObject)){
            	gbObject=new Object();
            }
            return gbObject[_key];			
			Global.logger.d(TAG," localStorage is not available");
		}
	};
	var getCurrentTime = function(){
	        var today = new Date();
	        var dd = today.getDate();
	        var mm = today.getMonth();
	        var yyyy = today.getFullYear();
	        var hh = today.getHours();
	        var min = today.getMinutes();
	        var currentDate = new Date(yyyy, mm, dd, hh, min, 0);
	        //var currentDate = new Date();
	        Global.logger.d(TAG,"currentTime-->"+currentDate.getTime());
	        return currentDate.getTime();
	    };
	    
	var handleImage = function(_src,_selector){
		var img = new Image();
		img.onload = function() {
			_selector.attr('src', _src);
			_selector.show();
		  };
		  img.onerror = function() {
			  _selector.hide();
		  };
		  img.src = _src; 
    }
	var isEmpty = function(_param){
		return (_param === 'undefined' || _param === undefined || _param === ''  || _param === null);
	};
	var isEmptyObject = function(_obj){
		// null and undefined are "empty"
	    if (_obj == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (_obj.length > 0)    return false;
	    if (_obj.length === 0)  return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in _obj) {
	        if (hasOwnProperty.call(_obj, key)) return false;
	    }

	    return true;
	};
	var getMacAddress = function(){
		return Utility.getParameter('MACAddress');
	};
	var getTotalChannels = function(){
		var allChannels = JSON.parse(Global.getData(Global.KEY_ALL_CHANNEL));
		return allChannels.BTAResponseGetChannels_v410.channels.channel.length;
	}
	
	var getExternalIDCurrentChannel = function(){
		var currentChannleDetails = JSON.parse(Global.getData(Global.KEY_CURRENT_CHANNEL));	
		return currentChannleDetails.externalID;
	}
	var getIndexCurrentChannel = function(){
		var allChannels = JSON.parse(Global.getData(Global.KEY_ALL_CHANNEL));
		var channelList = allChannels.ChannelProgramSchedules.channels;
		var currentChannleDetails = JSON.parse(Global.getData(Global.KEY_CURRENT_CHANNEL));	
		for(var index in channelList) {
			if(channelList[index].channelId == currentChannleDetails.channelId) {
				return parseInt(index);
			}
		}	
	}
	var setCurrentChannel=function(_JSON){
		Global.storeData(Global.KEY_CURRENT_CHANNEL,JSON.stringify(_JSON));
	};
	var nextAvailableChannelBasedOnNumber = function(channelNumber) {
		var allChannels = JSON.parse(Global.getData(Global.KEY_ALL_CHANNEL));
		var channelList = allChannels.BTAResponseGetChannels_v410.channels.channel;
		for(var key=0; key<channelList.length; key++) {
			if(channelList[key].displayChannelNumber < parseInt(channelNumber) && parseInt(channelNumber) <= channelList[key+1].displayChannelNumber) {
				return channelList[key+1];
			}
		}
	};
	var searchChannelBasedOnNumber = function(channelNumber) {
		var allChannels = JSON.parse(Global.getData(Global.KEY_ALL_CHANNEL));
		var channelList = allChannels.BTAResponseGetChannels_v410.channels.channel;
		for(var key in channelList) {
			if(channelList[key].displayChannelNumber == channelNumber) {
				return channelList[key];
			}
		}
	};
	
	var searchChannelBasedOnIndex = function(index) {
		var allChannels = JSON.parse(Global.getData(Global.KEY_ALL_CHANNEL));
		var channelList = allChannels.BTAResponseGetChannels_v410.channels.channel;
		return channelList[index];
	};
	
	/*
	 * check the current channel by channel External ID
	*/
	var isCurrentChannelByExternalID = function(_channelExternalID) {
		var currentChannleDetails = JSON.parse(Global.getData(Global.KEY_CURRENT_CHANNEL));		
		return currentChannleDetails.externalID ==_channelExternalID ? true : false ;
	};
	
	/*
	 * check the current channel by channel External ID and program time (start and end)
	*/
	var isCurrentChannelByExternalIDProgramTime = function(_channelExternalID, _programStartTime, _programEndTime) {
		var currentChannleDetails = JSON.parse(Global.getData(Global.KEY_CURRENT_CHANNEL));
		var currentTime = new Date().getTime();
	
		if(currentChannleDetails.externalID == _channelExternalID && ( currentTime >= _programStartTime &&  currentTime <= _programEndTime ) )
			return true; 
		else{
			return false;
		}		
			
	};
	var getKeyNumberByUnicode = function(unicode){
	  	return String.fromCharCode((96 <= unicode && unicode <= 105)? unicode-48 : unicode);
	}
	
	var setCurrentLocale=function(locale){
		Global.storeData(Global.CURRENT_LOCALE,locale);
	}
	
	var getCurrentLocale=function(){
		var currentLocale=Global.getData(Global.CURRENT_LOCALE);
		if(!currentLocale)
			currentLocale=getDefaultLocale();
		return currentLocale;
	}
	var getDefaultLocale=function(){
	  	return defaultLocale;
	}
	
	var loadBundles=function (currentLang) {
		
		 jQuery.i18n.properties({
		    name:'messages', 
		    path:'./resources/stubs/json/i18n/', 
		    mode:'both',
		    language:currentLang, 
		    callback: function() { 
		    	refresh_i18n();
		    }
		});
		 
	};
	
	var getI18nInstance=function () {
		if(!jqueryI18nInstance){
			jqueryI18nInstance=jQuery.i18n;
		}
		 return jqueryI18nInstance;
	};
	var refresh_i18n=function () {
	    // Select every html element with the attribute 'data-i18n' and search the properties file for the value
	    // Change this if you want a different attribute to be used
		var jqueryI18nInstance=getI18nInstance();
	    window.parent.$("[data-i18n]").each(function () {
	        var prop = $(this).data('i18n');
	        $(this).text(jqueryI18nInstance.prop(prop));
	    });
	};
	var getMinutesDiff=function (startTimeStamp,endTimeStamp) {
		var minutesDiff=0;
		minutesDiff=(endTimeStamp-startTimeStamp)/60000;
		return Math.floor(minutesDiff);
	};
	var getCurMinutesDiff=function (timeStamp) {
		var minutesDiff=0;
		var curDate = new Date();
	    var curTimeStamp = curDate.getTime();
		minutesDiff=(curTimeStamp-timeStamp)/60000;
		return Math.floor(minutesDiff);
	};
	var updateMainProgressBar = function(value,max){
		var objProgressBarPlayer=window.parent.$("#playerDiv progress");
		objProgressBarPlayer.attr("max",max);
		objProgressBarPlayer.attr("value",value);
	}
	var handleProgressBar = function(){
    	clearInterval(progressTimeOut);
    	objProgressBarPlayer=window.parent.$("#playerDiv progress");
    	currentProgressBarValue=objProgressBarPlayer.attr('value');
    	currentProgressBarMaxValue=objProgressBarPlayer.attr('max');
    	progressTimeOut=setInterval(function(){
    		Global.updateProgessBarValue();
    	}, 60000);
	}
    var updateProgessBarValue = function(){
    	if(parseInt(currentProgressBarValue) >= parseInt(currentProgressBarMaxValue)){
    		clearInterval(progressTimeOut);
    	}else{
    		currentProgressBarValue++;
    		objProgressBarPlayer.attr("value",currentProgressBarValue);
    	}
	}
    
	/**
	* This method is used to get EPG Setting value either from local storage or default value.
	* @return integer value
	*/	
	var getSettingEPG=function(){
		var currentEPG = Global.getData(Settings.Keys.EPG.KEY_EPG);
		currentEPG = isEmptyObject(currentEPG) ? currentEPG : JSON.parse(currentEPG);
		if(!currentEPG){
			currentEPG=getDefaultSettingEPG();
		}
		return currentEPG;
	}
	
	/**
	* This method is used to get default EPG setting value  
	* @return integer value
	*/	
	var getDefaultSettingEPG=function(){
	  	return Settings.EPG;
	}
	/**
	 * get Translate3d value of given object
	 * @param obj
	 * @return obj
	 */
	var getTranslate3d = function(obj){
		var retvalue={};
    	var currTrans = obj.css('-webkit-transform').split(/[()]/)[1];
		retvalue["xValue"]=parseInt(currTrans.split(',')[4]);
		retvalue["yValue"]=parseInt(currTrans.split(',')[5]);
		return retvalue;
	}    
	/**
	 * set Translate3d value of given object
	 * @param obj, xValue, yValue
	 * @return 
	 */
	var setTranslate3d = function(obj,xValue,yValue){
		obj.css({"-webkit-transform":"translate3d("+xValue+"px,"+yValue+"px,0)"});	
	}
	
	return {
		getJqueryInstance : getJqueryInstance,
		logger : logger,
		getCurrentTime:getCurrentTime,
		storeData:storeData,
		getTotalChannels:getTotalChannels,
		getExternalIDCurrentChannel:getExternalIDCurrentChannel,
		getIndexCurrentChannel:getIndexCurrentChannel,
		searchChannelBasedOnIndex:searchChannelBasedOnIndex,
		nextAvailableChannelBasedOnNumber:nextAvailableChannelBasedOnNumber,
		searchChannelBasedOnNumber:searchChannelBasedOnNumber,
		getData:getData,
		handleImage:handleImage,
		isEmpty:isEmpty,
		isEmptyObject:isEmptyObject,
		getMacAddress:getMacAddress,
		setCurrentChannel:setCurrentChannel,
		KEY_CURRENT_CHANNEL:KEY_CURRENT_CHANNEL,
		KEY_ALL_CHANNEL:KEY_ALL_CHANNEL,
		isCurrentChannelByExternalID : isCurrentChannelByExternalID, 
		isCurrentChannelByExternalIDProgramTime : isCurrentChannelByExternalIDProgramTime,
		getKeyNumberByUnicode:getKeyNumberByUnicode,
		CURRENT_LOCALE:CURRENT_LOCALE,
		setCurrentLocale:setCurrentLocale,
		getCurrentLocale:getCurrentLocale,
		getDefaultLocale:getDefaultLocale,
		loadBundles:loadBundles,
		refresh_i18n:refresh_i18n,
		getI18nInstance:getI18nInstance,
		getMinutesDiff:getMinutesDiff,
		getCurMinutesDiff:getCurMinutesDiff,
		updateMainProgressBar:updateMainProgressBar,
		handleProgressBar:handleProgressBar,
		updateProgessBarValue:updateProgessBarValue,		

		getSettingEPG:getSettingEPG,	
		getDefaultSettingEPG:getDefaultSettingEPG,
		
		getTranslate3d:getTranslate3d,
		setTranslate3d:setTranslate3d
	}
})();
