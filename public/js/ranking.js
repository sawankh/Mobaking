var jq=jQuery.noConflict();
jq(function () {
	
	var lol = 0;
	var dota2 = 0;
	var airmech = 0;
	var hos = 0;
	var ic = 0;
	var smite = 0;
	var overwatch = 0;
	var strife = 0;
	var hon = 0;
	var mww = 0;

	for (var i = 0; i < world_data.length; i++) {
		if (world_data[i].game == "lol") {
			lol = lol + world_data[i].value;
		} else if (world_data[i].game == "dota2") {
			dota2 = dota2 + world_data[i].value;
		} else if (world_data[i].game == "airmech") {
			airmech = airmech + world_data[i].value;
		} else if (world_data[i].game == "hos") {
			hos = hos + world_data[i].value;
		} else if (world_data[i].game == "hon") {
			hon = hon + world_data[i].value;
		} else if (world_data[i].game == "ic") {
			ic = ic + world_data[i].value;
		} else if (world_data[i].game == "smite") {
			smite = smite + world_data[i].value;
		} else if (world_data[i].game == "overwatch") {
			overwatch = overwatch + world_data[i].value;
		} else if (world_data[i].game == "mww") {
			mww = mww + world_data[i].value;
		} else if (world_data[i].game == "strife") {
			strife = strife + world_data[i].value;
		};
	};

	var values = [];
	
	values.push([lol, "League of Legends", "lol"]);
	values.push([dota2, "Dota 2", "dota2"]);
	values.push([airmech, "Airmech", "airmech"]);
	values.push([hos, "Heroes of the Storm", "hos"]);
	values.push([hon, "Heroes of Newreth", "hon"]);
	values.push([ic, "Infinite Crisis", "ic"]);
	values.push([smite, "Smite", "smite"]);
	values.push([strife, "Strife", "strife"]);
	values.push([overwatch, "Overwatch", "overwatch"]);
	values.push([mww, "Magicka Wizard Wars", "mww"]);

	values.sort(function sortFunction(a, b) {if (a[0] === b[0]) {return 0;}else {return (a[0] < b[0]) ? -1 : 1;}});
	values.reverse();

	for (var i = 0; i < values.length; i++) {
		var elementNum = i + 1;
		var element = "#span_"+elementNum.toString();
		var image = "#rank_"+elementNum.toString();
		var imageSrc = "../images/logos/"+values[i][2]+".jpg";
		jq(element).append(values[i][1]);
		jq(image).attr("src", imageSrc);
	};
});