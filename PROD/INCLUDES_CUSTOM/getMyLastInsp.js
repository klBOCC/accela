function getMyLastInsp(insp2Cinspheck, myCapID) {
	var myCapId = aa.cap.getCapID(myCapID);
	var myInspType = insp2Cinspheck;
	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		myCobj = aa.cap.getCap(myCap).getOutput();
		var capIDString = myCap.getCustomID();
		var getResult = aa.inspection.getInspections(myCap);
		var myInsp2 = "n/a";

		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			var lastInsp = "";
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				if (inspType == myInspType) {

					var inspStatus = list[ei].getInspectionStatus();
					var inSpector = list[ei].getInspector();
					aa.print(inspType + " inspector: " + inSpector);
					if (inSpector != "") {
						var myInsp2 = inSpector
					}
				}
			}
		}
	}
	return myInsp2;
}
