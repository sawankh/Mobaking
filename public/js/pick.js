var jaq=jQuery.noConflict();
jaq(function () {
	jaq('ul').find('li').css('list-style-type', 'none');
	jaq("select.image-picker").imagepicker({
		hide_select:  false,
	});
});
