jQuery.noConflict();

// Checking for Retina Devices
function isRetina() {
    var query = '(-webkit-min-device-pixel-ratio: 1.5),\
                (min--moz-device-pixel-ratio: 1.5),\
                (-o-min-device-pixel-ratio: 3/2),\
                (min-device-pixel-ratio: 1.5),\
                (min-resolution: 144dpi),\
                (min-resolution: 1.5dppx)';

    if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
        return true;
    }

    return false;
}
isMobile = 'ontouchstart' in document.documentElement;


// Images rollover effect function
function frameHover () {
    var frame_img = jQuery(this).find('img');
    var frame_ico = jQuery(this).find('.zoom,.video');
    jQuery(this).hover(function(){
        jQuery(frame_img).stop(true, true).animate({top:50}, '5000', 'swing');
        jQuery(frame_ico).stop(true, true).animate({top:0}, '5000', 'swing');
    }, function(){
        jQuery(frame_img).stop(true, true).animate({top:0}, '5000', 'swing');
        jQuery(frame_ico).stop(true, true).animate({top:-99}, '5000', 'swing');

    });
}

//** Smooth Navigational Menu- By Dynamic Drive DHTML code library: http://www.dynamicdrive.com
//** Script Download/ instructions page: http://www.dynamicdrive.com/dynamicindex1/ddlevelsmenu/
//** Menu created: Nov 12, 2008

var ddsmoothmenu = {

//Specify full URL to down and right arrow images (23 is padding-right added to top level LIs with drop downs):
    transition:{overtime:300, outtime:300}, //duration of slide in/ out animation, in milliseconds
    showhidedelay:{showdelay:100, hidedelay:200}, //set delay in milliseconds before sub menus appear and disappear, respectively

///////Stop configuring beyond here///////////////////////////

    detectwebkit:navigator.userAgent.toLowerCase().indexOf("applewebkit") != -1, //detect WebKit browsers (Safari, Chrome etc)
    detectie6:document.all && !window.XMLHttpRequest,

    getajaxmenu:function ($, setting) { //function to fetch external page containing the panel DIVs
        var $menucontainer = jQuery('#' + setting.contentsource[0]) //reference empty div on page that will hold menu
        $menucontainer.html("Loading Menu...")
        $.ajax({
            url:setting.contentsource[1], //path to external menu file
            async:true,
            error:function (ajaxrequest) {
                $menucontainer.html('Error fetching content. Server Response: ' + ajaxrequest.responseText)
            },
            success:function (content) {
                $menucontainer.html(content)
                ddsmoothmenu.buildmenu($, setting)
            }
        })
    },


    buildmenu:function ($, setting) {
        var smoothmenu = ddsmoothmenu
        var $mainmenu = jQuery("#" + setting.mainmenuid + ">ul") //reference main menu UL
        $mainmenu.parent().get(0).className = setting.classname || "ddsmoothmenu"
        var $headers = $mainmenu.find("ul").parent()
        $headers.hover(
            function (e) {
                jQuery(this).children('a:eq(0)').addClass('selected')
            },
            function (e) {
                jQuery(this).children('a:eq(0)').removeClass('selected')
            }
        )
        $headers.each(function (i) { //loop through each LI header
            var $curobj = jQuery(this).css({zIndex:100 - i}) //reference current LI header
            var $subul = jQuery(this).find('ul:eq(0)').css({display:'block'})
            $subul.data('timers', {})
            this._dimensions = {w:this.offsetWidth, h:this.offsetHeight, subulw:$subul.outerWidth(), subulh:$subul.outerHeight()}
            this.istopheader = $curobj.parents("ul").length == 1 ? true : false //is top level header?
            $subul.css({top:this.istopheader && setting.orientation != 'v' ? this._dimensions.h + "px" : 0})

            $curobj.hover(
                function (e) {
                    var $targetul = $subul //reference UL to reveal
                    var header = $curobj.get(0) //reference header LI as DOM object
                    clearTimeout($targetul.data('timers').hidetimer)
                    $targetul.data('timers').showtimer = setTimeout(function () {
                        header._offsets = {left:$curobj.offset().left, top:$curobj.offset().top}
                        var menuleft = header.istopheader && setting.orientation != 'v' ? 0 : header._dimensions.w
                        menuleft = (header._offsets.left + menuleft + header._dimensions.subulw > jQuery(window).width()) ? (header.istopheader && setting.orientation != 'v' ? -header._dimensions.subulw + header._dimensions.w : -header._dimensions.w) : menuleft //calculate this sub menu's offsets from its parent
                        if ($targetul.queue().length <= 1) { //if 1 or less queued animations
                            $targetul.css({left:menuleft + "px", width:header._dimensions.subulw + 'px'}).animate({height:'show', opacity:'show'}, ddsmoothmenu.transition.overtime)
                        }
                    }, ddsmoothmenu.showhidedelay.showdelay)
                },
                function (e) {
                    var $targetul = $subul
                    var header = $curobj.get(0)
                    clearTimeout($targetul.data('timers').showtimer)
                    $targetul.data('timers').hidetimer = setTimeout(function () {
                        $targetul.animate({height:'hide', opacity:'hide'}, ddsmoothmenu.transition.outtime)
                    }, ddsmoothmenu.showhidedelay.hidedelay)
                }
            ) //end hover
        }) //end $headers.each()

        $mainmenu.find("ul").css({display:'none', visibility:'visible'})
    },

    init:function (setting) {
        if (typeof setting.customtheme == "object" && setting.customtheme.length == 2) { //override default menu colors (default/hover) with custom set?
            var mainmenuid = '#' + setting.mainmenuid
                var mainselector = (setting.orientation == "v") ? mainmenuid : mainmenuid + ', ' + mainmenuid
                document.write('<style type="text/css">\n'
                    + mainselector + ' ul li a {background:' + setting.customtheme[0] + ';}\n'
                    + mainmenuid + ' ul li a:hover {background:' + setting.customtheme[1] + ';}\n'
                    + '</style>')


        }
        jQuery(document).ready(function ($) { //ajax menu?
            if (typeof setting.contentsource == "object") { //if external ajax menu
                ddsmoothmenu.getajaxmenu($, setting)
            }
            else { //else if markup menu
                ddsmoothmenu.buildmenu($, setting)
            }
        })
    }

}; //end ddsmoothmenu variable



