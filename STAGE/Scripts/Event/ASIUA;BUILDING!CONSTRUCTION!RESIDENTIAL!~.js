
currMnth = startDate.getMonth() + 1;
feeSch = '';
feeAdd = false;
addDP = false;
addCC = false;
if (appTypeArray[3] == 'Duplex') {
	feeSch = 'BLD_CON_RES_DU';
}
if (matches(appTypeArray[3], 'Single Family', 'Townhouse')) {
	feeSch = 'BLD_CON_RES_SF';
}
if (feeSch != '') {
	feeAdd = true;
}
if ((feeAdd) && AInfo['District'] == 'Charlotte County Sanitation District') {
	addCC = true;
}
if ((feeAdd) && AInfo['District'] == 'Don Pedro/Knight Island Sanitation District') {
	addDP = true;
}
if (addDP) {
	distFee = lookup('CC_CHAR_CO_SAN_DIST', currMnth);
}
if (addCC) {
	distFee = lookup('CC_DPKI_SAN_DIST', currMnth);
}
if ((addCC) && distFee != undefined && AInfo['Service Start Date'] != null) {
	updateFee('GARB-CC', feeSch, 'ORIGINAL', distFee, 'Y', 'N');
}
if ((addDP) && distFee != undefined && AInfo['Service Start Date'] != null) {
	updateFee('GARB-DP', feeSch, 'ORIGINAL', distFee, 'Y', 'N');
}
