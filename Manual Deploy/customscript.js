function addAdHocTaskcLight(capId) {
	var myCapId = capId
		var myCap = aa.cap.getCapID(myCapId);
	var tUser = "ADMIN";
	var userObj = aa.person.getUser(tUser);
	if (myCap.getSuccess()) {
		myCap = myCap.getOutput();
	} else {
		aa.print(myCap.getErrorMessage());
		return false;
		aa.abortScript();
	}
	var capIDString = myCap.getCustomID();
	aa.print(capIDString);
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

function addConditionToCapsWithMatchingParcel() {
	logDebug("function: BEGIN function addConditionToCapsWithMatchingParcel");
	logDebug("function: Get Parcel on CAP");

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	if (capParcelResult.getSuccess()) {
		var Parcels = capParcelResult.getOutput().toArray();
	} else {
		logDebug("**ERROR: getting parcels by cap ID: " + capParcelResult.getErrorMessage());
		return false;
	}

	for (zz in Parcels) {
		var ParcelValidatedNumber = Parcels[zz].getParcelNumber();

		logDebug("Looking at parcel " + ParcelValidatedNumber);

		logDebug("function: Get CAPs by Parcel");
		capResult = aa.cap.getCapListByParcelID(ParcelValidatedNumber, null);
		if (capResult.getSuccess()) {
			addrCaps = capResult.getOutput();

			for (addrCap in addrCaps) {
				logDebug("Found CAP " + addrCaps[addrCap].getCustomID() + " with matching address.  Checking CAP Type...")
				capResult2 = aa.cap.getCap(addrCaps[addrCap].getID1(), addrCaps[addrCap].getID2(), addrCaps[addrCap].getID3());
				if (capResult2.getSuccess()) {
					cap2 = capResult2.getOutput();
					logDebug("Cap Type is " + cap2.getCapType().toString());
					logDebug("Cap Status is " + cap2.getCapStatus() + "");

					//RV  - 02/01/2010 - Make sure the AltID is not the one that was just added
					if (addrCaps[addrCap].getCustomID().toString().equals(capIDString)) {
						logDebug("Permit # in result matches the permit # just created, ignore this permit and continue");
					} else {
						if (cap2.getCapType().toString().equals(appTypeString) && !matches(cap2.getCapStatus() + "", "NULL", "Abatement Complete", "Applicant Request", "Application Canceled", "C of Completion Issued", "C of O Issued", "COED", "Closed", "Closed Out", "Complete", "Compliant", "Dismissed", "Exemption", "Expired", "External Referral", "Final Approval", "Final Approved", "Final Plat Recorded", "Final Review", "Finaled", "In Compliance", "Not Required", "Plat Book Page Recorded", "SUSPEND", "Temp C of O Issued", "Void", "Voided", "Withdrawn")) {
							logDebug("Found matching cap type with valid status, adding condition.");
							addStdCondition("CC PERMIT", "Open Record at Same Address");
							break; //exit for loop
						}
					}
				} else {
					logDebug("function: Error calling getCAP to convert to CapScriptModel object: " + capResult2.getError());
				}
			} // End CAP FOR loop
		} else {
			logDebug("function: Error getting CAPs with matching parcel: " + capResult.getErrorMessage());
		}
	} // End parcel FOR loop

	logDebug("function: END function addConditionToCapsWithMatchingParcel");
}

function addConditionToCapsWithMatchingParcel2() {
	logDebug("function: BEGIN function addConditionToCapsWithMatchingParcel");
	logDebug("function: Get Parcel on CAP");

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	if (capParcelResult.getSuccess()) { var Parcels = capParcelResult.getOutput().toArray(); }
	else { logDebug("**ERROR: getting parcels by cap ID: " + capParcelResult.getErrorMessage()); return false; }

	for (zz in Parcels) {
		var ParcelValidatedNumber = Parcels[zz].getParcelNumber();

		logDebug("Looking at parcel " + ParcelValidatedNumber);

		logDebug("function: Get CAPs by Parcel");
		capResult = aa.cap.getCapListByParcelID(ParcelValidatedNumber, null);
		if (capResult.getSuccess()) {
			addrCaps = capResult.getOutput();

			for (addrCap in addrCaps) {
				logDebug("Found CAP " + addrCaps[addrCap].getCustomID() + " with matching address.  Checking CAP Type...");
				capResult2 = aa.cap.getCap(addrCaps[addrCap].getID1(), addrCaps[addrCap].getID2(), addrCaps[addrCap].getID3());
				if (capResult2.getSuccess()) {
					cap2 = capResult2.getOutput();
					logDebug("Cap Type is " + cap2.getCapType().toString());
					logDebug("Cap Status is " + cap2.getCapStatus() + "");

					if (addrCaps[addrCap].getCustomID().toString().equals(capIDString)) {
						logDebug("Permit # in result matches the permit # just created, ignore this permit and continue");
					}
					else {
						if (cap2.getCapType().toString().equals(appTypeString) && !matches(cap2.getCapStatus() + "", "NULL", "Abatement Complete", "Applicant Request", "Application Canceled", "C of Completion Issued", "C of O Issued", "COED", "Closed", "Closed Out", "Complete", "Compliant", "Dismissed", "Exemption", "External Referral", "Final Approval", "Final Approved", "Final Plat Recorded", "Final Review", "Finaled", "In Compliance", "Not Required", "Plat Book Page Recorded","SUSPEND","Temp C of O Issued", "Void", "Voided", "Withdrawn")) {
							logDebug("Found matching cap type with valid status, adding condition.");
							addStdCondition("CC PERMIT", "Open Record at Same Address");
							break;  
						}
					}
				}
				else {
					logDebug("function: Error calling getCAP to convert to CapScriptModel object: " + capResult2.getError());
				}
			} 
		}
		else {
			logDebug("function: Error getting CAPs with matching parcel: " + capResult.getErrorMessage());
		}
	} 
	logDebug("function: END function addConditionToCapsWithMatchingParcel");
}

function addConditionToCapsWithMatchingParcelACA() {
	logDebug("function: BEGIN function addConditionToCapsWithMatchingParcel");
	logDebug("function: Get Parcel on CAP");

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	if (capParcelResult.getSuccess()) {
		var Parcels = capParcelResult.getOutput().toArray();
	} else {
		logDebug("**ERROR: getting parcels by cap ID: " + capParcelResult.getErrorMessage());
		return false;
	}

	for (zz in Parcels) {
		var ParcelValidatedNumber = Parcels[zz].getParcelNumber();

		logDebug("Looking at parcel " + ParcelValidatedNumber);

		logDebug("function: Get CAPs by Parcel");
		capResult = aa.cap.getCapListByParcelID(ParcelValidatedNumber, null);
		if (capResult.getSuccess()) {
			addrCaps = capResult.getOutput();

			for (addrCap in addrCaps) {
				logDebug("Found CAP " + addrCaps[addrCap].getCustomID() + " with matching address.  Checking CAP Type...")
				capResult2 = aa.cap.getCap(addrCaps[addrCap].getID1(), addrCaps[addrCap].getID2(), addrCaps[addrCap].getID3());
				if (capResult2.getSuccess()) {
					cap2 = capResult2.getOutput();
					logDebug("Cap Type is " + cap2.getCapType().toString());
					logDebug("Cap Status is " + cap2.getCapStatus() + "");

					//RV  - 02/01/2010 - Make sure the AltID is not the one that was just added
					if (addrCaps[addrCap].getCustomID().toString().equals(capIDString)) {
						logDebug("Permit # in result matches the permit # just created, ignore this permit and continue");
					} else {
						if (cap2.getCapType().toString().equals(appTypeString) && !matches(cap2.getCapStatus() + "", "NULL", "Abatement Complete", "Applicant Request", "Application Canceled", "C of Completion Issued", "C of O Issued", "Closed", "Closed Out", "Complete", "Compliant", "Dismissed", "Exemption", "External Referral", "Final Approval", "Final Approved", "Final Plat Recorded", "Final Review", "Finaled", "In Compliance", "Not Required", "Plat Book Page Recorded", "Temp C of O Issued", "Void", "Voided", "Withdrawn")) {
							logDebug("Found matching cap type with valid status, adding condition.");
							return true;
							break; //exit for loop
						}
					}
				} else {
					logDebug("function: Error calling getCAP to convert to CapScriptModel object: " + capResult2.getError());
					return false;
				}
			} // End CAP FOR loop
		} else {
			logDebug("function: Error getting CAPs with matching parcel: " + capResult.getErrorMessage());
			return false;
		}
	} // End parcel FOR loop

	logDebug("function: END function addConditionToCapsWithMatchingParcel");
	return false;
}

function addInspectionsToASITable() {

	// DISABLED: ASA:AddInspectionToASITable:LOOP:1
	// typeObj = inspectionTypes[type].getType();
	// DISABLED: ASA:AddInspectionToASITable:LOOP:2
	// if (typeObj) {
	// 	arrInspRecord['Inspection Type']='' + typeObj;
	// 	}

	// DISABLED: ASA:AddInspectionToASITable:LOOP:3
	// if (typeObj) {
	// 	pIsRequired='Optional';
	// 	if(inspectionTypes[type].getRequiredInspection()=='Y')  pIsRequired='Required';
	// 	}

	// DISABLED: ASA:AddInspectionToASITable:LOOP:4
	// if (typeObj) {
	// 	arrInspRecord['Optional/Required']=pIsRequired;
	// 	}

	// DISABLED: ASA:AddInspectionToASITable:LOOP:5
	// if (typeObj) {
	// 	arrInspRecord['IVR Number']= '' + inspectionTypes[type].getIvrNumber();
	// 	}

	// DISABLED: ASA:AddInspectionToASITable:LOOP:6
	// if (typeObj) {
	// 	addToASITable('INSPECTIONS NEEDED', arrInspRecord);
	// 	pIsRequired='';
	// 	}

}


function addReinspectionFees() {

	if (!feeExists('REINS.01')) {
		addFee('REINS.01', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}

	if (feeExists('REINS.01') && !feeExists('REINS.02')) {
		addFee('REINS.02', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}

	if (feeExists('REINS.02') && !feeExists('REINS.03')) {
		addFee('REINS.03', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}
}

function assessFee1() {

	// DISABLED: WTUA:AssessFee1:1
	// if (AInfo['District'] == 'Charlotte County Sanitation District') {
	// 	monCurrent = sysDate.getMonth();
	// 	distFee = lookup('CC_CHAR_CO_SAN_DIST',monCurrent);
	// 	updateFee('GARB-CC',feeSch,'Assessed at Issuance',distFee,'Y');
	// 	}

	// DISABLED: WTUA:AssessFee1:2
	// if (AInfo['District'] == 'Don Pedro/Knight Island Sanitation District') {
	// 	monCurrent = sysDate.getMonth();
	// 	distFee = lookup('CC_DPKI_SAN_DIST',monCurrent);
	// 	updateFee('GARB-DP',feeSch,'Assessed at Issuance',distFee,'Y');
	// 	}

}

function checkForInsp(capId) {
	var inspSkip = false;
	var inspTyp2SkipArr = new Array();

	if (arguments.length > 1) {
		inspSkip = true;
		for (var i = 1; i < arguments.length; i++) {
			inspTyp2SkipArr.push(arguments[i]);
		}
	}

	var inspsObj = aa.inspection.getInspections(capId);
	if (inspsObj.getSuccess()) {
		var inspsList = inspsObj.getOutput();
	} else {
		logDebug("**ERROR: getting inspection items: " + inspsObj.getErrorMessage());
		return false;
	}

	for (insp in inspsList) {
		if ((inspsList[insp].getInspectionStatus() == 'Scheduled' || inspsList[insp].getInspectionStatus() == 'Pending') && (!inspSkip || !exists(inspsList[insp].getInspectionType(), inspTyp2SkipArr))) {
			return true;
		}
	}
	return false;
}

function checkForPendingInspections() {
	logDebug("FUNCTION: checkForPendingInspections() ...");
	//Return true if a Pending Inspection exists on the Record
	var inspResultObj = aa.inspection.getInspections(capId);
	if (inspResultObj.getSuccess()) {
		var inspList = inspResultObj.getOutput();
		for (xx in inspList) {
			var iStatus = inspList[xx].inspectionStatus;
			logDebug("Inspection Status: " + iStatus);

			if (iStatus == "Pending" || iStatus == "PENDING" || iStatus == "SCHEDULED" || iStatus == "Scheduled") {
				logDebug("Found Pending Inspection, return true");
				return true;
			}
		}

		//Default false if pending not found
		logDebug("No Pending Inspection Found.  Return false");
		return false;
	}
}

function checkMEXTEND(myCapId) {
	var myCap = aa.cap.getCapID(myCapId);
	if (myCap.getSuccess()) {
		myCap = myCap.getOutput();
	} else {
		return false
		aa.abortScript();
	}
	var capIDString = myCap.getCustomID();
	aat = aa.finance.getCashierAuditListByCapId(myCap, null).getOutput();
	var myFlag = 0;

	for (i in aat) {
		var MYgetAuditID = aat[i].getAuditID();
		var MYgetAuditStatus = aat[i].getAuditStatus();
		var MYgetAction = aat[i].getAction();
		var MYgetCashierID = aat[i].getCashierID();
		var MYgetFee = aat[i].getFee();
		var MYgetFeeCod = aat[i].getFeeCod();
		var MYgetFeeDescription = aat[i].getFeeDescription();
		var MYgetTranAmount = aat[i].getTranAmount();
		var MYgetTranDate = aat[i].getTranDate();
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Invoice FeeItem") {
			myFlag++;
		}
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Payment Applied") {
			myFlag--;
		}
	}
	if (myFlag <= 0) {
		return false
	} else {
		return true
	}
}

function checkMEXTENDB(myCapId) {
	var sysDate = aa.date.getCurrentDate();
	var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth() - 1, sysDate.getYear(), "MM-DD-YYYY");

	var myCap = aa.cap.getCapID(myCapId);
	if (myCap.getSuccess()) {
		myCap = myCap.getOutput();
	} else {
		aa.abortScript();
	}
	var capIDString = myCap.getCustomID();
	aat = aa.finance.getCashierAuditListByCapId(myCap, null).getOutput();
	var myFlag = 0;

	for (i in aat) {
		var MYgetAuditID = aat[i].getAuditID();
		var MYgetAuditStatus = aat[i].getAuditStatus();
		var MYgetAction = aat[i].getAction();
		var MYgetCashierID = aat[i].getCashierID();
		var MYgetFee = aat[i].getFee();
		var MYgetFeeCod = aat[i].getFeeCod();
		var MYgetFeeDescription = aat[i].getFeeDescription();
		var MYgetTranAmount = aat[i].getTranAmount();
		var MYgetTranDate = aat[i].getTranDate();
		if (MYgetTranDate != null) {
			var MYgetTranDate = convertDate(aat[i].getTranDate());
			var MYgetTranDateYYYY = dateFormatted(aat[i].getTranDate().getMonth(), aat[i].getTranDate().getDayOfMonth(), aat[i].getTranDate().getYear(), "MM-DD-YYYY");
		} else {
			var MYgetTranDate = "";
		}
		if ((MYgetFeeCod == "M-EXTEND" || MYgetFeeCod == "M-EXTEND2") && MYgetAction == "Payment Applied") {
			if (MYgetTranDateYYYY == sysDateMMDDYYYY) {
				return true
				myFlag = 1
			}
		}
	}
	if (myFlag == 0) {
		return false
	}
}

function ckCapDRI(capCK) {
	var capId = aa.cap.getCapID(capCK);
	if (capId.getSuccess()) {
		capId = capId.getOutput();
	} else {
		aa.print(capId.getErrorMessage());
		aa.abortScript();
	}
	var capIDString = capId.getCustomID();

	mycap = aa.cap.getCap(capId).getOutput();
	var capStatus = mycap.getCapStatus();
	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	var Parcels = capParcelResult.getOutput().toArray();
	var parcelObj = Parcels[0];
	var parcelNumber = parcelObj.getParcelNumber();

	var myProx = proximityInfodri("AGIS_CHARCO", "DRI", 1, capId);
	if (myProx != undefined && myProx != 0) {
		return getDRImatch(myProx);

	} else {
		if (myProx == undefined) {
			return true;
		} else {
			return true;
		}
	}
}

function closeParentWorkflow(thisProcessID, wfStat) // optional capId
{
	//modified function to close parent, ignoring opened tasks
	var itemCap = capId;
	if (arguments.length == 3)
		itemCap = arguments[2]; // use cap ID specified in args

	var isCompleted = true;

	var workflowResult = aa.workflow.getTasks(itemCap);
	if (workflowResult.getSuccess())
		var wfObj = workflowResult.getOutput();
	else {
		logMessage("**ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage());
		return false;
	}

	if (!isCompleted)
		return false;

	// get the parent task

	var relationArray = aa.workflow.getProcessRelationByCapID(itemCap, null).getOutput()

		var relRecord = null;

	for (thisRel in relationArray)
		if (relationArray[thisRel].getProcessID() == thisProcessID)
			relRecord = relationArray[thisRel];

	if (!relRecord) {
		logDebug("closeParentWorkflow: did not find a process relation, exiting", 3);
		return false;
	}

	logDebug("executing handleDisposition:" + relRecord.getStepNumber() + "," + relRecord.getParentProcessID() + "," + wfStat, 3);

	var handleResult = aa.workflow.handleDisposition(itemCap, relRecord.getStepNumber(), relRecord.getParentProcessID(), wfStat, sysDate, "Closed via script", "Closed via script", systemUserObj, "Y");

	if (!handleResult.getSuccess())
		logDebug("**WARNING: closing parent task: " + handleResult.getErrorMessage());
	else
		logDebug("Closed parent task");
}

function conDate(thisDate) {
	//transform the date from asi
	if (thisDate != null)
		return new Date(thisDate.getMonth() + "/" + (thisDate.getDayOfMonth() + 1) + "/" + thisDate.getYear());
	else
		return null;

}

function conSysDate(thisDate) {
	//transform the date from asi
	if (thisDate != null)
		return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
	else
		return null;

}

function convertDateforLong(thisDate) {
	//transform the date which is object

	if (typeof(thisDate) == "string") {
		var retVal = new Date(String(thisDate));
		if (!retVal.toString().equals("Invalid Date"))
			return retVal;
	}

	if (typeof(thisDate) == "object") {

		if (!thisDate.getClass) // object without getClass, assume that this is a javascript date already
		{
			return thisDate;
		}

		if (thisDate.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) {
			return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
		}

		if (thisDate.getClass().toString().equals("class java.util.Date")) {
			return new Date(thisDate.getTime());
		}

		if (thisDate.getClass().toString().equals("class java.lang.String")) {
			return new Date(String(thisDate));
		}
	}

	if (typeof(thisDate) == "number") {
		return new Date(thisDate); // assume milliseconds
	}

	logDebug("**WARNING** convertDate cannot parse date : " + thisDate);
	return null;
}

function copyOwnerToContact(nContactType) {
	//have to specify a temporary CAP that has an owner attached to get access to the base contact info
	//This is the problimatic area since you have to pull the ContactModel from another CAP and cannot create
	//a new instance of the object

	//get cap contact model from existing cap

	//get owner from current cap
	var OwnersResult = aa.owner.getOwnerByCapId(capId);
	if (OwnersResult.getSuccess())
		Owners = OwnersResult.getOutput();
	else {
		logDebug("Error Retrieving Cap Owner");
		return null;
	}

	var owner = Owners[0];
	capContactResult = aa.people.getCapContactByCapID(capId);

	if (capContactResult.getSuccess()) {
		Contacts = capContactResult.getOutput();
		if (Contacts.length > 0) {
			var theContact = Contacts[0].getCapContactModel();
			var People = Contacts[0].getPeople();
			var cAddress = People.getCompactAddress();
			cAddress.setAddressId(null);
			cAddress.setAddressLine1(owner.getMailAddress1());
			cAddress.setAddressLine2(owner.getMailAddress2());
			cAddress.setAddressLine3(owner.getMailAddress3());
			cAddress.setCity(owner.getMailCity());
			cAddress.setCountry(owner.getCountry());
			cAddress.setState(owner.getMailState());
			cAddress.setZip(owner.getMailZip());

			People.setBusinessName(null);
			People.setCompactAddress(cAddress);
			People.setContactType(nContactType);
			//People.setContactTypeFlag("Y");
			People.setEmail(null);
			People.setFax(owner.getFax());
			People.setComment(null);

			People.setPhone1(owner.getPhone());
			People.setPhone2(null);

			theContact.setCapID(capId);
			theContact.setCountry(owner.getCountry());
			theContact.setEmail(null);
			theContact.setFirstName(owner.getOwnerFirstName());
			theContact.setLastName(owner.getOwnerLastName());
			theContact.setFullName(owner.getOwnerFullName());
			theContact.setPeople(People);
			//theContact.setServiceProviderCode(aa.getServiceProviderCode());

			aa.people.createCapContact(theContact);
		} else {
			logDebug("No Contact to copy");
			return false;
		}
	} else {
		logDebug("Error Retrieving Cap Contact Model");
		return null;
	}
}

function createReferenceLP(rlpId, rlpType, pContactType) {
	//Creates/updates a reference licensed prof from a Contact and then adds as an LP on the cap.
	var updating = false;
	var capContResult = aa.people.getCapContactByCapID(capId);
	if (capContResult.getSuccess()) {
		conArr = capContResult.getOutput();
	} else {
		logDebug("**ERROR: getting cap contact: " + capAddResult.getErrorMessage());
		return false;
	}

	if (!conArr.length) {
		logDebug("**WARNING: No contact available");
		return false;
	}

	var newLic = getRefLicenseProf(rlpId)

		if (newLic) {
			updating = true;
			logDebug("Updating existing Ref Lic Prof : " + rlpId);
		} else
			var newLic = aa.licenseScript.createLicenseScriptModel();

		//get contact record
		if (pContactType == null)
			var cont = conArr[0]; //if no contact type specified, use first contact
		else {
			var contFound = false;
			for (yy in conArr) {
				if (pContactType.equals(conArr[yy].getCapContactModel().getPeople().getContactType())) {
					cont = conArr[yy];
					contFound = true;
					break;
				}
			}
			if (!contFound) {
				logDebug("**WARNING: No Contact found of type: " + pContactType);
				return false;
			}
		}

		peop = cont.getPeople();
	addr = peop.getCompactAddress();

	newLic.setContactFirstName(cont.getFirstName());
	//newLic.setContactMiddleName(cont.getMiddleName());  //method not available
	newLic.setContactLastName(cont.getLastName());
	newLic.setBusinessName(peop.getBusinessName());
	newLic.setAddress1(addr.getAddressLine1());
	newLic.setAddress2(addr.getAddressLine2());
	newLic.setAddress3(addr.getAddressLine3());
	newLic.setCity(addr.getCity());
	newLic.setState(addr.getState());
	newLic.setZip(addr.getZip());
	newLic.setPhone1(peop.getPhone1());
	newLic.setPhone2(peop.getPhone2());
	newLic.setEMailAddress(peop.getEmail());
	newLic.setFax(peop.getFax());

	newLic.setAgencyCode(aa.getServiceProviderCode());
	newLic.setAuditDate(sysDate);
	newLic.setAuditID(currentUserID);
	newLic.setAuditStatus("A");

	if (AInfo["Insurance Co"])
		newLic.setInsuranceCo(AInfo["Insurance Co"]);
	if (AInfo["Insurance Amount"])
		newLic.setInsuranceAmount(parseFloat(AInfo["Insurance Amount"]));
	if (AInfo["Insurance Exp Date"])
		newLic.setInsuranceExpDate(aa.date.parseDate(AInfo["Insurance Exp Date"]));
	if (AInfo["Policy #"])
		newLic.setPolicy(AInfo["Policy #"]);

	if (AInfo["Business License #"])
		newLic.setBusinessLicense(AInfo["Business License #"]);
	if (AInfo["Business License Exp Date"])
		newLic.setBusinessLicExpDate(aa.date.parseDate(AInfo["Business License Exp Date"]));

	newLic.setLicenseType(rlpType);
	newLic.setLicState(addr.getState());
	newLic.setStateLicense(rlpId);

	if (updating)
		myResult = aa.licenseScript.editRefLicenseProf(newLic);
	else
		myResult = aa.licenseScript.createRefLicenseProf(newLic);

	if (!myResult.getSuccess()) {
		logDebug("**ERROR: can't create ref lic prof: " + myResult.getErrorMessage());
		return null;
	}

	logDebug("Successfully added/updated License No. " + rlpId + ", Type: " + rlpType + " Sequence Number " + myResult.getOutput());

	lpsmResult = aa.licenseScript.getRefLicenseProfBySeqNbr(servProvCode, myResult.getOutput())
		if (!lpsmResult.getSuccess()) {
			logDebug("**WARNING error retrieving the LP just created " + lpsmResult.getErrorMessage());
			return null
		}

		lpsm = lpsmResult.getOutput();

	// Now add the LP to the CAP

	asCapResult = aa.licenseScript.associateLpWithCap(capId, lpsm)
		if (!asCapResult.getSuccess()) {
			logDebug("**WARNING error associating CAP to LP: " + asCapResult.getErrorMessage())
		} else {
			logDebug("Associated the CAP to the new LP")
		}

		// Find the public user by contact email address and attach
		puResult = aa.publicUser.getPublicUserByEmail(peop.getEmail())
		if (!puResult.getSuccess()) {
			logDebug("**WARNING finding public user via email address " + peop.getEmail() + " error: " + puResult.getErrorMessage())
		} else {
			pu = puResult.getOutput();
			asResult = aa.licenseScript.associateLpWithPublicUser(pu, lpsm)
				if (!asResult.getSuccess()) {
					logDebug("**WARNING error associating LP with Public User : " + asResult.getErrorMessage());
				} else {
					logDebug("Associated LP with public user " + peop.getEmail())
				}
		}

		return lpsm;
}

function DateWithinXyears(pFileDate, numYears) {
	// This function will check if the date passed in is within X years of today (in the past if numYears is positive).

	var fileDate = new Date(pFileDate);

	var compareDate = new Date();
	compareDate.setDate(compareDate.getDate() - (365 * numYears));

	if (fileDate >= compareDate)
		return true;
	else
		return false;
}

function doLogic(licNum, licType) {
	//determines if expired (isExp variable in LPValidation() function);
	var WorkComExpDate = null;
	var ExemptCom = null;
	var ExpirationValue = null;
	var exDate = null;
	var insuDate = null;
	var isExp = null;

	var WCIEDName = "WC_Insur_Exp_Date";
	logDebug("WCIEDName = " + WCIEDName);
	var ExpirationName = "WC_Exempt_Exp_Date";
	logDebug("ExpirationName = " + ExpirationName);
	var WCEName = "WC_Exempt";
	logDebug("WCEName = " + WCEName);
	var agency = aa.getServiceProviderCode();

	var lpModel = aa.licenseScript.getRefLicensesProfByLicNbr(agency, licNum);
	if (lpModel.getSuccess()) {
		var lpModelArr = lpModel.getOutput();
	} else {
		logDebug("**WARNING: getting lic prof: " + lpModel.getErrorMessage());
		return true;
	}
	if (lpModelArr == null || !lpModelArr.length) {
		logDebug("**WARNING: no licensed professionals on this CAP");
		return true;
	}

	var myLpAttLen = lpModelArr.length;

	//Updated 9/8 by Beyondsoft
	licType = licType + '';

	for (var t = 0; t < myLpAttLen; t++) {
		var licVer = true;
		var wfVer = true;
		var wfVer2 = true;
		if (controlString == "LicProfLookupSubmitBefore") {
			//Updated 9/8 by Beyondsoft
			//if(lpModelArr[t].getLicenseType()!=licType)
			var tmpLicType = lpModelArr[t].getLicenseType() + '';
			if (tmpLicType != licType) {
				logDebug("License Type does not match.  licVer is false and no other validation will be checked.");
				licVer = false;
			}
		}
		if (licVer) {

			logDebug("INSIDE doLogic(), licVer is true so check ...");

			exDate = lpModelArr[t].getLicenseExpirationDate();
			insuDate = lpModelArr[t].getInsuranceExpDate();

			var thisLp = lpModelArr[t];
			var myAttributes = thisLp.getAttributes();

			//DQ 10/20/14 - If no attributes then should always return false because checked
			if (myAttributes == null) {
				return false;
			}

			var myPemModel = myAttributes.get("PeopleAttributeModel");
			var myLenArraty = myPemModel.toArray();
			var mylen = myLenArraty.length;
			for (var i = 0; i < mylen; i++) {

				var contactAttribute = myLenArraty[i];
				var capid = contactAttribute.getCapID();

				var name = contactAttribute.getAttributeName();
				var values = contactAttribute.getAttributeValue();

				logDebug("name and values: " + name + " : " + values);

				if (name == WCIEDName || name == WCIEDName.toUpperCase()) {
					logDebug("Attribute Name = " + WCIEDName + " (or uppercase). Set WorkComExpDate to: " + values);
					WorkComExpDate = values;
				}
				if (name == WCEName || name == WCEName.toUpperCase()) {
					logDebug("Attribute Name = " + WCEName + " (or uppercase). Set ExemptCom to: " + values);
					ExemptCom = values;
				}
				//DQ 8/26 check for exemption everytime
				//if(controlString=="WorkflowTaskUpdateBefore")
				//{
				if (name == ExpirationName || name == ExpirationName.toUpperCase()) {
					logDebug("Attribute Name = " + ExpirationName + "  (or uppercase). Set ExpirationValue to: " + values);
					ExpirationValue = values;
				}
				//}

			}

		}

	}

	logDebug("exDate (getLicenseExpirationDate): " + exDate);
	logDebug("insuDate (getInsuranceExpDate): " + insuDate);
	logDebug("WorkComExpDate (Attribute=" + WCIEDName + ") : " + WorkComExpDate);
	logDebug("ExemptCom (Attribute=" + WCEName + ") : " + ExemptCom);
	logDebug("ExpirationValue (Attribute= " + ExpirationName + ") : " + ExpirationValue);
	logDebug('Below is result of ExemptCom=="Y"');
	logDebug(ExemptCom == "Y");
	//DQ 8/26 if exempt use exemption date
	if (ExemptCom == "Y") {
		logDebug("In ExemptCom==Y.  Set WorkComExpDate=ExpirationValue");
		WorkComExpDate = ExpirationValue;
	}

	//logic
	if (controlString == "WorkflowTaskUpdateBefore") {
		logDebug("In controlString == 'WorkflowTaskUpdateBefore'");

		if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && (ExemptCom != "Y")) {
			wfVer2 = false;
		}
		if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
			WorkComExpDate = ExpirationValue;
		}
		if ((wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
			if (ExpirationValue == null) {
				return true;
			} else if (convertDateforLong(ExpirationValue) <= conSysDate(sysDate)) {
				return true;
			}
		}
	}

	if (wfVer2) {
		logDebug("In if[wfVer2]");

		if (WorkComExpDate == null || exDate == null || insuDate == null) {
			logDebug("in if wfVer2 and one of the expiration or insurance dates is NULL.  WorkComExpDate, exDate, insuDate");
			return true;
		} else if (convertDateforLong(WorkComExpDate) <= conSysDate(sysDate) || conDate(exDate) <= conSysDate(sysDate) || conDate(insuDate) <= conSysDate(sysDate)) {
			logDebug("WorkComExpDate: " + WorkComExpDate);
			logDebug("convertDateforLong(WorkComExpDate)<=conSysDate(sysDate): " + convertDateforLong(WorkComExpDate) <= conSysDate(sysDate));
			logDebug("conDate(exDate)<=conSysDate(sysDate): " + conDate(exDate) <= conSysDate(sysDate));
			logDebug("conDate(insuDate)<=conSysDate(sysDate)" + conDate(insuDate) <= conSysDate(sysDate));

			logDebug("in if wfVer2 and one of the expiration or insurance dates is EXPIRED!");
			return true;
		}
		if (controlString == "WorkflowTaskUpdateBefore") {
			if (!(wfStatus == "Issued" || wfStatus == "Permit issued" || wfStatus == "Permit Issued") && ExemptCom == "Y") {
				wfVer = false;
			}
		}
	}
	return isExp;
}

function emailPrimaryLP(emailSubject, emailMessage) {
	recLicProfArray = getLicenseProfessional(capId);

	if (recLicProfArray != null)
		for (recLic in recLicProfArray) {
			var recLP = "";

			recLP = recLicProfArray[recLic];

			if (recLP.getPrintFlag() != "Y")
				continue;

			recLPEmail = recLP.getEmail();

			if (recLPEmail != null)
				email(recLPEmail, "noreply@charlottefl.com", emailSubject, emailMessage);
		}
}

function FeeObj() {
	this.sequence = null;
	this.code = null;
	this.description = null;  // getFeeDescription()
	this.unit = null; //  getFeeUnit()
	this.amount = null; //  getFee()
	this.amountPaid = null;
	this.applyDate = null; // getApplyDate()
	this.effectDate = null; // getEffectDate();
	this.expireDate = null; // getExpireDate();
	this.status = null; // getFeeitemStatus()
	this.recDate = null;
	this.period = null; // getPaymentPeriod()
	this.display = null; // getDisplay()
	this.accCodeL1 = null; // getAccCodeL1()
	this.accCodeL2 = null; // getAccCodeL2()
	this.accCodeL3 = null; // getAccCodeL3()
	this.formula = null; // getFormula()
	this.udes = null; // String getUdes()
	this.UDF1 = null; // getUdf1()
	this.UDF2 = null; // getUdf2()
	this.UDF3 = null; // getUdf3()
	this.UDF4 = null; // getUdf4()
	this.subGroup = null; // getSubGroup()
	this.calcFlag = null; // getCalcFlag();
	this.calcProc = null; // getFeeCalcProc()
	this.auditDate = null; // getAuditDate()
	this.auditID = null; // getAuditID()
	this.auditStatus = null; // getAuditStatus()
	this.version = null; // getVersion()
}




function feesPaid() {
	var itemCap = capId;
	if (arguments.length > 0) {
		ltcapidstr = arguments[0];
		if (typeof(ltcapidstr) == "string") {
			var ltresult = aa.cap.getCapID(ltcapidstr);
			if (ltresult.getSuccess())
				itemCap = ltresult.getOutput();
			else {
				logMessage("**ERROR: Failed to get cap ID: " + ltcapidstr + " error: " + ltresult.getErrorMessage());
				return false;
			}
		} else
			itemCap = ltcapidstr;
	}
	var feeArr = new Array();
	var feeResult = aa.fee.getFeeItems(itemCap);
	if (feeResult.getSuccess()) {
		var feeObjArr = feeResult.getOutput();
	} else {
		logDebug("**ERROR: getting fee items: " + feeResult.getErrorMessage());
		return false;
	}
	for (ff in feeObjArr) {
		fFee = feeObjArr[ff];
		var myFee = new FeeObj();
		var amtPaid = 0;

		var pfResult = aa.finance.getPaymentFeeItems(itemCap, null);
		if (pfResult.getSuccess()) {
			var pfObj = pfResult.getOutput();
			for (ij in pfObj)
				if (fFee.getFeeSeqNbr() == pfObj[ij].getFeeSeqNbr())
					amtPaid += pfObj[ij].getFeeAllocation();
		}

		myFee.sequence = fFee.getFeeSeqNbr();
		myFee.code = fFee.getFeeCod();
		myFee.sched = fFee.getF4FeeItemModel().getFeeSchudle();
		myFee.description = fFee.getFeeDescription();
		myFee.unit = fFee.getFeeUnit();
		myFee.amount = fFee.getFee();
		myFee.amountPaid = amtPaid;
		if (fFee.getApplyDate())
			myFee.applyDate = convertDate(fFee.getApplyDate());
		if (fFee.getApplyDate())
			myFee.applyDateF = dateFormatted(fFee.getApplyDate().getMonth(), fFee.getApplyDate().getDayOfMonth(), fFee.getApplyDate().getYear(), "MM-DD-YYYY");
		if (fFee.getEffectDate())
			myFee.effectDate = convertDate(fFee.getEffectDate());
		if (fFee.getExpireDate())
			myFee.expireDate = convertDate(fFee.getExpireDate());
		myFee.status = fFee.getFeeitemStatus();
		myFee.period = fFee.getPaymentPeriod();
		myFee.display = fFee.getDisplay();
		myFee.accCodeL1 = fFee.getAccCodeL1();
		myFee.accCodeL2 = fFee.getAccCodeL2();
		myFee.accCodeL3 = fFee.getAccCodeL3();
		myFee.formula = fFee.getFormula();
		myFee.udes = fFee.getUdes();
		myFee.UDF1 = fFee.getUdf1();
		myFee.UDF2 = fFee.getUdf2();
		myFee.UDF3 = fFee.getUdf3();
		myFee.UDF4 = fFee.getUdf4();
		myFee.subGroup = fFee.getSubGroup();
		myFee.calcFlag = fFee.getCalcFlag();
		myFee.calcProc = fFee.getFeeCalcProc();
		myFee.version = fFee.getF4FeeItemModel().getVersion();

		feeArr.push(myFee);
	}

	return feeArr;
}

function finals() {

	var asi = '';
	asi = getAppSpecific('Flood Zone', capId);
	var elevCertPassedAll2 = false;
	var elevCertPassed3 = false;
	var elevCertPassed4 = false;
	elevCertPassed3 = checkInspectionResult('Elevation Certificate - Final', 'Pass');
	elevCertPassed4 = checkInspectionResult('Elevation Certificate - Final', 'Approved as Noted');
	//comment('elevCertPassed3=' + elevCertPassed3 + ' elevCertPassed4=' + elevCertPassed4);
	if ((elevCertPassed3 == true || elevCertPassed4 == true)) {
		elevCertPassedAll2 = true;
		comment('Elevation Certificate requirement met for Finals.');
	} else {
		comment('Elevation Cert required.');
	}

	if ((asi != null && asi != 'No' && asi != 'X' && asi != 'D' && elevCertPassedAll2 == false)) {
		comment('Flood zone = ' + asi);
		comment('An Elevation Certificate - Final is required.  Cancelling inspection...');
		cancel = true;
	}

}

function fullInsps() {

	if ((inspType == inspArray[insp].getInspectionType() && inspArray[insp].getInspectionStatus() == 'Pending')) {
		comment('DEL this ID: ' + inspArray[insp].getIdNumber());
		var InspM = aa.inspection.getInspection(capId, inspArray[insp].getIdNumber()).getOutput();
		InspM.getInspection().getActivity().setAuditStatus('I');
		aa.inspection.editInspection(InspM).getOutput();
		comment(inspArray[insp].getIdNumber() + ' has been removed for inspType: ' + inspArray[insp].getInspectionType());
	}

}

function getAddressLine(getPrimary) {
	//gets address returns, returns false if address not found
	//capId optional

	if (arguments.length == 2)
		itemCap = arguments[1]; // use cap ID specified in args;
	else
		itemCap = capId;

	var addressLineArray = new Array();

	addrResult = aa.address.getAddressByCapId(itemCap);

	if (addrResult.getSuccess()) {
		addr = addrResult.getOutput();

		if (addr.length > 0) {
			for (ad in addr) {
				var addressLine = "";
				//Build address into a line
				if (addr[ad].getHouseNumberStart() != null)
					addressLine += addr[ad].getHouseNumberStart();
				if (addr[ad].getStreetDirection() != null)
					addressLine += " " + addr[ad].getStreetDirection();
				if (addr[ad].getStreetName() != null)
					addressLine += " " + addr[ad].getStreetName();
				if (addr[ad].getStreetSuffix() != null)
					addressLine += " " + addr[ad].getStreetSuffix();
				if (addr[ad].getStreetSuffixdirection() != null)
					addressLine += " " + addr[ad].getStreetSuffixdirection();
				/*Get city,state,zip
				if(addr[ad].getCity() != null) addressLine += ", " + addr[0].getCity();
				if(addr[ad].getState() != null) addressLine += ", " + addr[0].getState();
				if(addr[ad].getZip() != null) addressLine += " " + addr[0].getZip(); */

				//check for primary if getPrimary = "Y"
				if (getPrimary.equals("Yes")) {
					if (addr[ad].getPrimaryFlag() == "Y") {
						logDebug("Sending Primary Address");
						return addressLine;
					}
				} else {
					logDebug("Adding " + [ad] + " to array");
					addressLineArray.push(addressLine);
				}

			}
		} else
			return false;

		if (addressLineArray.length > 0)
			return addressLineArray[0];
	} else
		return false;

}

function getDRImatch(DRIname) {

	driResult = aa.cap.getByAppType("Planning", "Growth Mgmt", "DRI", "NA");

	var mySearchStr = DRIname.toUpperCase();

	if (driResult.getSuccess()) {
		driArray = driResult.getOutput();
	}
	var DRIflag = 0;

	for (x in driArray) {
		capObj = driArray[x];
		var capId = capObj.getCapID();
		var altCapId = aa.cap.getCapID(capId.getID1(), capId.getID2(), capId.getID3()).getOutput();
		var capIDString = altCapId.getCustomID();
		var myAppStat = capObj.getCapStatus();
		var myCapDes = aa.cap.getCapWorkDesByPK(capId);
		var workDescObj = myCapDes.getOutput();
		var workDesc = workDescObj.getDescription().toUpperCase();
		var myDummyPROX = workDesc;

		if (myAppStat == "Closed") {
			var result = myDummyPROX.search(mySearchStr);
			if (result == 0) {
				DRIflag--;
			}
		}
		if (myAppStat == null) {
			var myDummyPROX = workDesc;
			var result = myDummyPROX.search(mySearchStr);
			if (result == 0) {
				DRIflag++;
			}
		}
	}

	if (DRIflag >= 0) {
		return true;
	} else {
		return false;
	}
}

function getFinaledWorkflowStatus() {
	logDebug("FUNCTION: getFinaledWorkflowStatus() ... ");

	//Need to check the Record Types and return status of "C of O Issued" or "Finaled" (default)

	logDebug("Application Type is: " + appTypeString);

	//This function is called for the Building module, so no need to check that here
	if (appTypeArray[1] == "Construction") {
		if (appTypeArray[2] == "Commercial" && matches(appTypeArray[3], "Addition", "Build Out", "Change of Occupancy", "Commercial Building", "DCA Office", "Modular", "Multi-Family")) {
			logDebug("Return status of C of O Issued");
			return "C of O Issued";
		}

		if (appTypeArray[2] == "Residential" && matches(appTypeArray[3], "Addition", "DCA Home", "Duplex", "Mobile Home", "Modular", "Single Family", "Townhouse")) {
			logDebug("Return status of C of O Issued");
			return "C of O Issued";
		}

		//Default need to return "Finaled"
		logDebug("Return status of Finaled");
		return "Finaled";
	} else {
		logDebug("Return status of Finaled");
		return "Finaled";
	}
}

function getInspBFStat(ioCap) {
	var myCnt = 0
		var myCapId = aa.cap.getCapID(ioCap);

	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		myCobj = aa.cap.getCap(myCap).getOutput();
		var CapTypeResult = myCobj.getCapType();
		var capIDString = myCap.getCustomID();
		var CapTypeResult = myCobj.getCapType();
		var myGroup = CapTypeResult.getGroup();
		var myType = CapTypeResult.getType();
		var mySubType = CapTypeResult.getSubType();
		var myCat = CapTypeResult.getCategory();
		var getResult = aa.inspection.getInspections(myCap);
		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				var inspStatus = list[ei].getInspectionStatus();
				var inSpector = list[ei].getInspector();
				var inspSched = list[ei].getScheduledDate()
					var cap2 = list[ei].getCapID()
					if (inspType == "Building Final") {
						myCnt = myCnt + 1
					}
			}
		}
	}
	if (myCnt > 0) {
		return true
	} else {
		return false
	}
}

