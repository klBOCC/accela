//IRSA:  start replaced branch: CC_151_BLD_InspResultAfter

showMessage = true;

var vScriptName = aa.env.getValue("ScriptCode");
var vEventName = aa.env.getValue("EventName");
aa.print(vScriptName + "/" + vEventName);

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

var InspectionResultArray = aa.env.getValue("InspectionResultArray");
var InspectionIdArray = aa.env.getValue("InspectionIdArray");
var InspectionId = aa.env.getValue("InspectionId");
//var inspComment = aa.env.getValue("InspectionResultComment");
//var inspType = aa.env.getValue("InspectionType");
//aa.print("inspType=" + inspType);
var inspectionList = aa.env.getValue("InspectionTypeArray");
aa.print("inspectionList = " + inspectionList);
aa.print("insp length=" + inspectionList.length);
if (vScriptName == "V360InspectionResultSubmitAfter") {
    var commentList = aa.env.getValue("InspectionResultCommentArray");
    aa.print("Analyze AA result methods...");
    if (inspType == "" || inspType == " " || inspType == null) {
        for (x in inspectionList) {
            InspectionId = InspectionIdArray[x];
            aa.print("InspectionIdArray l = " + InspectionIdArray);
            inspResult = InspectionResultArray[x];
            aa.print("InspectionResultArray  l = " + InspectionResultArray[x]);
            inspType = inspectionList[x];
            aa.print("inspectionList l " + x + ":" + inspType);
            inspComment = commentList[x];
            aa.print("commentList l " + x + ":" + inspComment);
            var inspObj = aa.inspection.getInspection(capId, InspectionId).getOutput();
            var inspGroup = inspObj.getInspection().getInspectionGroup();
            aa.print("inspGroup l (arr)== " + inspGroup);
            var inComm = inspObj.getInspectionComments();
            if (inComm == null) {
                inComm = "";
            }
            var mySearch = /emailed/i;
            var result = mySearch.test(inComm);
            if (result == false && inspResult != "") {
                fullIRSA(capIDString, inspType, inspComment, inspGroup, inspResult);
                var inComm2 = inspObj.setInspectionComments(inComm + " " + "emailed by script");
                aa.inspection.editInspection(inspObj);
            }
        }
    }

    if (matches(inspResult, 'Pass', 'Approved as Noted', 'Not Required')) {
        comment("DELETE EXTRA PENDINGS:  " + capIDString);
        capIDString = capId.getCustomID();
        comment(capIDString);
        oInspList = aa.inspection.getInspections(capId);
        inspArray = oInspList.getOutput();
        comment(inspArray);
        pendingInspectionExists = checkForPendingInspections();
        if (pendingInspectionExists) {
            aa.print("DELETE EXTRA PENDINGS  (in AA):  " + capIDString);
            for (insp in inspArray)
                if (inspType == inspArray[insp].getInspectionType() && inspArray[insp].getInspectionStatus() == 'Pending') {
                    comment('DEL this ID: ' + inspArray[insp].getIdNumber());
                    var InspM = aa.inspection.getInspection(capId, inspArray[insp].getIdNumber()).getOutput();
                    InspM.getInspection().getActivity().setAuditStatus('I');
                    aa.inspection.editInspection(InspM).getOutput();
                    comment(inspArray[insp].getIdNumber() + ' has been removed for inspType: ' + inspArray[insp].getInspectionType());
                }
        }
    }

} else {
    aa.print("Analyze apps and other result methods...");
    var InspectionId = aa.env.getValue("InspectionId");
    var inspObj = aa.inspection.getInspection(capId, InspectionId).getOutput();
    var inspGroup = inspObj.getInspection().getInspectionGroup();

    var inspResult = aa.env.getValue("InspectionResult");
    var inspComment = aa.env.getValue("InspectionResultComment");
    var inspType = aa.env.getValue("InspectionType");

    fullIRSA(capIDString, inspType, inspComment, inspGroup, inspResult);

    if (matches(inspResult, 'Pass', 'Approved as Noted', 'Not Required')) {
        capIDString = capId.getCustomID();
        comment(capIDString);
        oInspList = aa.inspection.getInspections(capId);
        inspArray = oInspList.getOutput();
        comment(inspArray);
        pendingInspectionExists = checkForPendingInspections();
        if (pendingInspectionExists) {
            aa.print("DELETE EXTRA PENDINGS (in apps):  " + capIDString);
            for (insp in inspArray)
                if (inspType == inspArray[insp].getInspectionType() && inspArray[insp].getInspectionStatus() == 'Pending') {
                    comment('DEL this ID: ' + inspArray[insp].getIdNumber());
                    var InspM = aa.inspection.getInspection(capId, inspArray[insp].getIdNumber()).getOutput();
                    InspM.getInspection().getActivity().setAuditStatus('I');
                    aa.inspection.editInspection(InspM).getOutput();
                    comment(inspArray[insp].getIdNumber() + ' has been removed for inspType: ' + inspArray[insp].getInspectionType());
                }
        }
    }

}

