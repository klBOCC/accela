//IRSA:PLANNING/GROWTH MGMT/ZONING PERMITS/:  	start refactored branch: CC_151_GM_ZN_InspResultAfter

showMessage = true;

var PermitId1 = aa.env.getValue("PermitId1");
var PermitId2 = aa.env.getValue("PermitId2");
var PermitId3 = aa.env.getValue("PermitId3");

capResult = aa.cap.getCapID(PermitId1, PermitId2, PermitId3);
if (capResult.getSuccess()) {
    var capId = capResult.getOutput();
    aa.print("capId: " + capId);
    var capIDString = capId.getCustomID();
    aa.print("capIDString : " + capIDString);
}

var InspectionIdArray = aa.env.getValue("InspectionIdArray");
var InspectionId = aa.env.getValue("InspectionId");
var inspComment = aa.env.getValue("InspectionResultComment");
var inspType = aa.env.getValue("InspectionType");
aa.print("inspType=" + inspType);
var inspectionList = aa.env.getValue("InspectionTypeArray");
aa.print("inspectionList = " + inspectionList);
aa.print("insp length=" + inspectionList.length);
var commentList = aa.env.getValue("InspectionResultCommentArray");

if (inspType == "" || inspType == " " || inspType == null) {
    for (x in inspectionList) {
        InspectionId = InspectionIdArray[x];
        aa.print("InspectionIdArray = " + InspectionIdArray);
        inspType = inspectionList[x];
        aa.print("inspectionList" + x + ":" + inspType);
        inspComment = commentList[x];
        aa.print("commentList" + x + ":" + inspComment);
        var inspObj = aa.inspection.getInspection(capId, InspectionId).getOutput();
        var inspGroup = inspObj.getInspection().getInspectionGroup();
        aa.print("inspGroup (arr)== " + inspGroup);
        var inComm = inspObj.getInspectionComments();
        if (inComm == null) {
            inComm = "";
        }
        var mySearch = /emailed/i;
        var result = mySearch.test(inComm);
        if (result == false && inspResult != "") {
            fullIRSA(capIDString, inspType, inspComment, inspGroup);
            var inComm2 = inspObj.setInspectionComments(inComm + " " + "emailed");
            aa.inspection.editInspection(inspObj);
        }
    }

} else {
    if (inspResult != "") {
        var inspObj = aa.inspection.getInspection(capId, InspectionId).getOutput();
        var inspGroup = inspObj.getInspection().getInspectionGroup();
        aa.print("inspGroup == " + inspGroup);
        fullIRSA(capIDString, inspType, inspComment, inspGroup);
        aa.print("inspType sent =" + inspType);
    }
}



if (inspResult == "") {
    comment("DELETE PENDINGS:  " + capIDString);
    oInspList = aa.inspection.getInspections(capId);
    inspArray = oInspList.getOutput();
    comment(inspArray);
    if (inspArray.length > 0) {
        for (insp in inspArray) {
            fullInsps();
        }
    }
}

