//PRA:BUILDING///
var cap = aa.cap.getCap(capId).getOutput();
var capIDString = capId.getCustomID();
var CapTypeResult = cap.getCapType();
var frACA = cap.isCreatedByACA();
var capIDString = capId.getCustomID();
addrResult = aa.address.getAddressByCapId(capId);
var addrArray = new Array();
var addrArray = addrResult.getOutput();
var streetName = addrArray[0].getStreetName();
var hseNum = addrArray[0].getHouseNumberStart();
var streetSuffix = addrArray[0].getStreetSuffix();
var city = addrArray[0].getCity();
var zip = addrArray[0].getZip();
var eAddr;
eAddr = '<br>Address: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip;
var profArr = new Array();
profArr = getLicenseProfessional(capId);
var emailAddress;
if (profArr.length > 0) {
    for (x in profArr) {
        if (profArr[x].getPrintFlag() == 'Y') {
            emailAddress = profArr[x].getEmail();
        }
    }
}

if (emailAddress == 'na' || emailAddress == null || emailAddress == 'NONE' || emailAddress == 'NA' || emailAddress == 'none') {
    emailAddress = 'TinaC.Jones@charlottecountyfl.gov';
}

if (appMatch('Building/Trade Permits/Commercial/Water Heater') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Water Heater') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Commercial/Irrigation System') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Irrigation System') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jone@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Solar Water Heater') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Plumbing') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Electrical') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Pool Heat Pump') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Roofing') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Mechanical') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

if (appMatch('Building/Trade Permits/Residential/Sewer Connection') && (capStatus == null) && (frACA == true) && (balanceDue >= 0)) {
    email('TinaC.Jones@charlottecountyfl.gov', 'ACA@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email('Kevin.Lapham@charlottecountyfl.gov', 'ACA_autoP@accela.com', 'Automated Issuance of Permit # ' + capIDString, 'To email: ' + emailAddress + '<br> An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    email(emailAddress, 'NoReply@charlottecountyfl.gov', 'Automated Issuance of Permit # ' + capIDString, 'An automated permit has been issued for Permit # ' + capIDString + '. <br>' + CapTypeResult + eAddr);
    activateTask('Permit Issuance');
    updateTask('Permit Issuance', 'Issued', 'Automated Issuance');
    createPendingInspFromReqd(capId);
}

//var capIDString = capId.getCustomID();
var mEXT = FeeItemsPaidList.indexOf('63') != -1;
var mEXT2 = FeeItemsPaidList.indexOf('100') != -1;
// DISABLED: PRA:Building/*/*/*:94
// if (checkMEXTEND(capIDString) == true  && (mEXT == true || mEXT2 == true)) {
// 	editAppSpecific('Expiration Date',dateAdd(AInfo['Expiration Date'],90));
// 	updateAppStatus('Issued','');
// DISABLED: PRA:Building/*/*/*:95
// 	email('Kevin.Lapham@charlottecountyfl.gov', 'MEXTEND.Payment@accela.com', 'PRA M-EXTEND Payment made for ' + capId, 'PRA M-EXTEND Payment made in the amount of ' + FeeItemsPaidList +  'for ' + capId + ' / ' + capIDString);
// 	}

// DISABLED: PRA:Building/*/*/*:96
// var myMatch = FeeItemsPaidList.indexOf('63');
// email('Kevin.Lapham@charlottecountyfl.gov', 'Match63.Payment@accela.com', 'PRA M-EXTEND Match63 Payment made for ' + capId, 'PRA M-EXTEND Match63 Payment made in the amount of ' + FeeItemsPaidList + 'for ' + capId + ' / ' + capIDString + '  myMatch=' + myMatch + ' mEXT: ' + mEXT );
// DISABLED: PRA:Building/*/*/*:98
// if (frACA == true) {
// 	email('Kevin.Lapham@charlottecountyfl.gov', 'ACA.PRA.Payments@accela.com', 'ACA Payment made for ' + capId, 'ACA Payment made in the amount of ' + FeeItemsPaidList +  'for ' + capId + ' / ' + capIDString);
// 	}

// DISABLED: PRA:Building/*/*/*:99
// if (frACA == false) {
// 	email('Kevin.Lapham@charlottecountyfl.gov', 'PRA.Payments@accela.com', 'PRA Payment made for ' + capId, 'PRA Payment made in the amount of ' + FeeItemsPaidList +  'for ' + capId + ' / ' + capIDString);
// 	}
