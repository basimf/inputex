YUI.add("inputex-date",function(e,t){var n=e.inputEx;n.DateField=function(e){n.DateField.superclass.constructor.call(this,e)},e.extend(n.DateField,n.StringField,{setOptions:function(t){n.DateField.superclass.setOptions.call(this,t),this.messages=e.mix(this.messages,e.Intl.get("inputex-date")),this.options.className=t.className?t.className:"inputEx-Field inputEx-DateField",this.messages.invalid=t.invalidDate?t.invalidDate:this.messages.invalidDate,this.options.dateFormat=t.dateFormat||this.messages.defaultDateFormat,this.options.valueFormat=t.valueFormat},validate:function(){var e=this.options.dateFormat.match(/[^Ymd ]/g)[0],t=n.DateField.superclass.getValue.call(this),r=t.split(e),i,s,o,u,a,f,l;return t===""?!this.options.required:r.length!==3?!1:isNaN(parseInt(r[0],10))||isNaN(parseInt(r[1],10))||isNaN(parseInt(r[2],10))?!1:(i=this.options.dateFormat.split(e),s=n.indexOf("Y",i),r[s].length!==4?!1:(o=parseInt(r[n.indexOf("d",i)],10),u=parseInt(r[s],10),a=parseInt(r[n.indexOf("m",i)],10)-1,f=new Date(u,a,o),l=f.getFullYear(),f.getDate()===o&&f.getMonth()===a&&l===u))},setValue:function(e,t){var r,i;if(e===""){n.DateField.superclass.setValue.call(this,"",t);return}r="",e instanceof Date?r=n.DateField.formatDate(e,this.options.dateFormat):this.options.valueFormat?(i=n.DateField.parseWithFormat(e,this.options.valueFormat),r=n.DateField.formatDate(i,this.options.dateFormat)):r=e,n.DateField.superclass.setValue.call(this,r,t)},getValue:function(e){var t=n.DateField.superclass.getValue.call(this),r;return t===""?"":(r=n.DateField.parseWithFormat(t,this.options.dateFormat),!e&&this.options.valueFormat?n.DateField.formatDate(r,this.options.valueFormat):r)}}),n.DateField.parseWithFormat=function(e,t){if(e){var r=t.match(/[^Ymd ]/g)[0],i=e.split(r),s=t.split(r),o=parseInt(i[n.indexOf("d",s)],10),u=parseInt(i[n.indexOf("Y",s)],10),a=parseInt(i[n.indexOf("m",s)],10)-1;return new Date(u,a,o)}},n.DateField.formatDate=function(e,t){if(e){var n=t.replace("Y",e.getFullYear()),r=e.getMonth()+1,i;return n=n.replace("m",(r<10?"0":"")+r),i=e.getDate(),n=n.replace("d",(i<10?"0":"")+i),n}},n.registerType("date",n.DateField,[{type:"select",label:"Date format",name:"dateFormat",choices:[{value:"m/d/Y"},{value:"d/m/Y"}]}])},"@VERSION@",{requires:["inputex-string"],ix_provides:"date",skinnable:!0,lang:["en","fr","de","ca","es","fr","it","nl","pt-BR"]});
