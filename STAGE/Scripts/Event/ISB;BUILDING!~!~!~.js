
if ((inspType != 'Plans Change Submitted' || inspType != 'On-Line Resubmittal') && capStatus != 'Permit Issued' && capStatus != 'Issued' && capStatus != 'Temp C of O Issued') {
	showMessage = true;
	cancel = true;
	comment("Cannot schedule inspections when the permit does not currently have a status of 'Issued'");
}

if (appHasCondition(null, 'Applied', null, 'LOCK')) {
	showMessage = true;
	comment('Cannot schedule an inspection until LOCK condition is met.');
	cancel = true;
}

if (appHasCondition(null, 'Applied', null, 'HOLD')) {
	showMessage = true;
	comment('Cannot schedule an inspection until HOLD condition is met.');
	cancel = true;
}

if (appHasCondition(null, 'Applied', 'Inspection Hold', 'NOTICE')) {
	showMessage = true;
	comment('Cannot schedule an inspection until outstanding condition is met.');
	cancel = true;
}

// DISABLED: ISB:Building/*/*/*:35
// if ((inspType == 'Babcock Final' && balanceDue > 0)) {
// 	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
// 	cancel = true;
// 	}

var LicProfList = getLicenseProfessional(capId);
var x = 0;
if ((LicProfList.length != null) && (LicProfList.length > 0)) {
	for (x in LicProfList) {
		if (LicProfList[x].printFlag == 'Y');
	}
	lpIndex = x;
}

if ((LicProfList.length != null) && (LicProfList.length > 0)) {
	var pLicNo = LicProfList[lpIndex].getLicenseNbr();
}

if ((LicProfList.length != null) && (LicProfList.length > 0) && (pLicNo == '01') && ((currentUserID.substr(0, 6) == 'PUBLIC') || (currentUserID.substr(0, 6) == 'ADMIN'))) {
	comment('Scheduling for this inspection type is not available online.  Please contact Community Development at 941-743-1201 to schedule your inspection.');
	cancel = true;
}
