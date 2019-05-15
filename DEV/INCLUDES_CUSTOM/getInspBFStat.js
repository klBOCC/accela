function getInspBFStat(ioCap) {
	var myCnt = 0
		var myCapId = aa.cap.getCapID(ioCap);

	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		myCobj = aa.cap.getCap(myCap).getOutput();
		var CapTypeResult = myCobj.getCapType();
		var capIDString = myCap.getCustomID();
		var CapTypeResult = myCobj.getCapType();
		var myGroup = CapTypeResult.getGroup();
		var myType = CapTypeResult.getType();
		var mySubType = CapTypeResult.getSubType();
		var myCat = CapTypeResult.getCategory();
		var getResult = aa.inspection.getInspections(myCap);
		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				var inspStatus = list[ei].getInspectionStatus();
				var inSpector = list[ei].getInspector();
				var inspSched = list[ei].getScheduledDate()
					var cap2 = list[ei].getCapID()
					if (inspType == "Building Final") {
						myCnt = myCnt + 1
					}
			}
		}
	}
	if (myCnt > 0) {
		return true
	} else {
		return false
	}
}
