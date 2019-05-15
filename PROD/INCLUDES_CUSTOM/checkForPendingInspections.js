function checkForPendingInspections() {
	logDebug("FUNCTION: checkForPendingInspections() ...");
	//Return true if a Pending Inspection exists on the Record
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess()) {
		var inspList = inspResultObj.getOutput();
		for (xx in inspList) {
			var iStatus = inspList[xx].inspectionStatus;
			logDebug("Inspection Status: " + iStatus);

			if (iStatus == "Pending" || iStatus == "PENDING" || iStatus == "SCHEDULED" || iStatus == "Scheduled") {
				logDebug("Found Pending Inspection, return true");
				return true;
			}
		}

		//Default false if pending not found
		logDebug("No Pending Inspection Found.  Return false");
		return false;
	}
}
