showMessage = true;
if (wfTask == 'Sufficiency Review' && wfStatus == 'Complete' && balanceDue > 0) {
	comment('Fee Balance must be paid before completing this task.');
	cancel = true;
}
