
// TODO, setting showmessage to true could result in popups without meaningful messages
showMessage = true;
if ((appMatch('CodeEnforcement/Unsafe Building/NA/NA') && inspType == 'Follow-up Inspection' && balanceDue > 0)) {
	comment('Inspection cannot be scheduled because there is a balance of $' + balanceDue + ' due on the record.');
	cancel = true;
}