function GetLicInfo(myLicNo) {
	var lpArr = GetLicModel(myLicNo);
	if (lpArr != false) {
		for (x in lpArr) {
			var thisLp = lpArr[x];
			var licStatusC = thisLp.getAuditStatus();
			if (licStatusC == "A") {
				var myInsInfo = GetLicInsInfo(thisLp, myLicNo);
				return myInsInfo;
			} else {
				return "This is not a valid license.";
			}
		}
	} else {
		return "This is not a valid license.";
	}
}

function GetLicInsInfo(thisLp, myLicNo) {
	var WCexFlag = 0
		var licType = thisLp.getLicenseType();
	if (licType == "OWNER BUILDER" || licType == "UNLICENSED CONTRACTOR" || licType == "COUNTY EMPLOYEE") {
		logDebug("Unable to process OWNER BUILDER, UNLICENSED CONTRACTOR, COUNTY EMPLOYEE.");
		aa.print("Unable to process OWNER BUILDER, UNLICENSED CONTRACTOR, COUNTY EMPLOYEE.");
		aa.abortScript();
	}
	var bizName = thisLp.getBusinessName();
	var licExpDt = thisLp.getLicenseExpirationDate();
	var licExpDtF = convertDate(licExpDt);
	var insExpDt = thisLp.getInsuranceExpDate();
	var insExpDtF = convertDate(insExpDt);
	var myAttributes = thisLp.getAttributes();

	if (myAttributes == null) {
		logDebug("no attributes to print");
	} else {
		var myPemModel = myAttributes.get("PeopleAttributeModel");
		var myLenArraty = myPemModel.toArray();
		var mylen = myLenArraty.length;
		for (var i = 0; i < mylen; i++) {
			var contactAttribute = myLenArraty[i];
			var capid = contactAttribute.getCapID();
			var name = contactAttribute.getAttributeName();
			var values = contactAttribute.getAttributeValue();
			if ((name == "WC_Exempt" || name == "WC_EXEMPT") && values != "N") {
				WCexFlag = 1;
			}
			if ((name == "WC_Exempt_Exp_Date" || name == "WC_EXEMPT_EXP_DATE") && (values != null)) {
				var myWCexemptExpDt2 = values;
				var myWCexemptExpDt = new Date(myWCexemptExpDt2);
			}
			if ((name == "WC_Insur_Exp_Date" || name == "WC_INSUR_EXP_DATE") && values != null) {
				var myWCexpDt2 = values;
				var myWCexpDt = new Date(myWCexpDt2);
			}
		}
		var sysDate = aa.date.getCurrentDate();
		var todayF = convertDate(sysDate);
		if (todayF < licExpDtF) {
			var licFlag = true;
		} else {
			var licFlag = false;
		}
		if (todayF < insExpDtF) {
			var insFlag = true;
		} else {
			var insFlag = false;
		}
		if (WCexFlag == 0) {
			if (todayF < myWCexpDt) {
				var WCflag = true;
			} else {
				var WCflag = false;
			}
		} else {
			if (todayF < myWCexemptExpDt) {
				var WCflag = true;
			} else {
				var WCflag = false;
			}
		}
		if (licFlag == false || insFlag == false || WCflag == false) {
			var myInfo1 = "";
			var myInfo2 = "";
			var myInfo3 = "";
			if (licFlag == false) {
				myInfo1 = " License expired."; //insurance and/or license expired.
			}
			if (insFlag == false) {
				myInfo2 = " Insurance expired."; //insurance and/or license expired.
			}
			if (WCflag == false) {
				myInfo3 = " WC insurance expired."; //insurance and/or license expired.
			}
			var myInfo = [true, myLicNo + myInfo1 + myInfo2 + myInfo3];
			logDebug(myInfo);
			return myInfo;
		} else {
			return false
		}
	}
}

