JQuery easypin
===================

Simple and fast image pinning plugin.

```javascript
// Back-end pin process
$('.pin').easypin({
          init: '',
          limit: 0,
          exceeded: function(type) {
              // limited pin event...
          },
          drop: function(x, y, element) {
              // dropped event...
          },
          drag: function(x, y, element) {
              //dragging event...
          },
          done: function(element) {

              // completed pinning event
              return true;
          }
      });
```


```javascript
// Pin show process
$('.pin').easypinShow({
            data: '',
            responsive: true,
            popover: {
                show: false,
                animate: true
            },
            each: function(index, data) {
                return data;
            },
            error: function(e) {
                console.log(e);
            },
            success: function() {
                console.log('başarılı');
            }
        });
```
