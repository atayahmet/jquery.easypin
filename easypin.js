(function($){

	$.fn.easypin = function(options) {

		options = options || {};

		var parentClass = $.fn.easypin.defaults.parentClass;
		var pinMapClass = $.fn.easypin.defaults.pinMapClass;
		var hoverClass = $.fn.easypin.defaults.hoverClass;
		var dashWidth = $.fn.easypin.defaults.dashWidth;
		var imageZindex = $.fn.easypin.defaults.imageZindex;
		var pinMapZindex = $.fn.easypin.defaults.pinMapZindex;
		var hoverLayerZindex = $.fn.easypin.defaults.hoverLayerZindex;

		// set default options values and became user side
		$.extend($.fn.easypin.defaults, options );

		this.each(function(i) {

			var containerElement = $(this)
				.after($('<div/>', {'class': parentClass}))
				.appendTo(setClass(parentClass)+':last')
				.css('position', 'absolute')
				.css('z-index', imageZindex);


			$(this).addClass('easypin-target');

			var imageWidth = $(this).width();
			var imageHeight = $(this).height();

			containerElement
				.parent()
				.attr($.fn.easypin.config('widthAttribute'), imageWidth)
				.attr($.fn.easypin.config('heightAttribute'), imageHeight)
				.css({
					width: setPx(imageWidth),
					height: setPx(imageHeight),
					position: $.fn.easypin.config('parentPosition'),
					border: setPx(dashWidth)+' dashed #383838'
				});

		});

		// hover event
		var parentElement = $(setClass(parentClass));

		$(parentElement).hover(function() {

			$(this)
				.prepend(
					$('<div/>', {'class': hoverClass})
						.css({
							width: '100%',
							height: '100%',
							position: 'absolute',
							opacity: 0,
							'z-index': hoverLayerZindex,
							'background-color': 'black',
							cursor: 'copy'
						})
				)
				// cross to children object
				.children(setClass(hoverClass))
				.animate({
				    opacity: 0.4,
				}, 800);

		},function() {
			$(this)
				// cross to children object
				.children(setClass(hoverClass))
				.animate({
				    opacity: 0,
				}, 
				'fast', // how fast we are animating
    			'swing', // the type of easing
				function() {
			   		$(this).remove();
				}
			);	

		})
		.append($('<div/>', {'class': pinMapClass})
			// child element
			.css({
				position: 'absolute',
				'z-index': pinMapZindex
			})
		)
		.bind('mousedown', function(e) {
			
			if(e.which != 1) return;

			var parentElement = e.currentTarget;
			var imageWidth = $('img'+setClass('easypin-target'), parentElement).width();
			var imageHeight = $('img'+setClass('easypin-target'), parentElement).height();

			// pin map class sized
			$(setClass(pinMapClass), parentElement).css({
				width: setPx(imageWidth),
				height: setPx(imageHeight)
			});

			var src = $.fn.easypin.defaults.markerSrc;
			var markerWidth = $.fn.easypin.defaults.markerWidth;
			var markerHeight = $.fn.easypin.defaults.markerHeight == 'auto' ? markerWidth : $.fn.easypin.defaults.markerHeight;
			var markerClass = $.fn.easypin.defaults.markerClass;
			var markerContainerZindex = $.fn.easypin.defaults.markerContainerZindex;

			var dashWidth = $.fn.easypin.defaults.dashWidth;
			var posYBalance = $.fn.easypin.defaults.posYBalance;
			var posXBalance = $.fn.easypin.defaults.posXBalance;

			var targetImage = $('img'+setClass('easypin-target'), parentElement);
			var imagePositionY = targetImage.offset().top - (dashWidth-posYBalance);
			var imagePositionX = targetImage.offset().left - (dashWidth-posXBalance);
			var clickPosX = (e.pageX-imagePositionX);
			var clickPosY = (e.pageY-imagePositionY);

			var markerBorderX = clickPosX-(markerWidth/2);
			var markerBorderY = clickPosY-(markerHeight/2);

			if(markerBorderX < 0) {
				markerBorderX = 0;
			}
			else if(clickPosX+(markerWidth/2) > imageWidth) {
				markerBorderX = imageWidth-markerWidth;
			}

			if(markerBorderY < 0) {
				markerBorderY = 0;
			}
			else if(clickPosY+(markerHeight/2) > imageHeight) {
				markerBorderY = imageHeight-markerHeight;
			}

			// create marker container
			var markerContainer = $('<div/>', {'class': markerClass})
				.css('left', setPx(markerBorderX))
				.css('top', setPx(markerBorderY-15))
				.css('width', markerWidth)
				.css('height', markerHeight)
				.css('position', 'absolute')
				.css('opacity', 0)
				.css('z-index', markerContainerZindex+10)
				.css('background-image', 'url('+src+')')
				.css('background-size', setPx(markerWidth))
				.css('cursor', 'move')
				.attr($.fn.easypin.config('xAttribute'), markerBorderX.toFixed(3))
				.attr($.fn.easypin.config('yAttribute'), markerBorderY.toFixed(3))
				.attr($.fn.easypin.config('widthAttribute'), imageWidth)
				.attr($.fn.easypin.config('heightAttribute'), imageHeight);

			var contextMenu = $('<div/>', {'class': 'easy-context'})
	        	.css({
	        		'width': setPx(markerWidth),
	        		'height': '10px',
	        		'position': 'absolute',
	        		'background-color': '#868585',
	        		'left': '-1px',
	        		'top': setPx((markerHeight+2)-5),
	        		'opacity': '0'

	        	})
	        	.append(function() { // edit button create
	        		return $('<a/>', {'class': 'easy-edit'})
	        			.css({
	        				'display': 'inline-block',
	        				'width': setPx(markerWidth/2),
	        				'height': '10px',
	        				'position': 'absolute',
	        				'left': '0px',
	        				'background-image': 'url('+$.fn.easypin.defaults.editSrc+')',
	        				'background-repeat': 'no-repeat',
	        				'background-size': '8px',
	        				'background-position-y': '1px',
	        				'background-position-x': '3px'
	        			}).hover(function() {
	        				$(this)
	        					.css('background-color', '#D116F1')
	        					.css('opacity', '.6');
	        			},function() {
	        				$(this).css('background-color', 'inherit');
	        			});
	        	})
	        	.append(function() { // delete button
	        		return $('<a/>', {'class': 'easy-edit'})
	        			.css({
	        				'display': 'inline-block',
	        				'width': setPx(markerWidth/2),
	        				'height': '10px',
	        				'position': 'absolute',
	        				'right': '0px',
	        				'background-image': 'url('+$.fn.easypin.defaults.deleteSrc+')',
	        				'background-repeat': 'no-repeat',
	        				'background-size': '8px',
	        				'background-position-y': '1px',
	        				'background-position-x': '3px'
	        			}).hover(function() {
	        				$(this)
	        					.css('background-color', '#D116F1')
	        					.css('opacity', '.6');
	        			},function() {
	        				$(this).css('background-color', 'inherit');
	        			});
	        	});

	        $(markerContainer).append(contextMenu);

			// marker container append to pin parent container
			$(parentElement).append(markerContainer);

			// marker element save to dependency container
			$.fn.easypin.di('$markerContainer', markerContainer);
			
			// active Y position save to dependency container
			$.fn.easypin.di('$markerBorderY', markerBorderY.toFixed(3));

			// run animate function
			$.fn.easypin.call(setAnimate, ['',
					function() {
					
						// context animate
						$(contextMenu).animate(
							{
								'opacity': '.4',
								'top': setPx(markerHeight+2)
							},
							{
								duration: 'slow',
								easing: 'easeOutElastic'
							}
						).hover(function() {
							$(this).animate(
								{
									'opacity': '1'
								},
								{
									duration: 'slow',
									easing: 'easeInOutQuint'
								}
							).css('cursor', 'pointer');
						},function() {
							$(this).animate(
								{
									'opacity': '.4'
								},
								{
									duration: 'slow',
									easing: 'easeInOutQuint'
								}
							);
						});
					}
				]
			);

			var draggable = $(setClass(markerClass));

	        // binding methods mousedown and mousemove
	        $(draggable).bind('mousedown', function (e) {

	        	e.stopPropagation();

				if(e.which != 1) return;

	            $(draggable).bind('mousemove', function (e) {

	            	var parentElement = $(e.currentTarget).parent();
	            	var markerContainer = $(e.currentTarget);
	            	var targetImage = $('img.easypin-target', parentElement)
	            	
	            	liveY = e.pageY-targetImage.offset().top;
	            	liveX = e.pageX-targetImage.offset().left;

	            	var relY = liveY;
	            	var relX = liveX;

	            	if(liveY - (markerHeight/2) < 0) {
	            		var relY = (markerHeight/2);
	            	}
	            	else if(liveY + (markerHeight/2) > imageHeight) {
	            		var relY = imageHeight-(markerHeight/2);
	            	}

	            	if(liveX - (markerWidth/2) < 0) {
	            		var relX = (markerWidth/2);
	            	}
	            	else if(liveX + (markerWidth/2) > imageWidth) {
	            		var relX = imageWidth-(markerWidth/2);
	            	}

	                $(markerContainer).css({
	                	position: 'absolute', 
	                	top: setPx(relY),
	                	left: setPx(relX),
	                	marginTop: -(markerHeight/2), 
	                	marginLeft: -(markerWidth/2),
	               	})
	               	.attr($.fn.easypin.config('xAttribute'), relX.toFixed(3))
					.attr($.fn.easypin.config('yAttribute'), relY.toFixed(3));
	            });
	        });

	        // unbinding the events and removing  
	        $(draggable).bind('mouseup', function () {
	            $(draggable).unbind('mousemove');
	        });

		});

		return this;
	};

	/**
	 * Set animation function
	 * 
	 * @param {[object]} $markerContainer [active element instance]
	 * @param {[int]} $markerBorderY [pin active position]
	 */
	var setAnimate = function($markerContainer, $markerBorderY, params) {
		
		// marker animate
		$($markerContainer).animate(
			{
				opacity: 1, 
				top: setPx($markerBorderY)
			},
			{
				duration: 'slow',
				easing: 'easeOutElastic',
				complete: params[1] // callback 
			}
		);
	};

	$.fn.easypin.config = function(attr) {
		return $.fn.easypin.defaults[attr];
	};

	$.fn.easypin.di = function(key, depends) {

		$.fn.easypin.container[key] = depends;
	};

	$.fn.easypin.call = function(func, params) {

		params = params || '';

		var depends = func.toString().match(/function\s*\(\s*(.*?)\s*\)/i);

		if(depends.length > 1) {

			depends = depends[1];

			var clientParm = depends.replace(/(\$[a-zA-Z]+)/g, '');
			clientParm = clientParm.replace(/\s+/g, '');
			clientParm = clientParm.replace(/,+/g,',');
			clientParm = clientParm.replace(/(^,)/, '');
			clientParm = clientParm.split(/,/g);
			
			expectParm = depends.match(/(\$[a-zA-Z]+)/g);
 
			var dependsArgs = new Array();

			for(var i in expectParm) {
				if($.fn.easypin.container[expectParm[i]]) {
					dependsArgs.push($.fn.easypin.container[expectParm[i]]);
				}
			}

			dependsArgs.push(params);
			func.apply(null, dependsArgs);
		}
	};


	$.fn.easypin.defaults = {

		widthAttribute: 'data-width',
       	heightAttribute: 'data-height',
       	xAttribute: 'data-x',
       	yAttribute: 'data-y',
       	parentPosition: 'relative',
       	parentClass: 'pinParent',
		pinMapClass: 'pinCanvas',
		hoverClass: 'hoverClass',
		markerClass: 'easy-marker',
		markerSrc: 'data:image/png;base64,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',
		editSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACUklEQVQ4T42TW0iTYQCGn29H929mCUngOpCnXXTlJJC86SqQUISu6kKMbgpCuxAFLSEWSIRQSF1VEAVBIBXVTaVQIsMLteVhcxE0CDc3t3be3L/9sUOmaOYHH9/V87zvdxLscby3ai8bopkLOsEpwAU8OOnirtgLHxpteGQP0VXtXqPBfBpRfZwfzx8SWg30/FegvGkaQFNm8+9rAe8MRqcPTawOxT2Pw+F07SoowKoyG3UdKFINsvcdvsUF0pPfOTKzgiMK/xQorxsH0EhF2FiDWPsI0SUCYZkv0yFS0x4q3KHPOwqUl40DaCUb9SU4OAERB2QT8G0dty+LeyXOoSlP1zZBAVZLNizF2iI0AeFZyKVhOQ0JwKQi7ok/Ng25Lm4RKGOl2pZ2FGMtIvQJInPF5DwcB8pVkFSGxJXZm/kb3BBkXliHNTqpD0sbiimfPAmxBciES3AOjGpI/4U3BO571uFas76PE6U955NjTpCj4EpAPAeSGpK5QXF17tbmtyOmRpoNuqzss9ZXliuNlxBhO0S/ghyD5WQRNqghtR0uNBi/YTlzuKntVVlFld68+gEO6kEXgcVfkFBALyClDIrurcl/Woi3/cdGmjtvd0v7K1X+5TnMrmegM0A0BVolf2CD4trOcKHBWN/RSGvPk/K4c5RcwkvK1I7Z8RQ0apKx9B2pd753t/8irnefy3SerdFo1sZz/kBSDgQz2aA/KB/Qqu+3jnj7//fZxPmOFjkR9ChVWv/PRFqZWg0r9omltD2TIQmkN811IAPk1ywg5+W/AeF/Ek6E64jVAAAAAElFTkSuQmCC',
		deleteSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4T4WTXUiTURjHn/ec933Xq5OZ5ucc5kydTtYqBmWRQVhBmN6JRdlFpKBd6CLLoCaVBmKR5EVYI7xQL1IQkUiEAjXBCZof86MiP3jT5rKltY9370ds4LCa+lyci/M/53ee5/+ch3iiVqccOpdrjk9UJQy+ML+8MGGthm3iEUBEdEpyTWxq2qkv/QMtRJ+xfPrgmZw0+ud3YPv7vH3tXeaLi0slwRj1FHU4Tad7HqPNSF2aX5ifHRq8RViqKr9mHtDG7VpbAVj4DJx1FHrfjU5ZVpxZJgCHD2QCQEnhild6vT7fgZBzYmy8vNRub/JphG95plKVG3T7bqfL+UjMzoHT5oChZbd9bM2bTpGkRkOTnUqlMmLS6bZMsewxEwC3kaEfsBHNclmDLgyX7BEFivOIMOMSfjECMHKSxMOi1FzCeYv+Le0vgE+sB1DFM2SXRhT3Y14ClyjBACbrKnj+RjBf/gOYAEL2kqQlU+AzQAKgMAEjGA1f5gTDjoB6BlRqDo0kC2LkGkGAFaNuDQ2nE0MQ2b4OTys83mtblvAgFGK0LmI6SZTCBUzAe4zayjih8D6N8/KiqXY5g1HTR6++BrixzRB/Cb42pWI0nyGKCRRFwAcCzZ33CEkbB+/QuKBYzbSNrvJzZ23uwH6gjY0YtWRJYiEjw7CMCP4tj7XVHs/s5pcaGPphbixd2bHkuWp0e/1/wA+4CxCdHbWbVXl+kwIpQrcTao1uviqYYR3hshkFIqJOrrojAoDHirAreTknmsIWpmH1Gyv12qTEUpdrMRjgHkDyUYVs0uriC8o4odOfQW2o7EzRTePrOMEBsz09Qtf4p9jr62Dfap4aabJOCfAjn+NrAh60ZmcNHjluMLwxt7YUs7ZL2wyjX/KZbgIQA4CdLmyn/wENmQFM5/MDlQAAAABJRU5ErkJggg==',
		markerWidth: 32,
		markerHeight: 'auto',
		animate: false,
		posYBalance: 2,
		posXBalance: 2,
		dashWidth: 2,
		imageZindex: 1,
		pinMapZindex: 2,
		hoverLayerZindex: 3,
		markerContainerZindex: 4,
		markerBorderColor: '#FFFF00',
		downPoint: 10
	
	};

	$.fn.easypin.container = {};
	$.fn.easypin.markerContainer = {};

	var setClass = function(name) {
		return '.'+name;
	};

	var setPx = function(num) {
		return num+'px';
	};

	var getMarkerUrl = function() {
		return $.fn.easypin.defaults.markerSrc;
	};

}(jQuery));



	
