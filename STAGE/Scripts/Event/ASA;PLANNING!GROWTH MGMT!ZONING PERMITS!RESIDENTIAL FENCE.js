
if (cap.isCompleteCap()) {
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

// DISABLED: ASA:Planning/Growth Mgmt/Zoning Permits/Residential Fence:3
// if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
// 	addAppCondition('CC PERMIT', 'Applied', 'Babcock Ranch', 'This parcel is in the Babcock Ranch development.', 'Notice');
// 	}

if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
	addStdCondition('CC PERMIT', 'Babcock Ranch');
}

if (proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1)) {
	addStdCondition('CC PERMIT', 'Sea Turtle Lighting Hold');
	//start replaced branch: AdHocLight
	var mCap = aa.cap.getCap(capId).getOutput();
	var frACA = mCap.isCreatedByACA();
	if (frACA == false) {
		addAdHocTaskcLight(capIDString);
	}
}

editAppSpecific('Expiration Date', dateAdd(null, 180));
