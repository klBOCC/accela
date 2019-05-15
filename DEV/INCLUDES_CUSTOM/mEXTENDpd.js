function mEXTENDpd(myCapID) {
	var meFlag = 0;
	var feeA = feesPaid(myCapID);
	var sysDate = aa.date.getCurrentDate();
	var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "MM-DD-YYYY");

	for (x in feeA) {
		thisFee = feeA[x];
		if (thisFee.code == "M-EXTEND" || thisFee.code == "M-EXTEND2") {
			if (thisFee.status == "INVOICED") {
				if (thisFee.amountPaid > 50) {
					if (thisFee.applyDateF == sysDateMMDDYYYY) {
						myResult = "Fee: " + thisFee.code + " status: " + thisFee.status + " amt pd: $" + thisFee.amountPaid + " on " + thisFee.applyDateF;
						meFlag++

					}
				}
			}
		}
	}

	if (meFlag > 0) {
		return true;
	} else {
		return false;
	}
}
