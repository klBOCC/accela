
bContinue = true;
arrCAPS = capIdsGetByParcel();
if (!arrCAPS) {
	bContinue = false;
}
if (bContinue) {
	for (xx in arrCAPS) {
		relatedCapID = aa.cap.getCap(arrCAPS[xx]).getOutput();
	}
}
logDebug('relatedCapID.getFileDate(): ' + relatedCapID.getFileDate());
if (typeof(BUILDINGPLAN) != 'undefined') {
	sumConstructionCost = 0;
	valuation = 0;
	removeASITable('BUILDING PLAN');
	for (rec in BUILDINGPLAN)
		//start replaced branch: ASIUA:CALCVALUATION:LOOP
	{
		arrNewTableRec = [];
		valuation = 0;
		arrNewTableRec['Construction Group'] = BUILDINGPLAN[rec]['Construction Group'];
		arrNewTableRec['Construction Type'] = BUILDINGPLAN[rec]['Construction Type'];
		arrNewTableRec['Sq Footage'] = BUILDINGPLAN[rec]['Sq Footage'];
		//start replaced branch: ASIUA:CALCVALUATION2
		sMultiplier = lookup('LOOKUP_EMSE_CONSTRUCTION_MULTIPLIER', BUILDINGPLAN[rec]['Construction Group'] + '/' + BUILDINGPLAN[rec]['Construction Type']);
		logDebug('sMultiplier: ' + sMultiplier);
		if (sMultiplier == 'undefined') {
			valuation = '0';
		}
		if (sMultiplier) {
			fMultiplier = parseFloat(sMultiplier);
		}
		if (sMultiplier) {
			valuation = fMultiplier * parseFloat(BUILDINGPLAN[rec]['Sq Footage']);
		}
		//end replaced branch: ASIUA:CALCVALUATION2
		arrNewTableRec['Valuation'] = valuation.toString();
		addToASITable('BUILDING PLAN', arrNewTableRec);
		sumConstructionCost = sumConstructionCost + valuation;

	}
	//end replaced branch: ASIUA:CALCVALUATION:LOOP;
}
