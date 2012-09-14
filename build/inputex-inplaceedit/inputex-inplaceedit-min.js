YUI.add("inputex-inplaceedit",function(e,t){var n=e.Lang,r=e.inputEx,i="inputEx-";r.InPlaceEdit=function(e){r.InPlaceEdit.superclass.constructor.call(this,e),this.publish("openEditor"),this.publish("closeEditor")},e.extend(r.InPlaceEdit,r.Field,{setOptions:function(e){r.InPlaceEdit.superclass.setOptions.call(this,e),this.options.visu=e.visu,this.options.editorField=e.editorField,this.options.buttonConfigs=e.buttonConfigs||[{type:"submit",value:r.messages.okEditor,className:"inputEx-Button "+i+"OkButton",onClick:{fn:this.onOkEditor,scope:this}},{type:"link",value:r.messages.cancelEditor,className:"inputEx-Button "+i+"CancelLink",onClick:{fn:this.onCancelEditor,scope:this}}],this.options.animColors=e.animColors||null},renderComponent:function(){this.renderVisuDiv(),this.renderEditor()},renderEditor:function(){var t;this.editorContainer=r.cn("div",{className:i+"editor"},{display:"none"}),this.editorField=r(this.options.editorField,this);var n=this.editorField.getEl();this.editorContainer.appendChild(n),e.one(n).addClass(i+"editorDiv"),this.buttons=[];for(t=0;t<this.options.buttonConfigs.length;t++){var s=this.options.buttonConfigs[t];s.parentEl=this.editorContainer,this.buttons.push(new r.widget.Button(s))}this.editorContainer.appendChild(r.cn("div",null,{clear:"both"})),this.fieldContainer.appendChild(this.editorContainer)},onVisuMouseOver:function(e){if(this.disabled)return;this.colorAnim&&this.colorAnim.stop(!0),r.sn(this.formattedContainer,null,{backgroundColor:this.options.animColors.from})},onVisuMouseOut:function(t){var n;if(this.disabled)return;this.colorAnim&&this.colorAnim.stop(!0);if(!this.options.animColors)return;n={node:this.formattedContainer},this.options.animColors.from&&(n.from={backgroundColor:this.options.animColors.from}),this.options.animColors.from&&(n.to={backgroundColor:this.options.animColors.to}),this.colorAnim=new e.Anim(n);var r=this;this.colorAnim.on("end",function(){e.one(r.formattedContainer).setStyle("backgroundColor","")}),this.colorAnim.run()},renderVisuDiv:function(){this.formattedContainer=r.cn("div",{className:"inputEx-InPlaceEdit-visu"}),n.isFunction(this.options.formatDom)?this.formattedContainer.appendChild(this.options.formatDom(this.options.value)):n.isFunction(this.options.formatValue)?this.formattedContainer.innerHTML=this.options.formatValue(this.options.value):this.formattedContainer.innerHTML=n.isUndefined(this.options.value)?r.messages.emptyInPlaceEdit:this.options.value,this.fieldContainer.appendChild(this.formattedContainer)},initEvents:function(){e.one(this.formattedContainer).on("click",this.openEditor,this,!0),this.options.animColors&&(e.one(this.formattedContainer).on("mouseover",this.onVisuMouseOver,this),e.one(this.formattedContainer).on("mouseout",this.onVisuMouseOut,this));if(this.editorField.el){var t=this;e.on("keyup",function(e){t.onKeyUp(e)},"#"+e.one(this.editorField.el).get("id")),e.on("keydown",function(e){t.onKeyDown(e)},"#"+e.one(this.editorField.el).get("id"))}},onKeyUp:function(e){e.keyCode===13&&this.onOkEditor(e),e.keyCode===27&&this.onCancelEditor(e)},onKeyDown:function(e){e.keyCode===9&&this.onOkEditor(e)},onOkEditor:function(e){e&&e.halt();var t=this.editorField.getValue();this.setValue(t),this.closeEditor();var n=this;setTimeout(function(){n.fire("updated",t)},50)},onCancelEditor:function(e){e&&e.halt(),this.closeEditor()},closeEditor:function(){this.editorContainer.style.display="none",this.formattedContainer.style.display="",this.fire("closeEditor")},enable:function(){this.disabled=!1,r.sn(this.formattedContainer,{className:"inputEx-InPlaceEdit-visu"})},disable:function(){this.disabled=!0,r.sn(this.formattedContainer,{className:"inputEx-InPlaceEdit-visu-disable"})},openEditor:function(){if(this.disabled)return;var e=this.getValue();this.editorContainer.style.display="",this.formattedContainer.style.display="none",n.isUndefined(e)||this.editorField.setValue(e),this.editorField.focus(),this.editorField.el&&n.isFunction(this.editorField.el.setSelectionRange)&&!!e&&!!e.length&&this.editorField.el.setSelectionRange(0,e.length),this.fire("openEditor")},getValue:function(){var e=this.editorContainer.style.display==="";return e?this.editorField.getValue():this.value},setValue:function(e,t){this.value=e,n.isUndefined(e)||e===""?r.renderVisu(this.options.visu,r.messages.emptyInPlaceEdit,this.formattedContainer):r.renderVisu(this.options.visu,this.value,this.formattedContainer),this.editorContainer.style.display===""&&this.editorField.setValue(e),r.InPlaceEdit.superclass.setValue.call(this,e,t)},close:function(){this.editorContainer.style.display="none",this.formattedContainer.style.display="",this.fire("openEditor")}}),r.registerType("inplaceedit",r.InPlaceEdit,[{type:"type",label:"Editor",name:"editorField"}])},"@VERSION@",{requires:["inputex-field","inputex-button","anim","inputex-visus"],ix_provides:"inplaceedit"});