function fullIRSA(capIDString, inspType, inspComment, inspGroup) {

    aa.print("inspType arr = " + inspType);

    var myInsp = String(inspType);
    var myCapId = String(capIDString);
    aa.print("Insp + CapId:" + myInsp + " / " + myCapId);
    aa.print(PermitId1 + " " + PermitId2 + " " + PermitId3);


    //ZONING: FENCES
    if (inspResult == 'Fail with Fee') {
        addFee('REJ-B', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
        comment('Fail with fee executed.');
    }

    if (inspResult == 'Fail') {
        addFee('REJ-B', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
        comment('Fail with fee executed.');
    }

    if (inspResult == 'Fail with Fee x 2') {
        addFee('REJ-B2', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
        comment('Fail with fee executed.');
    }

    if (inspResult == 'Fail with Fee x 3') {
        addFee('REJ-B3', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
        comment('Fail with fee executed.');
    }

    if (matches(inspResult, 'Fail with Fee Z', 'Fail with Fee x 2 Z', 'Fail with Fee x 3 Z')) {
        addFee('REJ-Z', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
        comment('Fail with fee executed.');
    }

    if (inspResult == 'Fail ROW') {
        addFee('10-ROWREIN', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (inspResult == 'Fail Re-inspect') {
        addFee('M-STWTRREI', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    var capIDString = capId.getCustomID();
    comment(capIDString);
    oInspList = aa.inspection.getInspections(capId);
    inspArray = oInspList.getOutput();
    comment(inspArray);
    if (appMatch('Planning/Growth Mgmt/Zoning Permits/Residential Fence') && inspType == 'Zoning Final' && matches(inspResult, 'Pass', 'Approved as Noted', 'Not Required') && balanceDue == 0) {
        pendingInspectionExists = checkForPendingInspections();
        if (pendingInspectionExists)
            for (insp in inspArray)
                //replaced branch(fullInsps)
                fullInsps();
    }

    if (appMatch('Planning/Growth Mgmt/Zoning Permits/Residential Fence') && matches(inspResult, 'Pass', 'Approved as Noted', 'Not Required') && balanceDue == 0) {
        pendingInspectionExists = checkForPendingInspections();
        if (!pendingInspectionExists)
            branchTask('Finaled', getFinaledWorkflowStatus());
    }


    if ((inspResult.indexOf('Fail') > -1 || inspResult.indexOf('Partial') > -1 || inspResult.indexOf('Cancelled') > -1)) {
        createPendingInspection(inspGroup, inspType);
    }
    //end replaced branch: CC_151_GM_ZN_InspResultAfter;

    if (matches(inspResult, 'Cancelled by County', 'Cancelled by Applicant')) {
        // START REPLACED BRANCH CANCELEMAIL2
        var currentDt = new Date(inspSchedDate);
        var dd = currentDt.getDate();
        var mm = currentDt.getMonth() + 1;
        var yyyy = currentDt.getFullYear();
        var myDateStr = mm + '/' + dd + '/' + yyyy;
        comment('myDateStr = ' + myDateStr);
        var StrCapID = String(capIDString);
        var StrInspType = String(inspType);
        var insEmail = lastInspEmail(StrCapID, StrInspType);
        if (lastInspEmail(myCapId, myInsp) != null) {
            var myLast = lastInspEmail(myCapId, myInsp);
        } else {
            var myLast = "TinaC.Jones@charlottecountyfl.gov";
        }

        var sysDate = new Date();
        var sdd = sysDate.getDate();
        var smm = sysDate.getMonth() + 1;
        var syyyy = sysDate.getFullYear();
        comment('FORMATED sys DATE: ' + smm + '/' + sdd + '/' + syyyy);
        var text2 = 'Permit # ' + capId.getCustomID() + '<br>Type: ' + inspType + ' scheduled on ' + inspSchedDate;
        var addrResult = aa.address.getAddressByCapId(capId);
        var addrArray = new Array();
        addrArray = addrResult.getOutput();
        var hseNum = addrArray[0].getHouseNumberStart();
        var streetName = addrArray[0].getStreetName();
        var zip = addrArray[0].getZip();
        var city = addrArray[0].getCity();
        var etext = 'at Address: ' + hseNum + ' ' + streetName + ', ' + city + ' ' + zip + '\n' + 'has been ';
        comment('A cancellation email would be sent TO:  ' + insEmail + ' with the following details:');
        comment(text2 + '\n' + etext + '\n' + inspResult + '.');
        if (mm <= smm && dd <= sdd && yyyy <= syyyy) {
            comment('date validated --> to email / INSPECTION: ' + inspType);
            comment('date validated? --> to email / INSPECTION: ' + inspType);
            email(insEmail, 'NoReply_Accela@CharlotteCountyFL.gov', inspType + ' CANCEL - Permit ' + capIDString, text2 + '<br>' + etext + '<br>' + inspResult + ' on ' + smm + '/' + sdd + '/' + syyyy);
        }
        // end REPLACED BRANCH CANCELEMAIL2
    }


    //start replaced branch contractor_inspection'
    var myLastN = getMyLastInsp(myInsp, myCapId);
    aa.print("LastN = " + myLastN);
    if (lastInspEmail(myCapId, myInsp) != null) {
        var myLast = lastInspEmail(myCapId, myInsp);
    } else {
        var myLast = "TinaC.Jones@charlottecountyfl.gov";
    }
    var emlInsp = myLast + '<br>' + myLastN;
    addrResult = aa.address.getAddressByCapId(capId);
    var addrArray = new Array();
    var addrArray = addrResult.getOutput();
    var streetName = addrArray[0].getStreetName();
    var hseNum = addrArray[0].getHouseNumberStart();
    var streetSuffix = addrArray[0].getStreetSuffix();
    var city = addrArray[0].getCity();
    var zip = addrArray[0].getZip();
    var profArr = new Array();
    var myComment = inspComment;
    if (myComment == null)
        myComment = 'n/a';
    profArr = getLicenseProfessional(capId);
    var emailAddress;
    var inspUser = getInspector(inspType);
    if (profArr.length > 0) {
        for (x in profArr)
            if (profArr[x].getPrintFlag() == 'Y')
                emailAddress = profArr[x].getEmail();
    }

    if (emailAddress == 'na' || emailAddress == null || emailAddress == 'NONE' || emailAddress == 'NA' || emailAddress == 'none') {
        emailAddress = 'TinaC.Jones@charlottecountyfl.gov';
    }

    var inspF = myLastN.getFirstName();
    var inspL = myLastN.getLastName();
    var cap = aa.cap.getCap(capId).getOutput();
    var CapTypeResult = cap.getCapType();
    inspUserObj = aa.person.getUser(inspF, '', inspL).getOutput();
    if (inspUserObj.getUserID() != null) {
        var myUser = inspUserObj.getUserID();
        var inspPhone = inspUserObj.getPhoneNumber();
    } else {
        var inspPhone = "941-743-1201";
    }
    var etext;
    etext = inspType + ' inspection: ' + inspResult + '<br>Permit #' + capIDString + ' (' + CapTypeResult + ')<br>Address: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + '<br>Comment: ' + myComment + '<br>Inspector: ' + inspF + ' ' + inspL + '<br>Insp. phone: ' + inspPhone;
    var emlInsp = '<br>The last insp email is: ' + myLast;
    //+ '<br>The last insp: ' + myLastN;
    aa.sendMail('NoReply@CharlotteCountyFL.gov', emailAddress, '', inspType + ' Inspection Notification from Charlotte County -- ' + inspResult, etext);

}

