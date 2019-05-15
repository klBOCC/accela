function checkMEXTENDB(myCapId) {
	var sysDate = aa.date.getCurrentDate();
	var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth() - 1, sysDate.getYear(), "MM-DD-YYYY");

	var myCap = aa.cap.getCapID(myCapId);
	if (myCap.getSuccess()) {
		myCap = myCap.getOutput();
	} else {
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
		if (MYgetTranDate != null) {
			var MYgetTranDate = convertDate(aat[i].getTranDate());
			var MYgetTranDateYYYY = dateFormatted(aat[i].getTranDate().getMonth(), aat[i].getTranDate().getDayOfMonth(), aat[i].getTranDate().getYear(), "MM-DD-YYYY");
		} else {
			var MYgetTranDate = "";
		}
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Payment Applied") {
			if (MYgetTranDateYYYY == sysDateMMDDYYYY) {
				return true
				myFlag = 1
			}
		}
	}
	if (myFlag == 0) {
		return false
	}
}
