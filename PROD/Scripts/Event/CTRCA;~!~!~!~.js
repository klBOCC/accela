//CTRCA

if (appMatch('CodeEnforcement/*/*/*')) {
    editAppSpecific('Zoning Code', AInfo['ParcelAttribute.ZONING_CODE']);
}

if (appMatch('Building/*/*/*')) {
    arrInspRecord = new Array();
    oInspList = aa.inspection.getInspectionListForSchedule(capId.getID1(), capId.getID2(), capId.getID3());
    if (oInspList.getSuccess()) {
        inspectionTypes = oInspList.getOutput();
    }
    for (type in inspectionTypes) {
        //replaced branch(ASA:AddInspectionToASITable:LOOP)
        addInspectionsToASITable();
    }
}

editAppSpecific('Expiration Date', dateAdd(null, 180));
if (proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1)) {
    addStdCondition('CC PERMIT', 'Sea Turtle Monitoring');
    //replaced branch(SeaTurtleMonitor)
    seaTurtleMonitor();
}

if (appMatch('Building/Construction/*/*')) {
    //replaced branch(SeaTurtle)
    seaTurtle();
}

var cap = aa.cap.getCap(capId).getOutput();
var CapTypeResult = cap.getCapType();
var frACA = cap.isCreatedByACA();
var profArr = new Array();
profArr = getLicenseProfessional(capId);
var pLicNo;
if ((profArr != null && profArr.length > 0)) {
    for (x in profArr) {
        if (profArr[x].getPrintFlag() == 'Y') {
            pLicNo = profArr[x].getLicenseNbr();
        }
    }
}

if (appMatch('Building/Trade Permits/*/Mechanical') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Water Heater') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Electrical') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Fire') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/Residential/Solar Water Heater') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Accessories/*/Solar Photovoltaic') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Plumbing') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Roofing') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Gas') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/*/Pool Heat Pump') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

if (appMatch('Building/Trade Permits/Residential/Pool Solar System') && (pLicNo.substr(0, 3) == 'CGC')) {
    addStdCondition('CC PERMIT', 'Subcontractor Worksheet');
}

// DISABLED: ConvertToRealCapAfter:30
// if (appMatch('Building/*/*/*')) {
// 	var capResult = aa.cap.getCap(capId).getOutput().getCapModel();
// 	capResult.setSpecialText('On-Line Permit');
// 	aa.cap.editCapByPK(capResult);
// 	}

if (appMatch('Building/Construction/Residential/Single Family-Babcock') && frACA == true) {
    createPendingInspection('RESSINGLE - B', 'Babcock Final');
    scheduleInspection('Babcock Final', 100, 'AMY.WICKS@KIMLEY-HORN.COM', null, 'scheduled via script');
}


if (proximity('AGIS_CHARCO', 'DRI', 1) && !appMatch('Building/POS/*/*')) {
    email('Kevin.Lapham@charlottecountyfl.gov', 'aca.DRI@AGIS-accela.com', 'ACA Application in DRI for ' + capId + ' / ' + capIDString, 'Application in DRI for ' + capId + ' / ' + capIDString);
    if (ckCapDRI(capIDString) == false) {
        addStdCondition('CC PERMIT', 'DRI Notice');
    }
    editAppSpecific('Project Name', getGISInfo('AGIS_CHARCO', 'DRI', 'NAME'));
}



if (getGISInfo('AGIS_CHARCO', 'DRI', 'NAME') == 'Sandhill') {
    var ahUser = "ShaoJ";
    var adHocTaskName = "Sandhill DRI Review";
    customAddAdHocTask(capIDString, ahUser, adHocTaskName);
}


// DISABLED: ConvertToRealCapAfter:40
// if (addConditionToCapsWithMatchingParcelACA() == true) {
// 	comment('Open permit at same address.  Please contact Community Development.');
// 	cancel=true;
// 	}
