# 💎 RxComp FormModule

[![Licence](https://img.shields.io/github/license/actarian/rxcomp-form.svg)](https://github.com/actarian/rxcomp-form)

[RxComp FormModule](https://github.com/actarian/rxcomp-form) is a Reactive Form Module for RxComp library

[RxComp](https://github.com/actarian/rxcomp) is a reactive component library built on top of [RxJs](https://github.com/ReactiveX/rxjs) that mimics the [Angular](https://angular.io/) declarative syntax. 

If you like Angular declarative syntax but you just want go Vanilla, RxComp library come in useful.

 lib & dependancy    | size
:--------------------|:----------------------------------------------------------------------------------------------|
rxcomp-form.min.js   | ![](https://img.badgesize.io/https://unpkg.com/rxcomp-form@1.0.0-beta.18/dist/umd/rxcomp-form.min.js.svg?compression=gzip)
rxcomp-form.min.js   | ![](https://img.badgesize.io/https://unpkg.com/rxcomp-form@1.0.0-beta.18/dist/umd/rxcomp-form.min.js.svg)
rxcomp.min.js        | ![](https://img.badgesize.io/https://unpkg.com/rxcomp@1.0.0-beta.18/dist/umd/rxcomp.min.js.svg?compression=gzip)
rxcomp.min.js        | ![](https://img.badgesize.io/https://unpkg.com/rxcomp@1.0.0-beta.18/dist/umd/rxcomp.min.js.svg)
rxjs.min.js          | ![](https://img.badgesize.io/https://unpkg.com/rxjs@6.6.2/bundles/rxjs.umd.min.js.svg?compression=gzip)
rxjs.min.js          | ![](https://img.badgesize.io/https://unpkg.com/rxjs@6.6.2/bundles/rxjs.umd.min.js.svg)
 
> [RxComp Form Demo](https://actarian.github.io/rxcomp-form/)  
> [RxComp Form Api](https://actarian.github.io/rxcomp-form/typedoc/)  
> [RxComp Form Codepen](https://codepen.io/actarian/pen/vYEXXPe?editors=0010)  
___

### What is included
* Models  
*```FormControl```, ```FormGroup```, ```FormArray```*  

* Directives  
*```FormInput```, ```FormTextarea```, ```FormSelect```, ```FormCheckbox```, ```FormRadio```, ```FormSubmit```*  

* Validators  
*```EmailValidator```, ```MaxLengthValidator```, ```MaxValidator```, ```MinLengthValidator```, ```MinValidator```, ```NullValidator```, ```PatternValidator```, ```RequiredTrueValidator```, ```RequiredValidator```* 

___

## Installation and Usage

### ES6 via npm
This library depend on [RxComp](https://github.com/actarian/rxcomp) and [RxJs](https://github.com/ReactiveX/rxjs)  
install via npm or include via script   

```
npm install rxjs rxcomp rxcomp-form --save
```
___

### CDN

For CDN, you can use unpkg

```html
<script src="https://unpkg.com/rxjs@6.6.2/bundles/rxjs.umd.min.js"></script>  
<script src="https://unpkg.com/rxcomp@1.0.0-beta.18/dist/umd/rxcomp.min.js"></script>  
<script src="https://unpkg.com/rxcomp-form@1.0.0-beta.18/dist/umd/rxcomp-form.min.js"></script>  
```

The global namespace for RxComp is `rxcomp`

```javascript
import { CoreModule, Module } from 'rxcomp';
```

The global namespace for RxComp FormModule is `rxcomp.form`

```javascript
import { FormModule } from 'rxcomp-form';
```
___

### Bootstrapping Module

```javascript
import { Browser, CoreModule, Module } from 'rxcomp';
import { FormModule } from 'rxcomp-form';
import AppComponent from './app.component';

export default class AppModule extends Module {}

AppModule.meta = {
    imports: [
        CoreModule,
        FormModule
    ],
    declarations: [],
    bootstrap: AppComponent,
};

Browser.bootstrap(AppModule);
```
___

### Reactive Form Definition

```javascript
import { Component } from 'rxcomp';
import { FormArray, FormGroup, RequiredValidator } from 'rxcomp-form';

export default class AppComponent extends Component {

    onInit() {
        const form = new FormGroup({
            firstName: null,
            lastName: null,
            email: null,
            country: null,
            evaluate: null,
            privacy: null,
            items: new FormArray([null, null, null], RequiredValidator()),
        });

        /*
        form.patch({
            firstName: 'Jhon',
            lastName: 'Appleseed',
            email: 'jhonappleseed@gmail.com',
            country: 'en-US'
        });
        */

        form.changes$.subscribe((changes) => {
            this.pushChanges();
        });

        this.form = form;
    }

    onSubmit() {
        if (this.form.valid) {
            this.form.submitted = true;
            // this.form.reset();
        }
    }

}

AppComponent.meta = {
    selector: '[app-component]',
};
```
___

### Declarative Syntax

```html
<form [formGroup]="form" (submit)="onSubmit()" name="form" role="form" novalidate autocomplete="off">
    <input type="text" formControlName="firstName" placeholder="firstName" />
    <input type="text" formControlName="lastName" placeholder="lastName" />
    <button type="submit" [class]="{ submitted: form.submitted }">Submit</button>
</form>
```
___
### Browser Compatibility
RxComp supports all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).
___
## Contributing

*Pull requests are welcome and please submit bugs 🐞*
___

### Install packages
```
npm install
```
___

### Build, Serve & Watch 
```
gulp
```
___

### Build Dist
```
gulp build --target dist
```
___

*Thank you for taking the time to provide feedback and review. This feedback is appreciated and very helpful 🌈*

[![GitHub forks](https://img.shields.io/github/forks/actarian/rxcomp.svg?style=social&label=Fork&maxAge=2592000)](https://gitHub.com/actarian/rxcomp/network/)  [![GitHub stars](https://img.shields.io/github/stars/actarian/rxcomp.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/actarian/rxcomp/stargazers/)  [![GitHub followers](https://img.shields.io/github/followers/actarian.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/actarian?tab=followers)

* [Github Project Page](https://github.com/actarian/rxcomp)  

*If you find it helpful, feel free to contribute in keeping this library up to date via [PayPal](https://www.paypal.me/circledev/5)*

[![PayPal](https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png)](https://www.paypal.me/circledev/5)
___

## Contact

* Luca Zampetti <lzampetti@gmail.com>
* Follow [@actarian](https://twitter.com/actarian) on Twitter

[![Twitter Follow](https://img.shields.io/twitter/follow/actarian.svg?style=social&label=Follow%20@actarian)](https://twitter.com/actarian)
___

## Release Notes
Changelog [here](https://github.com/actarian/rxcomp-form/blob/master/CHANGELOG.md).

<!-- 
Docs Schema
"$schema": "http://json.schemastore.org/typedoc",
"toc": [
	"FormAbstract",
	"FormControl",
	"FormAbstractCollection",
	"FormGroup",
	"FormArray"
],
-->
