function ckCapDRI(capCK) {
	var capId = aa.cap.getCapID(capCK);
	if (capId.getSuccess()) {
		capId = capId.getOutput();
	} else {
		aa.print(capId.getErrorMessage());
		aa.abortScript();
	}
	var capIDString = capId.getCustomID();

	mycap = aa.cap.getCap(capId).getOutput();
	var capStatus = mycap.getCapStatus();
	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	var Parcels = capParcelResult.getOutput().toArray();
	var parcelObj = Parcels[0];
	var parcelNumber = parcelObj.getParcelNumber();

	var myProx = proximityInfodri("AGIS_CHARCO", "DRI", 1, capId);
	if (myProx != undefined && myProx != 0) {
		return getDRImatch(myProx);

	} else {
		if (myProx == undefined) {
			return true;
		} else {
			return true;
		}
	}
}
