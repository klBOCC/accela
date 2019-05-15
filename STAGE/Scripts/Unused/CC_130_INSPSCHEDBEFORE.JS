
if (appMatch('CodeEnforcement/*/*/*')) {
	
//start replaced branch: CC_131_CE_InspSchedBefore
 {
comment('CC_131_CE_InspSchedBefore Executing message');

}
//end replaced branch: CC_131_CE_InspSchedBefore;
	}

if (appMatch('Planning/Land Development/*/*')) {
	
//start replaced branch: CC_131_LD_InspSchedBefore
 {
if (appMatch('Planning/Land Development/Stormwater/Master') && istaskActive('As Built Submittal','PR-STORMPER') && !balanceDue == 0) {
	showDebug = false;
	showMessage = false;
	message='All Fees must be paid before this action can take place.';
	showMessage = true;
	}

if (appMatch('Planning/Land Development/Stormwater/NA') && istaskActive('As Built Submittal','PR-STORM') && !balanceDue == 0) {
	showDebug = false;
	showMessage = false;
	message='All Fees must be paid before this action can take place.';
	showMessage = true;
	}

}
//end replaced branch: CC_131_LD_InspSchedBefore;
	}

if (appMatch('Building/*/*/*')) {
	
//start replaced branch: CC_131_BLD_InspSchedBefore
 {
comment('CC_131_BLD_InspSchedBefore Executing message');

}
//end replaced branch: CC_131_BLD_InspSchedBefore;
	}

if (appMatch('Planning/Managed Growth/*/*')) {
	
//start replaced branch: CC_131_GM_InspSchedBefore
 {
comment('CC_131_GM_InspSchedBefore Executing message');

}
//end replaced branch: CC_131_GM_InspSchedBefore;
	}

if (appMatch('Licenses/*/*/*')) {
	
//start replaced branch: CC_131_LIC_InspSchedBefore
 {
comment('CC_131_InspSchedBefore Executing message');

}
//end replaced branch: CC_131_LIC_InspSchedBefore;
	}

comment('CC_250_PaymentAfter executed successfully');

