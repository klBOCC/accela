//DUA 
//var myMatch = capIDString.indexOf('TMP') !== -1;
var myMatch = capIDString.indexOf('TMP') != -1;

//comment('match='+myMatch + 'TMP from ' + capIDString);

if (documentUploadedFrom == 'ACA' && myMatch == false) {

    //start replaced branch: resubmittal

    var documentModels = documentModelArray.toArray();
    var myDoc = documentModels[0].getDocCategory();
    wfObj = aa.workflow.getTasks(capId).getOutput();
    var wfInfo = '';
    var nCt = 0;
    if (wfObj != null) {
        for (var index in wfObj) {
            if (wfObj[index].getDisposition() == 'Rejection Resubmitted' || wfObj[index].getDisposition() == 'Rejected' || wfObj[index].getDisposition() == 'Rejection Resubmittal') {
                var wfInfo = wfObj[index].getTaskDescription() + ', ' + wfObj[index].getDisposition();
            }
        }
        nCt = nCt + 1;
    }

    if (wfInfo != '' && nCt < 2) {
        email('TinaC.Jones@charlottecountyfl.gov', 'NoReply@accela.com', 'ACA Document Uploaded for ' + capIDString + '.', 'A document has been uploaded through ACA for ' + capIDString + '<br> Status: ' + wfInfo);
        email('Catherine.Irish@charlottecountyfl.gov', 'NoReply@accela.com', 'ACA Document Uploaded for ' + capIDString + '.', 'A document has been uploaded through ACA for ' + capIDString + '<br> Status: ' + wfInfo);
        email('Chris.Perin@charlottecountyfl.gov', 'NoReply@accela.com', 'ACA Document Uploaded for ' + capIDString + '.', 'A document has been uploaded through ACA for ' + capIDString + '<br> Status: ' + wfInfo);
        email('Kevin.Lapham@charlottecountyfl.gov', 'NoReplyResub@accela.com', 'ACA Document Uploaded for ' + capIDString + '.', 'A document has been uploaded through ACA for ' + capIDString + '<br> Status: ' + wfInfo);

    }
    //end replaced branch: resubmittal;
}

// TODO not matching braces

if (documentUploadedFrom == 'ACA' && myMatch == false) {

    var documentModels = documentModelArray.toArray();
    if (documentModels.length > 0) {
        myDocD = documentModels[0].getDocName();
    }

    if (myDocD == 'resubmittal.pdf' && myMatch == false) {
        scheduleInspection('On-Line Resubmittal', 0, 'PERINC', null, 'scheduled via script');
        email('permitresubmittal@charlottecountyfl.gov', 'NoReplyResub@accela.com', 'ACA Plan Change Document Uploaded for ' + capIDString + '.', 'A Plan Change document has been uploaded through ACA for ' + capIDString);

        if (myDocD == 'resubmittal.pdf') {
            email('Kevin.Lapham@charlottecountyfl.gov', 'NoReplyResub2@accela.com', 'ACA Resubmittal Document Uploaded for ' + capIDString + '.', 'A resubmittal document has been uploaded through ACA for ' + capIDString + '<br> documentModels.length=' + documentModels.length + '  getDocCategory=' + documentModels[0].getDocCategory() + ' myName  = ' + documentModels[0].getDocName() + ' getDocDescription= ' + documentModels[0].getDocDescription() + '  MATCH? ' + myMatch);
        }
    }
    //end replaced branch: resubmittal2;
}

if (myMatch == false) {
    //start replaced branch: AffNoZon
    {
        var documentModels = documentModelArray.toArray();
        comment('documentModels.length=' + documentModels.length);
        comment('documentModels[0]=' + documentModels[0].getDocCategory());
        var myDoc = documentModels[0].getDocCategory();
        var myName = documentModels[0].getDocName();
        comment('myDoc=' + myDoc);
        if (myDoc == 'Affidavit for No Zoning Inspection' && myMatch == false) {
            AffNoZon3();
        }

        if (myName == 'WaiveZoning.pdf' || myName == 'waivezoning.pdf' && myMatch == false) {
            AffNoZon3();
        }

    }
    //end replaced branch: AffNoZon;
}

function AffNoZon3() {
    if (currentUserID == "LAPHAMK") {
        showMessage = true;
        showDebug = true;
    } else {
        showMessage = false;
        showDebug = false;
    }

    var sysDate = aa.date.getCurrentDate();

    if (appMatch("Building/*/*/*")) {
        scheduleInspection("Zoning Final", 1);
        resultInspection("Zoning Final", "Not Required", sysDate, "Automated by Affidavit for No Zoning Inspection document.");
    }

    if (appMatch("Planning/Growth Mgmt/Zoning Permits/Residential Fence")) {
        scheduleInspection("Zoning Final", 1);
        resultInspection("Zoning Final", "Not Required", sysDate, "Automated by Affidavit for No Zoning Inspection document.");
    }

    if (appMatch("Building/Accessories/Commercial/Fence")) {
        scheduleInspection("Zoning Final", 1);
        resultInspection("Zoning Final", "Not Required", sysDate, "Automated by Affidavit for No Zoning Inspection document.");
    }
}