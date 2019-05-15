
// TODO, setting showmessage to true could result in popups without meaningful messages
showMessage = true;
if ((appMatch('Building/Accessories/Commercial/Carport') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Boatlift') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Cage') && inspType == 'Cage Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Canopy') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Deck') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Dock') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Door') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Driveway') && inspType == 'ROW Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Fence') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Garage') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Lanai') && inspType == 'BUILDING FINAL' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Barn') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Parking Lot') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Seawall') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Shed') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Shutters') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Sign') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Sign-Government') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Slab') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Swimming Pool') && inspType == 'Pool Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Wall Exterior') && inspType == 'BUILDING FINAL' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Wall Interior') && inspType == 'BUILDING FINAL' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Window') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Solar Photovoltaic') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Outdoor Storage') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Irrigation System') && inspType == 'Plumbing Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Accessories/Commercial/Garage') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}
