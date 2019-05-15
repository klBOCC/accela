
if (wfTask == 'Permit Issuance' && wfStatus == 'Issued' && !balanceDue == 0) {
	feeSch = 'BLD_CON_COM_MU';

	//replaced branch(WTUA:AssessFee1)
	assessFee1();
}
