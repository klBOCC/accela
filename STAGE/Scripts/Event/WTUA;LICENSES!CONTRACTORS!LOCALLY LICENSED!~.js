
if (wfTask == 'Quality Review' && wfStatus == 'Approved') {

	updateTask('Status', 'Active', 'Issuance');
	LicType = lookup('CC_LIC_TYPE', AInfo['Certificate of Competency Category']);
	createReferenceLP(capIDString, LicType, 'COC APPLICANT');
	licEditExpInfo('Active', dateAdd(null, 730));
	editAppName(AInfo['Certificate of Competency Category']);
	var currentTime = new Date();
	var thisSept30 = new Date(currentTime.getFullYear(), 8, 30);
	if (currentTime.getFullYear() % 2 == 1) {
		if (currentTime < thisSept30) {
			var expDate = thisSept30;
		} else {
			var expDate = new Date(currentTime.getFullYear() + 2, 8, 30);
		}
	} else {
		var expDate = new Date(currentTime.getFullYear() + 1, 8, 30);
	}
	var dd = expDate.getDate();
	var mm = expDate.getMonth() + 1;
	var yyyy = expDate.getFullYear();
	var expDateStr = mm + '/' + dd + '/' + yyyy;
	lic = new licenseObject(capIDString);
	lic.setExpiration(dateAdd(null, 730));
	lic.setLastRenewal(dateAdd(null, 0));
}
