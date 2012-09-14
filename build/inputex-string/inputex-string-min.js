YUI.add("inputex-string",function(e,t){var n=e.Lang,r=e.inputEx;r.StringField=function(e){r.StringField.superclass.constructor.call(this,e),this.options.typeInvite&&this.updateTypeInvite()},e.extend(r.StringField,r.Field,{setOptions:function(e){r.StringField.superclass.setOptions.call(this,e),this.options.regexp=e.regexp,this.options.size=e.size,this.options.maxLength=e.maxLength,this.options.minLength=e.minLength,this.options.typeInvite=e.typeInvite,this.options.readonly=e.readonly,this.options.autocomplete=n.isUndefined(e.autocomplete)?r.browserAutocomplete:e.autocomplete===!1||e.autocomplete==="off"?!1:!0,this.options.trim=e.trim===!0?!0:!1},renderComponent:function(){this.wrapEl=r.cn("div",{className:"inputEx-StringField-wrapper"});var t={};t.type="text",t.id=this.divEl.id?this.divEl.id+"-field":e.guid(),this.options.size&&(t.size=this.options.size),this.options.name&&(t.name=this.options.name),this.options.readonly&&(t.readonly="readonly"),this.options.maxLength&&(t.maxLength=this.options.maxLength),t.autocomplete=this.options.autocomplete?"on":"off",this.el=r.cn("input",t),this.wrapEl.appendChild(this.el),this.fieldContainer.appendChild(this.wrapEl)},setFieldName:function(e){this.el.name=e},initEvents:function(){e.on("change",this.onChange,this.el,this);if(e.UA.ie>0){var t=this.el;e.on("key",function(e){t.blur(),t.focus()},this.el,"down:13",this)}e.on("focus",this.onFocus,this.el,this),e.on("blur",this.onBlur,this.el,this),e.on("keypress",this.onKeyPress,this.el,this),e.on("keyup",this.onKeyUp,this.el,this)},getValue:function(){var e;return e=this.options.typeInvite&&this.el.value==this.options.typeInvite?"":this.el.value,this.options.trim&&(e=n.trim(e)),e},setValue:function(e,t){this.el.value=n.isNull(e)||n.isUndefined(e)?"":e,r.StringField.superclass.setValue.call(this,e,t)},validate:function(){var e=this.getValue();if(e==="")return!this.options.required;var t=!0;return this.options.regexp&&(t=t&&e.match(this.options.regexp)),this.options.minLength&&(t=t&&e.length>=this.options.minLength),t},disable:function(){this.el.disabled=!0},enable:function(){this.el.disabled=!1},isDisabled:function(){return this.el.disabled},focus:function(){!!this.el&&!n.isUndefined(this.el.focus)&&this.el.focus()},getStateString:function(e){return e==r.stateInvalid&&this.options.minLength&&this.el.value.length<this.options.minLength?r.messages.stringTooShort[0]+this.options.minLength+r.messages.stringTooShort[1]:r.StringField.superclass.getStateString.call(this,e)},setClassFromState:function(){r.StringField.superclass.setClassFromState.call(this),this.options.typeInvite&&this.updateTypeInvite()},updateTypeInvite:function(){e.one(this.divEl).hasClass("inputEx-focused")?e.one(this.divEl).hasClass("inputEx-typeInvite")&&(this.el.value="",this.previousState=null,e.one(this.divEl).removeClass("inputEx-typeInvite")):this.isEmpty()?(e.one(this.divEl).addClass("inputEx-typeInvite"),this.el.value=this.options.typeInvite):e.one(this.divEl).removeClass("inputEx-typeInvite")},onFocus:function(e){r.StringField.superclass.onFocus.call(this,e),this.options.typeInvite&&this.updateTypeInvite()},onKeyPress:function(e){},onKeyUp:function(e){}}),r.registerType("string",r.StringField,[{type:"string",label:"Type invite",name:"typeInvite",value:""},{type:"integer",label:"Size",name:"size",value:20},{type:"integer",label:"Min. length",name:"minLength",value:0}])},"@VERSION@",{requires:["inputex-field","event-key"],ix_provides:"string"});