function GetLicModel(myLicNo) {
	var myInfo = "";
	var LicNo = myLicNo;
	var lpModel = aa.licenseScript.getRefLicensesProfByLicNbr("BOCC", LicNo);
	if (lpModel.getSuccess()) {
		var lpModelArr = lpModel.getOutput();
		if (lpModelArr != null) {
			return lpModelArr;
		} else {
			return false;
		}
	}
}

function getMyLastInsp(insp2Cinspheck, myCapID) {
	var myCapId = aa.cap.getCapID(myCapID);
	var myInspType = insp2Cinspheck;
	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		myCobj = aa.cap.getCap(myCap).getOutput();
		var capIDString = myCap.getCustomID();
		var getResult = aa.inspection.getInspections(myCap);
		var myInsp2 = "n/a";

		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			var lastInsp = "";
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				if (inspType == myInspType) {

					var inspStatus = list[ei].getInspectionStatus();
					var inSpector = list[ei].getInspector();
					aa.print(inspType + " inspector: " + inSpector);
					if (inSpector != "") {
						var myInsp2 = inSpector
					}
				}
			}
		}
	}
	return myInsp2;
}

function GISFloodPlain(svc, layer, distance, attrib) {
	//return attributes from multiple GIS Objects when a parcel crosses multiple flood zones
	var ret = "";
	var myBuff = getGISBufferInfo(svc, layer, distance, attrib);
	for (x in myBuff) {
		var var1 = myBuff[x][attrib];
		if (ret == "")
			ret = var1;
		else if (ret.indexOf(var1) < 0)
			ret += "," + var1;
	}

	return ret;
}

