function GetLicInfo(myLicNo) {
	var lpArr = GetLicModel(myLicNo);
	if (lpArr != false) {
		for (x in lpArr) {
			var thisLp = lpArr[x];
			var licStatusC = thisLp.getAuditStatus();
			var licType = thisLp.getLicenseType();
			if (licType == "OWNER BUILDER" || licType == "UNLICENSED CONTRACTOR" || licType == "COUNTY EMPLOYEE" || licType == "LP PENDING") {
				logDebug("OWNER BUILDER, UNLICENSED CONTRACTOR, LP PENDING, COUNTY EMPLOYEE... bypassing LP check.");
				var myInsInfo2 = [false, "Insurance not required for this license type."];
				return myInsInfo2;
			} else {
				if (licStatusC == "A") {
					var myInsInfo = GetLicInsInfo(thisLp, myLicNo);
					return myInsInfo;
				} else {
					return "This is not a valid license.";
				}
			}
		}
	} else {
		return "This is not a valid license.";
	}
}
