YUI.add("inputex-datepicker",function(e,t){var n=e.inputEx,r=e.Lang;n.DatePickerField=function(e){n.DatePickerField.superclass.constructor.call(this,e)},e.extend(n.DatePickerField,n.DateField,{setOptions:function(e){n.DatePickerField.superclass.setOptions.call(this,e),this.options.className=e.className?e.className:"inputEx-Field inputEx-DateField inputEx-PickerField inputEx-DatePickerField",this.options.readonly=r.isUndefined(e.readonly)?!0:e.readonly,this.options.calendar=e.calendar||n.messages.defaultCalendarOpts,this.options.zIndex=e.zIndex||4},renderOverlay:function(){this.oOverlay=new e.Overlay({visible:!1,zIndex:this.options.zIndex}),this.oOverlay.render(this.fieldContainer),this.oOverlay.on("visibleChange",function(t){t.newVal?(this.beforeShowOverlay(),this.calendar.show(),this.oOverlay.set("align",{node:this.button,points:[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.BL]}),this.outsideHandler=this.oOverlay.get("boundingBox").on("mousedownoutside",function(e){this.oOverlay.hide()},this)):(this.calendar.hide(),this.outsideHandler&&this.outsideHandler.detach())},this)},_toggleOverlay:function(e){this.oOverlay||(this.renderOverlay(),this.renderCalendar());var t=this.oOverlay.get("visible")?"hide":"show";this.oOverlay[t]()},renderComponent:function(){n.DatePickerField.superclass.renderComponent.call(this),this.button=e.Node.create("<button>&nbsp;</button>").addClass("inputEx-DatePicker-button"),this.button.appendTo(this.wrapEl),this.options.readonly&&e.one(this.el).on("click",this._toggleOverlay,this),this.button.on("click",this._toggleOverlay,this)},renderCalendar:function(){if(!!this.calendarRendered)return;this.calendar=new e.Calendar({width:"250px",showPrevMonth:!0,showNextMonth:!0,date:new Date}),this.calendar.setAttrs(this.options.calendar),this.calendar.render(this.oOverlay.get("contentBox")),this.calendar.on("selectionChange",function(e){var t=e.newSelection[0];this.setValue(t),this.oOverlay.hide()},this),this.calendarRendered=!0},beforeShowOverlay:function(e){if(!!this.calendar){var t=this.getValue(!0),n=this.validate();n&&!!t&&(this.calendar.set("date",t),this.calendar.deselectDates(),this.calendar.selectDates(t))}},close:function(){console.log("DATEPICKER CLOSE",this.oOverlay),this.oOverlay&&this.oOverlay.hide()},disable:function(){n.DatePickerField.superclass.disable.call(this),this.button.set("disabled",!0)},enable:function(){n.DatePickerField.superclass.enable.call(this),this.button.set("disabled",!1)}}),n.messages.defaultCalendarOpts={navigator:!0},n.registerType("datepicker",n.DatePickerField)},"@VERSION@",{requires:["inputex-date","event-outside","node-event-delegate","overlay","calendar"],ix_provides:"datepicker"});
