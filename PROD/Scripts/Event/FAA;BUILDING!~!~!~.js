
if (feeExists('M-EXTEND', 'NEW')) {
	editAppSpecific('Expiration Date', dateAdd(AInfo['Expiration Date'], 90));
	updateAppStatus('Issued', '');
}

if (feeExists('M-EXTEND2', 'NEW')) {
	editAppSpecific('Expiration Date', dateAdd(AInfo['Expiration Date'], 90));
	updateAppStatus('Issued', '');
}