function isDRIexpir(capId) {
	var capId = aa.cap.getCapID(capId);
	if (capId.getSuccess()) {
		capId = capId.getOutput();
	} else {
		aa.print(capId.getErrorMessage());
		aa.abortScript();
	}
	var capIDString = capId.getCustomID();

	var capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
	var Parcels = capParcelResult.getOutput().toArray();
	var parcelObj = Parcels[0];
	var parcelNumber = parcelObj.getParcelNumber();

	var proxType = "DRI";
	var myProx = proximityInfo("AGIS_CHARCO", proxType, 1);
	if (myProx != undefined && myProx != 0) {
		if (proxType == "DRI") {
			var myType = "Project Name";
			var asi = getAppSpecific(myType, capId);
			var asiCapId = aa.cap.getCapID(asi);
			if (asiCapId.getSuccess()) {
				var capIdASI = asiCapId.getOutput()
					var capIDStringASI = capIdASI.getCustomID();
				var appSpecificInfo = new Array();
				var appSpecificInfo = aa.appSpecificInfo.getByCapID(capIdASI);
				if (appSpecificInfo.getSuccess()) {
					var fAppSpecInfoObj = appSpecificInfo.getOutput();
					for (loopk in fAppSpecInfoObj)
						if (fAppSpecInfoObj[loopk].getCheckboxDesc() == "EXPIRATION DATE") { //NOTE:  in Prod = "Expiration Date"
							var myDateFlag = 0
								var sysDate = aa.date.getCurrentDate();
							myDt = "";
							myDt = fAppSpecInfoObj[loopk].getChecklistComment()
								if (myDt == null) {
									myDt = "01/01/2050";
									myDateFlag = 1;
								}
								myDt = aa.date.parseDate(myDt);
							if (myDateFlag == 0) {
								var myDtMMDDYYYY = dateFormatted(myDt.getMonth(), myDt.getDayOfMonth(), myDt.getYear(), "MM/DD/YYYY");
							} else {
								var myDtMMDDYYYY = null
							}
							var filterDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "MM/DD/YYYY");
							myDt = convertDate(myDt);
							sysDate = convertDate(sysDate);
							if (myDt > sysDate) {
								return false;
							} else {
								return true;
							}
						}
				} else {
					aa.print("This CAP has not been found.");
					aa.abortScript();
				}
			}
		}

	} else {
		if (myProx == undefined) {
			return false;
		} else {
			return false;
		}
	}
}

