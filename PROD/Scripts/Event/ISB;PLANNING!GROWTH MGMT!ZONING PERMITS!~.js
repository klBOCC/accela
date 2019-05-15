
// TODO, setting showmessage to true could result in popups without meaningful messages
showMessage = true;
if (capStatus != 'Permit Issued' && capStatus != 'Issued' && capStatus != 'Temp C of O Issued') {
	showMessage = true;
	cancel = true;
	comment("Cannot schedule inspections when the permit does not currently have a status of 'Issued'");
}

if ((appMatch('Planning/Growth Mgmt/Zoning Permits/Temporary Advertising') && inspType == 'Zoning Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Planning/Growth Mgmt/Zoning Permits/Residential Fence') && inspType == 'Zoning Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Planning/Growth Mgmt/Zoning Permits/Outdoor Storage') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Planning/Growth Mgmt/Zoning Permits/Special Event') && inspType == 'Tree Inspection' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Planning/Growth Mgmt/Zoning Permits/Tree') && inspType == 'Tree Inspection' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}
