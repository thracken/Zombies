// Global Variables
var zombie_parts = 0;
var zkph = 0;


//Weaponry Arrays [0 html name, 1 # owned, 2 current cost, 3 upgrade multiplier, 4 base zkph, 5 upgrade level]
var spikes = ["spikes",0,9,1,.01,0];
var knives = ["knives",0,50,1,.50,0];
var machetes = ["machetes",0,100,1,1,0];
var walthers = ["walthers",0,500,1,4,0];
var colts = ["colts",0,3000,1,10,0];
var mp5s = ["mp5s",0,10000,1,40,0];
var ar15s = ["ar15s",0,40000,1,100,0];
var barretts = ["barretts",0,200000,1,400,0];
var rpgs = ["rpgs",0,1750000,1,7000,0];
var mortars = ["mortars",0,125000000,1,99000,0];
var humvees = ["humvees",0,4000000000,1,1000000,0];
var apaches = ["apaches",0,50000000000,1,10000000,0];
var cruisers = ["cruisers",0,600000000000,1,125000000,0];
var carriers = ["carriers",0,3000000000000,1,500000000,0];
var nukes = ["nukes",0,50000000000000,1,4000000000,0];
var zeus_sats = ["zeus_sats",0,300000000000000,1,20000000000,0];
var weaponry_ids = [spikes[1], knives[1], machetes[1], walthers[1], colts[1], mp5s[1], ar15s[1], barretts[1], rpgs[1], mortars[1], humvees[1], apaches[1], cruisers[1], carriers[1], nukes[1], zeus_sats[1]]


// Upgrade Arrays
var click_upgrades =[];
var spikes_upgrades = ["Broken Lawn Furniture","Broken Tree Branches","Gardening Tools","Spear Collection","Tripwire Shotguns","Claymore Mines","Bouncing Betties","Motion Activated Chainsaws","Sword Pendulums","Industrial Meat Grinder"];
var knives_upgrades = [];
var machetes_upgrades = [];
var walthers_upgrades = [];
var colts_upgrades = [];
var mp5s_upgrades = [];
var ar15s_upgrades = [];
var barretts_upgrades = [];
var rpgs_upgrades = [];
var mortars_upgrades = [];
var humvees_upgrades = [];
var apaches_upgrades = [];
var cruisers_upgrades = [];
var carriers_upgrades = [];
var nukes_upgrades = [];
var zeus_sats_upgrades = [];
var all_upgrades = spikes_upgrades.concat(knives_upgrades, machetes_upgrades, walthers_upgrades, colts_upgrades, mp5s_upgrades, ar15s_upgrades, barretts_upgrades, rpgs_upgrades, mortars_upgrades, humvees_upgrades, apaches_upgrades, cruisers_upgrades, cruisers_upgrades, carriers_upgrades, nukes_upgrades, zeus_sats_upgrades);




// Universal Functions
function pretty_numbers(what,floats){     //adds commas, limits decimals. Taken from Cookie Clicker
	var str='';
	if (!isFinite(what)) return 'Infinity';
	if (what.toString().indexOf('e')!=-1) return what.toString();
	what=Math.round(what*10000000)/10000000; //get rid of weird rounding errors
	if (floats>0){
		var floater=what-Math.floor(what);
		floater=Math.round(floater*10000000)/10000000; //get rid of weird rounding errors
		var floatPresent=floater?1:0;
		floater=(floater.toString()+'0000000').slice(2,2+floats); //yes this is hacky (but it works)
		if (parseInt(floater)===0) floatPresent=0;
		str=pretty_numbers(Math.floor(what))+(floatPresent?('.'+floater):'');
	}
	else
	{
		what=Math.floor(what);
		what=(what+'').split('').reverse();
		for (var i in what)
		{
			if (i%3==0 && i>0) str=','+str;
			str=what[i]+str;
		}
	}
	return str;
};




//Messages Area Functions

function clear_messages(){
	$(".error_message").fadeOut(5000, function(){
		$(this).remove();
	});
};

function not_enough(){
	$("#messages").prepend("<p class='error_message'>You don't have enough zombie parts!</p>");
	clear_messages();
};



// Navigation Functions

function main_nav(){
	$("#menu1").click(function(){
		change_tabs(1);
	});
	$("#menu2").click(function(){
		change_tabs(2);
	});
	$("#menu3").click(function(){
		change_tabs(3);
	});
	$("#menu4").click(function(){
		change_tabs(4);
	});
	$("#menu5").click(function(){
		change_tabs(5);
	});
};