function fullIRSA(capIDString, inspType, inspComment, inspGroup, inspResult) {
    aa.print("inspType arr = " + inspType);
    var myInsp = String(inspType);
    var myCapId = String(capIDString);
    aa.print("Insp + CapId:" + myInsp + " / " + myCapId);
    aa.print(PermitId1 + " " + PermitId2 + " " + PermitId3);

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
    }

    if (inspResult == 'Fail with Fee x 3') {
        addFee('REJ-B3', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (matches(inspResult, 'Fail with Fee Z', 'Fail with Fee x 2 Z', 'Fail with Fee x 3 Z')) {
        addFee('REJ-Z', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (inspResult == 'Fail ROW') {
        addFee('10-ROWREIN', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (inspResult == 'Fail Re-inspect') {
        addFee('M-STWTRREI', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (inspResult == 'Partial') {
        addFee('REJ-B', 'ADDTL_INSP_FEES', 'ORIGINAL', 1, 'Y');
    }

    if (matches(inspResult, 'Pass', 'Approved as Noted', 'Not Required') && balanceDue == 0) {
        pendingInspectionExists = checkForPendingInspections();
        if (!pendingInspectionExists)
            branchTask('Finaled', getFinaledWorkflowStatus());
    }

    if (inspResult.indexOf('Fail') > -1 || inspResult.indexOf('Partial') > -1 || inspResult.indexOf('Cancelled') > -1) {
        createPendingInspection(inspGroup, inspType);
    }

    if (matches(inspResult, 'Pass', 'Approved as Noted', 'Approved per Affidavit Program') && inspType != 'Plans Change Submitted') {
        editAppSpecific('Expiration Date', dateAdd(null, 180));
    }

    if (appMatch('Building/Construction/Residential/*') || appMatch('Building/Accessories/Residential/*')) {
        if (inspType == 'Plans Change Submitted' || inspType == 'On-Line Resubmittal') {
            if (inspResult == 'Pass' || inspResult == 'Approved as Noted') {
                addFee('PLN CHNG', 'ADD_REVIEW', 'ORIGINAL', 1, 'Y');
            }
        }
    }

    if (appMatch('Building/Construction/Commercial/*') || appMatch('Building/Accessories/Commercial/*')) {
        if (inspType == 'Plans Change Submitted' || inspType == 'On-Line Resubmittal') {
            if (inspResult == 'Pass' || inspResult == 'Approved as Noted') {
                addFee('PLN CHNG_COM', 'ADD_REVIEW', 'ORIGINAL', 1, 'Y');
            }
        }
    }


    if (appMatch('Building/Accessories/Residential/Temporary Erosion Control') && inspType == 'Compliance Inspection' && inspResult == 'Pass') {
        editAppSpecific('Expiration Date', dateAdd(null, 60));
    }

    if (inspType == 'Electric Final' && inspResult == 'Electric - Power') {

        //START REPLACED BRANCH FPL_FINAL
        var cap = aa.cap.getCap(capId).getOutput();
        var CapTypeResult = cap.getCapType();
        addrResult = aa.address.getAddressByCapId(capId);
        var addrArray = new Array();
        addrArray = addrResult.getOutput();
        var streetName = addrArray[0].getStreetName();
        var hseNum = addrArray[0].getHouseNumberStart();
        var streetSuffix = addrArray[0].getStreetSuffix();
        var city = addrArray[0].getCity();
        var zip = addrArray[0].getZip();
        var etext;
        etext = CapTypeResult + ' ' + inspType + ' ' + 'Permit #' + capIDString + ' (ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + ')' + '<br>';
        // DISABLED: FPL_final:30
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'Kevin.Lapham@charlottecountyfl.gov', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'TinaC.Jones@charlottecountyfl.gov', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'sherry.stover@fpl.com', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'stacey.scott@fpl.com', '', 'FPL Notification from Charlotte County', etext);
        // END REPLACED BRANCH FPL_FINAL
        comment('Electric Final--Electric - Power');
    }

    if (inspType == 'Electric Temporary Service' && inspResult == 'Electric - Power') {
        // START REPLACED BRANCH FPL_TEMP
        cap = aa.cap.getCap(capId).getOutput();
        CapTypeResult = cap.getCapType();
        addrResult = aa.address.getAddressByCapId(capId);
        addrArray = new Array();
        addrArray = addrResult.getOutput();
        streetName = addrArray[0].getStreetName();
        hseNum = addrArray[0].getHouseNumberStart();
        streetSuffix = addrArray[0].getStreetSuffix();
        city = addrArray[0].getCity();
        zip = addrArray[0].getZip();
        etext = CapTypeResult + ' ' + inspType + ' ' + 'Permit #' + capIDString + ' (ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + ')' + '<br>';
        // DISABLED: FPL_temp:30
        aa.sendMail('NoReplyFPL@CharlotteCountyFL.gov', 'Kevin.Lapham@charlottecountyfl.gov', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'TinaC.Jones@charlottecountyfl.gov', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'sherry.stover@fpl.com', '', 'FPL Notification from Charlotte County', etext);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'stacey.scott@fpl.com', '', 'FPL Notification from Charlotte County', etext);
        // END REPLACED BRANCH FPL_TEMP
        comment('Electric Temporary Service--Electric - Power');
    }

    if (matches(inspResult, 'Cancelled by County', 'Cancelled by Applicant')) {
        // START REPLACED BRANCH CANCELEMAIL2
        var currentDt = new Date(inspSchedDate);
        var dd = currentDt.getDate();
        var mm = currentDt.getMonth() + 1;
        var yyyy = currentDt.getFullYear();
        var myDateStr = mm + '/' + dd + '/' + yyyy;
        comment('myDateStr = ' + myDateStr);
        //var StrCapID = String(capIDString);
        //var StrInspType = String(inspType);
        //var insEmail = lastInspEmail(StrCapID, StrInspType);
        var myLast = "";
        if (lastInspEmail(myCapId, myInsp) != null) {
            myLast = lastInspEmail(myCapId, myInsp);
        } else {
            myLast = "TinaC.Jones@charlottecountyfl.gov";
        }

        var sysDate = new Date();
        var sdd = sysDate.getDate();
        var smm = sysDate.getMonth() + 1;
        var syyyy = sysDate.getFullYear();
        comment('FORMATED sys DATE: ' + smm + '/' + sdd + '/' + syyyy);
        var text2 = 'Permit # ' + capId.getCustomID() + '<br>Type: ' + inspType + ' scheduled on ' + inspSchedDate;
        var addrResult = aa.address.getAddressByCapId(capId);
        addrArray = new Array();
        addrArray = addrResult.getOutput();
        hseNum = addrArray[0].getHouseNumberStart();
        streetName = addrArray[0].getStreetName();
        zip = addrArray[0].getZip();
        city = addrArray[0].getCity();
        etext = 'at Address: ' + hseNum + ' ' + streetName + ', ' + city + ' ' + zip + '\n' + 'has been ';
        comment('A cancellation email would be sent TO:  ' + myLast + ' with the following details:');
        comment(text2 + '\n' + etext + '\n' + inspResult + '.');
        if (mm <= smm && dd <= sdd && yyyy <= syyyy) {
            comment('date validated --> to email / INSPECTION: ' + inspType);
            comment('date validated? --> to email / INSPECTION: ' + inspType);
            email(myLast, 'NoReply_Accela@CharlotteCountyFL.gov', inspType + ' CANCEL - Permit ' + capIDString, text2 + '<br>' + etext + '<br>' + inspResult + ' on ' + smm + '/' + sdd + '/' + syyyy);
        }
        // end REPLACED BRANCH CANCELEMAIL2
    }


    //start replaced branch contractor_inspection'
    var myLastN = getMyLastInsp(myInsp, myCapId);
    aa.print("LastN = " + myLastN);
    var inspF = "";
    var inspL = "";
    if (myLastN == null || myLastN == "n/a") {
        myLastN = "n/a";
        inspF = "n/a";
        inspL = "";
    } else {
        inspF = myLastN.getFirstName();
        inspL = myLastN.getLastName();
    }
    aa.print("LastN = " + myLastN);
    aa.print("inspF/inspL = " + inspF + " " + inspL);
    myLast = "";
    if (lastInspEmail(myCapId, myInsp) != null) {
        myLast = lastInspEmail(myCapId, myInsp);
    } else {
        myLast = "TinaC.Jones@charlottecountyfl.gov";
    }
    //var emlInsp = myLast + '<br>' + myLastN;
    addrResult = aa.address.getAddressByCapId(capId);
    addrArray = new Array();
    addrArray = addrResult.getOutput();
    streetName = addrArray[0].getStreetName();
    hseNum = addrArray[0].getHouseNumberStart();
    streetSuffix = addrArray[0].getStreetSuffix();
    city = addrArray[0].getCity();
    zip = addrArray[0].getZip();
    var profArr = new Array();
    var myComment = inspComment;
    if (myComment == null)
        myComment = 'n/a';
    profArr = getLicenseProfessional(capId);
    var emailAddress;
    //var inspUser = getInspector(inspType);
    if (profArr.length > 0) {
        for (x in profArr)
            if (profArr[x].getPrintFlag() == 'Y')
                emailAddress = profArr[x].getEmail();
    }

    if (emailAddress == 'na' || emailAddress == null || emailAddress == 'NONE' || emailAddress == 'NA' || emailAddress == 'none') {
        emailAddress = 'TinaC.Jones@charlottecountyfl.gov';
    }

    cap = aa.cap.getCap(capId).getOutput();
    CapTypeResult = cap.getCapType();
    inspUserObj = aa.person.getUser(inspF, '', inspL).getOutput();
    if (inspUserObj != null) {  //inspUserObj.getUserID() 
        //var myUser = inspUserObj.getUserID();
        var inspPhone = inspUserObj.getPhoneNumber();
    } else {
        inspPhone = "941-743-1201";
    }
    etext = "";
    etext = inspType + ' inspection: ' + inspResult + '<br>Permit #' + capIDString + ' (' + CapTypeResult + ')<br>Address: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + '<br>Comment: ' + myComment + '<br>Inspector: ' + inspF + ' ' + inspL + '<br>Insp. phone: ' + inspPhone;
    //var emlInsp = '<br>The last insp email is: ' + myLast;
    //+ '<br>The last insp: ' + myLastN;
    aa.sendMail('NoReply@CharlotteCountyFL.gov', emailAddress, '', inspType + ' Inspection Notification from Charlotte County -- ' + inspResult, etext);
    // DISABLED: contractor_inspection:49
    //aa.sendMail('NoReply-Auto_SenderINSP@Accela.com', 'Kevin.Lapham@CharlotteCountyFL.gov', '', inspType + ' Inspection Notification from Charlotte County -- ' + inspResult, etext);
    //end replaced branch contractor_inspection'

    comment('CC_151_BLD_InspResultAfter executed successfully');

    //end replaced branch: CC_151_BLD_InspResultAfter;


    //begin SUPERVISOR email 20190210 KL
    var capCons = aa.people.getCapContactByCapID(capId).getOutput();
    if (capCons.length != 0) {
        for (i in capCons) {
            var thisPeop = capCons[i];
            var allPeopData = thisPeop.getPeople();
            var firstName1 = allPeopData.getFirstName();
            var pEml = allPeopData.getEmail();
            var relationship = allPeopData.getRelation();
            if (pEml != null && pEml != "" && relationship == "Supervisor") {
                aa.sendMail('NoReply@CharlotteCountyFL.gov', pEml, '', inspType + ' Inspection Notification from Charlotte County -- ' + inspResult, etext);
            }
        }
    }
}

