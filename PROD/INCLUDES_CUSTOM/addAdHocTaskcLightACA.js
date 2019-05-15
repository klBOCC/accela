function addAdHocTaskcLightACA(myCap) {
	var tUser = "ADMIN";
	var userObj = aa.person.getUser(tUser);
	aa.print(myCap);
	aa.print(tUser + " " + userObj);

	var taskObj = aa.workflow.getTasks(myCap).getOutput()[0].getTaskItem()
		taskObj.setProcessCode("ADHOC WORKFLOW");
	taskObj.setTaskDescription("Coastal Lighting Review");
	taskObj.setDispositionNote("");
	taskObj.setProcessID(0);
	taskObj.setAssignmentDate(aa.util.now());
	taskObj.setDueDate(aa.util.now());
	taskObj.setAssignedUser(userObj.getOutput());
	wf = aa.proxyInvoker.newInstance("com.accela.aa.workflow.workflow.WorkflowBusiness").getOutput();
	wf.createAdHocTaskItem(taskObj);
	return true;

}
