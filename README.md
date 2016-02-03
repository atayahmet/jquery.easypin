jQuery easypin
===================

Simple and fast image pinning plugin. There are dependencies with the library jQuery easing plugin.
Supported lowest jQuery version 1.8


Quick Start
==============

###Pin picture:
```html
<img src="example.jpg" class="pin" easypin-id="example_image1" />
```
> **class**: selector class of pictures

> **easypin-id**: It will be the default value if not defined

###dialog window for pin contents
```html
<div class="easy-modal" style="display:none;" modal-position="free">
    <form>
        type something: <input name="content" type="text">
        <input type="button" value="save pin!" class="easy-submit">
    </form>
</div>
```
> **easy-submit** class must be defined to close the dialog window

###initialize the picture:
```javascript
// Back-end pin process
$('.pin').easypin();
```

To access the coordinates after pinning:
```javascript
var $instance = $('.pin').easypin();

// set the 'get.coordinates' event
$instance.easypin.event( "get.coordinates", function($instance, data, params ) {

    console.log(data, params);

});
```

then you can run this event with a button click event
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


```javascript
// Pin show process
$('.pin').easypinShow({
    data: {
        "example_image1":{
            "0":{
                "title":"Hello World",
                "coords":{
                    "lat":"124",
                    "long":"89"
                }
            }
        },
        "canvas":{
            "src":"example.jpg","width":"800","height":"357"
        }
    },
    success: function() {
        console.log('image pin succesfuly...');
    }
});
```

####then enjoy!
