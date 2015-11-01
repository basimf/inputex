YUI.add('inputex-textarea', function (Y, NAME) {

/**
 * @module inputex-textarea
 */
var inputEx = Y.inputEx;

/**
 * Create a textarea input
 * @class inputEx.Textarea
 * @extends inputEx.Field
 * @constructor
 * @param {Object} options Added options:
 * <ul>
 *    <li>rows: rows attribute</li>
 *    <li>cols: cols attribute</li>
 * </ul>
 */
inputEx.Textarea = function(options) {
   inputEx.Textarea.superclass.constructor.call(this,options);
};

Y.extend(inputEx.Textarea, inputEx.StringField, {

   /**
    * Set the specific options (rows and cols)
    * @method setOptions
    * @param {Object} options Options object as passed to the constructor
    */
   setOptions: function(options) {

      inputEx.Textarea.superclass.setOptions.call(this, options);

      //I18N
      this.messages = Y.mix(this.messages, Y.Intl.get("inputex-textarea"));
      
      this.options.rows = options.rows || 6;
      this.options.cols = options.cols || 23;

   },
   
   /**
    * Render an 'INPUT' DOM node
    * @method renderComponent
    */
   renderComponent: function() {
      
      // This element wraps the input node in a float: none div
      this.wrapEl = inputEx.cn('div', {className: 'inputEx-StringField-wrapper'});
      
      // Attributes of the input field
      var attributes = {};
      attributes.id = this.divEl.id ? this.divEl.id+'-field' : Y.guid();
      // firefox bug (reported since year 2000 !): one extra row is always added by browser
      //                                           (see : https://bugzilla.mozilla.org/show_bug.cgi?id=33654)
      attributes.rows = !!Y.UA.gecko ? this.options.rows - 1 : this.options.rows;
      attributes.cols = this.options.cols;
      if(this.options.name) { attributes.name = this.options.name; }

      // warning : readonly option doesn't work on IE < 8
      if(this.options.readonly) { attributes.readonly = 'readonly'; }
      
      //if(this.options.maxLength) attributes.maxLength = this.options.maxLength;
   
      // rsi
      if(this.options.required){
         attributes.required = "required";
         attributes["aria-required"] = true;
      }

      // Add placeholder attribute
      if (this.options.placeholder) {
        attributes.placeholder = this.options.placeholder;
      }
      
      // Create the node
      this.el = inputEx.cn('textarea', attributes, null, this.options.value);
      
      // Append it to the main element
      this.wrapEl.appendChild(this.el);
      this.fieldContainer.appendChild(this.wrapEl);
   },
   
   /**
    * Uses the optional regexp to validate the field value
    * @method validate
    */
   validate: function () {
      var previous = inputEx.Textarea.superclass.validate.call(this);
      
      // emulate maxLength property for textarea
      //   -> user can still type but field is invalid
      if (this.options.maxLength) {
         previous = previous && this.getValue().length <= this.options.maxLength;
      }
      
      return previous;
   },
   
   /**
    * Add the minLength string message handling
    * @method getStateString
    */
    getStateString: function(state) {

      // check maxLength (minLength already checked by StringField)
      if (this.options.maxLength && state === inputEx.stateInvalid && this.getValue().length > this.options.maxLength) {
         return this.messages.stringTooLong[0] + this.options.maxLength + this.messages.stringTooLong[1];
      }

      return inputEx.Textarea.superclass.getStateString.call(this, state);
   },
   
   /**
    * @method setClassFromState
    */
   setClassFromState: function(state) {
      inputEx.Textarea.superclass.setClassFromState.call(this, state);

      if(Y.one(this.divEl).hasClass("inputEx-invalid")){
         Y.one(this.el).setAttribute("aria-invalid", "true");
      }else if(Y.one(this.divEl).hasClass("inputEx-valid")){
         Y.one(this.el).removeAttribute("aria-invalid", "true");
      }
   },
   
   
   /**
    * Insert text at the current cursor position
    * @method insert
    * @param {String} text Text to insert
    */
   insert: function(text) {
      
      var sel, startPos, endPos;
      
      //IE support
      if (document.selection) {
         this.el.focus();
         sel = document.selection.createRange();
         sel.text = text;
      }
      //Mozilla/Firefox/Netscape 7+ support
      else if (this.el.selectionStart || this.el.selectionStart == '0') {
         startPos = this.el.selectionStart;
         endPos = this.el.selectionEnd;
         this.el.value = this.el.value.substring(0, startPos)+ text+ this.el.value.substring(endPos, this.el.value.length);
      }
      else {
         this.el.value += text;
      }
   }

});

// Register this class as "text" type
inputEx.registerType("text", inputEx.Textarea, [
   { type: 'integer', label: 'Rows',  name: 'rows', value: 6 },
   { type: 'integer', label: 'Cols', name: 'cols', value: 23 }
]);


}, '@VERSION@', {
    "requires": [
        "inputex-string"
    ],
    "ix_provides": "text",
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
