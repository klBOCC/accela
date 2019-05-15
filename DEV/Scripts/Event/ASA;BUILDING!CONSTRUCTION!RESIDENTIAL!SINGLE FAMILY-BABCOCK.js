var mCap = aa.cap.getCap(capId).getOutput();

if (!mCap.isCreatedByACA()) {
	createPendingInspection('RESSINGLE - B', 'Babcock Final');
	scheduleInspection('Babcock Final', 100, 'AMY.WICKS@KIMLEY-HORN.COM', null, 'scheduled via script');
}
