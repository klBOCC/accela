showMessage = true;
if ((appMatch('Building/Trade Permits/Residential/Demolitions') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Electrical') && inspType == 'Electric Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Fire') && inspType == 'Fire Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Gas') && inspType == 'Gas Piping Underground' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Mechanical') && inspType == 'HVAC Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Heritage Oaks Water Heaters') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Pool Heat Pump') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Fuel Gas') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Irrigation System') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/LP Gas') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Plumbing') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Pool Solar System') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Sewer Connection') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Solar Water Heater') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Water Heater') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Trade Permits/Residential/Roofing') && inspType == 'Roof Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}
