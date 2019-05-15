function lastInspEmail(myCapID, insp2Cinspheck) {
	var myCapId = aa.cap.getCapID(myCapID);
	var myInspType = insp2Cinspheck;
	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		var capIDString = myCap.getCustomID();
		var getResult = aa.inspection.getInspections(myCap);
		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			var lastInsp = "";
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				var inspStatus = list[ei].getInspectionStatus();
				var inSpector = list[ei].getInspector();
				var inspSched = list[ei].getScheduledDate();
				var cap2 = list[ei].getCapID();
				var inspID = list[ei].getIdNumber();
				if (inspSched != null) {
					var inspSched = dateFormatted(inspSched.getMonth(), inspSched.getDayOfMonth(), inspSched.getYear(), "MM-DD-YYYY");
				} else {
					var inspSched = "N/A"
				}
				if (inspType == insp2Cinspheck && inspStatus != "Pending") {
					if (inspStatus.length) {
						var lastInsp = inSpector;
						if (lastInsp == null) { lastInsp = "TinaC.Jones@charlottecountyfl.gov" }
					}
				}
			}
		}
		var nameArray = new Array();
		nameArray = String(lastInsp).split("/");
		var inspTor2 = nameArray[6];
		var nameArray2 = new Array();
		nameArray2 = String(inspTor2).split(" ");
		var firstname = nameArray2[0];
		var lastname = nameArray2[1];
		var lastInspObj = aa.person.getUser(firstname, "", lastname).getOutput();
		//var lastInspU = lastInspObj.getUserID();
		if (lastInspObj.getEmail() == null) {
			var userEml = "TinaC.Jones@charlottecountyfl.gov"
		} else {
			var userEml = lastInspObj.getEmail();
		}
		return (userEml);
	}
}
