function isDRIexpir(capId) {
	var capId = aa.cap.getCapID(capId);
	if (capId.getSuccess()) {
		capId = capId.getOutput();
	} else {
		aa.print(capId.getErrorMessage());
		aa.abortScript();
	}
	var capIDString = capId.getCustomID();

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	var Parcels = capParcelResult.getOutput().toArray();
	var parcelObj = Parcels[0];
	var parcelNumber = parcelObj.getParcelNumber();

	var proxType = "DRI";
	var myProx = proximityInfo("AGIS_CHARCO", proxType, 1);
	if (myProx != undefined && myProx != 0) {
		if (proxType == "DRI") {
			var myType = "Project Name";
			var asi = getAppSpecific(myType, capId);
			var asiCapId = aa.cap.getCapID(asi);
			if (asiCapId.getSuccess()) {
				var capIdASI = asiCapId.getOutput()
					var capIDStringASI = capIdASI.getCustomID();
				var appSpecificInfo = new Array();
				var appSpecificInfo = aa.appSpecificInfo.getByCapID(capIdASI);
				if (appSpecificInfo.getSuccess()) {
					var fAppSpecInfoObj = appSpecificInfo.getOutput();
					for (loopk in fAppSpecInfoObj)
						if (fAppSpecInfoObj[loopk].getCheckboxDesc() == "EXPIRATION DATE") { //NOTE:  in Prod = "Expiration Date"
							var myDateFlag = 0
								var sysDate = aa.date.getCurrentDate();
							myDt = "";
							myDt = fAppSpecInfoObj[loopk].getChecklistComment()
								if (myDt == null) {
									myDt = "01/01/2050";
									myDateFlag = 1;
								}
								myDt = aa.date.parseDate(myDt);
							if (myDateFlag == 0) {
								var myDtMMDDYYYY = dateFormatted(myDt.getMonth(), myDt.getDayOfMonth(), myDt.getYear(), "MM/DD/YYYY");
							} else {
								var myDtMMDDYYYY = null
							}
							var filterDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "MM/DD/YYYY");
							myDt = convertDate(myDt);
							sysDate = convertDate(sysDate);
							if (myDt > sysDate) {
								return false;
							} else {
								return true;
							}
						}
				} else {
					aa.print("This CAP has not been found.");
					aa.abortScript();
				}
			}
		}

	} else {
		if (myProx == undefined) {
			return false;
		} else {
			return false;
		}
	}
}
