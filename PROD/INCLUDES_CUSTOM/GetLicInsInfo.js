function GetLicInsInfo(thisLp, myLicNo) {
	var WCexFlag = 0
	var licType = thisLp.getLicenseType();
	if (licType == "OWNER BUILDER" || licType == "UNLICENSED CONTRACTOR" || licType == "COUNTY EMPLOYEE" || licType == "LP PENDING") {
		logDebug("OWNER BUILDER, UNLICENSED CONTRACTOR, LP PENDING, COUNTY EMPLOYEE... bypassing LP check.");
		return false
	} else {
	var bizName = thisLp.getBusinessName();
	var licExpDt = thisLp.getLicenseExpirationDate();
	var licExpDtF = convertDate(licExpDt);
	var insExpDt = thisLp.getInsuranceExpDate();
	var insExpDtF = convertDate(insExpDt);
	var myAttributes = thisLp.getAttributes();

	if (myAttributes == null) {
		logDebug("no attributes to print");
	} else {
		var myPemModel = myAttributes.get("PeopleAttributeModel");
		var myLenArraty = myPemModel.toArray();
		var mylen = myLenArraty.length;
		for (var i = 0; i < mylen; i++) {
			var contactAttribute = myLenArraty[i];
			var capid = contactAttribute.getCapID();
			var name = contactAttribute.getAttributeName();
			var values = contactAttribute.getAttributeValue();
			if ((name == "WC_Exempt" || name == "WC_EXEMPT") && values != "N") {
				WCexFlag = 1;
			}
			if ((name == "WC_Exempt_Exp_Date" || name == "WC_EXEMPT_EXP_DATE") && (values != null)) {
				var myWCexemptExpDt2 = values;
				var myWCexemptExpDt = new Date(myWCexemptExpDt2);
			}
			if ((name == "WC_Insur_Exp_Date" || name == "WC_INSUR_EXP_DATE") && values != null) {
				var myWCexpDt2 = values;
				var myWCexpDt = new Date(myWCexpDt2);
			}
		}
		var sysDate = aa.date.getCurrentDate();
		var todayF = convertDate(sysDate);
		if (todayF < licExpDtF) {
			var licFlag = true;
		} else {
			var licFlag = false;
		}
		if (todayF < insExpDtF) {
			var insFlag = true;
		} else {
			var insFlag = false;
		}
		if (WCexFlag == 0) {
			if (todayF < myWCexpDt) {
				var WCflag = true;
			} else {
				var WCflag = false;
			}
		} else {
			if (todayF < myWCexemptExpDt) {
				var WCflag = true;
			} else {
				var WCflag = false;
			}
		}
		if (licFlag == false || insFlag == false || WCflag == false) {
			var myInfo1 = "";
			var myInfo2 = "";
			var myInfo3 = "";
			if (licFlag == false) {
				myInfo1 = " License expired."; //insurance and/or license expired.
			}
			if (insFlag == false) {
				myInfo2 = " Insurance expired."; //insurance and/or license expired.
			}
			if (WCflag == false) {
				myInfo3 = " WC insurance expired."; //insurance and/or license expired.
			}
			var myInfo = [true, myLicNo + myInfo1 + myInfo2 + myInfo3];
			//aa.print(myInfo);
			logDebug(myInfo);
			return myInfo;
		} else {
			//logDebug("FLAGS: " + licFlag + insFlag + WCflag);
			return false
		}
	}
	}
}
