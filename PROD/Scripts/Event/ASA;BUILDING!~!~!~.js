// ASA:BUILDING////
var cap = aa.cap.getCap(capId).getOutput();
var CapTypeResult = cap.getCapType();
var frACA = cap.isCreatedByACA();

var myExemptDoc = AInfo['ParcelAttribute.DOC_EXEMPT'];
if (myExemptDoc == "Y") {
    addStdCondition('CC PERMIT', 'Exempt Document');
}


if (proximity('AGIS_CHARCO', 'Historical Preservation Buffer', 1) && !appMatch('Building/POS/*/*')) {
    addStdCondition('CC PERMIT', 'Historical Review Hold');
}

editAppSpecific('Expiration Date', dateAdd(null, 180));


// DISABLED: ASA:Building/*/*/*:10
// if (!appMatch('Building/POS/*/*')) {
// 	showMessage=true;
// 	attrArray = new Array;
// 	loadAddressAttributes(attrArray, capId);
// 	for(x in attrArray ) if (x == 'AddressAttribute.HISTORICAL' && attrArray[x]== 'Y') addAppCondition('CC PERMIT', 'Applied', 'Historical Address Notice', 'The permit being applied for may be within a Historical area. Further review is needed.', 'Notice');
// 	}

if (!appMatch('Building/POS/*/*')) {
    // TODO, setting showmessage to true could result in popups without meaningful messages
    showMessage = true;
    attrArray = new Array;
    loadAddressAttributes(attrArray, capId);
    for (x in attrArray) {
        if (x == 'AddressAttribute.HISTORICAL' && attrArray[x] == 'Y') {
            addStdCondition('CC PERMIT', 'Historical Address Notice');
        }
    }
}



if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1) && !appMatch('Building/POS/*/*')) {
    // TODO showMessage should default to false and only be set to true when needed.
    showMessage = false;
    comment('Updating Babcock ASI.');
    // DISABLED: ASA:Building/*/*/*:21
    // 	addStdCondition('CC PERMIT', 'Babcock Ranch');
    // 	// addAppCondition('CC PERMIT', 'Applied', 'Babcock Ranch', 'This parcel is in the Babcock Ranch development.', 'Notice');
    editAppSpecific('Front Setback', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'FrntStbk'));
    editAppSpecific('Rear Setback', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'RearStbk'));
    editAppSpecific('Left Setback', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'LeftStbk'));
    editAppSpecific('Right Setback', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'RightStbk'));
    editAppSpecific('Lot Width', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'LotWidth'));
    editAppSpecific('Lot Depth', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'LotDepth'));
    editAppSpecific('Septic No.', getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'Utilities'));
    if (getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'CornerLot') == 'Yes') {
        editAppSpecific('Corner Lot', 'CHECKED');
    }
    if (getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'InsideLot') == 'Yes') {
        editAppSpecific('Inside Lot', 'CHECKED');
    }
    if (getGISInfo('AGIS_CHARCO', 'Babcock_Lots', 'Waterfrnt') == 'Yes') {
        editAppSpecific('Waterfront', 'CHECKED');
    }
}

if (!appMatch('Building/POS/*/*')) {
    var cap = aa.cap.getCap(capId).getOutput();
    var CapTypeResult = cap.getCapType();
}

if (!appMatch('Building/POS/*/*')) {
    var addrResult = aa.address.getAddressByCapId(capId);
    var addrArray = new Array();
    var addrArray = addrResult.getOutput();
    var hseNum = addrArray[0].getHouseNumberStart();
    var streetName = addrArray[0].getStreetName();
    var streetSuffix = addrArray[0].getStreetSuffix();
    var city = addrArray[0].getCity();
    var zip = addrArray[0].getZip();
    var etext = 'Permit # ' + capIDString + '  ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + city + ', ' + zip;
}

if (cap.isCompleteCap() && !appMatch('Building/POS/*/*')) {
    bContinue = true;
    arrCAPS = capIdsGetByParcel();
    if (!arrCAPS) {
        bContinue = false;
    }
    sumVariable = 0;
    if (bContinue) {
        for (xy in arrCAPS)
        //start replaced branch: ASA:SumConstructionCosts:LOOP
        {
            bProceed = false;
            relatedCapID = aa.cap.getCap(arrCAPS[xy]).getOutput();
            oFileDate = relatedCapID.getFileDate();
            strFileDate = dateFormatted(oFileDate.getMonth(), oFileDate.getDayOfMonth(), oFileDate.getYear(), '');
            if (DateWithinXyears(strFileDate, 5)) {
                constructionCost = getAppSpecific('Construction Cost', arrCAPS[xy]);
                if (constructionCost != '') {
                    sumVariable = sumVariable + parseFloat(constructionCost);
                }
            }

        }
    }
    //end replaced branch: ASA:SumConstructionCosts:LOOP;
    if (bContinue) {
        improvedValue = AInfo['ParcelAttribute.ImprovedValue'];
        logDebug('improvedValue: ' + improvedValue.toString());
        if (improvedValue != '') {
            improvedValue = parseFloat(improvedValue);
        }
        logDebug('sumVariable: ' + sumVariable.toString());
        if ((improvedValue * 0.5) < sumVariable && !parcelConditionExists('Construction Cost')) {
            addParcelCondition(null, 'Construction Cost', 'Applied', '50 Percent Notice', 'The total construction value over the past 5 years is greater than 50 percent of the total property value.', 'Notice');
        }
    }
}

if ((frACA == false) && proximity('AGIS_CHARCO', 'DRI', 1)) {
    email('Kevin.Lapham@charlottecountyfl.gov', 'DRI@AGIS-accela.com', 'NON-ACA Application in DRI for ' + capId + ' / ' + capIDString, 'Application in DRI for ' + capId + ' / ' + capIDString);
    if (ckCapDRI(capIDString) == false) {
        addStdCondition('CC PERMIT', 'DRI Notice');
    }
    editAppSpecific('Project Name', getGISInfo('AGIS_CHARCO', 'DRI', 'NAME'));
}


var existingDocs = aa.document.getCapDocumentList(capId, "ADMIN").getOutput();
if (existingDocs != null) {
    for (var index in existingDocs) {
        if (existingDocs[index].getDocCategory() == 'Affidavit for No Zoning Inspection') {
            scheduleInspection("Zoning Final", 1);
            resultInspection("Zoning Final", "Not Required", sysDate, "Automated by Affidavit for No Zoning Inspection document.");
        }
    }
}
