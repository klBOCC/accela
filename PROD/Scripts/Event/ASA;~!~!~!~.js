//ASA: / / / 
copyParcelGisObjects();

var mCap = aa.cap.getCap(capId).getOutput();
var frACA = mCap.isCreatedByACA();
if (!appMatch('Licenses/*/*/*')) {
    capOwnerResult = aa.owner.getOwnerByCapId(capId);
    if (capOwnerResult.getSuccess()) {
        Owner = capOwnerResult.getOutput();
        for (yy in Owner) {
            copyOwnerToContact('Owner');
        }
    }
}
// DISABLED: ApplicationSubmitAfter:10
// if (proximity('AGIS_CHARCO', 'ScrubJay for Accela', 1)) {
// 	addAppCondition('CC PERMIT', 'Applied', 'Scrub Jay Boundary Hold', 'This application is in a Scrub Jay Zone.  Please review and disable this hold only if appropriate.', 'Hold');
// 	}

if (proximity('AGIS_CHARCO', 'ScrubJay for Accela', 1)) {
    addStdCondition('CC PERMIT', 'Scrub Jay Boundary Hold');
}

editAppSpecific('Flood Zone', GISFloodPlain('AGIS_CHARCO', 'FEMA Flood Zones (Effective 5/5/2003)', 0, 'FZONE'));

if (getGISInfo('AGIS_CHARCO', 'FEMA Flood Zones (Effective 5/5/2003)', 'SFHA') == 'IN') {
    editAppSpecific('In SFHA', 'Y');
}

if (!appMatch('Licenses/*/*/*')) {
    addConditionToCapsWithMatchingParcel();
}

/* DISABLED: ApplicationSubmitAfter TICKET 18974 
if (proximity('AGIS_CHARCO', 'PG City Boundary', 0)) {
	addStdCondition('CC_ADDR', 'PG City Limits');
}  */

if (proximity('AGIS_CHARCO', 'LOMC', 1)) {
    addStdCondition('CC PERMIT', 'LOMR-LOMA Notice');
}

if (proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1) && (frACA == false)) {
    addStdCondition('CC PERMIT', 'Sea Turtle Monitoring');
    //replaced branch(SeaTurtleMonitor)
    seaTurtleMonitor();
}

if (appMatch('Building/*/*/*') && proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1)) {
    addStdCondition('CC PERMIT', 'Sea Turtle Lighting Hold');
    //start replaced branch: AdHocLight
    var mCap = aa.cap.getCap(capId).getOutput();
    var frACA = mCap.isCreatedByACA();
    if (frACA == false) {
        addAdHocTaskcLight(capIDString);
    }
    //end replaced branch: AdHocLight;
}

if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
    addStdCondition('CC PERMIT', 'Babcock Ranch');
}


if (frACA == false) {
    if (getGISInfo('AGIS_CHARCO', 'DRI', 'NAME') == 'Sandhill') {
        var ahUser = "ShaoJ";
        var adHocTaskName = "Sandhill DRI Review";
        customAddAdHocTask(capIDString, ahUser, adHocTaskName);
    }
}


// DISABLED: ApplicationSubmitAfter:40
// if (proximity('AGIS_CHARCO', 'DRI', 1)) {
// 	email('Kevin.Lapham@charlottecountyfl.gov', 'DRI@AGIS-accela.com', 'Application in DRI for ' + capId + ' / ' + capIDString, 'Application in DRI for ' + capId + ' / ' + capIDString);
// }	