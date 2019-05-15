
PaidAmt = PaymentTotalPaidAmount;
if (appMatch('CodeEnforcement/*/*/*')) {
	
//start replaced branch: CC_251_CE_PaymentAfter
 {
comment('CC_251_CE_PaymentAfter Executing message');

}
//end replaced branch: CC_251_CE_PaymentAfter;
	}

if (appMatch('Planning/Land Development/*/*')) {
	
//start replaced branch: CC_251_LD_PaymentAfter
 {
comment('CC_251_LD_PaymentAfter Executing message');
if (appMatch('Planning/Land Development/*/*') && isTaskActive('Intake') && balanceDue == 0) {
	closeTask('Intake','Complete','Payment of $'+ PaidAmt + ' was made - Finance');
	}

if (appMatch('Planning/Land Development/ROW/NA') && isTaskActive('Plan Review') && balanceDue == 0) {
	closeTask('Plan Review','Approved','Payment of $'+ PaidAmt + ' was made - Finance');
	}

if (appMatch('Planning/Land Development/ROW/Utility') && isTaskActive('Quality Review') && balanceDue == 0) {
	closeTask('Quality Review','Complete','Payment of $'+ PaidAmt + ' was made - Finance');
	}

}
//end replaced branch: CC_251_LD_PaymentAfter;
	}

if (appMatch('Building/*/*/*')) {
	
//start replaced branch: CC_251_BLD_PaymentAfter
 {
comment('CC_251_BLD_PaymentAfter Executing message');
if (isTaskActive('Intake') && balanceDue == 0) {
	closeTask('Intake','Complete','Payment of $'+ PaidAmt + ' was made - Finance');
	}

}
//end replaced branch: CC_251_BLD_PaymentAfter;
	}

if (appMatch('Planning/Managed Growth/*/*')) {
	
//start replaced branch: CC_251_GM_PaymentAfter
 {
comment('CC_251_GM_PaymentAfter Executing message');

}
//end replaced branch: CC_251_GM_PaymentAfter;
	}

if (appMatch('Licenses/*/*/*')) {
	
//start replaced branch: CC_251_LIC_PaymentAfter
 {
comment('CC_251_LIC_PaymentAfter Executing message');
if (isTaskActive('Sufficiency Review') && balanceDue == 0) {
	closeTask('Intake','Complete','Payment of $'+ PaidAmt + ' was made - Finance');
	}

if (isTaskActive('Status') && balanceDue == 0) {
	updateTask('Status','Active','Payment of $'+ PaidAmt + ' was made - Finance');
	licEditExpInfo('Active');
	updateAppStatus('Active','Updated by EMSE - Payment of $'+ PaidAmt + ' was made.');
	}

}
//end replaced branch: CC_251_LIC_PaymentAfter;
	}

comment('CC_250_PaymentAfter executed successfully');
if (appMatch('Building/POS/POS/POS') && PaymentTotalPaidAmount >= balanceDue) {
	updateAppStatus('Closed','');
	}

if (appMatch('Planning/POS/POS/POS') && PaymentTotalPaidAmount >= balanceDue) {
	updateAppStatus('Closed','');
	}

