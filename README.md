# MaroJS-list-renderer

This is Simple list renderer. 

There are a lot of other great libraries... but this is for my study.

Please give me any advice, and All contributions are welcome!

## How to use

1. Load `jQuery` and My library(CDN Link: [https://rawgit.com/honeymaro/MaroJS-list-renderer/master/src/list-renderer.js](https://rawgit.com/honeymaro/MaroJS-list-renderer/master/src/list-renderer.js)).
2. Write `JavaScript` code like this.
```javascript
var renderer = new Maro.listRenderer("#divExample", $("#divExample").html(), [
	{ name: "name1", value: "value1" },
	{ name: "name2", value: "value2" },
	{ name: "name3", value: "value3" }
]);
```
3. Write `HTML` code like this.
```HTML
<div id="divExample">
	<li>${name}, ${value}
		<button>X</button>
	</li>
</div>
```

## Update log
### Feb 28, 2018
First version of list renderer.

You can set the template and print the list.


### May 23, 2018
You can access the DOM object you set.

You can use a JavaScript expression in the template.

### Next step(todo)
This library will no longer use jQuery.


### Set render data

```javascript
renderer.setRenderData([{name: "1", value: "1"}, {name: "2", value: "2"}]); // Array
```

### Get render data

```javascript
renderer.getRenderData(index); //object
```

or 

```javascript
renderer.getRenderData(); //array
```

### Get render target

```javascript
renderer.getRenderTarget(); //dom
```

### Get render template

```javascript
renderer.getRenderTemplate(); //string
```

### Set render template

```javascript
renderer.setRenderTemplate($(".dom").html()); //string
```

### Add render data

```javascript
renderer.addRenderData({ // Some JSON Object
	name: "name",
	value: "value"
});
```

### Remove render data

```javascript
renderer.removeRenderData(index, count);
```

### sort

```javascript
renderer.sort(compareFn); // Same as JavaScript Array.sort 
```

### refresh

```javascript
renderer.refresh();
```
