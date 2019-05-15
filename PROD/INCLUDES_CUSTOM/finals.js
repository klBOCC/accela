function finals() {

	var asi = '';
	asi = getAppSpecific('Flood Zone', capId);
	var elevCertPassedAll2 = false;
	var elevCertPassed3 = false;
	var elevCertPassed4 = false;
	elevCertPassed3 = checkInspectionResult('Elevation Certificate - Final', 'Pass');
	elevCertPassed4 = checkInspectionResult('Elevation Certificate - Final', 'Approved as Noted');
	//comment('elevCertPassed3=' + elevCertPassed3 + ' elevCertPassed4=' + elevCertPassed4);
	if ((elevCertPassed3 == true || elevCertPassed4 == true)) {
		elevCertPassedAll2 = true;
		comment('Elevation Certificate requirement met for Finals.');
	} else {
		comment('Elevation Cert required.');
	}

	if ((asi != null && asi != 'No' && asi != 'X' && asi != 'D' && elevCertPassedAll2 == false)) {
		comment('Flood zone = ' + asi);
		comment('An Elevation Certificate - Final is required.  Cancelling inspection...');
		cancel = true;
	}

}
