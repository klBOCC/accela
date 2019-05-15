
if (appTypeArray[3] == 'Duplex' && wfTask == 'Permit Issuance' && wfStatus == 'Issued' && !balanceDue == 0) {
	feeSch = 'BLD_CON_RES_DU';
	//replaced branch(WTUA:AssessFee1)
	assessFee1();
}

if (appTypeArray[3] == 'Single Family' && wfTask == 'Permit Issuance' && wfStatus == 'Issued' && !balanceDue == 0) {
	feeSch = 'BLD_CON_RES_SF';
	//replaced branch(WTUA:AssessFee1)
	assessFee1();
}

if (matches(appTypeArray[3], 'Townhouse', 'DCA-Home', 'Mobile Home') && wfTask == 'Permit Issuance' && wfStatus == 'Issued' && !balanceDue == 0) {
	feeSch = 'BLD_CON_RES_TWNHS';
	//replaced branch(WTUA:AssessFee1)
	assessFee1();
}

if (wfTask == 'Permit Issuance' && wfStatus == 'Issued') {
	editAppSpecific('Expiration Date', dateAdd(null, 180));
}

if (wfTask == 'Permit Issuance' && wfStatus == 'Permit Renewed') {
	editAppSpecific('Expiration Date', dateAdd(null, 180));
}
