function GetLicInfo(myLicNo) {
	var lpArr = GetLicModel(myLicNo);
	if (lpArr != false) {
		for (x in lpArr) {
			var thisLp = lpArr[x];
			var licStatusC = thisLp.getAuditStatus();
			if (licStatusC == "A") {
				var myInsInfo = GetLicInsInfo(thisLp, myLicNo);
				return myInsInfo;
			} else {
				return "This is not a valid license.";
			}
		}
	} else {
		return "This is not a valid license.";
	}
}

