function LPValidation() {
	var isExp = null;
	if (controlString == "ApplicationSubmitBefore") {
		var LicProfList = aa.env.getValue("LicProfList");
		if (LicProfList != "") {
			LicProfList = LicProfList.toArray();
			for (var thisLic in LicProfList) {
				licProfScriptModel = LicProfList[thisLic];
				licNum = licProfScriptModel.getLicenseNbr();
				var licType = licProfScriptModel.getLicenseType();
				if (licType == "OWNER BUILDER" || licType == "UNLICENSED CONTRACTOR" || licType == "COUNTY EMPLOYEE" || licType == "LP PENDING") {
					logDebug("OWNER BUILDER, UNLICENSED CONTRACTOR, LP PENDING, COUNTY EMPLOYEE... bypassing LP check.");
					return false;
				}
				logDebug("Lic Num (ASB): " + licNum);
				isExp = doLogic(licNum, null);
				if (isExp == true)
					return true; //is expired license
			}
		}
	} else if (controlString == "LicProfLookupSubmitBefore") {
		var LicenseList = aa.env.getValue("LicenseList");
		if (LicenseList != "") {
			for (var i = 0; i < LicenseList.size(); i++) {
				var licProfModel = LicenseList.get(i);
				var licenseType = licProfModel.getInsuranceExpDate();
				var getWcExempt = licProfModel.getWcExempt();
				var licNum = licProfModel.stateLicense;
				var licType = licProfModel.getLicenseType();
				logDebug("Lic Num: " + licNum + ", License Type is " + licType + ", and Work is on or above ASI: "); //
				isExp = doLogic(licNum, licType);
				if (isExp == true)
					return true;
			}
		}
	} else if (controlString == "WorkflowTaskUpdateBefore") {
		var LicenseListResult = aa.licenseScript.getLicenseProf(capId);
		if (LicenseListResult.getSuccess()) {
			var LicenseList = LicenseListResult.getOutput();
		} else {
			logDebug("**WARNING: getting lic prof: " + LicenseListResult.getErrorMessage());
			return true;
		}
		if (LicenseList == null || !LicenseList.length) {
			logDebug("**WARNING: no licensed professionals on this CAP");
			return false;
		}
		for (var i = 0; i < LicenseList.length; i++) {
			var licProfModel = LicenseList[i];
			var licNum = licProfModel.getLicenseNbr();
			logDebug("Lic Num (WTUB): " + licNum);
			isExp = doLogic(licNum, null);
			if (isExp == true)
				return true;
		}
	}
	if (isExp == true)
		return true;
	else
		return false;
}
