
if (wfTask == 'Finaled' && matches(wfStatus, 'Finaled', 'C of O Issued', 'C of Completion Issued') && balanceDue > 0) {
	showMessage = true;
	comment('All Fees must be paid before this action can take place.');
	cancel = true;
}

if (wfTask == 'Finaled' && matches(wfStatus, 'Finaled', 'C of O Issued', 'C of Completion Issued') && !(typeof(INSPECTIONSNEEDED) == 'undefined')) {
	arrApprovedInspections = [];
	bApproved = true;
	asiInspectionType = '';
	capApprovedInspectionType = '';
	oInspList = aa.inspection.getInspections(capId);
	if (oInspList.getSuccess()) {
		inspectionTypes = oInspList.getOutput();
	}
	for (type in inspectionTypes) {
		//start replaced branch: ISB:AddApprovedInspectionsToArray:LOOP
		{
			capApprovedInspectionType = inspectionTypes[type].getInspectionType();
			capInspectionStatus = inspectionTypes[type].getInspectionStatus();
			if (matches(capInspectionStatus, 'Pass', 'Approved as Noted', 'Approved', 'Approved with Conditions', 'Not Required')) {
				arrApprovedInspections.push(capApprovedInspectionType);
			}

		}
	}
	//end replaced branch: ISB:AddApprovedInspectionsToArray:LOOP;
	logDebug('arrApprovedInspections.length: ' + arrApprovedInspections.length.toString());
	if (arrApprovedInspections.length == 0) {
		arrApprovedInspections.push('NO APPROVED INSPECTIONS');
	}
	for (pInsp in INSPECTIONSNEEDED) {
		if (bApproved)
			//start replaced branch: ISB:ValidateApprovedInspections:LOOP
		{
			bApproved = false;
			asiInspectionType = INSPECTIONSNEEDED[pInsp]['Inspection Type'].toString();
			logDebug('asiInspectionType to search for in array: ' + asiInspectionType);
			for (i = 0; i < arrApprovedInspections.length; i++) {
				if (arrApprovedInspections[i].equals(asiInspectionType.toString())) {
					bApproved = true;
				}
			}

		}
	}
	//end replaced branch: ISB:ValidateApprovedInspections:LOOP;
	if (!bApproved) {
		showMessage = true;
		comment('Inspection ' + asiInspectionType + ' must be Approved prior to updating the Finaled task.');
		cancel = true;
	}
}

// DISABLED: WTUB:Building/*/*/*:5
// if (wfTask == 'Permit Issuance') {
// 	var LicProfList = getLicenseProfessional(capId);
// 	var x = 0;
// 	}

// DISABLED: WTUB:Building/*/*/*:6
// if (wfTask == 'Permit Issuance' && (LicProfList.length > 0)) {
// 	for (x in LicProfList) var lpn = LicProfList[x].getLicenseNbr();
// 	comment(GetLicInfo(lpn)[1]);
// 	if (GetLicInfo(lpn)[0] == true) cancel = true;
// 	}

if (wfTask == 'Permit Issuance') {
	if (LPValidation()) {
		showMessage = true;
		cancel = true;
		comment('Your General liability, Workmans Compensation or (if applicable) your Longshoremans Insurance is expired or not on file. Please contact Community Development on 941-743-1201.');
	}
}

if (wfTask == 'Finaled' && checkForInsp(capId) == true) {
	showMessage = true;
	comment('Cannot FINAL record with open inspections.');
	cancel = true;
}
