/**
 * @license todomvc v1.0.0-alpha.5
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

    _proto.initSubjects = function initSubjects() {
      this.value$ = new rxjs.BehaviorSubject(null);
      this.status$ = new rxjs.BehaviorSubject(this);
      this.childrenValue$ = new rxjs.Subject();
      this.childrenStatus$ = new rxjs.Subject();
    };

    _proto.initObservables = function initObservables() {
      var _this = this;

      this.valueChanges$ = rxjs.merge(this.value$, this.childrenValue$).pipe(operators.distinctUntilChanged(), operators.skip(1), operators.tap(function (value) {
        _this.dirty_ = true;

        if (value === _this.value) {
          _this.status$.next(_this);
        }
      }), operators.shareReplay(1));
      this.statusChanges$ = rxjs.merge(this.status$, this.childrenStatus$).pipe( // auditTime(1),
      operators.tap(function (status) {
        _this.reduceValidators();
      }), operators.shareReplay(1));
    };

    _proto.reduceValidators = function reduceValidators() {
      return [];
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
        this.status$.next(this);
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
        this.value_ = value;
        this.value$.next(value);
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

      _this.initSubjects();

      _this.initObservables();

      _this.status$.next(_assertThisInitialized(_this));

      return _this;
    }

    var _proto = FormControl.prototype;

    _proto.reduceValidators = function reduceValidators() {
      return this.validate(this.value);
    };

    return FormControl;
  }(FormAbstract);

  var FormGroup =
  /*#__PURE__*/
  function (_FormAbstract) {
    _inheritsLoose(FormGroup, _FormAbstract);

    function FormGroup(controls, validators) {
      var _this;

      if (controls === void 0) {
        controls = {};
      }

      _this = _FormAbstract.call(this, validators) || this;
      _this.controls = _this.asControls(controls);

      _this.initSubjects();

      _this.initObservables(); // this.status$.next(this);


      return _this;
    }

    var _proto = FormGroup.prototype;

    _proto.initSubjects = function initSubjects() {
      var _this2 = this;

      this.value$ = new rxjs.BehaviorSubject(null);
      this.status$ = new rxjs.BehaviorSubject(this); // VALUE

      var childrenValue$ = this.reduce_(function (observables, control) {
        // console.log(observables, control);
        observables.push(control.value$);
        return observables;
      }, []); // console.log('childrenValue$', childrenValue$);

      this.childrenValue$ = rxjs.combineLatest(childrenValue$).pipe(operators.map(function (latest) {
        return _this2.value;
      }), // distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      // this.dirty_ = this.any_('dirty_', true);

      /*
      map(merged => {
      	const values = {};
      	Object.keys(this.controls).forEach((key, i) => {
      		values[key] = merged[i] || null;
      	});
      	return values;
      }),
      tap(value => {
      	this.dirty_ = true;
      	this.status$.next(this);
      }),
      */
      operators.shareReplay(1)); // STATUS

      var childrenStatus$ = this.reduce_(function (observables, control) {
        // console.log(observables, control);
        observables.push(control.statusChanges$);
        return observables;
      }, []); // console.log('childrenStatus$', childrenStatus$);

      this.childrenStatus$ = rxjs.combineLatest(childrenStatus$).pipe(
      /*
      tap(controls => {
      	this.dirty_ = this.any_('dirty_', true);
      }),
      */
      operators.shareReplay(1));
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
        errors = this.reduce_(function (errors, control) {
          return errors.concat(control.errors);
        }, errors);
        this.status = this.errors.length === 0 ? FormStatus.Valid : FormStatus.Invalid;
      }

      return this.errors;
    };

    _proto.asControl = function asControl(control) {
      return control instanceof FormAbstract ? control : new FormControl(control, this.validators);
    };

    _proto.asControls = function asControls(controls) {
      var _this3 = this;

      if (controls === void 0) {
        controls = {};
      }

      Object.keys(controls).forEach(function (key) {
        controls[key] = _this3.asControl(controls[key]);
      });
      return controls;
    };

    _proto.forEach_ = function forEach_(callback) {
      var _this4 = this;

      Object.keys(this.controls).forEach(function (k) {
        return callback(_this4.controls[k], k);
      });
    };

    _proto.reduce_ = function reduce_(callback, value) {
      this.forEach_(function (control, key) {
        value = callback(value, control, key);
      });
      return value;
    };

    _proto.all_ = function all_(key, value) {
      return this.reduce_(function (value, control) {
        return value && control[key] === value;
      }, true);
    };

    _proto.any_ = function any_(key, value) {
      return this.reduce_(function (value, control) {
        return value || control[key] === value;
      }, false);
    };

    _proto.get = function get(key) {
      return this.controls[key];
    };

    _createClass(FormGroup, [{
      key: "touched",
      get: function get() {
        return this.reduce_(function (value, control) {
          return value && control.touched;
        }, true);
      },
      set: function set(touched) {
        // this.touched_ = touched;
        this.forEach_(function (control) {
          control.touched = touched;
        });
        this.status$.next(this);
      }
    }, {
      key: "value",
      get: function get() {
        return this.reduce_(function (value, control, key) {
          value[key] = control.value;
          return value;
        }, {});
      },
      set: function set(value) {}
    }]);

    return FormGroup;
  }(FormAbstract);

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
      var group = this.group = new FormGroup({
        firstName: 'Jhon',
        lastName: 'Appleseed'
      }, [RequiredValidator]);
      group.valueChanges$.subscribe(function (values) {
        console.log('AppComponent.group.valueChanges$', values);
      });
      group.statusChanges$.subscribe(function () {
        // console.log('AppComponent.group.statusChanges$');
        console.log('AppComponent.group.valid', group.valid);
      });
    };

    return AppComponent;
  }(rxcomp.Component);
  AppComponent.meta = {
    selector: '[app-component]'
  };

  var AccessorProps = ['untouched', 'touched', 'pristine', 'dirty', 'pending', 'enabled', 'disabled', 'valid', 'invalid'];

  var FormAccessor =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(FormAccessor, _Component);

    function FormAccessor() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = FormAccessor.prototype;

    _proto.onInit = function onInit() {
      // context
      var context = rxcomp.Module.getContext(this);
      var node = context.node;
      this.node = node; // log(node.getAttributeNode('formControl').value);
      // log('name', node.name);

      this.onChange = this.onChange.bind(this);
      this.onBlur = this.onBlur.bind(this); // this.onFocus = this.onFocus.bind(this);

      node.addEventListener('input', this.onChange);
      node.addEventListener('change', this.onChange);
      node.addEventListener('blur', this.onBlur); // node.addEventListener('focus', this.onFocus);
    };

    _proto.onChanges = function onChanges(changes) {
      var _this = this;

      // console.log('FormAccessor.onChanges', changes);
      var context = rxcomp.Module.getContext(this);
      var node = context.node; // const key = node.getAttributeNode('formControl').value;

      var key = node.getAttributeNode('[name]').value; // console.log(key, this.formGroup);

      var control = this.formGroup.get(key); // const control = group.controls[key]; // FORM[key];

      control.valueChanges$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (value) {
        console.log('Accessor.control.valueChanges$', value);
      });
      control.statusChanges$.pipe(operators.takeUntil(this.unsubscribe$)).subscribe(function (status) {
        var pre = _this.getPre(node);

        pre.textContent = '';
        AccessorProps.forEach(function (x) {
          if (control[x]) {
            node.classList.add(x);
            pre.textContent += x + ', ';
          } else {
            node.classList.remove(x);
          }
        });
        control.errors.forEach(function (x) {
          return pre.textContent += "invalid-" + x + ", ";
        });
      });
      this.writeValue(control.value); // node.value = 'test';
    };

    _proto.writeValue = function writeValue(value) {
      var context = rxcomp.Module.getContext(this);
      var node = context.node;
      node.setAttribute('value', value == null ? '' : value);
    };

    _proto.setDisabledState = function setDisabledState(disabled) {
      var context = rxcomp.Module.getContext(this);
      var node = context.node;
      node.setAttribute('disabled', disabled);
    };

    _proto.getPre = function getPre(node) {
      var pre = node.previousSibling;

      if (!pre || pre.nodeType !== 3) {
        pre = document.createTextNode('');
        node.parentNode.insertBefore(pre, node);
      }

      return pre;
    };

    _proto.onChange = function onChange(event) {
      var context = rxcomp.Module.getContext(this);
      var node = context.node; // const key = node.getAttributeNode('formControl').value;

      var key = node.getAttributeNode('[name]').value;
      var control = this.formGroup.get(key); // const control = group.controls[key]; // FORM[key];
      // event.currentTarget;
      // log(event.type, node.name, node.value, node.checked);
      // log('control', key, control.value);

      control.value = node.value;
    };

    _proto.onFocus = function onFocus(event) {};

    _proto.onBlur = function onBlur(event) {
      // log(event.type);
      var context = rxcomp.Module.getContext(this);
      var node = context.node; // const key = node.getAttributeNode('formControl').value;

      var key = node.getAttributeNode('[name]').value;
      var control = this.formGroup.get(key); // const control = group.controls[key]; // FORM[key];

      control.touched = true;
    };

    return FormAccessor;
  }(rxcomp.Component);
  FormAccessor.meta = {
    selector: 'input,textarea,select',
    inputs: ['formGroup']
  };

  rxcomp.Module.use({
    factories: [rxcomp.ClassDirective, rxcomp.EventDirective, rxcomp.ForStructure, rxcomp.IfStructure, rxcomp.InnerHtmlDirective, rxcomp.StyleDirective, FormAccessor],
    pipes: [rxcomp.JsonPipe],
    bootstrap: AppComponent
  });

})));
