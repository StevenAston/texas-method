$(document).ready(function() {
	console.log('Document Ready');
	$("#submit").click(function(){
		console.info('Submit button clicked');

		var squatWeight = $('input:text[name=squat_weight]').val();
		var squatReps = $('input:text[name=squat_reps]').val();
		var benchWeight = $('input:text[name=bench_weight]').val();
		var benchReps = $('input:text[name=bench_reps]').val();
		var deadWeight = $('input:text[name=dead_weight]').val();
		var deadReps = $('input:text[name=dead_reps]').val();
		var rowWeight = $('input:text[name=row_weight]').val();
		var rowReps = $('input:text[name=row_reps]').val();
		var inclineWeight = $('input:text[name=incline_weight]').val();
		var inclineReps = $('input:text[name=incline_reps]').val();
		increment = $('input:text[name=increment]').val();
		interval = $('input:text[name=interval]').val();

		var inputIsClean = true;

		console.info('Squat weight = ' + squatWeight);
		console.info('Squat reps = ' + squatReps);

		if (checkInput(squatWeight, squatReps, "Squat") == false) {
			inputIsClean = false;
		};

		if (checkInput(benchWeight, benchReps, "Bench") == false) {
			inputIsClean = false;
		};

		if (checkInput(deadWeight, deadReps, "Deadlift") == false) {
			inputIsClean = false;
		};

		if (checkInput(rowWeight, rowReps, "Row") == false) {
			inputIsClean = false;
		};

		if (checkInput(inclineWeight, inclineReps, "Incline") == false) {
			inputIsClean = false;
		};

		if (checkInput(increment, interval, "Increment or Interval") == false) {
			inputIsClean = false;
		};



		if (inputIsClean == true) {
			var squat1RM = calc1RM(squatWeight, squatReps);
			var bench1RM = calc1RM(benchWeight, benchReps);
			var dead1RM = calc1RM(deadWeight, deadReps);
			var row1RM = calc1RM(rowWeight, rowReps);
			var incline1RM = calc1RM(inclineWeight, inclineReps);

			var squat5RM = calcxRM(squat1RM, 5);
			var bench5RM = calcxRM(bench1RM, 5);
			var dead5RM = calcxRM(dead1RM, 5);
			var row5RM = calcxRM(row1RM, 5);
			var incline5RM = calcxRM(incline1RM, 5);

			$('div').html("Squat 1RM = " + Math.round(squat1RM) + "lbs 5RM = " + Math.round(squat5RM) +
						  "<br>Bench 1RM = " + Math.round(bench1RM) + "lbs 5RM = " + Math.round(bench5RM) + 
						  "<br>Deadlift 1RM = " + Math.round(dead1RM) + "lbs 5RM = " + Math.round(dead5RM) +
						  "<br>Row 1RM = " + Math.round(row1RM) + "lbs 5RM = " + Math.round(row5RM) +
						  "<br>Incline 1RM = " + Math.round(incline1RM) + "lbs 5RM = " + Math.round(incline5RM) + "<br>");
			

			for (var week = 1; week <= 12; week++) {
			//$('div').append('<h1> Week ' + week + "</h1><br><br><br>");
			$('div').append('<table class="mainTable"><tr><td colspan="3"><h3>Week ' + week + ' - ' + 'Monday</h3></td></tr>'+
							 tableSpitter([5,5,5,5,5], (squat5RM*0.9+(week*increment))*0.98, 4, 1, "Squat")+
							 tableSpitter([5,5,5,5,5], (bench5RM*0.9+(week*increment))*0.98, 4, 1, "Bench")+
							 tableSpitter([5,5,5], (dead5RM*0.9+(week*increment))*0.98, 2, 1, "Deadlift")+
							 mondayAssistance());

			$('div').append('<table class="mainTable"><tr><td colspan="3"><h3>Week ' + week + ' - ' + 'Wednesday</h3></td></tr><tr>'+
							 tableSpitter([5,5,5], (squat5RM*0.8)+(week*increment), 2, 1, "Squat")+
							 tableSpitter([5,5,5,5,5], incline5RM+(week*increment), 4, 1, "Incline Bench")+
							 tableSpitter([5,5,5,5,5], row5RM+(week*increment), 4, 1, "Row")+
							 wedAssistance());

			$('div').append('</td><td><table class="mainTable"><tr><td colspan="3"><h3>Week ' + week + ' - ' + 'Friday</h3></td></tr><tr>'+
							 tableSpitter([5], squat5RM*1.025+(week*increment), 0, 1, "Squat")+
							 tableSpitter([5], bench5RM*1.025+(week*increment), 0, 1, "Bench")+
							 tableSpitter([3], dead5RM*1.025+(week*increment), 0, 1, "Deadlift")+
							 friAssistance());
			};
		};
	});
});

function calc1RM (weight, reps) {
	return weight/(1.0278-(0.0278*reps));
};

function calcxRM (weight, reps) {
	return weight*(1.0278-(0.0278*reps));
};

function checkInput(weight, reps, lift) {
	if (!isNaN(weight) == true) {
		console.info(lift + " weight is a number");
	} else {
		console.warn(lift + " weight is not a number");
		$('div').html(lift + " weight is not a number!");
		return(false);
	};
	if (!isNaN(reps) == true) {
		console.info(lift + " reps is a number");
	} else {
		console.warn(lift + " reps is not a number");
		$('div').html(lift + " reps is not a number!");
		return(false);
	};
};

function incRound(weight, inc) {
	return(inc*(Math.ceil(Math.abs(weight/inc))));
	console.log(weight + ", " + inc + ", " + inc*(Math.ceil(Math.abs(weight/inc))));
};

function calcInt(weight, set, interval, increment, week) {
	return(incRound((weight*(1-set*interval/100))*((week*0.025)+0.9), increment));
};

function tableSpitter(reps, lift, sets, week, excercise) {
	var string = '<td><table class="subTable"><tr><td colspan="2">' + excercise + '</td></tr><tr><td>Reps</td><td>Weight</td></tr>';
	for (var i = sets; i >= 0; i--) {
		string += '<tr><td>' + reps[i] + '</td><td>' + calcInt(lift, i, interval, increment, week) + '</td></tr>';
	};
	string += '</table></td>';
	return(string);
};

function mondayAssistance() {
	return('<tr><td>Assistance</td><td colspan="2">2 Sets of Weighted Hypers<br>4 Sets of Weighted Situps</td></tr></table>');
};

function wedAssistance() {
	return('<tr><td>Assistance</td><td colspan="2">3 sets of sit-ups</td></tr></table>');
};

function friAssistance() {
	return('<tr><td>Assistance</td><td colspan="2">3 sets dips<br>3 sets barbell curls<br>3 sets triceps extensions</td></tr></table>');
};