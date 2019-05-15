function doLogic(licNum, licType) {
	//determines if expired (isExp variable in LPValidation() function);
	var WorkComExpDate = null;
	var ExemptCom = null;
	var ExpirationValue = null;
	var exDate = null;
	var insuDate = null;
	var isExp = null;

	var WCIEDName = "WC_Insur_Exp_Date";
	logDebug("WCIEDName = " + WCIEDName);
	var ExpirationName = "WC_Exempt_Exp_Date";
	logDebug("ExpirationName = " + ExpirationName);
	var WCEName = "WC_Exempt";
	logDebug("WCEName = " + WCEName);
	var agency = aa.getServiceProviderCode();

	var lpModel = aa.licenseScript.getRefLicensesProfByLicNbr(agency, licNum);
	if (lpModel.getSuccess()) {
		var lpModelArr = lpModel.getOutput();
	} else {
		logDebug("**WARNING: getting lic prof: " + lpModel.getErrorMessage());
		return true;
	}
	if (lpModelArr == null || !lpModelArr.length) {
		logDebug("**WARNING: no licensed professionals on this CAP");
		return true;
	}

	var myLpAttLen = lpModelArr.length;

	//Updated 9/8 by Beyondsoft
	licType = licType + '';

	for (var t = 0; t < myLpAttLen; t++) {
		var licVer = true;
		var wfVer = true;
		var wfVer2 = true;
		if (controlString == "LicProfLookupSubmitBefore") {
			//Updated 9/8 by Beyondsoft
			//if(lpModelArr[t].getLicenseType()!=licType)
			var tmpLicType = lpModelArr[t].getLicenseType() + '';
			if (tmpLicType != licType) {
				logDebug("License Type does not match.  licVer is false and no other validation will be checked.");
				licVer = false;
			}
		}
		if (licVer) {

			logDebug("INSIDE doLogic(), licVer is true so check ...");

			exDate = lpModelArr[t].getLicenseExpirationDate();
			insuDate = lpModelArr[t].getInsuranceExpDate();

			var thisLp = lpModelArr[t];
			var myAttributes = thisLp.getAttributes();

			//DQ 10/20/14 - If no attributes then should always return false because checked
			if (myAttributes == null) {
				return false;
			}

			var myPemModel = myAttributes.get("PeopleAttributeModel");
			var myLenArraty = myPemModel.toArray();
			var mylen = myLenArraty.length;
			for (var i = 0; i < mylen; i++) {

				var contactAttribute = myLenArraty[i];
				var capid = contactAttribute.getCapID();

				var name = contactAttribute.getAttributeName();
				var values = contactAttribute.getAttributeValue();

				logDebug("name and values: " + name + " : " + values);

				if (name == WCIEDName || name == WCIEDName.toUpperCase()) {
					logDebug("Attribute Name = " + WCIEDName + " (or uppercase). Set WorkComExpDate to: " + values);
					WorkComExpDate = values;
				}
				if (name == WCEName || name == WCEName.toUpperCase()) {
					logDebug("Attribute Name = " + WCEName + " (or uppercase). Set ExemptCom to: " + values);
					ExemptCom = values;
				}
				//DQ 8/26 check for exemption everytime
				//if(controlString=="WorkflowTaskUpdateBefore")
				//{
				if (name == ExpirationName || name == ExpirationName.toUpperCase()) {
					logDebug("Attribute Name = " + ExpirationName + "  (or uppercase). Set ExpirationValue to: " + values);
					ExpirationValue = values;
				}
				//}

			}

		}

	}

	logDebug("exDate (getLicenseExpirationDate): " + exDate);
	logDebug("insuDate (getInsuranceExpDate): " + insuDate);
	logDebug("WorkComExpDate (Attribute=" + WCIEDName + ") : " + WorkComExpDate);
	logDebug("ExemptCom (Attribute=" + WCEName + ") : " + ExemptCom);
	logDebug("ExpirationValue (Attribute= " + ExpirationName + ") : " + ExpirationValue);
	logDebug('Below is result of ExemptCom=="Y"');
	logDebug(ExemptCom == "Y");
	//DQ 8/26 if exempt use exemption date
	if (ExemptCom == "Y") {
		logDebug("In ExemptCom==Y.  Set WorkComExpDate=ExpirationValue");
		WorkComExpDate = ExpirationValue;
	}

	//logic
	if (controlString == "WorkflowTaskUpdateBefore") {
		logDebug("In controlString == 'WorkflowTaskUpdateBefore'");

		if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && (ExemptCom != "Y")) {
			wfVer2 = false;
		}
		if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
			WorkComExpDate = ExpirationValue;
		}
		if ((wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
			if (ExpirationValue == null) {
				return true;
			} else if (convertDateforLong(ExpirationValue) <= conSysDate(sysDate)) {
				return true;
			}
		}
	}

	if (wfVer2) {
		logDebug("In if[wfVer2]");

		if (WorkComExpDate == null || exDate == null || insuDate == null) {
			logDebug("in if wfVer2 and one of the expiration or insurance dates is NULL.  WorkComExpDate, exDate, insuDate");
			return true;
		} else if (convertDateforLong(WorkComExpDate) <= conSysDate(sysDate) || conDate(exDate) <= conSysDate(sysDate) || conDate(insuDate) <= conSysDate(sysDate)) {
			logDebug("WorkComExpDate: " + WorkComExpDate);
			logDebug("convertDateforLong(WorkComExpDate)<=conSysDate(sysDate): " + convertDateforLong(WorkComExpDate) <= conSysDate(sysDate));
			logDebug("conDate(exDate)<=conSysDate(sysDate): " + conDate(exDate) <= conSysDate(sysDate));
			logDebug("conDate(insuDate)<=conSysDate(sysDate)" + conDate(insuDate) <= conSysDate(sysDate));

			logDebug("in if wfVer2 and one of the expiration or insurance dates is EXPIRED!");
			return true;
		}
		if (controlString == "WorkflowTaskUpdateBefore") {
			if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
				wfVer = false;
			}
		}
	}
	return isExp;
}
