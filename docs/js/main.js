/**
 * @license rxcomp-form v1.0.0-alpha.11
 * (c) 2019 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('rxcomp'), require('rxjs'), require('rxjs/operators')) :
  typeof define === 'function' && define.amd ? define('main', ['rxcomp', 'rxjs', 'rxjs/operators'], factory) :
  (global = global || self, factory(global.rxcomp, global.rxjs, global.rxjs.operators));
}(this, (function (rxcomp, rxjs, operators) { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var FormStatus = {
    Pending: 'pending',
    Valid: 'valid',
    Invalid: 'invalid',
    Disabled: 'disabled'
  };
  var FormAttributes = ['untouched', 'touched', 'pristine', 'dirty', 'pending', 'enabled', 'disabled', 'valid', 'invalid', 'submitted'];

  var FormAbstractCollectionDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormAbstractCollectionDirective, _Directive);

    function FormAbstractCollectionDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormAbstractCollectionDirective.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var control = this.control;
      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
    };

    _createClass(FormAbstractCollectionDirective, [{
      key: "control",
      get: function get() {
        return {};
      }
    }]);

    return FormAbstractCollectionDirective;
  }(rxcomp.Directive);
  FormAbstractCollectionDirective.meta = {
    // no selection, abstract class
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormArrayDirective =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormArrayDirective, _FormAbstractCollecti);

    function FormArrayDirective() {
      return _FormAbstractCollecti.apply(this, arguments) || this;
    }

    _createClass(FormArrayDirective, [{
      key: "control",
      get: function get() {
        // console.log('FormArrayDirective', (this.formArrayName ? `formArrayName ${this.formArrayName}` : `formArray ${this.formArray}`));
        if (this.formArray) {
          return this.formArray;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formArrayName);
        }
      }
    }]);

    return FormArrayDirective;
  }(FormAbstractCollectionDirective);
  FormArrayDirective.meta = {
    selector: '[formArray],[formArrayName]',
    inputs: ['formArray', 'formArrayName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormAbstractDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormAbstractDirective, _Directive);

    function FormAbstractDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormAbstractDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node;
      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange);
      node.addEventListener('change', this.onChange);
      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.onChanges = function onChanges(changes) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      var control = this.control;
      /*
      // remove all invalids then
      Object.keys(control.errors).forEach(key => {
      	node.classList.add(`invalid-${key}`);
      });
      */

      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
      this.writeValue(control.value);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node; // node.setAttribute('value', value == null ? '' : value);


      node.value = value == null ? '' : value;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    } // onFocus(event) {}
    ;

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext5 = rxcomp.getContext(this),
          node = _getContext5.node;

      node.disabled = disabled; // node.setAttribute('disabled', disabled);
    };

    _createClass(FormAbstractDirective, [{
      key: "control",
      get: function get() {
        if (this.formControl) {
          return this.formControl;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formControlName);
        }
      }
    }]);

    return FormAbstractDirective;
  }(rxcomp.Directive);
  FormAbstractDirective.meta = {
    // no selection, abstract class
    inputs: ['formControl', 'formControlName', 'value'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };
  /*

  LEGACY
  button: 		A push button with no default behavior.
  checkbox: 		A check box allowing single values to be selected/deselected.
  file: 			A control that lets the user select a file. Use the accept attribute to define the types of files that the control can select.
  hidden: 		A control that is not displayed but whose value is submitted to the server.
  image: 			A graphical submit button. You must use the src attribute to define the source of the image and the alt attribute to define alternative text. You can use the height and width attributes to define the size of the image in pixels.
  password: 		A single-line text field whose value is obscured. Use the maxlength and minlength attributes to specify the maximum length of the value that can be entered.
  				Note: Any forms involving sensitive information like passwords (e.g. login forms) should be served over HTTPS;
  				Firefox now implements multiple mechanisms to warn against insecure login forms — see Insecure passwords.
  				Other browsers are also implementing similar mechanisms.

  radio: 			A radio button, allowing a single value to be selected out of multiple choices.
  reset: 			A button that resets the contents of the form to default values.
  submit: 		A button that submits the form.
  text: 			A single-line text field. Line-breaks are automatically removed from the input value.

  */

  /*

  HTML5
  color: 			(ie) A control for specifying a color. A color picker's UI has no required features other than accepting simple colors as text (more info).
  date: 			(ie) A control for entering a date (year, month, and day, with no time).
  datetime-local: (ie) A control for entering a date and time, with no time zone.
  email: 			A field for editing an e-mail address.
  month: 			(ie) A control for entering a month and year, with no time zone.
  number: 		A control for entering a number.
  range: 			A control for entering a number whose exact value is not important.
  search: 		A single-line text field for entering search strings. Line-breaks are automatically removed from the input value.
  tel: 			A control for entering a telephone number.
  time: 			(ie) A control for entering a time value with no time zone.
  url: 			A field for entering a URL.
  week: 			(ie) A control for entering a date consisting of a week-year number and a week number with no time zone.

  */

  /*

  ATTRIBUTES
  autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
  autofocus		A Boolean which, if present, makes the input take focus when the form is presented
  disabled		A Boolean attribute which is present if the input should be disabled
  form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
  list			The id of a <datalist> element that provides a list of suggested values for the input
  name			The input's name, to identify the input in the data submitted with the form's data
  readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
  required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
  tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
  type			A string indicating which input type the <input> element represents
  value			The input's current value

  */

  var FormCheckboxDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormCheckboxDirective, _FormAbstractDirectiv);

    function FormCheckboxDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormCheckboxDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange); // node.addEventListener('change', this.onChange);

      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      value === this.value ? node.setAttribute('checked', value) : node.removeAttribute('checked');
      /*
      const checked = (node.value === value);
      if (node.checked !== checked) {
      	node.checked = checked;
      }
      */
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      this.control.value = node.checked ? this.value : this.value === true ? false : null;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    } // onFocus(event) {}
    ;

    return FormCheckboxDirective;
  }(FormAbstractDirective);
  FormCheckboxDirective.meta = {
    selector: 'input[type=checkbox][formControl],input[type=checkbox][formControlName]',
    inputs: ['formControl', 'formControlName', 'value'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };
  /*

  ATTRIBUTES
  autocomplete	A string indicating the type of autocomplete functionality, if any, to allow on the input
  autofocus		A Boolean which, if present, makes the input take focus when the form is presented
  disabled		A Boolean attribute which is present if the input should be disabled
  form			The id of the <form> of which the input is a member; if absent, the input is a member of the nearest containing form, or is not a member of a form at all
  list			The id of a <datalist> element that provides a list of suggested values for the input
  name			The input's name, to identify the input in the data submitted with the form's data
  readonly		A Boolean attribute which, if true, indicates that the input cannot be edited
  required		A Boolean which, if true, indicates that the input must have a value before the form can be submitted
  tabindex		A numeric value providing guidance to the user agent as to the order in which controls receive focus when the user presses the Tab key
  type			A string indicating which input type the <input> element represents
  value			The input's current value

  */

  var FormFieldComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FormFieldComponent, _Component);

    function FormFieldComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = FormFieldComponent.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var control = this.control;
      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
    };

    _createClass(FormFieldComponent, [{
      key: "control",
      get: function get() {
        // console.log('FormFieldComponent', (this.formFieldName ? `formFieldName ${this.formFieldName}` : `formField ${this.formField}`));
        if (this.formField) {
          return this.formField;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formFieldName);
        }
      }
    }]);

    return FormFieldComponent;
  }(rxcomp.Component);
  FormFieldComponent.meta = {
    selector: '[formField],[formFieldName]',
    inputs: ['formField', 'formFieldName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormGroupDirective =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormGroupDirective, _FormAbstractCollecti);

    function FormGroupDirective() {
      return _FormAbstractCollecti.apply(this, arguments) || this;
    }

    _createClass(FormGroupDirective, [{
      key: "control",
      get: function get() {
        // console.log('FormGroupDirective', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
        if (this.formGroup) {
          return this.formGroup;
        } else {
          if (!this.host) {
            throw 'missing form collection';
          }

          return this.host.control.get(this.formGroupName);
        }
      }
    }]);

    return FormGroupDirective;
  }(FormAbstractCollectionDirective);
  FormGroupDirective.meta = {
    selector: '[formGroup],[formGroupName]',
    inputs: ['formGroup', 'formGroupName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormInputDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormInputDirective, _FormAbstractDirectiv);

    function FormInputDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormInputDirective.prototype;

    _proto.writeValue = function writeValue(value) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.value = value == null ? '' : value;
    };

    _proto.onChange = function onChange(event) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormInputDirective;
  }(FormAbstractDirective);
  FormInputDirective.meta = {
    selector: 'input[type=text][formControl],input[type=text][formControlName],input[type=email][formControl],input[type=email][formControlName],input[type=password][formControl],input[type=password][formControlName],textarea[formControl],textarea[formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormPlaceholderDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormPlaceholderDirective, _Directive);

    function FormPlaceholderDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormPlaceholderDirective.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.placeholder = this.placeholder;
    };

    return FormPlaceholderDirective;
  }(rxcomp.Directive);
  FormPlaceholderDirective.meta = {
    selector: 'input[placeholder],textarea[placeholder]',
    inputs: ['placeholder']
  };

  var FormRadioDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormRadioDirective, _FormAbstractDirectiv);

    function FormRadioDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormRadioDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange); // node.addEventListener('change', this.onChange);

      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      node.checked = node.value === value;
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      if (node.checked) {
        this.control.value = node.value;
      }
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormRadioDirective;
  }(FormAbstractDirective);
  FormRadioDirective.meta = {
    selector: 'input[type=radio][formControl],input[type=radio][formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormSelectDirective =
  /*#__PURE__*/
  function (_FormAbstractDirectiv) {
    _inheritsLoose(FormSelectDirective, _FormAbstractDirectiv);

    function FormSelectDirective() {
      return _FormAbstractDirectiv.apply(this, arguments) || this;
    }

    var _proto = FormSelectDirective.prototype;

    _proto.writeValue = function writeValue(value) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      node.value = value == null ? '' : value;
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;

      node.disabled = disabled;
    };

    _proto.onChange = function onChange(event) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node;

      this.control.value = node.value === '' ? null : node.value;
    };

    _proto.onBlur = function onBlur(event) {
      this.control.touched = true;
    };

    return FormSelectDirective;
  }(FormAbstractDirective);
  FormSelectDirective.meta = {
    selector: 'select[formControl],select[formControlName]',
    inputs: ['formControl', 'formControlName'],
    hosts: {
      host: FormAbstractCollectionDirective
    }
  };

  var FormSubmitDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormSubmitDirective, _Directive);

    function FormSubmitDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormSubmitDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          module = _getContext.module,
          node = _getContext.node,
          selector = _getContext.selector,
          parentInstance = _getContext.parentInstance;

      var event = this.event = selector.replace(/\[|\]|\(|\)/g, '');
      var event$ = this.event$ = rxjs.fromEvent(node, event).pipe(operators.tap(function (event) {
        event.preventDefault(); // console.log('event');
      }), operators.shareReplay(1));
      var expression = node.getAttribute("(" + event + ")");

      if (expression) {
        var outputFunction = module.makeFunction(expression, ['$event']);
        event$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
          module.resolve(outputFunction, parentInstance, event);
        });
      } else {
        parentInstance[event + "$"] = event$;
      } // console.log('parentInstance', parentInstance);
      // console.log('EventDirective.onInit', 'selector', selector, 'event', event);

    };

    return FormSubmitDirective;
  }(rxcomp.Directive);
  FormSubmitDirective.meta = {
    selector: "[(submit)]"
  };

  var FormModule =
  /*#__PURE__*/
  function (_Module) {
    _inheritsLoose(FormModule, _Module);

    function FormModule() {
      return _Module.apply(this, arguments) || this;
    }

    return FormModule;
  }(rxcomp.Module);
  var factories = [FormArrayDirective, FormCheckboxDirective, FormFieldComponent, FormInputDirective, FormRadioDirective, FormSelectDirective, FormGroupDirective, FormPlaceholderDirective, FormSubmitDirective];
  var pipes = [];
  FormModule.meta = {
    declarations: [].concat(factories, pipes),
    exports: [].concat(factories, pipes)
  };

  /** Class representing an abstract form control. */

  var FormAbstract =
  /*#__PURE__*/
  function () {
    /**
     * Create a FormAbstract.
     * @param {Validator[]} validators - A list of validators.
     */
    function FormAbstract(validators) {
      if (validators === void 0) {
        validators = [];
      }

      this.status = FormStatus.Pending;
      this.validators = validators;
      this.errors = [];
    }
    /**
     * @private initialize subjects
     * @return {void}
     */


    var _proto = FormAbstract.prototype;

    _proto.initSubjects_ = function initSubjects_() {
      this.valueSubject = new rxjs.BehaviorSubject(null);
      this.valueChildren = new rxjs.Subject();
      this.statusSubject = new rxjs.BehaviorSubject(this);
      this.statusChildren = new rxjs.Subject();
    }
    /**
     * @private initialize observables
     * @return {void}
     */
    ;

    _proto.initObservables_ = function initObservables_() {
      var _this = this;

      this.value$ = rxjs.merge(this.valueSubject, this.valueChildren).pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function () {
        _this.submitted_ = false;
        _this.dirty_ = true;

        _this.statusSubject.next(_this);
      }), operators.shareReplay(1));
      this.status$ = rxjs.merge(this.statusSubject, this.statusChildren).pipe( // auditTime(1),
      operators.tap(function () {
        _this.reduceValidators_();
      }), operators.shareReplay(1));
      this.changes$ = rxjs.merge(this.value$, this.status$).pipe(operators.map(function () {
        return _this.value;
      }), operators.shareReplay(1));
    }
    /**
     * @private
     * @return {errors} an object with key, value errors
     */
    ;

    _proto.reduceValidators_ = function reduceValidators_() {
      return this.validate(this.value);
    }
    /**
     * @param {null | string} value - the inner control value
     * @return {errors} an object with key, value errors
     */
    ;

    _proto.validate = function validate(value) {
      if (this.status === FormStatus.Disabled || this.submitted_) {
        this.errors = {};
      } else {
        this.errors = Object.assign.apply(Object, [{}].concat(this.validators.map(function (x) {
          return x(value);
        })));
        this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid; // this.errors = this.validators.map(x => x(value)).filter(x => x !== null);
        // this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
      }

      return this.errors;
    }
    /**
     * @return {boolean} the pending status
     */
    ;

    /**
     * @return {void}
     */
    _proto.reset = function reset() {
      this.status = FormStatus.Pending;
      this.value_ = null;
      this.dirty_ = false;
      this.touched_ = false;
      this.submitted_ = false;
      this.statusSubject.next(this);
    }
    /**
     * @param {null | string} value - a value
     * @return {void}
     */
    ;

    _proto.patch = function patch(value) {
      this.value_ = value;
      this.dirty_ = true;
      this.submitted_ = false;
      this.statusSubject.next(this);
    };

    _createClass(FormAbstract, [{
      key: "pending",
      get: function get() {
        return this.status === FormStatus.Pending;
      }
      /**
       * @return {boolean} the valid status
       */

    }, {
      key: "valid",
      get: function get() {
        return this.status === FormStatus.Valid;
      }
      /**
       * @return {boolean} the invalid status
       */

    }, {
      key: "invalid",
      get: function get() {
        return this.status === FormStatus.Invalid;
      }
      /**
       * @return {boolean} the disabled status
       */

    }, {
      key: "disabled",
      get: function get() {
        return this.status === FormStatus.Disabled;
      }
      /**
       * @return {boolean} the enabled status
       */
      ,

      /**
       * @param {boolean} disabled - the disabled state
       * @return {void}
       */
      set: function set(disabled) {
        if (disabled) {
          this.status = FormStatus.Disabled;
        } else {
          this.reduceValidators_();
        }

        this.statusSubject.next(this);
      }
      /**
       * @param {boolean} submitted - the submitted state
       * @return {void}
       */

    }, {
      key: "enabled",
      get: function get() {
        return this.status !== FormStatus.Disabled;
      }
      /**
       * @return {boolean} the submitted status
       */

    }, {
      key: "submitted",
      get: function get() {
        return this.submitted_;
      }
      /**
       * @return {boolean} the dirty status
       */
      ,
      set: function set(submitted) {
        this.submitted_ = submitted;
        this.statusSubject.next(this);
      }
      /**
       * @param {boolean} touched - the touched state
       * @return {void}
       */

    }, {
      key: "dirty",
      get: function get() {
        return this.dirty_;
      }
      /**
       * @return {boolean} the pristine status
       */

    }, {
      key: "pristine",
      get: function get() {
        return !this.dirty_;
      }
      /**
       * @return {boolean} the touched status
       */

    }, {
      key: "touched",
      get: function get() {
        return this.touched_;
      }
      /**
       * @return {boolean} the untouched status
       */
      ,
      set: function set(touched) {
        this.touched_ = touched;
        this.statusSubject.next(this);
      }
      /**
       * @return {null | string} inner value of the control
       */

    }, {
      key: "untouched",
      get: function get() {
        return !this.touched_;
      }
    }, {
      key: "value",
      get: function get() {
        return this.value_;
      }
      /**
       * @param {null | string} value - a value
       * @return {void}
       */
      ,
      set: function set(value) {
        // console.log('set value', value);
        this.value_ = value;
        this.valueSubject.next(value);
      }
    }]);

    return FormAbstract;
  }();

  /** Class representing a FormControl. */

  var FormControl =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormControl, _FormAbstract);

    /**
     * Create a FormControl.
     * @param {null | string | FormControl} value - The value of the control.
     * @param {Validator[]} validators - A list of validators.
     */
    function FormControl(value, validators) {
      var _this;

      if (value === void 0) {
        value = null;
      }

      _this = _FormAbstract.call(this, validators) || this;
      _this.value_ = value;

      _this.initSubjects_();

      _this.initObservables_();

      _this.statusSubject.next(_assertThisInitialized(_this));

      return _this;
    }

    return FormControl;
  }(FormAbstract);

  var FormAbstractCollection =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormAbstractCollection, _FormAbstract);

    function FormAbstractCollection(controls, validators) {
      var _this;

      _this = _FormAbstract.call(this, validators) || this;
      _this.controls = controls;

      _this.initControls_(controls);

      _this.initSubjects_();

      _this.initObservables_(); // this.statusSubject.next(this);


      return _this;
    }

    var _proto = FormAbstractCollection.prototype;

    _proto.initControl_ = function initControl_(control) {
      return control instanceof FormAbstract ? control : new FormControl(control, this.validators);
    };

    _proto.initControls_ = function initControls_(controls) {
      var _this2 = this;

      this.forEach_(function (control, key) {
        _this2.init(control, key);
      });
      return controls;
    };

    _proto.initSubjects_ = function initSubjects_() {
      /*
      this.valueSubject = new BehaviorSubject(null);
      const valueChildren = this.reduce_((result, control) => {
      	result.push(control.value$);
      	return result;
      }, []);
      this.valueChildren = combineLatest(valueChildren).pipe(
      	map(latest => this.value),
      	shareReplay(1)
      );
      this.statusSubject = new BehaviorSubject(this);
      const statusChildren = this.reduce_((result, control) => {
      	result.push(control.status$);
      	return result;
      }, []);
      this.statusChildren = combineLatest(statusChildren).pipe(
      	shareReplay(1)
      );
      */

      /*
      const changesChildren = this.reduce_((result, control) => {
      	result.push(control.changes$);
      	return result;
      }, []);
      this.changesChildren = combineLatest(changesChildren).pipe(
      	shareReplay(1)
      );
      */
      this.changesChildren = new rxjs.BehaviorSubject().pipe(operators.switchAll());
      this.switchSubjects_();
    };

    _proto.switchSubjects_ = function switchSubjects_() {
      var changesChildren = this.reduce_(function (result, control) {
        result.push(control.changes$);
        return result;
      }, []);
      var changesChildren$ = changesChildren.length ? rxjs.combineLatest(changesChildren) : rxjs.of(changesChildren);
      this.changesChildren.next(changesChildren$);
    };

    _proto.initObservables_ = function initObservables_() {
      var _this3 = this;

      /*
      this.value$ = merge(this.valueSubject, this.valueChildren).pipe(
      	distinctUntilChanged(),
      	skip(1),
      	tap(() => {
      		this.statusSubject.next(this);
      	}),
      	shareReplay(1)
      );
      this.status$ = merge(this.statusSubject, this.statusChildren).pipe(
      	tap(() => {
      		this.reduceValidators_();
      	}),
      	shareReplay(1)
      );
      */
      this.changes$ = this.changesChildren.pipe(operators.map(function () {
        return _this3.value;
      }), operators.shareReplay(1));
    };

    _proto.validate = function validate(value) {
      if (this.status === FormStatus.Disabled) {
        // this.errors = {};
        this.errors = [];
      } else {
        // this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
        // this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
        var errors = this.validators.map(function (x) {
          return x(value);
        }).filter(function (x) {
          return x !== null;
        });
        this.errors = this.reduce_(function (result, control) {
          return result.concat(control.errors);
        }, errors);
        this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
      }

      return this.errors;
    };

    _proto.forEach_ = function forEach_(callback) {
      var _this4 = this;

      Object.keys(this.controls).forEach(function (key) {
        return callback(_this4.controls[key], key);
      });
    };

    _proto.reduce_ = function reduce_(callback, result) {
      this.forEach_(function (control, key) {
        result = callback(result, control, key);
      });
      return result;
    };

    _proto.all_ = function all_(key, value) {
      return this.reduce_(function (result, control) {
        return result && control[key] === value;
      }, true);
    };

    _proto.any_ = function any_(key, value) {
      return this.reduce_(function (result, control) {
        return result || control[key] === value;
      }, false);
    };

    _proto.reset = function reset() {
      this.forEach_(function (control) {
        return control.reset();
      });
    };

    _proto.patch = function patch(value) {
      if (value) {
        this.forEach_(function (control, key) {
          control.patch(value[key]);
        });
      }
    };

    _proto.init = function init(control, key) {
      this.controls[key] = this.initControl_(control);
    };

    _proto.get = function get(key) {
      return this.controls[key];
    };

    _proto.set = function set(control, key) {
      delete this.controls[key];
      this.controls[key] = this.initControl_(control);
      this.switchSubjects_();
    } // !!! needed?
    ;

    _proto.add = function add(control, key) {
      this.controls[key] = this.initControl_(control);
      this.switchSubjects_();
    };

    _proto.remove = function remove(control) {
      var _this5 = this;

      var key = Object.keys(this.controls).find(function (key) {
        return _this5.controls[key] === control ? key : null;
      });

      if (key) {
        this.removeKey(key);
      }
    };

    _proto.removeKey = function removeKey(key) {
      var changed = this.controls[key] !== undefined;
      delete this.controls[key];

      if (changed) {
        this.switchSubjects_();
      }
    };

    _createClass(FormAbstractCollection, [{
      key: "valid",
      get: function get() {
        return this.all_('valid', true);
      }
    }, {
      key: "invalid",
      get: function get() {
        return this.any_('invalid', true);
      }
    }, {
      key: "pending",
      get: function get() {
        return this.any_('pending', true);
      }
    }, {
      key: "disabled",
      get: function get() {
        return this.all_('disabled', true);
      },
      set: function set(disabled) {
        this.forEach_(function (control) {
          control.disabled = disabled;
        });
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.any_('enabled', true);
      }
    }, {
      key: "submitted",
      get: function get() {
        return this.all_('submitted', true);
      },
      set: function set(submitted) {
        this.forEach_(function (control) {
          control.submitted = submitted;
        });
      }
    }, {
      key: "dirty",
      get: function get() {
        return this.any_('dirty', true);
      }
    }, {
      key: "pristine",
      get: function get() {
        return this.all_('pristine', true);
      }
    }, {
      key: "touched",
      get: function get() {
        return this.all_('touched', true);
      },
      set: function set(touched) {
        this.forEach_(function (control) {
          control.touched = touched;
        });
      }
    }, {
      key: "untouched",
      get: function get() {
        return this.any_('untouched', true);
      }
    }, {
      key: "value",
      get: function get() {
        return this.reduce_(function (result, control, key) {
          result[key] = control.value;
          return result;
        }, {});
      },
      set: function set(value) {
        this.forEach_(function (control, key) {
          control.value = value[key];
        });
      }
    }]);

    return FormAbstractCollection;
  }(FormAbstract);

  var FormArray =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormArray, _FormAbstractCollecti);

    function FormArray(controls, validators) {
      if (controls === void 0) {
        controls = [];
      }

      return _FormAbstractCollecti.call(this, controls, validators) || this;
    }

    var _proto = FormArray.prototype;

    _proto.forEach_ = function forEach_(callback) {
      this.controls.forEach(function (control, key) {
        return callback(control, key);
      });
    };

    _proto.init = function init(control, key) {
      this.controls.length = Math.max(this.controls.length, key);
      this.controls[key] = this.initControl_(control);
    };

    _proto.set = function set(control, key) {
      // this.controls.length = Math.max(this.controls.length, key);
      // this.controls[key] = this.initControl_(control);
      this.controls.splice(key, 1, this.initControl_(control));
      this.switchSubjects_();
    } // !!! needed?
    ;

    _proto.add = function add(control, key) {
      this.controls.length = Math.max(this.controls.length, key);
      this.controls[key] = this.initControl_(control);
      this.switchSubjects_();
    };

    _proto.push = function push(control) {
      // this.controls.length = Math.max(this.controls.length, key);
      // this.controls[key] = this.initControl_(control);
      this.controls.push(this.initControl_(control));
      this.switchSubjects_();
    };

    _proto.insert = function insert(control, key) {
      this.controls.splice(key, 0, this.initControl_(control));
      this.switchSubjects_();
    };

    _proto.remove = function remove(control) {
      var key = this.controls.indexOf(control);

      if (key !== -1) {
        this.removeKey(key);
      }
    };

    _proto.removeKey = function removeKey(key) {
      if (this.controls.length > key) {
        this.controls.splice(key, 1);
        this.switchSubjects_();
      }
    };

    _proto.at = function at(key) {
      return this.controls[key];
    };

    _createClass(FormArray, [{
      key: "value",
      get: function get() {
        return this.reduce_(function (result, control, key) {
          result[key] = control.value;
          return result;
        }, []); // init as array
      }
    }, {
      key: "length",
      get: function get() {
        return this.controls.length;
      }
    }]);

    return FormArray;
  }(FormAbstractCollection);

  var FormGroup =
  /*#__PURE__*/
  function (_FormAbstractCollecti) {
    _inheritsLoose(FormGroup, _FormAbstractCollecti);

    function FormGroup(controls, validators) {
      if (controls === void 0) {
        controls = {};
      }

      return _FormAbstractCollecti.call(this, controls, validators) || this;
    }

    return FormGroup;
  }(FormAbstractCollection);

  function RequiredValidator(value) {
    return value == null || value.length === 0 ? {
      required: true
    } : null; // return (value == null || value.length === 0) ? 'required' : null;
  }
  /*
  export function compose(validators) {
  	if (!validators) {
  		return null;
  	}
  	const presentValidators = validators.filter(isPresent);
  	if (presentValidators.length == 0) {
  		return null;
  	}
  	return function(control) {
  		return _mergeErrors(_executeValidators(control, presentValidators));
  	};
  }

  export function composeAsync(validators) {
  	if (!validators) {
  		return null;
  	}
  	const presentValidators = validators.filter(isPresent);
  	if (presentValidators.length == 0) {
  		return null;
  	}
  	return function(control) {
  		const observables = _executeAsyncValidators(control, presentValidators).map(toObservable);
  		return forkJoin(observables).pipe(map(_mergeErrors));
  	};
  }

  function isPresent(o) {
  	return o != null;
  }

  export function toObservable(r) {
  	const obs = isPromise(r) ? from(r) : r;
  	if (!(isObservable(obs))) {
  		throw new Error(`Expected validator to return Promise or Observable.`);
  	}
  	return obs;
  }

  function _executeValidators(control, validators) {
  	return validators.map(v => v(control));
  }

  function _executeAsyncValidators(control, validators) {
  	return validators.map(v => v(control));
  }

  function _mergeErrors(arrayOfErrors) {
  	const res = arrayOfErrors.reduce((res, errors) => {
  		return errors != null ? { ...res, ...errors } : res;
  	}, {});
  	return Object.keys(res).length === 0 ? null : res;
  }
  */

  var AppComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(AppComponent, _Component);

    function AppComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = AppComponent.prototype;

    _proto.onInit = function onInit() {
      var _this = this;

      var form = new FormGroup({
        firstName: null,
        lastName: null,
        email: null,
        country: null,
        evaluate: null,
        privacy: null,
        items: new FormArray([null, null, null], [RequiredValidator])
      }, [RequiredValidator]);
      form.patch({
        firstName: 'Jhon',
        lastName: 'Appleseed',
        email: 'jhonappleseed@gmail.com',
        country: 'en-US'
      });
      form.changes$.subscribe(function (changes) {
        console.log('AppComponent.form.changes$', changes, form.valid);

        _this.pushChanges();
      });
      this.form = form;
    };

    _proto.onValidate = function onValidate() {
      // console.log('AppComponent.onValidate', this.form.valid);
      return this.form.valid;
    };

    _proto.onSubmit = function onSubmit() {
      if (this.form.valid) {
        console.log('AppComponent.onSubmit', this.form.value);
        this.form.submitted = true; // this.form.reset();
      }
    };

    return AppComponent;
  }(rxcomp.Component);
  AppComponent.meta = {
    selector: '[app-component]'
  };

  var AppModule =
  /*#__PURE__*/
  function (_Module) {
    _inheritsLoose(AppModule, _Module);

    function AppModule() {
      return _Module.apply(this, arguments) || this;
    }

    return AppModule;
  }(rxcomp.Module);
  AppModule.meta = {
    imports: [rxcomp.CoreModule, FormModule],
    declarations: [],
    bootstrap: AppComponent
  };

  rxcomp.Browser.bootstrap(AppModule);

})));