jQuery(document).ready(function () { //#Begin

    ddsmoothmenu.init({
        mainmenuid:"nav", //Menu DIV id
        orientation:'v', //Horizontal or vertical menu: Set to "h" or "v"
        classname:'jqueryslidemenu', //class added to menu's outer DIV
        contentsource:"markup" //"markup" or ["container_id", "path_to_menu_file"]
    });


    /*** [Testimonials] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery('.sc-testimonials .flexslider').flexslider({
        animation:"fade",
        animationLoop:true,
        maxItems:1,
        move:1,
        directionNav:false,
        controlNav:true,
        slideshow:false
    });


    /*** [ToolTip] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery(".tooltip_sc").tooltip({ relative:true, offset:[5, 0], tipClass:'tool_tip' });

    /*** [Slideshow Shortcode] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery('.slideshow-sc').flexslider({
        directionNav:true,
        pauseOnHover:true,
        controlsContainer:'.flex-container'
    });

    /*** [Tab] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery("ul.tabs-titles").tabs("> .tab-content");
    jQuery(".accordion").tabs(".acc-item .acc-content", {tabs:'h3', effect:'slide', initialIndex:null});

    /*** [Toggle] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery(".toggle-body").hide();
    jQuery(".toggle-head").click(function () {
        var tb = jQuery(this).next(".toggle-body");

        if (tb.is(':hidden')) {
            tb.prev('.toggle-head').children('h3').addClass('minus');
            tb.slideDown('slow');

        }
        else {
            tb.slideUp(200, function () {
                tb.prev('.toggle-head').children('h3').removeClass('minus');
            });
        }
    });




    jQuery('#shutdown').click(function(){
        if(jQuery(this).attr('class') == 'active') {
            if(jQuery('body').hasClass('home')){
             jQuery(' .social-in-homepage').fadeIn();
            } else {
             jQuery(' .social-in-page').fadeIn();
            }
            jQuery('#menu-wrap, #slidecaption, #wrap').fadeIn();
            jQuery(this).removeClass('active');
        } else {
            if(jQuery('body').hasClass('home')){
             jQuery(' .social-in-homepage').fadeOut();
            } else {
             jQuery(' .social-in-page').fadeOut();
            }            
            jQuery('#menu-wrap, #slidecaption, #wrap').fadeOut();
            jQuery(this).addClass('active');

        }
    });

    jQuery('#tray-button').click(function(){
        if(jQuery(this).attr('class') == 'active') {
            jQuery('#slidecaption').fadeIn();
            jQuery(this).removeClass('active');
        } else {
            jQuery('#slidecaption').fadeOut();
            jQuery(this).addClass('active');
        }
    });

    jQuery('#menu-toggle').click(function(){
        var menu_height = jQuery('#menu-wrap').height() + 50;
        if(jQuery(this).attr('class') == 'active') {
            jQuery('#menu-wrap').stop(true, true).animate({top:0}, '5000', 'swing');
            jQuery(this).removeClass('active');
        } else {
            jQuery('#menu-wrap').stop(true, true).animate({top:-menu_height}, '5000', 'swing');
            jQuery(this).addClass('active');
        }
    });

 
    jQuery('#entries-toggle').click(function(){
        var sidebar_height = jQuery('#sidebar').height() + 50;
        if(jQuery(this).attr('class') == 'active') {
            jQuery('#entries-box').slideDown();
            jQuery('#sidebar').stop(true, true).animate({top:0}, '5000', 'swing');
            jQuery(this).removeClass('active');
        } else {
            jQuery('#entries-box').slideUp();
            jQuery('#sidebar').stop(true, true).animate({top:-sidebar_height}, '5000', 'swing');
            jQuery(this).addClass('active');
        }
    });


    /*** [Filterable] ***/
    /* -------------------------------------------------------------------------------- */


    var container = jQuery('.filterable');

    container.imagesLoaded(function () {
        jQuery('.portfolio-item-slideshow').flexslider({
        controlNav: false,
        smoothHeight: true,
        directionNav: true,
        slideshow: false,
        keyboard: false,
        touch: true
        });

    });

    jQuery.browser.chrome = jQuery.browser.webkit && !!window.chrome;
    jQuery.browser.safari = jQuery.browser.webkit && !window.chrome;

    if(jQuery.browser.chrome || jQuery.browser.safari){
        jQuery(window).load(function() {
            container.imagesLoaded(function () {
                container.isotope({
                    filter: '*',
                    itemSelector: '.folio-box',
                    layoutMode: 'fitRows'
                });
            });  

        });
    }
    else {
        container.imagesLoaded(function () {
            container.isotope({
                filter: '*',
                itemSelector: '.folio-box',
                layoutMode: 'fitRows',
            });
        });
    }

    jQuery('.filters a').click(function () {
        var selector = jQuery(this).attr('data-filter');
        container.isotope({ filter:selector });
        return false;
    });

    var $optionSets = jQuery('.filters'),$optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
	
	setTimeout(function(){
		jQuery('#portfolio.filterable .folio-box').each(function(){
			if(jQuery(this).css('opacity') != 0){
				jQuery(this).find('a').attr('rel','prettyPhoto[gallery]');
			} else {
				jQuery(this).find('a').attr('rel','');
			}
		})
	},1000);
	
        var $this = jQuery(this);
        if ( $this.hasClass('selected') ) {
            return false;
        }
        var $optionSet = $this.parents('.filters');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
    });


    jQuery('#folio-single-slideshow').flexslider({
        animation:'fade',
        directionNav:false,
        slideshowSpeed:6000,
        controlsContainer:'.flex-container'
    });


    

    /*** [Contact Form] ***/
    /* -------------------------------------------------------------------------------- */
    jQuery('form#contactform').submit(function () {

        jQuery.post(jQuery("#contactform").attr('action'), jQuery("#contactform").serialize(), function (data) {
            jQuery('.log').html(data);
            jQuery('.loading').remove();
            if (jQuery('.info-box-wrapper').hasClass('success')) {
                jQuery('#contactform').slideUp('slow');
            }
        });

        return false;
    });


    /*** [Responsive Menu] ***/
    /* -------------------------------------------------------------------------------- */
    selectnav('main-menu', {
        label: 'Select an item',
        nested: true,
        indent: '─'
    });

    /*** [Smooth Scrolling] ***/
    /* http://github.com/kswedberg/jquery-smooth-scroll */
    /* -------------------------------------------------------------------------------- */

    jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() > 100) {
            jQuery('#scrollup').fadeIn();
        } else {
            jQuery('#scrollup').fadeOut();
        }
    });

    jQuery("a[href*=#wrap],#scrollup").click(function (document) {
        if (jQuery.browser.opera) {
            jQuery("html").animate({scrollTop:0}, "slow");
        } else {
            jQuery("html, body").animate({scrollTop:0}, "slow");
        }
    });



    /***************************************************
     HOVER - COLUMN
     ***************************************************/
    jQuery(".woocommerce ul.products li.product").hover(function(){
        jQuery(this).find('.thumbnail-container').stop().animate({
            opacity: 0.7
        }, 500);
        jQuery(this).find('.onsale').stop().animate({
            top: 5
        }, 300);

    }, function(){
        jQuery(this).find('.thumbnail-container').stop().animate({
            opacity: 1
        }, 500);
        jQuery(this).find('.onsale').stop().animate({
            top:0
        }, 300);
    });

    jQuery(".woocommerce .images a.zoom").hover(function(){
        jQuery(this).stop().animate({
            opacity: 0.7
        }, 500);

    }, function(){
        jQuery(this).stop().animate({
            opacity: 1
        }, 500);

    });

    jQuery('.woocommerce-page table.shop_table tr:odd').addClass('woo-cart-item');

    // resize iframes
    jQuery('iframe').each(function(){
    
    //make sure the iframe has a src (things like adsense don't)
    if(typeof jQuery(this).attr('src') != 'undefined' ){
        
        if( jQuery(this).attr('src').toLowerCase().indexOf("youtube") >= 0 || jQuery(this).attr('src').toLowerCase().indexOf("vimeo") >= 0  || jQuery(this).attr('src').toLowerCase().indexOf("twitch.tv") >= 0) {
            if(jQuery(this).parent().hasClass('videox')) {
                //   
            } else {
                jQuery(this).wrap('<div class="videox"/>');  
            }
            
            //add wmode=transparent to all youytube embeds to fix z-index issues in IE
            if(jQuery(this).attr('src').indexOf('wmode=transparent') == -1) {
                if(jQuery(this).attr('src').indexOf('?') == -1){
                    jQuery(this).attr('src',jQuery(this).attr('src') + '?wmode=transparent');
                } else {
                    jQuery(this).attr('src',jQuery(this).attr('src') + '&wmode=transparent');
                }
            }
        }
         
    } else {
        if(jQuery(this).parents('ins').length == 0){ 
            jQuery(this).wrap('<div class="iframe-embed-standard"/>');   
        }
    }
    
})


    if(window.isRetina()) {
        jQuery('img[data-retina]').each(function(){
            var img_src = jQuery(this).attr('src');
            var retinaSrc = img_src.replace('.png', '@2x.png');
            var img_height = jQuery(this).height();
            var img_width = jQuery(this).width();
            jQuery(this).attr('src' , retinaSrc);  
            jQuery(this).attr('width' , img_width);
            jQuery(this).attr('height' , img_height); 
        });    
    }

}); //#END