function change_tabs(tab){
	if (tab == 1){
		$("#weaponry").toggle();
		$("#upgrades").hide();
		$("#acheivements").hide();
		$("#stats").hide();
		$("#menu").hide();
	}
	if (tab == 2){
		$("#weaponry").hide();
		$("#upgrades").toggle();
		$("#acheivements").hide();
		$("#stats").hide();
		$("#menu").hide();
	}
	if (tab == 3){
		$("#weaponry").hide();
		$("#upgrades").hide();
		$("#acheivements").toggle();
		$("#stats").hide();
		$("#menu").hide();
	}
	if (tab == 4){
		$("#weaponry").hide();
		$("#upgrades").hide();
		$("#acheivements").hide();
		$("#stats").toggle();
		$("#menu").hide();
	}
	if (tab == 5){
		$("#weaponry").hide();
		$("#upgrades").hide();
		$("#acheivements").hide();
		$("#stats").hide();
		$("#menu").toggle();
	}

};


// Building Purchase Functions
function building_purchase(x){
	if(x == 1){
		if(zombie_parts >= spikes[2]){
			zombie_parts = zombie_parts - spikes[2];
			spikes[1] = spikes[1] + 1;							// increases # owned
			spikes[2] = Math.ceil(spikes[2] * Math.pow(1.15,spikes[1]));			// increases cost
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);		// shows new #s in html
		}else{
			not_enough();
		}
	}else if(x == 2){
		if(zombie_parts >= knives[2]){
			zombie_parts = zombie_parts - knives[2];
			knives[1] = knives[1] + 1;
			knives[2] = Math.ceil(knives[2] * Math.pow(1.15,knives[1]));
			item_purchase(knives[0], knives[1], knives[2], knives[3], knives[4]);
		}else{
			not_enough();
		}
	}else if(x == 3){
		if(zombie_parts >= machetes[2]){
			zombie_parts = zombie_parts - machetes[2];
			machetes[1] = machetes[1] + 1;
			machetes[2] = Math.ceil(machetes[2] * Math.pow(1.15, machetes[1]));
			item_purchase(machetes[0], machetes[1], machetes[2], machetes[3], machetes[4]);
		}else{
			not_enough();
		}
	}else if(x == 4){
		if(zombie_parts >= walthers[2]){
			zombie_parts = zombie_parts - walthers[2];
			walthers[1] = walthers[1] + 1;
			walthers[2] = Math.ceil(walthers[2] * Math.pow(1.15, walthers[1]));
			item_purchase(walthers[0], walthers[1], walthers[2], walthers[3], walthers[4]);
		}else{
			not_enough();
		}
	}else if(x == 5){
		if(zombie_parts >= colts[2]){
			zombie_parts = zombie_parts - colts[2];
			colts[1] = colts[1] + 1;
			colts[2] = Math.ceil(colts[2] * Math.pow(1.15, colts[1]));
			item_purchase(colts[0], colts[1], colts[2], colts[3], colts[4]);
		}else{
			not_enough();
		}
	}else if(x == 6){
		if(zombie_parts >= mp5s[2]){
			zombie_parts = zombie_parts - mp5s[2];
			mp5s[1] = mp5s[1] + 1;
			mp5s[2] = Math.ceil(mp5s[2] * Math.pow(1.15, mp5s[1]));
			item_purchase(mp5s[0], mp5s[1], mp5s[2], mp5s[3], mp5s[4]);
		}else{
			not_enough();
		}
	}else if(x == 7){
		if(zombie_parts >= ar15s[2]){
			zombie_parts = zombie_parts - ar15s[2];
			ar15s[1] = ar15s[1] + 1;
			ar15s[2] = Math.ceil(ar15s[2] * Math.pow(1.15, ar15s[1]));
			item_purchase(ar15s[0], ar15s[1], ar15s[2], ar15s[3], ar15s[4]);
		}else{
			not_enough();
		}
	}else if(x == 8){
		if(zombie_parts >= barretts[2]){
			zombie_parts = zombie_parts - barretts[2];
			barretts[1] = barretts[1] + 1;
			barretts[2] = Math.ceil(barretts[2] * Math.pow(1.15, barretts[1]));
			item_purchase(barretts[0], barretts[1], barretts[2], barretts[3], barretts[4]);
		}else{
			not_enough();
		}
	}else if(x == 9){
		if(zombie_parts >= rpgs[2]){
			zombie_parts = zombie_parts - rpgs[2];
			rpgs[1] = rpgs[1] + 1;
			rpgs[2] = Math.ceil(rpgs[2] * Math.pow(1.15, rpgs[1]));
			item_purchase(rpgs[0], rpgs[1], rpgs[2], rpgs[3], rpgs[4]);
		}else{
			not_enough();
		}
	}else if(x == 10){
		if(zombie_parts >= mortars[2]){
			zombie_parts = zombie_parts - mortars[2];
			mortars[1] = mortars[1] + 1;
			mortars[2] = Math.ceil(mortars[2] * Math.pow(1.15, mortars[1]));
			item_purchase(mortars[0], mortars[1], mortars[2], mortars[3], mortars[4]);
		}else{
			not_enough();
		}
	}else if(x == 11){
		if(zombie_parts >= humvees[2]){
			zombie_parts = zombie_parts - humvees[2];
			humvees[1] = humvees[1] + 1;
			humvees[2] = Math.ceil(humvees[2] * Math.pow(1.15, humvees[1]));
			item_purchase(humvees[0], humvees[1], humvees[2], humvees[3], humvees[4]);
		}else{
			not_enough();
		}
	}else if(x == 12){
		if(zombie_parts >= apaches[2]){
			zombie_parts = zombie_parts - apaches[2];
			apaches[1] = apaches[1] + 1;
			apaches[2] = Math.ceil(apaches[2] * Math.pow(1.15, apaches[1]));
			item_purchase(apaches[0], apaches[1], apaches[2], apaches[3], apaches[4]);
		}else{
			not_enough();
		}
	}else if(x == 13){
		if(zombie_parts >= cruisers[2]){
			zombie_parts = zombie_parts - cruisers[2];
			cruisers[1] = cruisers[1] + 1;
			cruisers[2] = Math.ceil(cruisers[2] * Math.pow(1.15, cruisers[1]));
			item_purchase(cruisers[0], cruisers[1], cruisers[2], cruisers[3], cruisers[4]);
		}else{
			not_enough();
		}
	}else if(x == 14){
		if(zombie_parts >= carriers[2]){
			zombie_parts = zombie_parts - carriers[2];
			carriers[1] = carriers[1] + 1;
			carriers[2] = Math.ceil(carriers[2] * Math.pow(1.15, carriers[1]));
			item_purchase(carriers[0], carriers[1], carriers[2], carriers[3], carriers[4]);
		}else{
			not_enough();
		}
	}else if(x == 15){
		if(zombie_parts >= nukes[2]){
			zombie_parts = zombie_parts - nukes[2];
			nukes[1] = nukes[1] + 1;
			nukes[2] = Math.ceil(nukes[2] * Math.pow(1.15, nukes[1]));
			item_purchase(nukes[0], nukes[1], nukes[2], nukes[3], nukes[4]);
		}else{
			not_enough();
		}
	}else if(x == 16){
		if(zombie_parts >= zeus_sats[2]){
			zombie_parts = zombie_parts - zeus_sats[2];
			zeus_sats[1] = zeus_sats[1] + 1;
			zeus_sats[2] = Math.ceil(zeus_sats[2] * Math.pow(1.15, zeus_sats[1]));
			item_purchase(zeus_sats[0], zeus_sats[1], zeus_sats[2], zeus_sats[3], zeus_sats[4]);
		}else{
			not_enough();
		}
	}else{
		$("#messages").show().append("<p class='error_message'>Something fishy is happening!</p>");
		clear_messages();
	}
};

