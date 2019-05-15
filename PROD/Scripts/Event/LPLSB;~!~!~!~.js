// LPLSB
// extracted from customized master script
showMessage = false;
var licenseList = aa.env.getValue("LicenseList").toArray();
var cap = aa.env.getValue("CapIdModel");
logDebug("cap: " + cap);
var capm = aa.cap.getCap(cap).getOutput();
var appTypeResult = capm.getCapType();
var appTypeString = appTypeResult.toString();
logDebug("Application TYPE: " + appTypeString);
var appTypeArray = appTypeString.split("/");
var licenseTypetoAdd = "";
logDebug("licenseList = " + licenseList.getClass());

for (var i in licenseList) {
    showMessage = false;
    logDebug("licenseList[" + i + "] = " + licenseList[i].getStateLicense());
    var StLic = licenseList[i].getStateLicense();
    logDebug("appTypeArray[0]: " + appTypeArray[0]);
    var licenseTypetoAdd = licenseList[i].getLicenseType();
    logDebug("licenseTypetoAdd: " + licenseTypetoAdd);



    bAllowAdd = false;
    lookupResult = '';
    fixedCAPType = '';
    lookupSearchVal = 'FILTER_BY_REFTYPE_' + appTypeArray[0] + '_' + licenseTypetoAdd;
    lookupResult = lookup('ACA_FILTER_CAP_BY_LICENSE', lookupSearchVal);
    var a = 0;
    var b = 0;
    if (lookupResult != undefined) {
        var arrAllowedCAPTypes = lookupResult.split(',');
        for (xy in arrAllowedCAPTypes) {
            if (!bAllowAdd) {
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

                if (appMatch2(fixedCAPType, cap)) {
                    bAllowAdd = true;
                } else {
                    bAllowAdd = false;
                }
            }

        }

        if (bAllowAdd == true) {
            showMessage = false;
        } else {
            showMessage = true;
            comment(StLic + ': <b> This Contractor is not valid to be the primary contractor on this CAP.  If you are adding a sub please continue.  If you are trying to change the primary contractor, please see your supervisor. </b>');
            //cancel = true;
        }
    }

}


if (!appMatch('Building/Construction/Commercial/Shell') & !appMatch('Building/Trade Permits/Commercial/Irrigation System')) {

    var LicProfList = aa.env.getValue('LicenseList').toArray();
    var x = 0;

    if (LicProfList.length > 0) {
        for (x in LicProfList) {
            showMessage = true;
            var lpn = LicProfList[x].getStateLicense();
            if (GetLicInfo(lpn)[0] == true) {
                showMessage = true;
                comment(GetLicInfo(lpn)[1]);
                cancel = true;
            }
        }
    }

    if (LPValidation()) {
        showMessage = true;
        cancel = true;
        comment('Your General liability or Workmans Compensation Insurance is expired or not on file. Please contact Community Development on 941-743-1201');
    }
}


function validateLicenseTypeForCap3(CAPTypes, typeStr) {
    var appTypeString = typeStr;
    var arrAllowedCAPTypes = CAPTypes;
    fixedCAPType = '';
    if (arrAllowedCAPTypes.indexOf('///') != -1) {
        fixedCAPType = arrAllowedCAPTypes.substring(0, arrAllowedCAPTypes.indexOf('/')) + '/*/*/*';
    }
    if (fixedCAPType == '' && arrAllowedCAPTypes.indexOf('//') != -1) {
        fixedCAPType = arrAllowedCAPTypes.substring(0, arrAllowedCAPTypes.indexOf('//')) + '/*/*';
    }
    if (fixedCAPType == '' && arrAllowedCAPTypes.charAt(arrAllowedCAPTypes.length - 1) == '/') {
        fixedCAPType = arrAllowedCAPTypes + '*';
    }
    if (fixedCAPType == '') {
        fixedCAPType = arrAllowedCAPTypes;
    }
    if (appTypeString == fixedCAPType) {
        return true;
    } else {
        return false;
    }

}


function appMatch2(ats) // optional capId or CapID string
{
    var matchArray = appTypeArray; //default to current app
    if (arguments.length == 2) {
        matchCapParm = arguments[1];
        if (typeof (matchCapParm) == "string")
            matchCapId = aa.cap.getCapID(matchCapParm).getOutput();   // Cap ID to check
        else
            matchCapId = matchCapParm;
        if (!matchCapId) {
            logDebug("**WARNING: CapId passed to appMatch was not valid: " + arguments[1]);
            return false;
        }
        matchCap = aa.cap.getCap(matchCapId).getOutput();
        matchArray = matchCap.getCapType().toString().split("/");
    }

    var isMatch = true;
    var ata = ats.split("/");
    if (ata.length != 4)
        logDebug("**ERROR in appMatch.  The following Application Type String is incorrectly formatted: " + ats);
    else
        for (xx in ata)
            if (!ata[xx].equals(matchArray[xx]) && !ata[xx].equals("*"))
                isMatch = false;
    return isMatch;
}

