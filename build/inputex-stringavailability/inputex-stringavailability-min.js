YUI.add("inputex-stringavailability",function(e,t){var n=e.Lang,r=e.inputEx;r.StringAvailability=function(e){r.StringAvailability.superclass.constructor.call(this,e)},e.extend(r.StringAvailability,r.StringField,{setOptions:function(e){r.StringAvailability.superclass.setOptions.call(this,e),this.options.uri=e.uri,this.options.messages.stringLoading=e.messages&&e.messages.stringLoading?e.messages.stringLoading:r.messages.stringLoading,this.options.messages.stringAvailable=e.messages&&e.messages.stringAvailable?e.messages.stringAvailable:r.messages.stringAvailable,this.options.messages.stringUnAvailable=e.messages&&e.messages.stringUnAvailable?e.messages.stringUnAvailable:r.messages.stringUnAvailable,this.options.messages.errorDataText=e.messages&&e.messages.errorDataText?e.messages.errorDataText:r.messages.errorDataText,this.options.showMsg=!1,this.isRequesting=!1},render:function(){r.StringAvailability.superclass.render.call(this),e.one(this.fieldContainer).insert(this.availabilityDiv,"after")},renderComponent:function(){r.StringAvailability.superclass.renderComponent.call(this),this.availabilityDiv=r.cn("div",{className:"availabilityDiv"}),this.availabilityDivIcon=r.cn("div",{className:"icon"}),this.availabilityDivText=r.cn("div",{className:"text"}),this.availabilityDiv.appendChild(this.availabilityDivIcon),this.availabilityDiv.appendChild(this.availabilityDivText),this.availabilityDiv.appendChild(r.cn("div",{className:"clear"}))},initEvents:function(){r.StringAvailability.superclass.initEvents.call(this)},onKeyPress:function(e){if(e.keyCode===9)return;this.isRequesting=!0,n.later(0,this,function(){if(this.getValue()===""){this.stopTimer(),this.setAvailabilityState(this.options.required?"required":"none");return}this.resetTimer(),this.setAvailabilityState("loading")})},resetTimer:function(){this.stopTimer(),this.startTimer()},startTimer:function(){var e=this;this.timerId=setTimeout(function(){e.getAvailability(e.getValue())},500)},stopTimer:function(){this.timerId&&(clearTimeout(this.timerId),delete this.timerId)},onAvailable:function(){this.setAvailabilityState("available"),this.isAvailable=!0,this.isRequesting=!1},onUnavailable:function(){this.setAvailabilityState("unavailable"),this.isAvailable=!1,this.isRequesting=!1},onFailure:function(){this.setAvailabilityState("fail"),this.isAvailable=!1,this.isRequesting=!1},setAvailabilityState:function(t){if(t==="none"){this.availabilityDivText.innerHTML="",e.one(this.availabilityDiv).set("className","availabilityDiv"),this.availabilityDiv.style.display="none";return}t==="loading"?this.availabilityDivText.innerHTML=this.options.messages.stringLoading:t==="available"?this.availabilityDivText.innerHTML=this.options.messages.stringAvailable:t==="unavailable"?this.availabilityDivText.innerHTML=this.options.messages.stringUnAvailable:t==="required"?this.availabilityDivText.innerHTML=this.options.messages.required:t==="fail"&&(this.availabilityDivText.innerHTML=this.options.messages.errorDataText),e.one(this.availabilityDiv).set("className","availabilityDiv "+t),this.availabilityDiv.style.display="block"},setClassFromState:function(){r.StringAvailability.superclass.setClassFromState.call(this);var e=this.getState();e==="required"&&this.setAvailabilityState(e)},validate:function(){if(!this.isRequesting){var e=r.StringAvailability.superclass.validate.call(this);return n.isUndefined(this.isAvailable)||(e=this.isAvailable&&e),e}return!1},getAvailability:function(t){var n=this,r={data:{availabilityRequest:t},on:{success:function(t,r){var i=e.JSON.parse(r.responseText);i!=="true"&&!i?(i==="false"||!i)&&n.onUnavailable():n.onAvailable()},failure:function(e,t){n.onFailure(t)}}};e.io(this.options.uri,r)}}),r.registerType("string-availability",r.StringAvailability)},"@VERSION@",{requires:["inputex-string","event-key","io","json-parse"],skinnable:!0});
