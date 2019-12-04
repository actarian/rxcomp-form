/**
 * @license rxcomp-form v1.0.0-alpha.7
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
    Valid: 'valid',
    Invalid: 'invalid',
    Pending: 'pending',
    Disabled: 'disabled'
  };
  var FormAttributes = ['untouched', 'touched', 'pristine', 'dirty', 'pending', 'enabled', 'disabled', 'valid', 'invalid'];

  var FormControlGroupComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FormControlGroupComponent, _Component);

    function FormControlGroupComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = FormControlGroupComponent.prototype;

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

    _createClass(FormControlGroupComponent, [{
      key: "control",
      get: function get() {
        // console.log('FormControlGroupComponent', (this.controlGroupName ? `controlGroupName ${this.controlGroupName}` : `controlGroup ${this.controlGroup}`));
        if (this.controlGroup) {
          return this.controlGroup;
        } else {
          var _getContext2 = rxcomp.getContext(this),
              parentInstance = _getContext2.parentInstance;

          if (!parentInstance.form) {
            throw 'missing form';
          }

          return parentInstance.form.get(this.controlGroupName);
        }
      }
    }]);

    return FormControlGroupComponent;
  }(rxcomp.Component);
  FormControlGroupComponent.meta = {
    selector: '[[controlGroup]],[[controlGroupName]],[controlGroupName]',
    inputs: ['controlGroup', 'controlGroupName']
  };

  var FormControlDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(FormControlDirective, _Directive);

    function FormControlDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = FormControlDirective.prototype;

    _proto.onInit = function onInit() {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange);
      node.addEventListener('change', this.onChange);
      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.onChanges = function onChanges(changes) {
      var _getContext2 = rxcomp.getContext(this),
          node = _getContext2.node;
      /*
      const pre = this.getPre(node);
      pre.textContent = '';
      */


      var control = this.control;
      FormAttributes.forEach(function (x) {
        if (control[x]) {
          node.classList.add(x); // pre.textContent += x + ', ';
        } else {
          node.classList.remove(x);
        }
      }); // control.errors.forEach(x => pre.textContent += `invalid-${x}, `);

      this.writeValue(control.value);
    };

    _proto.writeValue = function writeValue(value) {
      var _getContext3 = rxcomp.getContext(this),
          node = _getContext3.node; // node.setAttribute('value', value == null ? '' : value);


      node.value = value == null ? '' : value; // console.log(node, node.getAttribute('value'));
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var _getContext4 = rxcomp.getContext(this),
          node = _getContext4.node;

      node.disabled = disabled; // node.setAttribute('disabled', disabled);
    };

    _proto.onChange = function onChange(event) {
      var _getContext5 = rxcomp.getContext(this),
          node = _getContext5.node; // log(event.type);


      this.control.value = node.value;
    };

    _proto.onFocus = function onFocus(event) {};

    _proto.onBlur = function onBlur(event) {
      // log(event.type);
      this.control.touched = true;
    };

    _proto.getPre = function getPre(node) {
      var pre = node.previousSibling;

      if (!pre || pre.nodeType !== 3) {
        pre = document.createTextNode('');
        node.parentNode.insertBefore(pre, node);
      }

      return pre;
    };

    _createClass(FormControlDirective, [{
      key: "control",
      get: function get() {
        if (this.formControl) {
          return this.formControl;
        } else {
          var _getContext6 = rxcomp.getContext(this),
              parentInstance = _getContext6.parentInstance;

          if (!parentInstance.form) {
            throw 'missing form';
          }

          return parentInstance.form.get(this.formControlName);
        }
      }
    }]);

    return FormControlDirective;
  }(rxcomp.Directive);
  FormControlDirective.meta = {
    selector: 'input,textarea,select',
    inputs: ['formControl', 'formControlName']
  };

  var FormGroupComponent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FormGroupComponent, _Component);

    function FormGroupComponent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = FormGroupComponent.prototype;

    _proto.onChanges = function onChanges(changes) {
      var _getContext = rxcomp.getContext(this),
          node = _getContext.node;

      var form = this.form;
      FormAttributes.forEach(function (x) {
        if (form[x]) {
          node.classList.add(x);
        } else {
          node.classList.remove(x);
        }
      });
    };

    _createClass(FormGroupComponent, [{
      key: "form",
      get: function get() {
        // console.log('FormGroupComponent', (this.formGroupName ? `formGroupName ${this.formGroupName}` : `formGroup ${this.formGroup}`));
        if (this.formGroup) {
          return this.formGroup;
        } else {
          var _getContext2 = rxcomp.getContext(this),
              parentInstance = _getContext2.parentInstance;

          if (!parentInstance.form) {
            throw 'missing form';
          }

          return parentInstance.form.get(this.formGroupName);
        }
      }
    }]);

    return FormGroupComponent;
  }(rxcomp.Component);
  FormGroupComponent.meta = {
    selector: '[[formGroup]],[[formGroupName]],[formGroupName]',
    inputs: ['formGroup', 'formGroupName']
  };

  var EVENTS = ['submit'];

  var SubmitDirective =
  /*#__PURE__*/
  function (_Directive) {
    _inheritsLoose(SubmitDirective, _Directive);

    function SubmitDirective() {
      return _Directive.apply(this, arguments) || this;
    }

    var _proto = SubmitDirective.prototype;

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

    return SubmitDirective;
  }(rxcomp.Directive);
  SubmitDirective.meta = {
    selector: "[(" + EVENTS.join(')],[(') + ")]"
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
  var factories = [FormControlDirective, FormGroupComponent, FormControlGroupComponent, SubmitDirective];
  var pipes = [];
  FormModule.meta = {
    declarations: [].concat(factories, pipes),
    exports: [].concat(factories, pipes)
  };

  var FormAbstract =
  /*#__PURE__*/
  function () {
    function FormAbstract(validators) {
      if (validators === void 0) {
        validators = [];
      }

      this.validators = validators; // this.errors = {};

      this.errors = [];
    }

    var _proto = FormAbstract.prototype;

    _proto.initSubjects_ = function initSubjects_() {
      this.valueSubject = new rxjs.BehaviorSubject(null);
      this.valueChildren = new rxjs.Subject();
      this.statusSubject = new rxjs.BehaviorSubject(this);
      this.statusChildren = new rxjs.Subject();
    };

    _proto.initObservables_ = function initObservables_() {
      var _this = this;

      this.value$ = rxjs.merge(this.valueSubject, this.valueChildren).pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function (value) {
        // console.log('FormAbstract', value);
        _this.dirty_ = true; // if (value === this.value) {

        _this.statusSubject.next(_this); // }

      }), operators.shareReplay(1));
      this.status$ = rxjs.merge(this.statusSubject, this.statusChildren).pipe( // auditTime(1),
      operators.tap(function (status) {
        // console.log(status);
        _this.reduceValidators_();
      }), operators.shareReplay(1));
    };

    _proto.reduceValidators_ = function reduceValidators_() {
      return this.validate(this.value);
    };

    _proto.validate = function validate(value) {
      if (this.status === FormStatus.Disabled) {
        // this.errors = {};
        this.errors = [];
      } else {
        // this.errors = Object.assign({}, ...this.validators.map(x => x(value)));
        // this.status = Object.keys(this.errors).length === 0 ? FormStatus.Valid : FormStatus.Invalid;
        this.errors = this.validators.map(function (x) {
          return x(value);
        }).filter(function (x) {
          return x !== null;
        });
        this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
      }

      return this.errors;
    };

    _proto.reset = function reset() {
      this.value_ = null;
      this.dirty_ = false;
      this.touched_ = false;
      this.statusSubject.next(this);
    };

    _proto.patch = function patch(value) {
      this.value_ = value;
      this.dirty_ = true;
      this.statusSubject.next(this);
    };

    _createClass(FormAbstract, [{
      key: "valid",
      get: function get() {
        return this.status === FormStatus.Valid;
      }
    }, {
      key: "invalid",
      get: function get() {
        return this.status === FormStatus.Invalid;
      }
    }, {
      key: "pending",
      get: function get() {
        return this.status === FormStatus.Pending;
      }
    }, {
      key: "disabled",
      get: function get() {
        return this.status === FormStatus.Disabled;
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.status !== FormStatus.Disabled;
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
        this.statusSubject.next(this);
      }
    }, {
      key: "untouched",
      get: function get() {
        return !this.touched_;
      }
    }, {
      key: "value",
      get: function get() {
        return this.value_;
      },
      set: function set(value) {
        // console.log('set value', value);
        this.value_ = value;
        this.valueSubject.next(value);
      }
    }]);

    return FormAbstract;
  }();

  var FormControl =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormControl, _FormAbstract);

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
        _this2.set(_this2.initControl_(control), key);
      });
      return controls;
    };

    _proto.initSubjects_ = function initSubjects_() {
      var _this3 = this;

      this.valueSubject = new rxjs.BehaviorSubject(null);
      var valueChildren = this.reduce_(function (result, control) {
        result.push(control.value$);
        return result;
      }, []);
      this.valueChildren = rxjs.combineLatest(valueChildren).pipe(operators.map(function (latest) {
        return _this3.value;
      }), operators.shareReplay(1));
      this.statusSubject = new rxjs.BehaviorSubject(this);
      var statusChildren = this.reduce_(function (result, control) {
        result.push(control.status$);
        return result;
      }, []);
      this.statusChildren = rxjs.combineLatest(statusChildren).pipe(operators.shareReplay(1));
    };

    _proto.initObservables_ = function initObservables_() {
      var _this4 = this;

      this.value$ = rxjs.merge(this.valueSubject, this.valueChildren).pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function (value) {
        _this4.dirty_ = true; // if (value === this.value) {

        _this4.statusSubject.next(_this4); // }

      }), operators.shareReplay(1));
      this.status$ = rxjs.merge(this.statusSubject, this.statusChildren).pipe( // auditTime(1),
      operators.tap(function (status) {
        _this4.reduceValidators_();
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
      var _this5 = this;

      Object.keys(this.controls).forEach(function (key) {
        return callback(_this5.controls[key], key);
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
      this.forEach_(function (control, key) {
        return control.patch(value[key]);
      });
    };

    _proto.get = function get(key) {
      return this.controls[key];
    };

    _proto.set = function set(control, key) {
      if (this.controls[key]) ;

      delete this.controls[key];

      if (control) {
        this.controls[key] = control;
      } // subscribe

    };

    _proto.add = function add(control, key) {
      if (control) {
        // unsubscribe;
        this.controls[key] = control; // subscribe
      }
    };

    _proto.remove = function remove(key) {
      if (this.controls[key]) ;

      delete this.controls[key]; // subscribe
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
      }
    }, {
      key: "enabled",
      get: function get() {
        return this.any_('enabled', true);
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
        // this.touched_ = touched;
        this.forEach_(function (control) {
          control.touched = touched;
        });
        this.statusSubject.next(this);
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
      set: function set(value) {}
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

    /*
    get(key) {
    	return this.controls[key];
    }
    */
    _proto.set = function set(control, key) {
      this.controls.length = Math.max(this.controls.length, key);
      this.controls[key] = control;
    };

    _createClass(FormArray, [{
      key: "value",
      get: function get() {
        return this.reduce_(function (result, control, key) {
          result[key] = control.value;
          return result;
        }, []);
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
    /*
    forEach_(callback) {
    	Object.keys(this.controls).forEach(key => callback(this.controls[key], key));
    }
    	get(key) {
    	return this.controls[key];
    }
    	set(control, key) {
    	if (this.controls[key]) {
    		// unsubscribe;
    	}
    	delete(this.controls[key]);
    	if (control) {
    		this.controls[key] = control;
    	}
    	// subscribe
    }
    	add(control, key) {
    	if (control) {
    		// unsubscribe;
    		this.controls[key] = control;
    		// subscribe
    	}
    }
    	remove(key) {
    	if (this.controls[key]) {
    		// unsubscribe;
    	}
    	delete(this.controls[key]);
    	// subscribe
    }
    */


    return FormGroup;
  }(FormAbstractCollection);

  function RequiredValidator(value) {
    // return (value == null || value.length === 0) ? { required: true } : null;
    return value == null || value.length === 0 ? 'required' : null;
  }

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
        // 'Jhon',
        lastName: null,
        // 'Appleseed',
        email: null,
        // 'jhonappleseed@gmail.com',
        country: 1,
        items: new FormArray([null, null, null])
      }, [RequiredValidator]);
      form.value$.subscribe(function (values) {// console.log('AppComponent.form.value', values);
      });
      form.status$.subscribe(function () {
        // console.log('AppComponent.form.status$', form.valid);
        // console.log('AppComponent.form.valid', form.valid);
        _this.pushChanges();
      });
      this.form = form;
    };

    _proto.onValidate = function onValidate() {
      // console.log('AppComponent.onValidate', this.form.valid);
      return this.form.valid;
    };

    _proto.onSubmit = function onSubmit() {
      console.log('AppComponent.onSubmit', this.form.value);
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

  /*
  // fixing
  Module.prototype.makeInputs = function(meta, instance) {
  	const inputs = {};
  	if (meta.inputs) {
  		meta.inputs.forEach((key, i) => {
  			const input = this.makeInput(instance, key);
  			if (input) {
  				inputs[key] = input;
  			}
  		});
  	}
  	return inputs;
  };

  // fixing
  Module.prototype.makeInput = function(instance, key) {
  	const { node } = getContext(instance);
  	let input, expression = null;
  	if (node.hasAttribute(key)) {
  		expression = `'${node.getAttribute(key)}'`;
  	} else if (node.hasAttribute(`[${key}]`)) {
  		expression = node.getAttribute(`[${key}]`);
  	}
  	if (expression !== null) {
  		input = this.makeFunction(expression);
  	}
  	return input;
  };

  // fixing
  Module.prototype.getInstance = function(node) {
  	if (node === document) {
  		return window;
  	}
  	const context = getContextByNode(node); // !!!
  	if (context) {
  		return context.instance;
  	}
  };

  // fixing
  Module.prototype.getParentInstance = function(node) {
  	return Module.traverseUp(node, (node) => {
  		return this.getInstance(node);
  	});
  };
  */

  rxcomp.Browser.bootstrap(AppModule);

})));
