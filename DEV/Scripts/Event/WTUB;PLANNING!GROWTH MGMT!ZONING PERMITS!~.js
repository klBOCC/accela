
if (wfTask == 'Finaled' && matches(wfStatus, 'C of O Issued', 'C of Completion Issued') && !balanceDue == 0) {
	comment('All Fees must be paid before this action can take place.');
	cancel = true;
}
