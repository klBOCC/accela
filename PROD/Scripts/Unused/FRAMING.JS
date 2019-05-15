
showMessage=true;
comment('This is a Framing inspection... checking for Flood Zone.');
var asi = '';
asi = getAppSpecific('Flood Zone',capId);
comment('Flood zone = ' + asi);
var elevCertPassedAll = false;
var elevCertPassed = false;
var elevCertPassed2 = false;
var elevCertPassed3 = false;
var elevCertPassed4 = false;
elevCertPassed = checkInspectionResult('Elevation Certificate - Under Construction','Pass');
elevCertPassed2 = checkInspectionResult('Elevation Certificate - Under Construction','Approved as Noted');
elevCertPassed3 = checkInspectionResult('Elevation Certificate - Final','Pass');
elevCertPassed4 = checkInspectionResult('Elevation Certificate - Final','Approved as Noted');
if ((elevCertPassed == true || elevCertPassed2 == true || elevCertPassed3 == true || elevCertPassed4 == true)) {
	elevCertPassedAll = true;
	comment('Elevation Cert Passed = ' + elevCertPassedAll);
	} else {
	comment('Elevation Cert = '+elevCertPassedAll);
	}

if ((asi != null && asi !='No' && asi !='X' && asi !='D' &&  elevCertPassedAll == false)) {
	comment('An Elevation certificate required for Framing since is in flood zone '' + asi + ''.  Cancelling inspection...');
	cancel = true;
	} else {
	comment('Criteria met... Framing inspection scheduled.');
	}

