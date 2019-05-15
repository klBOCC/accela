if (!appMatch('Building/Accessories/Residential/Garage') && !appMatch('Building/Accessories/Commercial/Garage') && (inspType == 'Lintel')) {

    //start replaced branch: Lintel
    {
        showMessage = true;
        comment('This is a Lintel inspection... checking for Flood Zone.');
        var asi = '';
        asi = getAppSpecific('Flood Zone', capId);
        comment('Flood zone = ' + asi);
        var elevCertPassedAll = false;
        var elevCertPassed = false;
        var elevCertPassed2 = false;
        var elevCertPassed3 = false;
        var elevCertPassed4 = false;
        elevCertPassed = checkInspectionResult('Elevation Certificate - Under Construction', 'Pass');
        elevCertPassed2 = checkInspectionResult('Elevation Certificate - Under Construction', 'Approved as Noted');
        elevCertPassed3 = checkInspectionResult('Elevation Certificate - Final', 'Pass');
        elevCertPassed4 = checkInspectionResult('Elevation Certificate - Final', 'Approved as Noted');
        if ((elevCertPassed == true || elevCertPassed2 == true || elevCertPassed3 == true || elevCertPassed4 == true)) {
            elevCertPassedAll = true;
            comment('Elevation Cert Passed = ' + elevCertPassedAll);
        } else {
            comment('Elevation Cert = ' + elevCertPassedAll);
        }

        if ((asi != null && asi != 'No' && asi != 'X' && asi != 'D' && elevCertPassedAll == false)) {
            comment("An Elevation certificate required for Lintel since is in flood zone '" + asi + "'.  Cancelling inspection...");
            cancel = true;
        } else {
            comment('Criteria met... Lintel inspection scheduled.');
        }

    }
    //end replaced branch: Lintel;
}

// DISABLED: InspectionScheduleBefore:20
// if ((inspType == 'Framing')) {
// 	br_nch('Framing');
// 	}

/*
var inspListResult = aa.inspection.getInspectionListForSchedule(capId.getID1(), capId.getID2(), capId.getID3());
if (!inspListResult.getSuccess()) {
	aa.print("**WARNING error retrieving inspections: " + inspListResult.getErrorMessage());
} else {
	var inspList = inspListResult.getOutput();
}
var capInspGroup = inspList[0].getGroupCode();
comment("Cap inspList Group Type = " + capInspGroup);
comment("Inspection Group Type = " + inspGroup);

if (inspGroup != capInspGroup && inspType != 'On-Line Resubmittal') {
	showMessage = true;
	comment("Invalid type for " + inspType + ".  This inspection cannot be attached to the permit.  Please contact Tina for assistance adding this to the inspection group.");
	cancel = true;
}
*/