YUI.add("inputex-datesplit",function(e,t){var n=e.Lang,r=e.inputEx;r.DateSplitField=function(t){this.messages=e.Intl.get("inputex-datesplit"),t.dateFormat||(t.dateFormat=this.messages.defaultDateFormat);var n=t.dateFormat.split("/");this.yearIndex=r.indexOf("Y",n),this.monthIndex=r.indexOf("m",n),this.dayIndex=r.indexOf("d",n),t.fields=[];for(var i=0;i<3;i++)i==this.dayIndex?t.fields.push({type:"integer",placeholder:this.messages.dayPlaceholder,size:2,trim:!0}):i==this.yearIndex?t.fields.push({type:"integer",placeholder:this.messages.yearPlaceholder,size:4,trim:!0}):t.fields.push({type:"integer",placeholder:this.messages.monthPlaceholder,size:2,trim:!0});t.separators=t.separators||[!1,"&nbsp;","&nbsp;",!1],r.DateSplitField.superclass.constructor.call(this,t),this.initAutoTab()},e.extend(r.DateSplitField,r.CombineField,{setOptions:function(t){r.DateSplitField.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-datesplit"))},setValue:function(e,t){var i=[];if(!e||!n.isFunction(e.getTime)||!n.isNumber(e.getTime()))i[this.monthIndex]="",i[this.yearIndex]="",i[this.dayIndex]="";else for(var s=0;s<3;s++)i.push(s===this.dayIndex?this.ensureTwoChars(e.getDate()):s===this.monthIndex?this.ensureTwoChars(e.getMonth()+1):e.getFullYear());r.DateSplitField.superclass.setValue.call(this,i,t)},ensureTwoChars:function(e){return e+="",e.length===1&&(e="0"+e),e},getValue:function(){if(this.isEmpty())return"";var e=r.DateSplitField.superclass.getValue.call(this),t=e[this.yearIndex];if(n.isNumber(t)){var i=(new Date).getFullYear(),s=i%100,o=Math.floor(i/100);t<100&&(t>s?t=(o-1)*100+t:t=o*100+t)}return new Date(t,e[this.monthIndex]-1,e[this.dayIndex])},validate:function(){var e=r.DateSplitField.superclass.validate.call(this);if(!e)return!1;var t=r.DateSplitField.superclass.getValue.call(this),n=t[this.dayIndex],i=t[this.monthIndex],s=t[this.yearIndex],o=this.getValue();return o===""?!this.options.required:n===""||i===""||s===""?!1:s<0||s>9999||n<1||n>31||i<1||i>12?!1:o!="Invalid Date"},initAutoTab:function(){var t=[48,49,50,51,52,53,54,55,56,57],r=function(e){for(var n=0,r=t.length;n<r;n++)if(e==t[n])return!0;return!1},i=this,s=function(e){n.later(0,i,function(){var t=i.inputs[e];t.el.value.length==t.options.size&&i.inputs[e+1].focus()})};e.one(this.inputs[0].el).on("keypress",function(e){r(e.charCode)&&s(0)},this,!0),e.one(this.inputs[1].el).on("keypress",function(e){r(e.charCode)&&s(1)},this,!0)}}),r.registerType("datesplit",r.DateSplitField)},"@VERSION@",{requires:["inputex-combine","inputex-integer"],ix_provides:"datesplit",lang:["en","fr","de","ca","es","fr","it","nl","pl","pt-BR"]});