function lastInspEmail(myCapID, insp2Cinspheck) {
	var myCapId = aa.cap.getCapID(myCapID);
	var myInspType = insp2Cinspheck;
	if (myCapId.getSuccess()) {
		myCap = myCapId.getOutput();
		var capIDString = myCap.getCustomID();
		var getResult = aa.inspection.getInspections(myCap);
		if (getResult.getSuccess()) {
			var list = getResult.getOutput();
			var lastInsp = "";
			for (ei in list) {
				var inspType = list[ei].getInspectionType();
				var inspStatus = list[ei].getInspectionStatus();
				var inSpector = list[ei].getInspector();
				var inspSched = list[ei].getScheduledDate();
				var cap2 = list[ei].getCapID();
				var inspID = list[ei].getIdNumber();
				if (inspSched != null) {
					var inspSched = dateFormatted(inspSched.getMonth(), inspSched.getDayOfMonth(), inspSched.getYear(), "MM-DD-YYYY");
				} else {
					var inspSched = "N/A"
				}
				if (inspType == insp2Cinspheck && inspStatus != "Pending") {
					if (inspStatus.length) {
						var lastInsp = inSpector;
					}
				}
			}
		}
		var nameArray = new Array();
		nameArray = String(lastInsp).split("/");
		var inspTor2 = nameArray[6];
		var nameArray2 = new Array();
		nameArray2 = String(inspTor2).split(" ");
		var firstname = nameArray2[0];
		var lastname = nameArray2[1];
		var lastInspObj = aa.person.getUser(firstname, "", lastname).getOutput();
		var lastInspU = lastInspObj.getUserID();
		var userEml = lastInspObj.getEmail();
		return (userEml);
	}
}

