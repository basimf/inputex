/**
 * @module inputex-object
 */
var inputEx = Y.inputEx;
   
/**
 * list of PairField where where the returned value is converted to an object
 * @class inputEx.ObjectField
 * @extends inputEx.ListField
 * @constructor
 * @param {Object} options inputEx.Field options object
 */
inputEx.ObjectField = function(options) {
   options.elementType = {
      type: 'combine',
      fields: [
         {type: 'string', size: 10 },
         {type:'string', size: 10 }
      ]
   };
   inputEx.ObjectField.superclass.constructor.call(this, options);
};

Y.extend(inputEx.ObjectField, inputEx.ListField, {

   /**
    * Convert the array of 2d elements to an javascript object
    * @method getValue
    */
   getValue: function() {
      
      var i, iLength,
          v = inputEx.ObjectField.superclass.getValue.call(this),
          obj = {};

      for (i = 0, iLength = v.length; i < iLength; i++) {
         obj[ v[i][0] ] = v[i][1];
      }

      return obj;
   },
   
   /**
    * Convert the object into a list of pairs
    * @method setValue
    */
   setValue: function(v) {
      
      var key, val = [];
      
      for (key in v) {
         if (v.hasOwnProperty(key)) {
            val.push([key, v[key]]);
         }
      }
      
      inputEx.ObjectField.superclass.setValue.call(this,val);
   }
});

// Register this class as "object" type
inputEx.registerType('object', inputEx.ObjectField);
