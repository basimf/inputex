YUI.add("inputex-textarea",function(e,t){var n=e.inputEx;n.Textarea=function(e){n.Textarea.superclass.constructor.call(this,e)},e.extend(n.Textarea,n.StringField,{setOptions:function(t){n.Textarea.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-textarea")),this.options.rows=t.rows||6,this.options.cols=t.cols||23},renderComponent:function(){this.wrapEl=n.cn("div",{className:"inputEx-StringField-wrapper"});var t={};t.id=this.divEl.id?this.divEl.id+"-field":e.guid(),t.rows=e.UA.gecko?this.options.rows-1:this.options.rows,t.cols=this.options.cols,this.options.name&&(t.name=this.options.name),this.options.readonly&&(t.readonly="readonly"),this.options.required&&(t.required="required",t["aria-required"]=!0),this.el=n.cn("textarea",t,null,this.options.value),this.wrapEl.appendChild(this.el),this.fieldContainer.appendChild(this.wrapEl)},validate:function(){var e=n.Textarea.superclass.validate.call(this);return this.options.maxLength&&(e=e&&this.getValue().length<=this.options.maxLength),e},getStateString:function(e){return this.options.maxLength&&e===n.stateInvalid&&this.getValue().length>this.options.maxLength?this.messages.stringTooLong[0]+this.options.maxLength+this.messages.stringTooLong[1]:n.Textarea.superclass.getStateString.call(this,e)},setClassFromState:function(t){n.Textarea.superclass.setClassFromState.call(this,t),e.one(this.divEl).hasClass("inputEx-invalid")?e.one(this.el).setAttribute("aria-invalid","true"):e.one(this.divEl).hasClass("inputEx-valid")&&e.one(this.el).removeAttribute("aria-invalid","true")},insert:function(e){var t,n,r;document.selection?(this.el.focus(),t=document.selection.createRange(),t.text=e):this.el.selectionStart||this.el.selectionStart=="0"?(n=this.el.selectionStart,r=this.el.selectionEnd,this.el.value=this.el.value.substring(0,n)+e+this.el.value.substring(r,this.el.value.length)):this.el.value+=e}}),n.registerType("text",n.Textarea,[{type:"integer",label:"Rows",name:"rows",value:6},{type:"integer",label:"Cols",name:"cols",value:23}])},"@VERSION@",{requires:["inputex-string"],ix_provides:"text",lang:["en","fr","de","ca","es","fr","it","nl"]});
