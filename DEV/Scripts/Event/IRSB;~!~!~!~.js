showMessage = true;
if (inspType != 'On-Line Resubmittal' && inspType != 'Plans Change Submitted' && (appMatch('Building/*/*/*') && capStatus != 'Permit Issued' && capStatus != 'Issued' && capStatus != 'Temp C of O Issued')) {
	showMessage = true;
	comment("Cannot result inspections when the permit does not currently have a status of 'Issued'");
	cancel = true;
}
