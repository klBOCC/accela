//start replaced branch: CC_151_LD_InspResultAfter
{
	comment('CC_151_LD_InspResultAfter Executing message');
	if (appMatch('Planning/Land Development/ROW/*') && isTaskActive('Permit Issuance') && inspResult == 'Pass') {
		closeTask('Permit Issuance', 'Issued', 'Updated through Inspection');
	}

	if (appMatch('Planning/Land Development/ROW/*') && isTaskActive('Permit Issuance') && inspResult == 'Fail') {
		updateTask('Permit Issuance', 'Failed', 'Updated through Inspection');
	}

	if (appMatch('Planning/Land Development/Plats/Final - Construction') && isTaskActive('Public Works Inspection') && inspType == 'Public Works Inspection' && inspResult == 'Fail') {
		updateTask('Public Works Inspection', 'Failed', 'Updated through Inspection');
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

	if (appMatch('Planning/Land Development/Plats/Final - Construction') && isTaskActive('Stormwater Inspection') && inspType == 'Stormwater Inspection' && inspResult == 'Fail') {
		updateTask('Stormwater Inspection', 'Failed', 'Updated through Inspection');
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

	if (appMatch('Planning/Land Development/Plats/Final - Non Construction') && isTaskActive('Public Works Inspection') && inspType == 'Public Works Inspection' && inspResult == 'Fail') {
		updateTask('Public Works Inspection', 'Failed', 'Updated through Inspection');
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

	if (appMatch('Planning/Land Development/Plats/Final - Non Construction') && isTaskActive('Stormwater Inspection') && inspType == 'Stormwater Inspection' && inspResult == 'Fail') {
		updateTask('Stormwater Inspection', 'Failed', 'Updated through Inspection');
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

	if (appMatch('Planning/Land Development/ROW/NA') || appMatch('Planning/Land Development/ROW/Utility') && isTaskActive('Permit Issuance') && inspResult == 'Fail') {
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

	if (appMatch('Planning/Land Development/Stormwater/*') || appMatch('Planning/Land Development/ROW/Utility') && isTaskActive('Permit Issuance') && inspResult == 'Fail') {
		//branch('CC_152_InspResultAfter');
		addReinspectionFees();
	}

}
//end replaced branch: CC_151_LD_InspResultAfter;

