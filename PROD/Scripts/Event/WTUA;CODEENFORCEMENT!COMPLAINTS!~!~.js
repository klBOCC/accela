
if (wfTask == 'Code Violation' && wfStatus == 'Not in Compliance' && AInfo['CILB'] == 'C') {
	newAppID = createChild('CodeEnforcement', 'CILB', 'NA', 'NA', 'Created from CAP # ' + capIDString);
	altid = newAppID.getCustomID();
}

if (wfTask == 'Code Violation' && wfStatus == 'Not in Compliance' && AInfo['CE'] == 'C') {
	newAppID = createChild('CodeEnforcement', 'Code Enforcement', 'NA', 'NA', 'Created from CAP # ' + capIDString);
	altid = newAppID.getCustomID();
}

if (wfTask == 'Code Violation' && wfStatus == 'Not in Compliance' && AInfo['Unsafe Building'] == 'C') {
	newAppID = createChild('CodeEnforcement', 'Unsafe Building', 'NA', 'NA', 'Created from CAP # ' + capIDString);
	altid = newAppID.getCustomID();
}
