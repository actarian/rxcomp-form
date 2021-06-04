/**
 * @license rxcomp-form v1.0.0
 * (c) 2021 Luca Zampetti <lzampetti@gmail.com>
 * License: MIT
 */

this.rxcomp=this.rxcomp||{};this.rxcomp.form=(function(exports,rxcomp,rxjs,operators){'use strict';function _defineProperties(target, props) {
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

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}var FormAbstractCollectionDirective = function (_Directive) {
  _inheritsLoose(FormAbstractCollectionDirective, _Directive);

  function FormAbstractCollectionDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormAbstractCollectionDirective.prototype;

  _proto.onChanges = function onChanges(changes) {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var flags = this.control.flags;
    Object.keys(flags).forEach(function (key) {
      flags[key] ? node.classList.add(key) : node.classList.remove(key);
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
  selector: '',
  hosts: {
    host: FormAbstractCollectionDirective
  }
};var FormArrayDirective = function (_FormAbstractCollecti) {
  _inheritsLoose(FormArrayDirective, _FormAbstractCollecti);

  function FormArrayDirective() {
    return _FormAbstractCollecti.apply(this, arguments) || this;
  }

  _createClass(FormArrayDirective, [{
    key: "control",
    get: function get() {
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
};var FormAbstractDirective = function (_Directive) {
  _inheritsLoose(FormAbstractDirective, _Directive);

  function FormAbstractDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormAbstractDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var node = rxcomp.getContext(this).node;
    rxjs.fromEvent(node, 'input').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onChange(event);
    });
    rxjs.fromEvent(node, 'change').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onChange(event);
    });
    rxjs.fromEvent(node, 'blur').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onBlur(event);
    });
  };

  _proto.onChanges = function onChanges(changes) {
    var node = rxcomp.getContext(this).node;

    if (this.formControlName) {
      node.name = this.formControlName;
    }

    var control = this.control;
    var flags = control.flags;
    Object.keys(flags).forEach(function (key) {
      flags[key] ? node.classList.add(key) : node.classList.remove(key);
    });
    this.writeValue(control.value);
  };

  _proto.writeValue = function writeValue(value) {
    var node = rxcomp.getContext(this).node;
    node.value = value == null ? '' : value;
  };

  _proto.onChange = function onChange(event) {
    var node = rxcomp.getContext(this).node;
    this.control.value = node.value === '' ? null : node.value;
  };

  _proto.onBlur = function onBlur(event) {
    this.control.touched = true;
  };

  _proto.setDisabledState = function setDisabledState(disabled) {
    var node = rxcomp.getContext(this).node;
    node.disabled = disabled;
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
  selector: '',
  inputs: ['formControl', 'formControlName', 'value'],
  hosts: {
    host: FormAbstractCollectionDirective
  }
};var FormCheckboxDirective = function (_FormAbstractDirectiv) {
  _inheritsLoose(FormCheckboxDirective, _FormAbstractDirectiv);

  function FormCheckboxDirective() {
    return _FormAbstractDirectiv.apply(this, arguments) || this;
  }

  var _proto = FormCheckboxDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var node = rxcomp.getContext(this).node;
    rxjs.fromEvent(node, 'change').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onChange(event);
    });
    rxjs.fromEvent(node, 'blur').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onBlur(event);
    });
  };

  _proto.writeValue = function writeValue(value) {
    var node = rxcomp.getContext(this).node;
    value === this.value ? node.setAttribute('checked', value) : node.removeAttribute('checked');
  };

  _proto.setDisabledState = function setDisabledState(disabled) {
    var node = rxcomp.getContext(this).node;
    node.disabled = disabled;
  };

  _proto.onChange = function onChange(event) {
    var node = rxcomp.getContext(this).node;
    this.control.value = node.checked ? this.value : this.value === true ? false : null;
  };

  _proto.onBlur = function onBlur(event) {
    this.control.touched = true;
  };

  return FormCheckboxDirective;
}(FormAbstractDirective);
FormCheckboxDirective.meta = {
  selector: 'input[type=checkbox][formControl],input[type=checkbox][formControlName]',
  inputs: ['formControl', 'formControlName', 'value'],
  hosts: {
    host: FormAbstractCollectionDirective
  }
};var FormFieldComponent = function (_Component) {
  _inheritsLoose(FormFieldComponent, _Component);

  function FormFieldComponent() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FormFieldComponent.prototype;

  _proto.onChanges = function onChanges(changes) {
    var _getContext = rxcomp.getContext(this),
        node = _getContext.node;

    var flags = this.control.flags;
    Object.keys(flags).forEach(function (key) {
      flags[key] ? node.classList.add(key) : node.classList.remove(key);
    });
  };

  _createClass(FormFieldComponent, [{
    key: "control",
    get: function get() {
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
};var FormGroupDirective = function (_FormAbstractCollecti) {
  _inheritsLoose(FormGroupDirective, _FormAbstractCollecti);

  function FormGroupDirective() {
    return _FormAbstractCollecti.apply(this, arguments) || this;
  }

  _createClass(FormGroupDirective, [{
    key: "control",
    get: function get() {
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
};var FormInputDirective = function (_FormAbstractDirectiv) {
  _inheritsLoose(FormInputDirective, _FormAbstractDirectiv);

  function FormInputDirective() {
    return _FormAbstractDirectiv.apply(this, arguments) || this;
  }

  var _proto = FormInputDirective.prototype;

  _proto.writeValue = function writeValue(value) {
    var node = rxcomp.getContext(this).node;
    node.value = value == null ? '' : value;
  };

  _proto.onChange = function onChange(event) {
    var node = rxcomp.getContext(this).node;
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
};var FormPlaceholderDirective = function (_Directive) {
  _inheritsLoose(FormPlaceholderDirective, _Directive);

  function FormPlaceholderDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormPlaceholderDirective.prototype;

  _proto.onChanges = function onChanges(changes) {
    var node = rxcomp.getContext(this).node;
    node.setAttribute('placeholder', this.placeholder || '');
  };

  return FormPlaceholderDirective;
}(rxcomp.Directive);
FormPlaceholderDirective.meta = {
  selector: 'input[placeholder],textarea[placeholder]',
  inputs: ['placeholder']
};var FormRadioDirective = function (_FormAbstractDirectiv) {
  _inheritsLoose(FormRadioDirective, _FormAbstractDirectiv);

  function FormRadioDirective() {
    return _FormAbstractDirectiv.apply(this, arguments) || this;
  }

  var _proto = FormRadioDirective.prototype;

  _proto.onInit = function onInit() {
    var _this = this;

    var node = rxcomp.getContext(this).node;
    rxjs.fromEvent(node, 'change').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onChange(event);
    });
    rxjs.fromEvent(node, 'blur').pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
      return _this.onBlur(event);
    });
  };

  _proto.writeValue = function writeValue(value) {
    var node = rxcomp.getContext(this).node;
    node.checked = node.value === value;
  };

  _proto.setDisabledState = function setDisabledState(disabled) {
    var node = rxcomp.getContext(this).node;
    node.disabled = disabled;
  };

  _proto.onChange = function onChange(event) {
    var node = rxcomp.getContext(this).node;

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
};var FormSelectDirective = function (_FormAbstractDirectiv) {
  _inheritsLoose(FormSelectDirective, _FormAbstractDirectiv);

  function FormSelectDirective() {
    return _FormAbstractDirectiv.apply(this, arguments) || this;
  }

  var _proto = FormSelectDirective.prototype;

  _proto.writeValue = function writeValue(value) {
    var node = rxcomp.getContext(this).node;
    node.value = value == null ? '' : value;
  };

  _proto.setDisabledState = function setDisabledState(disabled) {
    var node = rxcomp.getContext(this).node;
    node.disabled = disabled;
  };

  _proto.onChange = function onChange(event) {
    var node = rxcomp.getContext(this).node;
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
};var FormSubmitDirective = function (_Directive) {
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
    var form = node;
    var event$ = this.event$ = rxjs.fromEvent(form, 'submit').pipe(operators.tap(function (event) {
      event.preventDefault();
    }), operators.shareReplay(1));
    var expression = node.getAttribute("(" + event + ")");

    if (expression) {
      var outputFunction = module.makeFunction(expression, ['$event']);
      event$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (event) {
        module.resolve(outputFunction, parentInstance, event);
      });
    } else {
      parentInstance[event + "$"] = event$;
    }
  };

  return FormSubmitDirective;
}(rxcomp.Directive);
FormSubmitDirective.meta = {
  selector: "[(submit)]"
};var FormValidator = function () {
  function FormValidator(validator, params) {
    this.validator = validator;
    this.params$ = new rxjs.BehaviorSubject(params);
  }

  var _proto = FormValidator.prototype;

  _proto.validate = function validate(value) {
    return this.validator(value, this.params);
  };

  _createClass(FormValidator, [{
    key: "params",
    get: function get() {
      return this.params$.getValue();
    },
    set: function set(params) {
      if (params) {
        var current = this.params;
        var differs = Object.keys(params).reduce(function (flag, key) {
          return flag || !current || current[key] !== params[key];
        }, false);

        if (differs) {
          this.params$.next(params);
        }
      }
    }
  }]);

  return FormValidator;
}();function NullValidator() {
  return new FormValidator(function (value, params) {
    return null;
  });
}
function RequiredValidator() {
  return new FormValidator(function (value, params) {
    return value == null || value.length === 0 ? {
      required: true
    } : null;
  });
}
function RequiredTrueValidator() {
  return new FormValidator(function (value, params) {
    return value === true ? null : {
      required: true
    };
  });
}
function MinValidator(min) {
  return new FormValidator(function (value, params) {
    var min = params.min;

    if (!value || !min) {
      return null;
    }

    value = parseFloat(value);
    return !isNaN(value) && value < min ? {
      min: {
        min: min,
        actual: value
      }
    } : null;
  }, {
    min: min
  });
}
function MaxValidator(max) {
  return new FormValidator(function (value, params) {
    var max = params.max;

    if (!value || !max) {
      return null;
    }

    value = parseFloat(value);
    return !isNaN(value) && value > max ? {
      max: {
        max: max,
        actual: value
      }
    } : null;
  }, {
    max: max
  });
}
function MinLengthValidator(minlength) {
  return new FormValidator(function (value, params) {
    var minlength = params.minlength;

    if (!value || !minlength) {
      return null;
    }

    var length = value ? value.length : 0;
    return length < minlength ? {
      minlength: {
        requiredLength: minlength,
        actualLength: length
      }
    } : null;
  }, {
    minlength: minlength
  });
}
function MaxLengthValidator(maxlength) {
  return new FormValidator(function (value, params) {
    var maxlength = params.maxlength;

    if (!value || !maxlength) {
      return null;
    }

    var length = value ? value.length : 0;
    return length > maxlength ? {
      minlength: {
        requiredLength: maxlength,
        actualLength: length
      }
    } : null;
  }, {
    maxlength: maxlength
  });
}
function PatternValidator(pattern) {
  return new FormValidator(function (value, params) {
    var pattern = params.pattern;

    if (!value || !pattern) {
      return null;
    }

    var regex = patternToRegEx(pattern);
    return regex.test(value) ? null : {
      pattern: {
        requiredPattern: regex.toString(),
        actualValue: value
      }
    };
  }, {
    pattern: pattern
  });
}
function EmailValidator() {
  var regex = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return new FormValidator(function (value, params) {
    if (!value) {
      return null;
    }

    return regex.test(value) ? null : {
      email: true
    };
  });
}

function patternToRegEx(pattern) {
  var regex;

  if (pattern instanceof RegExp) {
    regex = pattern;
  } else if (typeof pattern === 'string') {
    pattern = pattern.charAt(0) === '^' ? pattern : "^" + pattern;
    pattern = pattern.charAt(pattern.length - 1) === '$' ? pattern : pattern + "$";
    regex = new RegExp(pattern);
  }

  return regex || new RegExp('');
}var validators=/*#__PURE__*/Object.freeze({__proto__:null,NullValidator: NullValidator,RequiredValidator: RequiredValidator,RequiredTrueValidator: RequiredTrueValidator,MinValidator: MinValidator,MaxValidator: MaxValidator,MinLengthValidator: MinLengthValidator,MaxLengthValidator: MaxLengthValidator,PatternValidator: PatternValidator,EmailValidator: EmailValidator});var FormEmailDirective = function (_Directive) {
  _inheritsLoose(FormEmailDirective, _Directive);

  function FormEmailDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormEmailDirective.prototype;

  _proto.onInit = function onInit() {
    var validator = this.validator = EmailValidator();

    if (this.host) {
      this.host.control.addValidators(validator);
    }
  };

  return FormEmailDirective;
}(rxcomp.Directive);
FormEmailDirective.meta = {
  selector: '[email][formControl],[email][formControlName]',
  inputs: ['email'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormMaxLengthDirective = function (_Directive) {
  _inheritsLoose(FormMaxLengthDirective, _Directive);

  function FormMaxLengthDirective() {
    var _this;

    _this = _Directive.apply(this, arguments) || this;
    _this.maxlength = Number.POSITIVE_INFINITY;
    return _this;
  }

  var _proto = FormMaxLengthDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = MaxLengthValidator(this.maxlength);

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  _proto.onChanges = function onChanges(changes) {
    if (this.validator) {
      this.validator.params = {
        maxlength: this.maxlength
      };
    }
  };

  return FormMaxLengthDirective;
}(rxcomp.Directive);
FormMaxLengthDirective.meta = {
  selector: '[maxlength][formControl],[maxlength][formControlName]',
  inputs: ['maxlength'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormMaxDirective = function (_Directive) {
  _inheritsLoose(FormMaxDirective, _Directive);

  function FormMaxDirective() {
    var _this;

    _this = _Directive.apply(this, arguments) || this;
    _this.max = Number.POSITIVE_INFINITY;
    return _this;
  }

  var _proto = FormMaxDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = MaxValidator(this.max);

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  _proto.onChanges = function onChanges(changes) {
    if (this.validator) {
      this.validator.params = {
        max: this.max
      };
    }
  };

  return FormMaxDirective;
}(rxcomp.Directive);
FormMaxDirective.meta = {
  selector: '[max][formControl],[max][formControlName]',
  inputs: ['max'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormMinLengthDirective = function (_Directive) {
  _inheritsLoose(FormMinLengthDirective, _Directive);

  function FormMinLengthDirective() {
    var _this;

    _this = _Directive.apply(this, arguments) || this;
    _this.minlength = Number.NEGATIVE_INFINITY;
    return _this;
  }

  var _proto = FormMinLengthDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = MinLengthValidator(this.minlength);

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  _proto.onChanges = function onChanges(changes) {
    if (this.validator) {
      this.validator.params = {
        minlength: this.minlength
      };
    }
  };

  return FormMinLengthDirective;
}(rxcomp.Directive);
FormMinLengthDirective.meta = {
  selector: '[minlength][formControl],[minlength][formControlName]',
  inputs: ['minlength'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormMinDirective = function (_Directive) {
  _inheritsLoose(FormMinDirective, _Directive);

  function FormMinDirective() {
    var _this;

    _this = _Directive.apply(this, arguments) || this;
    _this.min = Number.NEGATIVE_INFINITY;
    return _this;
  }

  var _proto = FormMinDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = MinValidator(this.min);

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  _proto.onChanges = function onChanges(changes) {
    if (this.validator) {
      this.validator.params = {
        min: this.min
      };
    }
  };

  return FormMinDirective;
}(rxcomp.Directive);
FormMinDirective.meta = {
  selector: '[min][formControl],[min][formControlName]',
  inputs: ['min'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormPatternDirective = function (_Directive) {
  _inheritsLoose(FormPatternDirective, _Directive);

  function FormPatternDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormPatternDirective.prototype;

  _proto.onInit = function onInit() {
    if (this.pattern) {
      this.validator = PatternValidator(this.pattern);

      if (this.host) {
        this.host.control.addValidators(this.validator);
      }
    }
  };

  _proto.onChanges = function onChanges(changes) {
    if (this.validator) {
      this.validator.params = {
        pattern: this.pattern
      };
    }
  };

  return FormPatternDirective;
}(rxcomp.Directive);
FormPatternDirective.meta = {
  selector: '[pattern][formControl],[pattern][formControlName]',
  inputs: ['pattern'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormRequiredTrueDirective = function (_Directive) {
  _inheritsLoose(FormRequiredTrueDirective, _Directive);

  function FormRequiredTrueDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormRequiredTrueDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = RequiredTrueValidator();

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  return FormRequiredTrueDirective;
}(rxcomp.Directive);
FormRequiredTrueDirective.meta = {
  selector: '[requiredTrue][formControl],[requiredTrue][formControlName]',
  inputs: ['requiredTrue'],
  hosts: {
    host: FormAbstractDirective
  }
};var FormRequiredDirective = function (_Directive) {
  _inheritsLoose(FormRequiredDirective, _Directive);

  function FormRequiredDirective() {
    return _Directive.apply(this, arguments) || this;
  }

  var _proto = FormRequiredDirective.prototype;

  _proto.onInit = function onInit() {
    this.validator = RequiredValidator();

    if (this.host) {
      this.host.control.addValidators(this.validator);
    }
  };

  return FormRequiredDirective;
}(rxcomp.Directive);
FormRequiredDirective.meta = {
  selector: '[required][formControl],[required][formControlName]',
  inputs: ['required'],
  hosts: {
    host: FormAbstractDirective
  }
};var factories = [FormArrayDirective, FormCheckboxDirective, FormFieldComponent, FormGroupDirective, FormInputDirective, FormPlaceholderDirective, FormRadioDirective, FormSelectDirective, FormSubmitDirective, FormEmailDirective, FormMaxDirective, FormMaxLengthDirective, FormMinDirective, FormMinLengthDirective, FormPatternDirective, FormRequiredDirective, FormRequiredTrueDirective];
var pipes = [];

var FormModule = function (_Module) {
  _inheritsLoose(FormModule, _Module);

  function FormModule() {
    return _Module.apply(this, arguments) || this;
  }

  return FormModule;
}(rxcomp.Module);
FormModule.meta = {
  declarations: [].concat(factories, pipes),
  exports: [].concat(factories, pipes)
};var FormStatus;

(function (FormStatus) {
  FormStatus["Pending"] = "pending";
  FormStatus["Valid"] = "valid";
  FormStatus["Invalid"] = "invalid";
  FormStatus["Disabled"] = "disabled";
  FormStatus["Hidden"] = "hidden";
})(FormStatus || (FormStatus = {}));
var FormStatus$1 = FormStatus;var FormAbstract = function () {
  function FormAbstract(validators) {
    var _this = this;

    this.value_ = undefined;
    this.submitted_ = false;
    this.touched_ = false;
    this.dirty_ = false;
    this.valueSubject = new rxjs.BehaviorSubject(null);
    this.statusSubject = new rxjs.BehaviorSubject(null);
    this.validatorsSubject = new rxjs.ReplaySubject().pipe(operators.switchAll());
    this.value$ = this.valueSubject.pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function () {
      _this.submitted_ = false;
      _this.dirty_ = true;

      _this.statusSubject.next(null);
    }), operators.shareReplay(1));
    this.status$ = rxjs.merge(this.statusSubject, this.validatorsSubject).pipe(operators.switchMap(function () {
      return _this.validate$(_this.value);
    }), operators.shareReplay(1));
    this.changes$ = rxjs.merge(this.value$, this.status$).pipe(operators.map(function () {
      return _this.value;
    }), operators.auditTime(1), operators.shareReplay(1));
    this.validators = validators ? Array.isArray(validators) ? validators : [validators] : [];
  }

  var _proto = FormAbstract.prototype;

  _proto.initSubjects_ = function initSubjects_() {
    this.switchValidators_();
  };

  _proto.switchValidators_ = function switchValidators_() {
    var validatorParams = this.validators.map(function (x) {
      return x.params$;
    });
    var validatorParams$ = validatorParams.length ? rxjs.combineLatest(validatorParams) : rxjs.of(validatorParams);
    this.validatorsSubject.next(validatorParams$);
  };

  _proto.initObservables_ = function initObservables_() {};

  _proto.validate$ = function validate$(value) {
    var _this2 = this;

    if (this.status === FormStatus$1.Disabled || this.status === FormStatus$1.Hidden || this.submitted_ || !this.validators.length) {
      this.errors_ = {};

      if (this.status === FormStatus$1.Invalid) {
        this.status = FormStatus$1.Valid;
      }

      return rxjs.of(this.errors_);
    } else {
      return rxjs.combineLatest(this.validators.map(function (x) {
        var result$ = x.validate(value);
        return rxjs.isObservable(result$) ? result$ : rxjs.of(result$);
      })).pipe(operators.map(function (results) {
        _this2.errors_ = Object.assign.apply(Object, [{}].concat(results));
        _this2.status = Object.keys(_this2.errors_).length === 0 ? FormStatus$1.Valid : FormStatus$1.Invalid;
        return _this2.errors_;
      }));
    }
  };

  _proto.reset = function reset(status) {
    this.status = status || FormStatus$1.Pending;
    this.value_ = null;
    this.dirty_ = false;
    this.touched_ = false;
    this.submitted_ = false;
    this.statusSubject.next(null);
  };

  _proto.patch = function patch(value) {
    this.value_ = value;
    this.dirty_ = true;
    this.submitted_ = false;
    this.statusSubject.next(null);
  };

  _proto.addValidators = function addValidators() {
    var _this$validators;

    (_this$validators = this.validators).push.apply(_this$validators, arguments);

    this.switchValidators_();
  };

  _proto.replaceValidators = function replaceValidators() {
    for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
      validators[_key] = arguments[_key];
    }

    this.validators = validators;
    this.switchValidators_();
  };

  _proto.clearValidators = function clearValidators() {
    this.validators = [];
    this.switchValidators_();
  };

  _createClass(FormAbstract, [{
    key: "errors",
    get: function get() {
      return this.errors_;
    },
    set: function set(errors) {
      this.errors_ = errors;
    }
  }, {
    key: "pending",
    get: function get() {
      return this.status === FormStatus$1.Pending;
    }
  }, {
    key: "valid",
    get: function get() {
      return this.status !== FormStatus$1.Invalid;
    }
  }, {
    key: "invalid",
    get: function get() {
      return this.status === FormStatus$1.Invalid;
    }
  }, {
    key: "disabled",
    get: function get() {
      return this.status === FormStatus$1.Disabled;
    },
    set: function set(disabled) {
      if (disabled) {
        if (this.status !== FormStatus$1.Disabled) {
          this.status = FormStatus$1.Disabled;
          this.dirty_ = false;
          this.touched_ = false;
          this.submitted_ = false;
          this.statusSubject.next(null);
        }
      } else {
        if (this.status === FormStatus$1.Disabled) {
          this.status = FormStatus$1.Pending;
          this.dirty_ = false;
          this.touched_ = false;
          this.submitted_ = false;
          this.statusSubject.next(null);
        }
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      return this.status !== FormStatus$1.Disabled;
    }
  }, {
    key: "hidden",
    get: function get() {
      return this.status === FormStatus$1.Hidden;
    },
    set: function set(hidden) {
      if (hidden) {
        if (this.status !== FormStatus$1.Hidden) {
          this.status = FormStatus$1.Hidden;
          this.dirty_ = false;
          this.touched_ = false;
          this.submitted_ = false;
          this.statusSubject.next(null);
        }
      } else {
        if (this.status === FormStatus$1.Hidden) {
          this.status = FormStatus$1.Pending;
          this.dirty_ = false;
          this.touched_ = false;
          this.submitted_ = false;
          this.statusSubject.next(null);
        }
      }
    }
  }, {
    key: "visible",
    get: function get() {
      return this.status !== FormStatus$1.Hidden;
    }
  }, {
    key: "submitted",
    get: function get() {
      return this.submitted_;
    },
    set: function set(submitted) {
      this.submitted_ = submitted;
      this.statusSubject.next(null);
    }
  }, {
    key: "dirty",
    get: function get() {
      return this.dirty_;
    }
  }, {
    key: "pristine",
    get: function get() {
      return !this.dirty_;
    }
  }, {
    key: "touched",
    get: function get() {
      return this.touched_;
    },
    set: function set(touched) {
      this.touched_ = touched;
      this.statusSubject.next(null);
    }
  }, {
    key: "untouched",
    get: function get() {
      return !this.touched_;
    }
  }, {
    key: "flags",
    get: function get() {
      return {
        untouched: this.untouched,
        touched: this.touched,
        pristine: this.pristine,
        dirty: this.dirty,
        pending: this.pending,
        enabled: this.enabled,
        disabled: this.disabled,
        hidden: this.hidden,
        visible: this.visible,
        valid: this.valid,
        invalid: this.invalid,
        submitted: this.submitted
      };
    }
  }, {
    key: "value",
    get: function get() {
      return this.value_;
    },
    set: function set(value) {
      this.value_ = value;
      this.valueSubject.next(value);
    }
  }]);

  return FormAbstract;
}();var FormControl = function (_FormAbstract) {
  _inheritsLoose(FormControl, _FormAbstract);

  function FormControl(value, validators) {
    var _this;

    if (value === void 0) {
      value = null;
    }

    _this = _FormAbstract.call(this, validators) || this;
    _this.value_ = value;
    _this.status = FormStatus$1.Pending;
    _this.errors = {};

    _this.initSubjects_();

    _this.initObservables_();

    _this.statusSubject.next(null);

    return _this;
  }

  return FormControl;
}(FormAbstract);var FormAbstractCollection = function (_FormAbstract) {
  _inheritsLoose(FormAbstractCollection, _FormAbstract);

  function FormAbstractCollection(controls, validators) {
    var _this;

    _this = _FormAbstract.call(this, validators) || this;
    _this.changesChildren = new rxjs.BehaviorSubject(undefined);
    _this.controls = controls;

    _this.initControls_();

    _this.initSubjects_();

    _this.initObservables_();

    return _this;
  }

  var _proto = FormAbstractCollection.prototype;

  _proto.initControl_ = function initControl_(controlOrValue, key) {
    var control = controlOrValue instanceof FormAbstract ? controlOrValue : new FormControl(controlOrValue);
    control.addValidators.apply(control, this.validators);
    control.name = key;
    return control;
  };

  _proto.initControls_ = function initControls_() {
    var _this2 = this;

    this.forEach_(function (control, key) {
      _this2.init(control, key);
    });
    return this.controls;
  };

  _proto.initSubjects_ = function initSubjects_() {
    this.changesChildren = this.changesChildren.pipe(operators.switchAll());
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

    this.changes$ = this.changesChildren.pipe(operators.map(function () {
      return _this3.value;
    }), operators.shareReplay(1));
  };

  _proto.validate = function validate(value) {
    var errors;

    if (this.status === FormStatus$1.Disabled || this.status === FormStatus$1.Hidden) {
      errors = [];
    } else {
      var errors_ = this.validators.map(function (x) {
        return x.validate(value);
      }).filter(function (x) {
        return x !== null;
      });
      errors = this.reduce_(function (result, control) {
        return result.concat(control.errors);
      }, errors_);
      this.status = errors.length === 0 ? FormStatus$1.Valid : FormStatus$1.Invalid;
    }

    return errors;
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
        if (value[key] != undefined) {
          control.patch(value[key]);
        }
      });
    }
  };

  _proto.init = function init(control, key) {
    this.controls[key] = this.initControl_(control, key);
  };

  _proto.get = function get(key) {
    return this.controls[key];
  };

  _proto.set = function set(control, key) {
    delete this.controls[key];
    this.controls[key] = this.initControl_(control, key);
    this.switchSubjects_();
  };

  _proto.add = function add(control, key) {
    this.controls[key] = this.initControl_(control, key);
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
    var exhist = this.controls[key] !== undefined;
    delete this.controls[key];

    if (exhist) {
      this.switchSubjects_();
    }
  };

  _proto.addValidators = function addValidators() {
    for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
      validators[_key] = arguments[_key];
    }

    this.forEach_(function (control) {
      return control.addValidators.apply(control, validators);
    });
  };

  _proto.replaceValidators = function replaceValidators() {
    for (var _len2 = arguments.length, validators = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      validators[_key2] = arguments[_key2];
    }

    this.forEach_(function (control) {
      return control.replaceValidators.apply(control, validators);
    });
  };

  _proto.clearValidators = function clearValidators() {
    this.forEach_(function (control) {
      return control.clearValidators();
    });
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
    key: "hidden",
    get: function get() {
      return this.all_('hidden', true);
    },
    set: function set(hidden) {
      this.forEach_(function (control) {
        control.hidden = hidden;
      });
    }
  }, {
    key: "visible",
    get: function get() {
      return this.any_('visible', true);
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
  }, {
    key: "errors",
    get: function get() {
      return this.reduce_(function (result, control) {
        return Object.assign(result, control.errors);
      }, {});
    },
    set: function set(errors) {}
  }]);

  return FormAbstractCollection;
}(FormAbstract);var FormArray = function (_FormAbstractCollecti) {
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
    this.controls[key] = this.initControl_(control, key);
  };

  _proto.set = function set(control, key) {
    this.controls.splice(key, 1, this.initControl_(control, key));
    this.switchSubjects_();
  };

  _proto.add = function add(control, key) {
    this.controls.length = Math.max(this.controls.length, key);
    this.controls[key] = this.initControl_(control, key);
    this.switchSubjects_();
  };

  _proto.push = function push(control) {
    this.controls.push(this.initControl_(control, this.controls.length));
    this.switchSubjects_();
  };

  _proto.insert = function insert(control, key) {
    this.controls.splice(key, 0, this.initControl_(control, key));
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
      }, []);
    }
  }, {
    key: "length",
    get: function get() {
      return this.controls.length;
    }
  }]);

  return FormArray;
}(FormAbstractCollection);
function formArray(controls, validators) {
  if (controls === void 0) {
    controls = [];
  }

  return new FormArray(controls, validators);
}var FormGroup = function (_FormAbstractCollecti) {
  _inheritsLoose(FormGroup, _FormAbstractCollecti);

  function FormGroup(controls, validators) {
    if (controls === void 0) {
      controls = {};
    }

    return _FormAbstractCollecti.call(this, controls, validators) || this;
  }

  return FormGroup;
}(FormAbstractCollection);
function formGroup(controls, validators) {
  if (controls === void 0) {
    controls = {};
  }

  return new FormGroup(controls, validators);
}exports.EmailValidator=EmailValidator;exports.FormAbstract=FormAbstract;exports.FormAbstractCollection=FormAbstractCollection;exports.FormAbstractCollectionDirective=FormAbstractCollectionDirective;exports.FormArray=FormArray;exports.FormArrayDirective=FormArrayDirective;exports.FormCheckboxDirective=FormCheckboxDirective;exports.FormControl=FormControl;exports.FormEmailDirective=FormEmailDirective;exports.FormFieldComponent=FormFieldComponent;exports.FormGroup=FormGroup;exports.FormGroupDirective=FormGroupDirective;exports.FormInputDirective=FormInputDirective;exports.FormMaxDirective=FormMaxDirective;exports.FormMaxLengthDirective=FormMaxLengthDirective;exports.FormMinDirective=FormMinDirective;exports.FormMinLengthDirective=FormMinLengthDirective;exports.FormModule=FormModule;exports.FormPatternDirective=FormPatternDirective;exports.FormPlaceholderDirective=FormPlaceholderDirective;exports.FormRadioDirective=FormRadioDirective;exports.FormRequiredDirective=FormRequiredDirective;exports.FormRequiredTrueDirective=FormRequiredTrueDirective;exports.FormSelectDirective=FormSelectDirective;exports.FormStatus=FormStatus$1;exports.FormValidator=FormValidator;exports.MaxLengthValidator=MaxLengthValidator;exports.MaxValidator=MaxValidator;exports.MinLengthValidator=MinLengthValidator;exports.MinValidator=MinValidator;exports.NullValidator=NullValidator;exports.PatternValidator=PatternValidator;exports.RequiredTrueValidator=RequiredTrueValidator;exports.RequiredValidator=RequiredValidator;exports.Validators=validators;exports.formArray=formArray;exports.formGroup=formGroup;return exports;}({},rxcomp,rxjs,rxjs.operators));