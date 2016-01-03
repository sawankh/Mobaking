var jaq=jQuery.noConflict();
jaq(function () {
	jaq("select.image-picker").imagepicker({
		hide_select:  true,
	});
});

jaq("#compare").click(function () {
	alert("Hello!");
});
