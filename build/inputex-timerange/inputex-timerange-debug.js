YUI.add('inputex-timerange', function (Y, NAME) {

/**
 * @module inputex-timerange
 */
   var lang = Y.Lang,
       inputEx = Y.inputEx;

/**
 * Tweaking the TimeField to make a Time Range (two TimeFields)
 *    - doesn't show seconds
 *    - Minutes by group of 5
 * @module inputex-timerange
 */
inputEx.TimeRange = function(options) {
   var h1 = [], h2 = [], i, m = [], s;

   for(i = 0 ; i < 25 ; i++) {
      s = i < 10 ?  "0" : "";
      s += i;
      h2.push({ value: s });
      if ( i<24 ){ h1.push({ value: s }); } // First block of hours musn't contain 24
   }
   m = [{ value: "00" },{ value: "05" },{ value: "10" },{ value: "15" },{ value: "20" },{ value: "25" },{ value: "30" },{ value: "35" },{ value: "40" },{ value: "45" },{ value: "50" },{ value: "55" }];
   
   options.fields = [
      {type: 'select', choices: h1 },
      {type: 'select', choices: m },
      {type: 'select', choices: h2 },
      {type: 'select', choices: m }
   ];

   options.separators = options.separators || Y.Intl.get("inputex-timerange", "separators");
   inputEx.TimeRange.superclass.constructor.call(this,options);


   // Hook toggleEndMinutes to the "updated" event of the 3d select
   // Like that when the user selects/unselects 24h the minutes will toogle accordingly
   this.inputs[2].on('updated', this.toggleEndMinutes, this);
};

Y.extend(inputEx.TimeRange, inputEx.CombineField, {

   setOptions: function(options) {
      inputEx.TimeRange.superclass.setOptions.call(this, options);

      // I18N
      this.messages = Y.mix(this.messages,Y.Intl.get("inputex-timerange"));

      if (options.minTime) {
         this.setMinTime(options.mintime);
      }
   },

   setMinTime: function (time) {
      this.options.minTime = time;
      this.setClassFromState();
   },

   onChange: function () {
      this.setClassFromState();
      inputEx.TimeRange.superclass.onChange.call(this);
   },

   /**
    * Returns an array like ["HH:MM","HH:MM"]
    * @method getValue
    */
   getValue: function() {
      var values = inputEx.TimeRange.superclass.getValue.call(this);

      var returnedValue = [];
      returnedValue.push(values[0]+":"+values[1]);
      returnedValue.push(values[2]+":"+values[3]);
      
      return returnedValue;
   },

   /**
    * Set the value
    * @method setValue
    * @param {array} array with 4 Hour strings in display order (format ["HH","MM", "HH","MM"])
    * @param {boolean} [sendUpdatedEvt] (optional) Wether this setValue should fire the 'updated' event or not (default is true, pass false to NOT send the event)
    */
   setValue: function(arr, sendUpdatedEvt) {
      var values = arr[0].split(":").concat(arr[1].split(":"));
      inputEx.TimeRange.superclass.setValue.call(this, values, sendUpdatedEvt);
      this.toggleEndMinutes();
   },

   /**
    * Disable the last selector and set it to "00" when the third one's value is 24
    * (it will be inccorect to have an end superior to 24:00)
    * @method toggleEndMinutes
    */
   toggleEndMinutes: function(){
      var endHours   = this.inputs[2],
          endMinutes = this.inputs[3];
      
      if (endHours.getValue() === '24') {
         endMinutes.setValue("00", false);
         endMinutes.disable();
      }
      else {
         endMinutes.enable();
      }
   },

   /**
    * Add the minLength string message handling
    * @method getStateString
    */
   getStateString: function(state) {
      var values  = this.getValue(),
          minTime = this.options.minTime;

      if (state === inputEx.stateInvalid && values[0] >= values[1]) {
         return this.messages.incorrectOrder;
      }

      if (state === inputEx.stateInvalid && minTime && values[0] <= minTime) {
         return Y.Lang.sub(this.messages.minTimeError, {minTime: minTime});
      }

      return inputEx.TimeRange.superclass.getStateString.call(this, state);
   },

   /**
    * @method validate
    */
   validate: function(){
      var values = this.getValue();
      
      var hm = values[1].split(":");
      if(hm[0] == '24' && hm[1] != '00'){
         return false;
      }
      
      if(values[0] >= values[1]){
         return false;
      }

      if (this.options.minTime && values[0] <= this.options.minTime) {
         return false;
      }
      
      return true;
   }

});

inputEx.registerType("timerange", inputEx.TimeRange);


}, '@VERSION@', {
    "requires": [
        "intl",
        "inputex-combine",
        "inputex-select"
    ],
    "lang": [
        "en",
        "fr",
        "de",
        "es",
        "ca",
        "it",
        "nl",
        "pt-BR"
    ],
    "ix_provides": "timerange"
});
