function checkForInsp(capId) {
	var inspSkip = false;
	var inspTyp2SkipArr = new Array();

	if (arguments.length > 1) {
		inspSkip = true;
		for (var i = 1; i < arguments.length; i++) {
			inspTyp2SkipArr.push(arguments[i]);
		}
	}

	var inspsObj = aa.inspection.getInspections(capId);
	if (inspsObj.getSuccess()) {
		var inspsList = inspsObj.getOutput();
	} else {
		logDebug("**ERROR: getting inspection items: " + inspsObj.getErrorMessage());
		return false;
	}

	for (insp in inspsList) {
		if ((inspsList[insp].getInspectionStatus() == 'Scheduled' || inspsList[insp].getInspectionStatus() == 'Pending') && (!inspSkip || !exists(inspsList[insp].getInspectionType(), inspTyp2SkipArr))) {
			return true;
		}
	}
	return false;
}
