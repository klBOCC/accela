
if (wfTask == 'Review' && wfStatus == 'Approved' && !balanceDue == 0) {
	comment('All Fees must be paid before this action can take place.');
	cancel = true;
}
