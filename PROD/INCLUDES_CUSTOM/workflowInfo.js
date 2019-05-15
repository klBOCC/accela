function workflowInfo() {

    showMessage = false;
    var myCap = String(capIDString);
    var Subj = wfTask + ' Status Update for Permit # ' + myCap + ' (' + wfStatus + ')';
    addrResult = aa.address.getAddressByCapId(capId);
    var addrArray = new Array();
    addrArray = addrResult.getOutput();
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

    if (emailAddress == 'NA' || emailAddress == 'na' || emailAddress == null || emailAddress == 'NONE' || emailAddress == 'NA' || emailAddress == 'none') {
        emailAddress = 'TinaC.Jones@charlottecountyfl.gov';
    }

    nameArray = new Array();
    nameArray = String(aa.person.getUser(wfStaffUserID).getOutput()).split('/');
    var revBy = nameArray[6];

    var sStr = /null/i;
    var result = sStr.test(wfComment);
    if (wfComment == null || result == true) {
        wfComment = "N/A";
    }

    var lCount = new Array();
    lCount = [" 1. ", " 2. ", " 3. ", " 4. ", " 5. ", " 6. ", " 7. ", " 8. ", " 9. ", " 10. ", " 11. ", " 12. ", " 13. ", " 14. ", " 15. ", " 16. ", " 17. ", " 18. ", " 19. ", " 20. ", " 21. ", " 22. ", " 23. ", " 24. ", " 25. ", " 26. ", " 27. ", " 28. ", " 29. ", " 30. ", " 31. ", " 32. ", " 33. ", " 34. ", " 35. ", " 36. ", " 37. ", " 38. ", " 39. ", " 40. "];
    var neWwfComment = "";

    for (x in lCount) {
        neWwfComment = wfComment.replace(lCount[x], "<br>\n" + lCount[x]);
        wfComment = neWwfComment;
    }


    var substring = String.fromCharCode(10);
    var res = wfComment.indexOf(substring) !== -1;
    if (res == true) {
        flag = 1;
        var s = new String(wfComment);
        var newWfComment = s.split(String.fromCharCode(13));
        var wfTask2 = "";
        for (i in newWfComment) {
            wfTask2 = wfTask2 + " <br>" + newWfComment[i];
        }
        wfComment = wfTask2;
        aa.sendMail("New-word-wf@CharlotteCountyFL.gov", "Kevin.Lapham@charlottecountyfl.gov", '', Subj, 'To: ' + emailAddress + '<br>' + EmlBod + '<br>' + wfTask2);
    }


    EmlBod = '<br>Permit Type: ' + appTypeString + '<br>Address: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ' ' + city + ' ' + zip + '<br>Permit # ' + myCap + '<br>Task: ' + wfTask + ' - ' + wfStatus + '<br><br>Comment: ' + wfComment + '<br>Reviewed by: ' + revBy;
    var endText = '<br>This is a courtesy message noting a new comment on a plan review.  Questions?  Contact the Charlotte County Community Development Department at 941-743-1201.';

    comment(Subj + '; To: ' + emailAddress + '/n <br>' + EmlBod + '/n <br>' + endText);

    if (wfComment != null) {
        aa.sendMail('NoReply@CharlotteCountyFL.gov', emailAddress, '', Subj, EmlBod + '<br>' + endText);
        aa.sendMail('NoReply@CharlotteCountyFL.gov', 'TinaC.Jones@charlottecountyfl.gov', '', Subj, 'To: ' + emailAddress + '<br>' + EmlBod + '<br>' + endText);
        //aa.sendMail('wf-NoReply@CharlotteCountyFL.gov', 'Kevin.Lapham@charlottecountyfl.gov', '', Subj, 'To: ' + emailAddress + '<br>' + EmlBod + '<br>' + endText);


        var capCons = aa.people.getCapContactByCapID(capId).getOutput();
        if (capCons.length != 0) {
            for (i in capCons) {
                var thisPeop = capCons[i];
                var allPeopData = thisPeop.getPeople();
                var firstName1 = allPeopData.getFirstName();
                var ccUID = "";
                var pEml = allPeopData.getEmail();
                var bizName = allPeopData.getBusinessName();
                var relationship = allPeopData.getRelation();
                if (pEml != null && pEml != "" && relationship == "Supervisor") {
                    aa.sendMail('NoReply@CharlotteCountyFL.gov', pEml, '', Subj, EmlBod + '<br>' + endText);
                }
            }
        }
    }
}
