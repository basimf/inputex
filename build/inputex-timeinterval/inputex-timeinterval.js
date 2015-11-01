YUI.add('inputex-timeinterval', function (Y, NAME) {

/**
 * @module inputex-timeinterval
 */
var inputEx = Y.inputEx;

/**
 * A field limited to number inputs (floating)
 * @class inputEx.TimeIntervalField
 * @extends inputEx.CombineField
 * @constructor
 * @param {Object} options Added options
 * <ul>
 *    <li>unit: inputEx.TimeIntervalField.units.MYUNIT (SECOND,MINUTE,HOUR,DAY,MONTH,YEAR)</li>
 * </ul>
 */
inputEx.TimeIntervalField = function(options) {
   inputEx.TimeIntervalField.superclass.constructor.call(this,options);
};
Y.extend(inputEx.TimeIntervalField, inputEx.CombineField, {
   
   /**
    * Additional options
    * @method setOptions
    */
   setOptions: function(options) {
      
      var i,
          unitsStr,
          units = inputEx.TimeIntervalField.units,
          choices = [];

      inputEx.TimeIntervalField.superclass.setOptions.call(this,options);
      

      this.messages = Y.mix(this.messages, Y.Intl.get("inputex-timeinterval"));

      unitsStr = this.messages.timeUnits;
      
      this.options.unit = options.unit || units.SECOND;
      
      
      for (i = 1; i <= 60; i++) {
         choices.push({ value : i });
      }
      
      this.options.fields = options.fields || [
         {
            type: 'select',
            choices: choices
         },
         {
            type: 'select',
            choices: [
               { value: units.SECOND, label: unitsStr.SECOND },
               { value: units.MINUTE, label: unitsStr.MINUTE },
               { value: units.HOUR, label: unitsStr.HOUR },
               { value: units.DAY, label: unitsStr.DAY },
               { value: units.MONTH, label: unitsStr.MONTH },
               { value: units.YEAR, label: unitsStr.YEAR }
            ]
         }
      ];
      
      this.options.separators = options.separators || [false, "&nbsp;&nbsp;", false];
   },
   
   /**
    * Concat the values to return a date
    * @method getValue
    * @return {Integer} the time interval in the field unit
    */
   getValue: function() {
      var v = inputEx.TimeIntervalField.superclass.getValue.call(this);
      return (parseInt(v[0],10)*v[1])/this.options.unit;
   },

   /**
    * Set the value of both subfields
    * @method setValue
    * @param {Number} val The time interval integer (with the given unit)
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event
    * or not (default is true, pass false to NOT send the event)
    */
   setValue: function(val, sendUpdatedEvt) {
      var seconds = (typeof val === "string" ? parseFloat(val,10) : val)*this.options.unit,
          units = inputEx.TimeIntervalField.units,
          selectedUnit, n;
      
      if (seconds < units.SECOND) {
         selectedUnit = units.SECOND;
         n = 1;
      }
      else {
         
         if (seconds % units.YEAR === 0) {
            selectedUnit = units.YEAR;
         } else if (seconds % units.MONTH === 0) {
            selectedUnit = units.MONTH;
         } else if (seconds % units.DAY === 0) {
            selectedUnit = units.DAY;
         } else if (seconds % units.HOUR === 0) {
            selectedUnit = units.HOUR;
         } else if (seconds % units.MINUTE === 0) {
            selectedUnit = units.MINUTE;
         } else {
            selectedUnit = units.SECOND;
         }
         n = Math.floor(seconds/selectedUnit);
      }

      inputEx.TimeIntervalField.superclass.setValue.call(this, [n, selectedUnit], sendUpdatedEvt);
   }

});

inputEx.TimeIntervalField.units = {
   SECOND: 1,
   MINUTE: 60,
   HOUR: 3600,
   DAY: 86400,
   MONTH: 2592000,
   YEAR: 31536000
};

// Register this class as "timeinterval" type
inputEx.registerType("timeinterval", inputEx.TimeIntervalField);


}, '@VERSION@', {
    "requires": [
        "inputex-combine",
        "inputex-select"
    ],
    "ix_provides": "timeinterval",
    "lang": [
        "en",
        "fr",
        "de",
        "ca",
        "es",
        "fr",
        "it",
        "nl",
        "pl",
        "pt-BR"
    ]
});
