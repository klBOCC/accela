function fullInsps() {

	if ((inspType == inspArray[insp].getInspectionType() && inspArray[insp].getInspectionStatus() == 'Pending')) {
		comment('DEL this ID: ' + inspArray[insp].getIdNumber());
		var InspM = aa.inspection.getInspection(capId, inspArray[insp].getIdNumber()).getOutput();
		InspM.getInspection().getActivity().setAuditStatus('I');
		aa.inspection.editInspection(InspM).getOutput();
		comment(inspArray[insp].getIdNumber() + ' has been removed for inspType: ' + inspArray[insp].getInspectionType());
	}

}
