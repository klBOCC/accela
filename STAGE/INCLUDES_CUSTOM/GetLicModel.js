function GetLicModel(myLicNo) {
	var myInfo = "";
	var LicNo = myLicNo;
	var lpModel = aa.licenseScript.getRefLicensesProfByLicNbr("BOCC", LicNo);
	if (lpModel.getSuccess()) {
		var lpModelArr = lpModel.getOutput();
		if (lpModelArr != null) {
			return lpModelArr;
		} else {
			return false;
		}
	}
}
