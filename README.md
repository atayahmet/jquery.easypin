jQuery easypin
===================

Simple and fast image pinning plugin. There are dependencies with the library jQuery easing plugin.
Supported lowest jQuery version 1.8


Quick Start
==============

### Load libraries
```html
<script src="jquery.min.js"></script>
<script src="jquery.easing.min.js"></script>
<script src="jquery.easypin.min.js"></script>
```
### Pin picture:
```html
<img src="example.jpg" class="pin" width="800" easypin-id="example_image1" />
```
> **class**: selector class of pictures

> **easypin-id**: It will be the default value if not defined

### Dialog window for pin contents
```html
<div class="easy-modal" style="display:none;" modal-position="free">
    <form>
        type something: <input name="content" type="text">
        <input type="button" value="save pin!" class="easy-submit">
    </form>
</div>
```

> **easy-submit** class must be defined to close the dialog window

### Popover
```html
<div style="display:none;" width="130" shadow="true" popover>
    <div style="width:100%;text-align:center;">{[content]}</div>
</div>
```
### Initialize the pictures:
```javascript
// Back-end pin process
$('.pin').easypin();
```

To access the coordinates after pinning:
```javascript
var $instance = $('.pin').easypin({
    done: function(element) {
        return true;
    }
});

// set the 'get.coordinates' event
$instance.easypin.event( "get.coordinates", function($instance, data, params ) {

    console.log(data, params);

});
```

Then you can run this event with a button click event
```html
<input class="coords" type="button" value="Get coordinates!" />
```

```javascript
$( ".coords" ).click(function(e) {
    $instance.easypin.fire( "get.coordinates", {param1: 1, param2: 2, param3: 3}, function(data) {
        return JSON.stringify(data);
    });
});
```

We pass parameters when calling the above coordinate the event. Before the callback to run.

.easypin({}) options
=================

|      option       | type                    | description                           |
| ----------------- | ----------------------- | ------------------------------------- |
| init              | `object or json string` | initialize the pin coordinates        |
| popover           | `functions into object` | set callback all template variables   |
| popoverStyle      | `object`                | popover styles (it just pass to jquery .css() method of the object)        |
| limit             | `integer`               | limited pin (default 0)               |
| exceeded          | `function`              | limit exceeded event                  |
| drop              | `function`              | pin dropped event                     |
| drag              | `function`              | pin dragging event                    |
| done              | `function`              | closing of the dialog window is depend to this function      |



Show pins to users
==============

```javascript
// Pin show process
$('.pin').easypinShow({
    data: {
        "example_image1":{
            "0":{
                "content":"Captan America",
                "coords":{
                    "lat":"530",
                    "long":"179"
                }
            },
            "1":{
                "content":"Thor Odinson",
                "coords":{
                    "lat":"892",
                    "long":"109"
                }
            },
            "2":{
                "content":"Hulk",
                "coords":{
                    "lat":"56",
                    "long":"133"
                }
            },
            "3":{
                "content":"Black Widow",
                "coords":{
                    "lat":"717",
                    "long":"242"
                }
            },
            "4":{
                "content":"Hawkeye",
                "coords":{
                    "lat":"173",
                    "long":"221"
                }
            },
            "5":{
                "content":"Iron Man",
                "coords":{
                    "lat":"280",
                    "long":"161"˜
                }
            },
            "canvas":{
                "src":"https://i.ytimg.com/vi/48fKIXlxaXk/maxresdefault.jpg","width":"1000","height":"562"
            }
        }
    },
    success: function() {
        console.log('image pin succesfully...');
    }
});
```

#### then enjoy!
