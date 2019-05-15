showMessage = true;
if ((appMatch('Building/Trade Permits/Commercial/Demolitions') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Electrical') && inspType == 'Electric Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Fire') && inspType == 'Fire Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Fuel Gas') && inspType == 'Gas Piping Underground' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Hood') && inspType == 'Fire Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Gas') && inspType == 'Gas Piping Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/LP Gas') && inspType == 'Gas Piping Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Natural Gas') && inspType == 'Gas Piping Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Mechanical') && inspType == 'HVAC Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Irrigation System') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Plumbing') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Pool Heat Pump') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Water Heater') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Commercial/Roofing') && inspType == 'Roof Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}