function item_purchase(itemname,itemnum,itemcost,itemupzkph,itemzkph){
	var itemname_id = "#" + itemname;

	$("#zombie_parts").html(pretty_numbers(zombie_parts,2));
	$(itemname_id).html(pretty_numbers(itemnum,0));
	$(itemname_id + "_cost").html(pretty_numbers(itemcost,0));
	$(itemname_id + "_zkph").html(pretty_numbers(itemzkph*itemupzkph*itemnum,2));
};



//Upgrade Functions

function create_upgrades(){     //creates upgrade elements within the upgrades tab
	for (x=0; x < all_upgrades.length; x++){

		//convert upgrade names to css classes with dashes
		var upgrade_class = all_upgrades[x].replace(/\s+/g, '-').toLowerCase();

		// creates the divs and hides them
		$("#upgrades_content").append("<div class='upgrade' id='" + upgrade_class + "'>" + all_upgrades[x] + "</div>");
		$(".upgrade").hide();
	}
};


function unlock_upgrades(){
	if(spikes[1] > 0 && spikes[5] < 1){
		$("#broken-lawn-furniture").show();
	}
	if(spikes[1] > 1 && spikes[5] < 2){
		$("#broken-tree-branches").show();
	}
	if(spikes[1] > 2 && spikes[5] < 3){
		$("#gardening-tools").show();
	}
	if(spikes[1] > 3 && spikes[5] < 4){
		$("#spear-collection").show();
	}
	if(spikes[1] > 4 && spikes[5] < 5){
		$("#tripwire-shotguns").show();
	}
	if(spikes[1] > 5 && spikes[5] < 6){
		$("#claymore-mines").show();
	}
	if(spikes[1] > 6 && spikes[5] < 7){
		$("#bouncing-betties").show();
	}
	if(spikes[1] > 7 && spikes[5] < 8){
		$("#motion-activated-chainsaws").show();
	}
	if(spikes[1] > 8 && spikes[5] < 9){
		$("#sword-pendulums").show();
	}
	if(spikes[1] > 9 && spikes[5] < 10){
		$("#industrial-meat-grinder").show();
	}
};


