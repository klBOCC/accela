
// TODO more optimal to use asi = AInfo["AG Exemption"];
var asi = getAppSpecific('AG Exemption', capId);
comment('AG Exemption = ' + asi);
if ((asi == 'Yes')) {
	scheduleInspection('Follow-up Inspection', 365, null, null, 'scheduled via script');
}

// DISABLED: ASA:Planning/Growth Mgmt/Zoning Determination Letter/Zoning Determination Letter:10
// if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
// 	addStdCondition('CC PERMIT','Babcock Ranch');
// 	}