function LPValidation() {
	var isExp = null;
	if (controlString == "ApplicationSubmitBefore") {
		var LicProfList = aa.env.getValue("LicProfList");
		if (LicProfList != "") {
			LicProfList = LicProfList.toArray();
			for (var thisLic in LicProfList) {
				licProfScriptModel = LicProfList[thisLic];
				licNum = licProfScriptModel.getLicenseNbr();
				logDebug("Lic Num (ASB): " + licNum);
				isExp = doLogic(licNum, null);
				if (isExp == true)
					return true; //is expired license
			}
		}
	} else if (controlString == "LicProfLookupSubmitBefore") {
		var LicenseList = aa.env.getValue("LicenseList");
		if (LicenseList != "") {
			for (var i = 0; i < LicenseList.size(); i++) {
				var licProfModel = LicenseList.get(i);
				var licenseType = licProfModel.getInsuranceExpDate();
				var getWcExempt = licProfModel.getWcExempt();
				var licNum = licProfModel.stateLicense;
				var licType = licProfModel.getLicenseType();
				logDebug("Lic Num: " + licNum + ", License Type is " + licType + ", and Work is on or above ASI: "); //
				isExp = doLogic(licNum, licType);
				if (isExp == true)
					return true;
			}
		}
	} else if (controlString == "WorkflowTaskUpdateBefore") {
		var LicenseListResult = aa.licenseScript.getLicenseProf(capId);
		if (LicenseListResult.getSuccess()) {
			var LicenseList = LicenseListResult.getOutput();
		} else {
			logDebug("**WARNING: getting lic prof: " + LicenseListResult.getErrorMessage());
			return true;
		}
		if (LicenseList == null || !LicenseList.length) {
			logDebug("**WARNING: no licensed professionals on this CAP");
			return false;
		}
		for (var i = 0; i < LicenseList.length; i++) {
			var licProfModel = LicenseList[i];
			var licNum = licProfModel.getLicenseNbr();
			logDebug("Lic Num (WTUB): " + licNum);
			isExp = doLogic(licNum, null);
			if (isExp == true)
				return true;
		}
	}
	if (isExp == true)
		return true;
	else
		return false;
}