function purchase_upgrades(){
	$("#broken-lawn-furniture").unbind().click(function(){
		if(zombie_parts >= 10){
			zombie_parts = zombie_parts-10;
			spikes[5] = 1;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#broken-tree-branches").unbind().click(function(){
		if(zombie_parts >= 20){
			zombie_parts = zombie_parts-20;
			spikes[5] = 2;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#gardening-tools").unbind().click(function(){
		if(zombie_parts >= 30){
			zombie_parts = zombie_parts-30;
			spikes[5] = 3;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#spear-collection").unbind().click(function(){
		if(zombie_parts >= 40){
			zombie_parts = zombie_parts-40;
			spikes[5] = 4;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#tripwire-shotguns").unbind().click(function(){
		if(zombie_parts >= 50){
			zombie_parts = zombie_parts-50;
			spikes[5] = 5;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#claymore-mines").unbind().click(function(){
		if(zombie_parts >= 60){
			zombie_parts = zombie_parts-60;
			spikes[5] = 6;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#bouncing-betties").unbind().click(function(){
		if(zombie_parts >= 70){
			zombie_parts = zombie_parts-70;
			spikes[5] = 7;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#motion-activated-chainsaws").unbind().click(function(){
		if(zombie_parts >= 80){
			zombie_parts = zombie_parts-80;
			spikes[5] = 8;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#sword-pendulums").unbind().click(function(){
		if(zombie_parts >= 90){
			zombie_parts = zombie_parts-90;
			spikes[5] = 9;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	$("#industrial-meat-grinder").unbind().click(function(){
		if(zombie_parts >= 100){
			zombie_parts = zombie_parts-100;
			spikes[5] = 10;
			$(this).hide();
			item_purchase(spikes[0], spikes[1], spikes[2], spikes[3], spikes[4]);
		}else{
			not_enough();
		}
	});
	spike_ups();
}

function spike_ups(){
	if(spikes[5] == 0){
		spikes[4] = .01;
	}else if(spikes[5] == 1){
		spikes[4] = .02;
	}else if(spikes[5] == 2){
		spikes[3] = 2;
	}else if(spikes[5] == 3){
		spikes[3] = 4;
	}else if(spikes[5] == 4){
		spikes[4] = .1;
	}else if(spikes[5] == 5){
		spikes[3] = 6;
	}else if(spikes[5] == 6){
		spikes[3] = 8;
	}else if(spikes[5] == 7){
		spikes[3] = 10;
	}else if(spikes[5] == 8){
		spikes[3] = 12;
	}else if(spikes[5] == 9){
		spikes[3] = 14;
	}else if(spikes[5] == 10){
		spikes[3] = 16;
	}
}


function upgrades(){
	unlock_upgrades();
	purchase_upgrades();
	
};


// Calculation Functions
function zombie_click(x){
	zombie_parts = zombie_parts + x;
	$("#zombie_parts").html(pretty_numbers(zombie_parts,2));
};

function passive_click(x){
	zombie_parts = zombie_parts + x;
	$("#zombie_parts").html(pretty_numbers(zombie_parts,2));
};


function get_zkph(){
	var total_building_zkph = (spikes[1] * spikes[4] * spikes[3]) +
				  (knives[1] * knives[4] * knives[3]) +
				  (machetes[1] * machetes[4] * machetes[3]) +
				  (walthers[1] * walthers[4] * walthers[3]) +
				  (colts[1] * colts[4] * colts[3]) +
				  (mp5s[1] * mp5s[4] * mp5s[3]) +
				  (ar15s[1] * ar15s[4] * ar15s[3]) +
				  (barretts[1] * barretts[4] * barretts[3]) +
				  (rpgs[1] * rpgs[4] * rpgs[3]) +
				  (mortars[1] * mortars[4] * mortars[3]) +
				  (humvees[1] * humvees[4] * humvees[3]) +
				  (apaches[1] * apaches[4] * apaches[3]) +
				  (cruisers[1] * cruisers[4] * cruisers[3]) +
				  (carriers[1] * carriers[4] * carriers[3]) +
				  (nukes[1] * nukes[4] * nukes[3]) +
				  (zeus_sats[1] * zeus_sats[4] * zeus_sats[3]);
	var total_upgrade_zkph = 0;
	var total_achievement_zkph = 0;
	
	zkph = total_building_zkph + total_upgrade_zkph + total_achievement_zkph;
	
	$("#zkph").html(pretty_numbers(zkph,2));
};



//Main Loop - Loads the Game, does everything
$(function(){
	create_upgrades();
	main_nav();
	

	window.setInterval(function (){ 
		get_zkph();
		passive_click(zkph);
		upgrades();

	}, 1000);
});