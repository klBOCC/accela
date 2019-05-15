function validateLicenseTypeForCap() {

	fixedCAPType = '';
	if (arrAllowedCAPTypes[xy].indexOf('///') != -1) {
		fixedCAPType = arrAllowedCAPTypes[xy].substring(0, arrAllowedCAPTypes[xy].indexOf('/')) + '/*/*/*';
	}
	if (fixedCAPType == '' && arrAllowedCAPTypes[xy].indexOf('//') != -1) {
		fixedCAPType = arrAllowedCAPTypes[xy].substring(0, arrAllowedCAPTypes[xy].indexOf('//')) + '/*/*';
	}
	if (fixedCAPType == '' && arrAllowedCAPTypes[xy].charAt(arrAllowedCAPTypes[xy].length - 1) == '/') {
		fixedCAPType = arrAllowedCAPTypes[xy] + '*';
	}
	if (fixedCAPType == '') {
		fixedCAPType = arrAllowedCAPTypes[xy];
	}
	if (appMatch(fixedCAPType)) {
		return true;
	}

}
