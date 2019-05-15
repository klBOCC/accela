function getDRImatch(DRIname) {

	driResult = aa.cap.getByAppType("Planning", "Growth Mgmt", "DRI", "NA");

	var mySearchStr = DRIname.toUpperCase();

	if (driResult.getSuccess()) {
		driArray = driResult.getOutput();
	}
	var DRIflag = 0;

	for (x in driArray) {
		capObj = driArray[x];
		var capId = capObj.getCapID();
		var altCapId = aa.cap.getCapID(capId.getID1(), capId.getID2(), capId.getID3()).getOutput();
		var capIDString = altCapId.getCustomID();
		var myAppStat = capObj.getCapStatus();
		var myCapDes = aa.cap.getCapWorkDesByPK(capId);
		var workDescObj = myCapDes.getOutput();
		var workDesc = workDescObj.getDescription().toUpperCase();
		var myDummyPROX = workDesc;

		if (myAppStat == "Closed") {
			var result = myDummyPROX.search(mySearchStr);
			if (result == 0) {
				DRIflag--;
			}
		}
		if (myAppStat == null) {
			var myDummyPROX = workDesc;
			var result = myDummyPROX.search(mySearchStr);
			if (result == 0) {
				DRIflag++;
			}
		}
	}

	if (DRIflag >= 0) {
		return true;
	} else {
		return false;
	}
}
