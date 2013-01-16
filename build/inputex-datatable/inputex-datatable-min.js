YUI.add("inputex-datatable",function(e,t){var n=e.inputEx;e.namespace("inputEx.Plugin"),n.Plugin.InputExDataTable=function(e){n.Plugin.InputExDataTable.superclass.constructor.call(this,e)},n.Plugin.InputExDataTable.NS="InputExDataTable",e.extend(n.Plugin.InputExDataTable,e.Plugin.Base,{initializer:function(){var e=this.get("host");this.enrichData(),this.enrichColumns(),this.addAddButton(),this.get("disableModifyFunc")||e.delegate("click",this.modifyRecord,"td."+e.getClassName("cell-modify"),this),this.get("disableDeleteFunc")||e.delegate("click",this.deleteRecord,"td."+e.getClassName("cell-delete"),this),this.get("inplaceedit")&&(e.get("contentBox").addClass(e.getClassName("inplaceedit")),this.setupInplaceEditing())},setupInplaceEditing:function(){var e=this.get("host");this.cellClickHandler=e.delegate("click",this.onCellClick,"."+e.getClassName("cell"),this),this.on("editorShow",this._onEditorShow,this)},_onEditorShow:function(){this.get("inplaceOverlay").show()},onCellClick:function(t){var n=function(e){return e.get("tagName")==="TD"&&e.hasClass("yui3-datatable-cell")},r=n(t.target)?t.target:t.target.ancestor(n),i=this.get("host"),s=r.get("parentNode").get("children").indexOf(r),o=i.getColumn(s),u=i.getRecord(r),a=o.key,f=u.get(a),l=this.get("inplaceOverlay"),c=e.Array.find(this.get("inputEx").fields,function(e){return e.name===a}),h=e.mix({parentEl:this.overlayFieldContainer.getDOMNode()},c),p;l.get("visible")&&!l.get("boundingBox").contains(t.target)&&this.onOverlaySave(),t.stopPropagation();if(!c||c.type==="uneditable"||r.hasClass("yui3-datatable-cell-delete")||r.hasClass("yui3-datatable-cell-modify"))return;l.align(r,["tl","tl"]),this.overlayFieldContainer.set("innerHTML",""),p=new e.inputEx(h),p.setValue(f),p.focus(),this._inplaceeditCell={record:u,key:o.key,field:p,td:r},this.fire("editorShow",{column:o,record:u,key:a,value:f,cell:r,field:p})},_initInplaceOverlay:function(){var t=new e.Overlay({zIndex:5}),n=t.get("contentBox"),r=e.Node.create("<div />"),i=e.Node.create("<div class='editor-buttons' />"),s,o;return n.appendChild(r),this.overlayFieldContainer=r,n.appendChild(i),s=e.Node.create("<button>Sauver</button>"),i.appendChild(s),s.addClass("yui3-button"),s.addClass("yui3-button-primary"),o=e.Node.create("<button>Annuler</button>"),o.addClass("yui3-button"),o.addClass("yui3-button-link"),i.appendChild(o),s.on("click",this.onOverlaySave,this),o.on("click",this.onOverlayCancel,this),this.docClickHandler=e.on("click",e.bind(function(e){var t=this.get("inplaceOverlay");t.get("visible")&&!t.get("boundingBox").contains(e.target)&&this.onOverlaySave()},this),e.config.doc),n.addClass(this.get("host").getClassName("inplaceOverlay")),t.hide(),t.render(),t},onOverlaySave:function(){var t=this.get("updateMethod"),n=this._inplaceeditCell.field,r=n.getValue(),i=this._inplaceeditCell.record,s=this._inplaceeditCell.key,o=i.get(s),u={},a=i.get("id"),f=this.get("host"),l=this._inplaceeditCell.td;if(!n.validate())return;if(e.Lang.isDate(r)&&e.Lang.isDate(o)&&r.getTime()===o.getTime()||r===o){this.get("inplaceOverlay").hide();return}u[s]=r,l.addClass(f.getClassName("cell-edited")),t.call(this,a,u,e.bind(function(e){e&&(f.get("data").getById(a).setAttrs(u),l.removeClass(f.getClassName("cell-edited")))},this)),this.get("inplaceOverlay").hide()},onOverlayCancel:function(){this.get("inplaceOverlay").hide()},enrichData:function(){var e=this,t=this.get("host").get("data");t.each(function(t){this.get("disableModifyFunc")||e.addModifyAttr(t),this.get("disableDeleteFunc")||e.addDeleteAttr(t)})},enrichColumns:function(){this.get("disableModifyFunc")||this.addModifyColumn(),this.get("disableDeleteFunc")||this.addDeleteColumn()},addAddButton:function(){if(!this.get("disableAddFunc")){var t="<button class='yui3-button'>"+this.get("strings").addButtonText+"</button>",n=e.Node.create(t);this.addButton=n,this.get("host").get("contentBox").append(n),n.on("click",this._onAddButtonClick,this)}},_onAddButtonClick:function(e){var t=this.get("panel");e.stopPropagation(),t.set("headerContent",this.get("strings").addItemHeader),t.get("field").clear(),t.show()},modifyRecord:function(e){e.stopPropagation();var t=this.get("host").getRecord(e.currentTarget),n=this.get("panel");n.set("headerContent",this.get("strings").modifyItemHeader),n.get("field").setValue(t.getAttrs()),n.show()},deleteRecord:function(t){t.stopPropagation();var n,r=this.get("host"),i=r.getRecord(t.currentTarget),s;if(!this.get("confirmDelete")||confirm(this.get("strings").confirmDeletion))n=this.get("deleteMethod"),s=r.getRow(i),s.addClass(r.getClassName("row-edited")),n.call(this,i,e.bind(function(e){e&&r.get("data").remove(i)},this))},deleteExtraColumns:function(){this.get("disableModifyFunc")||this.removeModifyColumn(),this.get("disableDeleteFunc")||this.removeDeleteColumn()},_initPanel:function(){var t=e.mix({},this.get("panelOptions")),n=new e.inputEx.Panel(e.mix(t,{inputEx:this.get("inputEx"),buttons:{header:["close"],footer:[{value:this.get("strings").saveText,action:e.bind(this.onPanelSaveButton,this),classNames:"yui3-button-primary"},{value:this.get("strings").cancelText,action:e.bind(this.onPanelCancelButton,this),classNames:"yui3-button-link"}]}}));return n.render(),n},onPanelCancelButton:function(e){e.preventDefault(),this.get("panel").hide()},onPanelSaveButton:function(t){t.preventDefault();var n=this.get("panel").get("field"),r=n.getValue(),i=this.get("host"),s,o,u,a,f;if(!n.validate())return;r.id?(u=this.get("updateMethod"),s=i.get("data").getById(r.id),a=i.getRow(s),a.addClass(i.getClassName("row-edited")),u.call(this,r.id,r,e.bind(function(e){e&&(i.get("data").getById(r.id).setAttrs(r),this.get("panel").hide(),a.removeClass(i.getClassName("row-edited")))},this))):(r.id=this.generateId(this.get("idSize")),o=i.get("recordType"),s=new o,s.setAttrs(r),this.addModifyAttr(s),this.addDeleteAttr(s),f=this.get("addMethod"),f.call(this,s,e.bind(function(e){e&&(i.get("data").add(s),this.get("panel").hide())},this)))},destructor:function(){var e=this,t=this.get("host"),n=t.get("data");n.each(function(t){this.get("disableModifyFunc")||e.delModifyAttr(t),this.get("disableDeleteFunc")||e.delDeleteAttr(t)}),this.deleteExtraColumns(),this.get("disableAddFunc")||this.addButton.remove(),this.get("inplaceedit")&&(t.get("contentBox").removeClass(t.getClassName("inplaceedit")),this.cellClickHandler.detach(),this.docClickHandler&&this.docClickHandler.detach()),this.get("panel").destroy()},addModifyAttr:function(e){e.addAttr("modify")},addDeleteAttr:function(e){e.addAttr("delete")},delModifyAttr:function(e){e.removeAttr("modify")},delDeleteAttr:function(e){e.removeAttr("delete")},addModifyColumn:function(){var e=this.get("host");e.addColumn({label:" ",key:this.get("strings").modifyText,className:e.getClassName("cell-modify"),formatter:this.get("modifyColumnFormatter"),nodeFormatter:this.get("modifyColumnNodeFormatter")})},addDeleteColumn:function(){var e=this.get("host");e.addColumn({label:" ",key:this.get("strings").deleteText,className:e.getClassName("cell-delete"),formatter:this.get("deleteColumnFormatter"),nodeFormatter:this.get("deleteColumnNodeFormatter")})},removeModifyColumn:function(){this.get("host").removeColumn("modify")},removeDeleteColumn:function(){this.get("host").removeColumn("delete")},generateId:function(e){var t=this.get("prefixId"),n=e?e:5;return t=t?t:"",t+Math.floor(Math.random()*Math.pow(10,n))},_initStrings:function(){return e.Intl.get("inputex-datatable")}},{ATTRS:{inputEx:{},prefixId:{value:""},idSize:{value:5},disableAddFunc:{value:!1},disableModifyFunc:{value:!1},disableDeleteFunc:{value:!1},strings:{value:null,valueFn:"_initStrings"},confirmDelete:{value:!0},panel:{valueFn:"_initPanel",lazyAdd:!0},panelOptions:{value:{centered:!0,width:500,modal:!0,zIndex:5,visible:!1}},inplaceedit:{value:!1},inplaceOverlay:{valueFn:"_initInplaceOverlay",lazyAdd:!0},addMethod:{value:function(e,t){t(!0)}},updateMethod:{value:function(e,t,n){n(!0)}},deleteMethod:{value:function(e,t){t(!0)}},modifyColumnFormatter:{value:null},deleteColumnFormatter:{value:null},modifyColumnNodeFormatter:{value:null},deleteColumnNodeFormatter:{value:null}}})},"@VERSION@",{requires:["inputex-group","inputex-panel","datatable","overlay","intl"],skinnable:!0,lang:["en","fr","de","ca","es","fr","it","nl"]});
