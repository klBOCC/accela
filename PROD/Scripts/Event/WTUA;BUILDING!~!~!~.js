
if (isTaskActive('Reviews') && matches(wfStatus, 'Approved', 'Not Required')) {
	closeSubWorkflow(wfProcessID, 'Approved');
}

if (isTaskActive('Reviews') && wfStatus == 'Denied') {
	closeParentWorkflow(wfProcessID, 'Denied');
	allTsks = loadTasks(capId);
	if (taskStatus('Reviews') == 'Denied')
		for (x in allTsks)
			//start replaced branch: WTUA:DnyParent
		{
			// DISABLED: WTUA:DnyParent:1
			// comment(allTsks[x].process);
			// comment(x);
			if (!isTaskComplete(x)) {
				closeTask(x, 'Denied', 'Review Denied', '');
			}

		}
	//end replaced branch: WTUA:DnyParent;
}

if (wfTask == 'Permit Issuance' && wfStatus == 'Issued') {
	editAppSpecific('Expiration Date', dateAdd(null, 180));
}

if (wfTask == 'Permit Issuance' && wfStatus == 'Permit Renewed') {
	editAppSpecific('Expiration Date', dateAdd(null, 180));
}

if (wfTask == 'End of Process' && wfStatus == 'Closed') {
	emailPrimaryLP('Permit # ' + capIDString + ' Closed', 'Please be advised that Permit # ' + capIDString + ' has passed all required inspections and was closed on ' + wfDateMMDDYYYY + '.  If you have any questions or feel this permit was closed in error, please contact Building Constructions Services at 941-743-1201.  Thank you.');
}

if (appMatch('Building/Accessories/Residential/Temporary Erosion Control') && wfTask == 'Permit Issuance' && wfStatus == 'Issued') {
	editAppSpecific('Expiration Date', '');
}

//replaced branch(workflow_info)
workflowInfo();
