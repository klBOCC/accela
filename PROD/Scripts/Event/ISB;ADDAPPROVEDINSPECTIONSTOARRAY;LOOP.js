
capApprovedInspectionType = inspectionTypes[type].getInspectionType();
capInspectionStatus = inspectionTypes[type].getInspectionStatus();
if (matches(capInspectionStatus, 'Pass', 'Approved as Noted', 'Approved', 'Approved with Conditions', 'Not Required')) {
	arrApprovedInspections.push(capApprovedInspectionType);
}
