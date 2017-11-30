# Native CSS variables. 

[Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) and [browser support](http://caniuse.com/#feat=css-variables)

Usage:

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
  --blur: 10px;
}
img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}
.hl {
  color: var(--base);
}
```

Native CSS variables can be manipulated by JavaScript.

```js
var inputs = document.querySelectorAll('.controls input');
```

Note difference between node list and array. forEach method.

```js
inputs.forEach(function(input){
  input.addEventListener('change', handleUpdate)
})

function handleUpdate(){
  console.log(this.value);
}
```

Note the update frequency.

*Add*, do not replace existing listener:

```
inputs.forEach(function(input){
  input.addEventListener('mousemove', handleUpdate)
})
```

Need to know the suffix of the values we are working with - px. 

Note the data-sizing attribute in the html.

Get the data set attribute values:

```
function handleUpdate(){
  console.log(this.dataset);
}
```

Data set is an object that contains all the data attributes on an html element.

Temporarily add `data-daniel="me" data-munchies="snickers"`. 

```
<input type="range" name="spacing" min="10" max="200" value="10" data-sizing="px" data-daniel="me" data-munchies="snickers">
```

Try the below in the browser without the "or nothing". (Some of the data sets do not have sizing.)

```
function handleUpdate(){
  var suffix = this.dataset.sizing || '';
  console.log(suffix);
}
```

Note the name property on the inputs.

```
function handleUpdate(){
  var suffix = this.dataset.sizing || '';
  console.log(this.name);
}
```
Tack the css on to the html element:

```
function handleUpdate(){
  var suffix = this.dataset.sizing || '';
  document.querySelector('html').style.setProperty('--' + this.name, this.value);
}
```

Examine the inspector. Note the lack of units.

Add the suffix variable:

```
document.querySelector('html').style.setProperty('--' + this.name, this.value + suffix);
```

Note scope in CSS. Try:

```
<h2 style="--base: #bada55">
```

Refactor to easier to read ES6

```
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

Run it through http://babeljs.io/


