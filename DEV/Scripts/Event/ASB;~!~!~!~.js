
if (currentUserID.substr(0, 6) != 'PUBLIC' && !matches(aa.env.getValue('LicProfList'), '', null, undefined)) {
	bAllowAdd = false;
	lookupResult = '';
	lpList = aa.env.getValue('LicProfList').toArray();
	fixedCAPType = '';
	lpIndex = 0;
	for (ll in lpList) {
		if (lpList[ll].printFlag == 'Y') {
			lpIndex = ll;
		}
	}
	pLicenseType = '' + lpList[lpIndex].getLicenseType();
	lookupSearchVal = 'FILTER_BY_REFTYPE_' + appTypeArray[0] + '_' + pLicenseType;
	lookupResult = lookup('ACA_FILTER_CAP_BY_LICENSE', lookupSearchVal);

	if (lookupResult != undefined) {
		arrAllowedCAPTypes = lookupResult.split(',');
		for (xy in arrAllowedCAPTypes) {
			if (!bAllowAdd) {
				//replaced branch(LPLUSB:ValidateLicenseTypeForCAP:LOOP)
				bAllowAdd = validateLicenseTypeForCap();
			}
		}

		if (!bAllowAdd) {
			// TODO would need showMessage = true here to pop up the message
			comment('<b>** You are trying to add an unapproved Licensed Professional type to this CAP **</b>');
			cancel = true;
		}
	}
}
