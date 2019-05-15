// ISB:BUILDING/CONSTRUCTION/RESIDENTIAL/
// TODO, setting showmessage to true could result in popups without meaningful messages

showMessage = true;

if ((appMatch('Building/Construction/Residential/Single Family') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Addition') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/DCA Home') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Miscellaneous') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Mobile Home') && inspType == 'Mobile Home Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Modular') && inspType == 'Mobile Home Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Remodel') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/SUBDRY') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Single Family-Babcock') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Duplex') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Townhouse') && inspType == 'Building Final' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

if ((appMatch('Building/Construction/Residential/Coastal Lighting') && inspType == 'COASTAL LIGHTING FINAL' && balanceDue > 0)) {
    comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
    cancel = true;
}

/*
if ((appMatch('Building/Construction/Residential/Duplex') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Residential/Mobile Home') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Residential/Modular') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Residential/Single Family') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Residential/Single Family-Babcock') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}

if ((appMatch('Building/Construction/Residential/Townhouse') && inspType == 'Building Final')) {
	//replaced branch(FINALS)
	finals();
}
*/
