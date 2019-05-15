function addConditionToCapsWithMatchingParcel() {
	logDebug("function: BEGIN function addConditionToCapsWithMatchingParcel");
	logDebug("function: Get Parcel on CAP");

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	if (capParcelResult.getSuccess()) {
		var Parcels = capParcelResult.getOutput().toArray();
	} else {
		logDebug("**ERROR: getting parcels by cap ID: " + capParcelResult.getErrorMessage());
		return false;
	}

	for (zz in Parcels) {
		var ParcelValidatedNumber = Parcels[zz].getParcelNumber();

		logDebug("Looking at parcel " + ParcelValidatedNumber);

		logDebug("function: Get CAPs by Parcel");
		capResult = aa.cap.getCapListByParcelID(ParcelValidatedNumber, null);
		if (capResult.getSuccess()) {
			addrCaps = capResult.getOutput();

			for (addrCap in addrCaps) {
				logDebug("Found CAP " + addrCaps[addrCap].getCustomID() + " with matching address.  Checking CAP Type...")
				capResult2 = aa.cap.getCap(addrCaps[addrCap].getID1(), addrCaps[addrCap].getID2(), addrCaps[addrCap].getID3());
				if (capResult2.getSuccess()) {
					cap2 = capResult2.getOutput();
					logDebug("Cap Type is " + cap2.getCapType().toString());
					logDebug("Cap Status is " + cap2.getCapStatus() + "");

					//RV  - 02/01/2010 - Make sure the AltID is not the one that was just added
					if (addrCaps[addrCap].getCustomID().toString().equals(capIDString)) {
						logDebug("Permit # in result matches the permit # just created, ignore this permit and continue");
					} else {
						if (cap2.getCapType().toString().equals(appTypeString) && !matches(cap2.getCapStatus() + "", "NULL", "Abatement Complete", "Applicant Request", "Application Canceled", "C of Completion Issued", "C of O Issued", "COED", "Closed", "Closed Out", "Complete", "Compliant", "Dismissed", "Exemption", "Expired", "External Referral", "Final Approval", "Final Approved", "Final Plat Recorded", "Final Review", "Finaled", "In Compliance", "Not Required", "Plat Book Page Recorded", "SUSPEND", "Temp C of O Issued", "Void", "Voided", "Withdrawn")) {
							logDebug("Found matching cap type with valid status, adding condition.");
							addStdCondition("CC PERMIT", "Open Record at Same Address");
							break; //exit for loop
						}
					}
				} else {
					logDebug("function: Error calling getCAP to convert to CapScriptModel object: " + capResult2.getError());
				}
			} // End CAP FOR loop
		} else {
			logDebug("function: Error getting CAPs with matching parcel: " + capResult.getErrorMessage());
		}
	} // End parcel FOR loop

	logDebug("function: END function addConditionToCapsWithMatchingParcel");
}
