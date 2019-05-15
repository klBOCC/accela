
var LicProfList = aa.env.getValue('LicProfList').toArray();
var x = 0;
if ((LicProfList.length > 0)) {
	for (x in LicProfList) {
		var lpn = LicProfList[x].getLicenseNbr();
	}
	comment(GetLicInfo(lpn)[1]);
	if (GetLicInfo(lpn)[0] == true) {
		showMessage = true;
		comment(GetLicInfo(lpn)[1]);
		cancel = true;

	}
}

if (LPValidation()) {
	showMessage = true;
	cancel = true;
	comment('Your General liability or Workmans Compensation Insurance is expired or not on file. Please contact Community Development on 941-743-1201');
}
