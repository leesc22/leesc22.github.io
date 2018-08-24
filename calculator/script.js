$(function() {
	var current_age = $('input[name="current_age"]').val();
	var retire_age = $('input[name="retire_age"]').val();
	var death_age = $('input[name="death_age"]').val();
	var mth_expense = $('input[name="mth_expense"]').val();
	var provision = $('input[name="provision"]').val();

	var inflation_rate = $('input[name="inflation_rate"]').val() / 100;
	var nominal_rate = $('input[name="nominal_rate"]').val() / 100;

	var savings_years = retire_age - current_age;
	var retirement_years = death_age - retire_age;
	var effective_rate = calculateEffectiveRate(nominal_rate, inflation_rate);
	var retire_mth_expense = calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years);
	var retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
	var mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);

	displayRetirementMonthlyExpenses(numberFormatThousands(retire_mth_expense));
	displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
	displayMonthlySavings(numberFormatThousands(mth_saving));

	$('input[name="current_age"]').on('keyup change', function() {
		current_age = $('input[name="current_age"]').val();
		savings_years = retire_age - current_age;
		retirement_years = death_age - retire_age;
		retire_mth_expense = calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years);
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementMonthlyExpenses(numberFormatThousands(retire_mth_expense));
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="retire_age"]').on('keyup change', function() {
		retire_age = $('input[name="retire_age"]').val();
		savings_years = retire_age - current_age;
		retirement_years = death_age - retire_age;
		retire_mth_expense = calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years);
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementMonthlyExpenses(numberFormatThousands(retire_mth_expense));
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="death_age"]').on('keyup change', function() {
		death_age = $('input[name="death_age"]').val();
		retirement_years = death_age - retire_age;
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="mth_expense"]').on('keyup change', function() {
		mth_expense = $('input[name="mth_expense"]').val();
		retire_mth_expense = calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years);
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementMonthlyExpenses(numberFormatThousands(retire_mth_expense));
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="provision"]').on('keyup change', function() {
		provision = $('input[name="provision"]').val();
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="inflation_rate"]').on('keyup change', function() {
		inflation_rate = $('input[name="inflation_rate"]').val() / 100;
		effective_rate = calculateEffectiveRate(nominal_rate, inflation_rate);
		retire_mth_expense = calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years);
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementMonthlyExpenses(numberFormatThousands(retire_mth_expense));
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	$('input[name="nominal_rate"]').on('keyup change', function() {
		nominal_rate = $('input[name="nominal_rate"]').val() / 100;
		effective_rate = calculateEffectiveRate(nominal_rate, inflation_rate);
		retire_amount = calculateRetirementAmountNeeded(retire_mth_expense, effective_rate, retirement_years);
		mth_saving = calculateMonthlySavings(retire_amount, provision, nominal_rate, savings_years);
		displayRetirementAmountNeeded(numberFormatThousands(retire_amount));
		displayMonthlySavings(numberFormatThousands(mth_saving));
	});

	function calculateEffectiveRate(nominal_rate, inflation_rate) {
		return (1 + nominal_rate) / (1 + inflation_rate) - 1;
	}

	function calculateRetirementMonthlyExpenses(mth_expense, inflation_rate, savings_years) {
		return mth_expense * Math.pow((1 + inflation_rate), savings_years);
	}

	function calculateRetirementAmountNeeded(pmt, rate, period) {
		return (1-Math.pow((1+(rate/12)),(-(period*12-1))))/(rate/12)*pmt+pmt;
	}

	function calculateMonthlySavings(fv, provision, rate, period) {
		return ((fv - (provision * Math.pow(1 + rate/12, period*12)))*rate/12)/(Math.pow((1+rate/12),(period*12))-1);
	}

	function displayRetirementMonthlyExpenses(text) {
		$('input[name="retire_mth_expense"]').val(text);
	}

	function displayRetirementAmountNeeded(text) {
		$('input[name="retire_amount"]').val(text);
	}

	function displayMonthlySavings(text) {
		$('input[name="mth_saving"]').val(text);
	}

	function numberFormatThousands(amount) {
		return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});