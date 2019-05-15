
aTrans = false;
if (wfTask == 'BCC' && wfStatus == 'Adopt') {
	wHistory = aa.workflow.getHistory(capId).getOutput();
	appTranValue = 'BCC|Approve Transmittal';
	for (x in wHistory)
		if (appTranValue == (wHistory[x].getTaskDescription() + '|' + wHistory[x].getDisposition()))
			aTrans = true;
}

if (wfTask == 'BCC' && wfStatus == 'Adopt' && !aTrans) {
	showMessage = true;
	comment('Approve Transmittal has to be selected before Adopt can be selected');
	cancel = true;
}
