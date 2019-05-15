// ISA:  code extracted from modified "ISA New" scripts
showMessage = true;
var capIDString = capId.getCustomID();
var inspObj = aa.inspection.getInspection(capId, inspId).getOutput();
var inspGroup = inspObj.getInspection().getInspectionGroup();
//update comments
var inComm = inspObj.getInspectionComments();
if (inComm == null) {
    inComm = "";
}
var mySearch = /Permit/i;
var result = mySearch.test(inComm);
// TODO:  code should be reviewed.
if (result == true) {
    result = false;
} else {
    var inComm2 = inspObj.setInspectionComments(capIDString + " (Permit); " + inComm);
    aa.inspection.editInspection(inspObj)
}

comment(capIDString);
oInspList = aa.inspection.getInspections(capId);
inspArray = oInspList.getOutput();
comment(inspArray);
if (inspArray.length > 0) {
    for (insp in inspArray) {
        //replaced branch(fullInsps)
        fullInsps();
    }
}

var BabFin = checkInspectionResult('Babcock Final', 'Scheduled');
if (((BabFin == true) && (inspType == 'Babcock Final'))) {
    assignInspection(inspId, 'AMY.WICKS@KIMLEY-HORN.COM', capId);
}

var HealthInsp = checkInspectionResult('Health Approval', 'Scheduled');
if (HealthInsp == true && inspType == 'Health Approval') {
    assignInspection(inspId, 'LBEAUCHAMP', capId);
}

var cap = aa.cap.getCap(capId).getOutput();
var CapTypeResult = cap.getCapType();
coastLightR = checkInspectionResult('COASTAL LIGHTING ROUGH', 'Scheduled');
coastLightF = checkInspectionResult('COASTAL LIGHTING FINAL', 'Scheduled');
if (coastLightR == true && inspType == 'COASTAL LIGHTING ROUGH') {
    addrResult = aa.address.getAddressByCapId(capId);
    var addrArray = new Array();
    addrArray = addrResult.getOutput();
    var streetName = addrArray[0].getStreetName();
    var hseNum = addrArray[0].getHouseNumberStart();
    var streetSuffix = addrArray[0].getStreetSuffix();
    var city = addrArray[0].getCity();
    var zip = addrArray[0].getZip();
    var etext;
    etext = CapTypeResult + ' -- Permit #' + capIDString + '<br> Inspection: ' + inspType + ' scheduled for: ' + inspSchedDate + '<br>ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + '' + '<br>';
    aa.sendMail('Accela@CharlotteCountyFL.gov', 'Suzanne.Derheimer@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    //aa.sendMail('Accela@CharlotteCountyFL.gov', 'Rebekah.Augustinowicz@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    aa.sendMail('Accela@CharlotteCountyFL.gov', 'Susan.Foley-Pieri@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    aa.sendMail('AccelaCoastal@CharlotteCountyFL.gov', 'kevin.lapham@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    assignInspection(inspId, 'DERHEIMERS', capId);
}

if (coastLightF == true && inspType == 'COASTAL LIGHTING FINAL') {
    addrResult = aa.address.getAddressByCapId(capId);
    var addrArray = new Array();
    addrArray = addrResult.getOutput();
    var streetName = addrArray[0].getStreetName();
    var hseNum = addrArray[0].getHouseNumberStart();
    var streetSuffix = addrArray[0].getStreetSuffix();
    var city = addrArray[0].getCity();
    var zip = addrArray[0].getZip();
    var etext;
    etext = CapTypeResult + ' -- Permit #' + capIDString + '<br> Inspection: ' + inspType + ' scheduled for: ' + inspSchedDate + '<br>ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip + '' + '<br>';
    aa.sendMail('Accela@CharlotteCountyFL.gov', 'Suzanne.Derheimer@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    //aa.sendMail('Accela@CharlotteCountyFL.gov', 'Rebekah.Augustinowicz@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    aa.sendMail('Accela@CharlotteCountyFL.gov', 'Susan.Foley-Pieri@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    aa.sendMail('AccelaCoastal@CharlotteCountyFL.gov', 'kevin.lapham@charlottecountyfl.gov', '', 'Coastal Lighting Inspection Scheduled for ' + capIDString, etext);
    assignInspection(inspId, 'DERHEIMERS', capId);
}