function mEXTENDpd(myCapID) {
	var meFlag = 0;
	var feeA = feesPaid(myCapID);
	var sysDate = aa.date.getCurrentDate();
	var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "MM-DD-YYYY");

	for (x in feeA) {
		thisFee = feeA[x];
		if (thisFee.code == "M-EXTEND" || thisFee.code == "M-EXTEND2") {
			if (thisFee.status == "INVOICED") {
				if (thisFee.amountPaid > 50) {
					if (thisFee.applyDateF == sysDateMMDDYYYY) {
						myResult = "Fee: " + thisFee.code + " status: " + thisFee.status + " amt pd: $" + thisFee.amountPaid + " on " + thisFee.applyDateF;
						meFlag++

					}
				}
			}
		}
	}

	if (meFlag > 0) {
		return true;
	} else {
		return false;
	}
}

function myfeeAmountExcept(checkCapId) {
	var checkStatus = false;
	var exceptArray = new Array();
	//get optional arguments
	if (arguments.length > 1) {
		checkStatus = true;
		for (var i = 1; i < arguments.length; i++)
			exceptArray.push(arguments[i]);
	}

	var feeTotal = 0;
	var feeResult = aa.fee.getFeeItems(checkCapId);
	if (feeResult.getSuccess()) {
		var feeObjArr = feeResult.getOutput();
	} else {
		logDebug("**ERROR: getting fee items: " + capContResult.getErrorMessage());
		return false
	}

	for (ff in feeObjArr)
		if (!checkStatus || !exists(feeObjArr[ff].getFeeCod(), exceptArray))
			feeTotal += feeObjArr[ff].getFee()

			return feeTotal;
}

function myproximityInfo(svc, layer, numDistance) {
	var distanceType = "feet"
		if (arguments.length == 4)
			distanceType = arguments[3];
		var bufferTargetResult = aa.gis.getGISType(svc, layer);
	if (bufferTargetResult.getSuccess()) {
		var buf = bufferTargetResult.getOutput();
		buf.addAttributeName(layer + "_ID");
	} else {
		aa.print("**WARNING: Getting GIS Type for Buffer Target.  Reason is: " + bufferTargetResult.getErrorType() + ":" + bufferTargetResult.getErrorMessage());
		return false
	}
	var gisObjResult = aa.gis.getCapGISObjects(capId);
	if (gisObjResult.getSuccess())
		var fGisObj = gisObjResult.getOutput();
	else {
		aa.print("**WARNING: Getting GIS objects for Cap.  Reason is: " + gisObjResult.getErrorType() + ":" + gisObjResult.getErrorMessage());
		return false
	}
	for (a1 in fGisObj) {
		var bufchk = aa.gis.getBufferByRadius(fGisObj[a1], numDistance, distanceType, buf);
		if (bufchk.getSuccess())
			var proxArr = bufchk.getOutput();
		else {
			aa.print("**WARNING: Retrieving Buffer Check Results.  Reason is:  missing " + layer + " / " + bufchk.getErrorType() + ":" + bufchk.getErrorMessage());
			return 0
		}
		for (a2 in proxArr) {
			var proxObj = proxArr[a2].getGISObjects();
			for (z1 in proxObj) {
				var v = proxObj[z1].getAttributeValues();
				for (g in v) {
					myName = v[g]
				}
				return myName;
			}

		}
	}
}

