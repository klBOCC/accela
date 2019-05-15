var mCap = aa.cap.getCap(capId).getOutput();
var myMatch = capIDString.indexOf('TMP') !== -1;

if (!mCap.isCreatedByACA() && currentUserID.substr(0, 6) != 'PUBLIC' && (myMatch == false)) {
	createPendingInspection('RESSINGLE - B', 'Babcock Final');
	scheduleInspection('Babcock Final', 100, 'AMY.WICKS@KIMLEY-HORN.COM', null, 'scheduled via script');
}
