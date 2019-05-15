function checkMEXTEND(myCapId) {
	var myCap = aa.cap.getCapID(myCapId);
	if (myCap.getSuccess()) {
		myCap = myCap.getOutput();
	} else {
		return false
		aa.abortScript();
	}
	var capIDString = myCap.getCustomID();
	aat = aa.finance.getCashierAuditListByCapId(myCap, null).getOutput();
	var myFlag = 0;

	for (i in aat) {
		var MYgetAuditID = aat[i].getAuditID();
		var MYgetAuditStatus = aat[i].getAuditStatus();
		var MYgetAction = aat[i].getAction();
		var MYgetCashierID = aat[i].getCashierID();
		var MYgetFee = aat[i].getFee();
		var MYgetFeeCod = aat[i].getFeeCod();
		var MYgetFeeDescription = aat[i].getFeeDescription();
		var MYgetTranAmount = aat[i].getTranAmount();
		var MYgetTranDate = aat[i].getTranDate();
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Invoice FeeItem") {
			myFlag++;
		}
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Payment Applied") {
			myFlag--;
		}
	}
	if (myFlag <= 0) {
		return false
	} else {
		return true
	}
}
