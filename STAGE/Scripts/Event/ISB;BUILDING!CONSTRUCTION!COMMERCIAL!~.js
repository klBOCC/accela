// TODO, setting showmessage to true could result in popups without meaningful messages
showMessage = true;
if ((appMatch('Building/Construction/Commercial/Modular') && inspType == 'COMMERCIAL CHANGE OF OCCUPANCY' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Addition') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Commercial Building') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Building-Babcock') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Build out') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Change of Occupancy') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/DCA Office') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Foundation') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Miscellaneous') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Multi-Family') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Remodel') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/SUBDRY') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Shell') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Communication Tower') && inspType == 'Building Final' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}

if ((appMatch('Building/Construction/Commercial/Commercial Building') && inspType == 'Building Final')) {

	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Commercial/Modular') && inspType == 'Building Final')) {

	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Commercial/Multi-Family') && inspType == 'Building Final')) {

	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Commercial/Shell') && inspType == 'Building Final')) {

	//replaced branch(FINALS)
	finals();
}