function proximityInfo(svc, layer, numDistance) {
	var distanceType = "feet"
		if (arguments.length == 4)
			distanceType = arguments[3];
		var bufferTargetResult = aa.gis.getGISType(svc, layer);
	if (bufferTargetResult.getSuccess()) {
		var buf = bufferTargetResult.getOutput();
		buf.addAttributeName(layer + "_ID");
	} else {
		aa.print("**WARNING: Getting GIS Type for Buffer Target.  Reason is: " + bufferTargetResult.getErrorType() + ":" + bufferTargetResult.getErrorMessage());
		return false
	}
	var gisObjResult = aa.gis.getCapGISObjects(capId);
	if (gisObjResult.getSuccess())
		var fGisObj = gisObjResult.getOutput();
	else {
		aa.print("**WARNING: Getting GIS objects for Cap.  Reason is: " + gisObjResult.getErrorType() + ":" + gisObjResult.getErrorMessage());
		return false
	}
	for (a1 in fGisObj) {
		var bufchk = aa.gis.getBufferByRadius(fGisObj[a1], numDistance, distanceType, buf);
		if (bufchk.getSuccess())
			var proxArr = bufchk.getOutput();
		else {
			aa.print("**WARNING: Retrieving Buffer Check Results.  Reason is:  missing " + layer + " / " + bufchk.getErrorType() + ":" + bufchk.getErrorMessage());
			return 0
		}
		for (a2 in proxArr) {
			var proxObj = proxArr[a2].getGISObjects();
			for (z1 in proxObj) {
				var v = proxObj[z1].getAttributeValues();
				for (g in v) {
					myName = v[g]
				}
				return myName;
			}

		}
	}
}


function proximityInfodri(svc, layer, numDistance, pCap) {
	var capId = pCap;
	var distanceType = "feet";
	if (arguments.length == 4)
		distanceType = arguments[3];
	var bufferTargetResult = aa.gis.getGISType(svc, layer);
	if (bufferTargetResult.getSuccess()) {
		var buf = bufferTargetResult.getOutput();
		buf.addAttributeName(layer + "_ID");
	} else {
		aa.print("**WARNING: Getting GIS Type for Buffer Target.  Reason is: " + bufferTargetResult.getErrorType() + ":" + bufferTargetResult.getErrorMessage());
		return false;
	}
	var gisObjResult = aa.gis.getCapGISObjects(capId);
	if (gisObjResult.getSuccess())
		var fGisObj = gisObjResult.getOutput();
	else {
		aa.print("**WARNING: Getting GIS objects for Cap.  Reason is: " + gisObjResult.getErrorType() + ":" + gisObjResult.getErrorMessage());
		return false;
	}
	for (a1 in fGisObj) {
		var bufchk = aa.gis.getBufferByRadius(fGisObj[a1], numDistance, distanceType, buf);
		if (bufchk.getSuccess())
			var proxArr = bufchk.getOutput();
		else {
			aa.print("**WARNING: Retrieving Buffer Check Results.  Reason is:  missing " + layer + " / " + bufchk.getErrorType() + ":" + bufchk.getErrorMessage());
			return 0;
		}
		for (a2 in proxArr) {
			var proxObj = proxArr[a2].getGISObjects();
			for (z1 in proxObj) {
				var v = proxObj[z1].getAttributeValues();
				for (g in v) {
					myName = v[g]
				}
				return myName
			}

		}
	}
}

function seaTurtle() {

	if (proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1)) {
		var cap = aa.cap.getCap(capId).getOutput();
		var CapTypeResult = cap.getCapType();
		addrResult = aa.address.getAddressByCapId(capId);
		var addrArray = new Array();
		var addrArray = addrResult.getOutput();
		var streetName = addrArray[0].getStreetName();
		var hseNum = addrArray[0].getHouseNumberStart();
		var streetSuffix = addrArray[0].getStreetSuffix();
		var city = addrArray[0].getCity();
		var zip = addrArray[0].getZip();
		(streetSuffix == null);
	} else {
		streetSuffix = '';
		var etext;
		etext = 'Permit # ' + capIDString + '<BR>Permit type: ' + CapTypeResult + '<BR>ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip;
		email('info@coastalwildlifeclub.org', 'NoReply@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
		email('Kevin.Lapham@charlottecountyfl.gov', 'coastalWildlife.CondAUDIT@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
	}

}

function seaTurtleMonitor() {

	var cap = aa.cap.getCap(capId).getOutput();
	var CapTypeResult = cap.getCapType();
	addrResult = aa.address.getAddressByCapId(capId);
	var addrArray = new Array();
	var addrArray = addrResult.getOutput();
	var streetName = addrArray[0].getStreetName();
	var hseNum = addrArray[0].getHouseNumberStart();
	var streetSuffix = addrArray[0].getStreetSuffix();
	var city = addrArray[0].getCity();
	var zip = addrArray[0].getZip();
	if (streetSuffix == null)
		streetSuffix = '';
	var etext;
	etext = 'Permit # ' + capIDString + '<BR>Permit type: ' + CapTypeResult + '<BR>ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip;
	email('Suzanne.Derheimer@charlottecountyfl.gov', 'NoReply@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
	email('William.Byle@charlottecountyfl.gov', 'NoReply@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
	email('Kevin.Lapham@charlottecountyfl.gov', 'CondAUDIT.STMonitor@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);

}

function validateLicenseTypeForCap() {

	fixedCAPType = '';
	if (arrAllowedCAPTypes[xy].indexOf('///') != -1) {
		fixedCAPType = arrAllowedCAPTypes[xy].substring(0, arrAllowedCAPTypes[xy].indexOf('/')) + '/*/*/*';
	}
	if (fixedCAPType == '' && arrAllowedCAPTypes[xy].indexOf('//') != -1) {
		fixedCAPType = arrAllowedCAPTypes[xy].substring(0, arrAllowedCAPTypes[xy].indexOf('//')) + '/*/*';
	}
	if (fixedCAPType == '' && arrAllowedCAPTypes[xy].charAt(arrAllowedCAPTypes[xy].length - 1) == '/') {
		fixedCAPType = arrAllowedCAPTypes[xy] + '*';
	}
	if (fixedCAPType == '') {
		fixedCAPType = arrAllowedCAPTypes[xy];
	}
	if (appMatch(fixedCAPType)) {
		return true;
	}

}

function workflowInfo() {

	showMessage = false;
	var myCap = String(capIDString);
	var Subj = wfTask + ' Status Update for Permit # ' + myCap + ' (' + wfStatus + ')';
	addrResult = aa.address.getAddressByCapId(capId);
	var addrArray = new Array();
	var addrArray = addrResult.getOutput();
	var streetName = addrArray[0].getStreetName();
	var hseNum = addrArray[0].getHouseNumberStart();
	var streetSuffix = addrArray[0].getStreetSuffix();
	var city = addrArray[0].getCity();
	var zip = addrArray[0].getZip();
	var profArr = new Array();
	var EmlBod = '';
	profArr = getLicenseProfessional(capId);
	var emailAddress;
	if (profArr != null) {
		for (x in profArr)
			if (profArr[x].getPrintFlag() == 'Y')
				emailAddress = profArr[x].getEmail();
		comment('emailAddress = ' + emailAddress);
	}

	if ((emailAddress == 'NA' || emailAddress == 'na' || emailAddress == null || emailAddress == 'NONE' || emailAddress == 'NA' || emailAddress == 'none')) {
		emailAddress = 'TinaC.Jones@charlottecountyfl.gov';
	}

	nameArray = new Array();
	nameArray = String(aa.person.getUser(wfStaffUserID).getOutput()).split('/');
	var revBy = nameArray[6];
	EmlBod = '<br>Permit Type: ' + appTypeString + '<br>Address: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ' ' + city + ' ' + zip + '<br>Permit # ' + myCap + '<br>Task: ' + wfTask + ' - ' + wfStatus + '<br>Comment: ' + wfComment + '<br>Reviewed by: ' + revBy;
	var endText = '<br>This is a courtesy message noting a new comment on a plan review.  Questions?  Contact the Charlotte County Community Development Department at 941-743-1201.';
	comment(endText);
	if (wfComment != null) {
		aa.sendMail('NoReply@CharlotteCountyFL.gov', emailAddress, '', Subj, EmlBod + '<br>' + endText);
		aa.sendMail('NoReply@CharlotteCountyFL.gov', 'TinaC.Jones@charlottecountyfl.gov', '', Subj, 'To: ' + emailAddress + '<br>' + EmlBod + '<br>' + endText);
	}

}

