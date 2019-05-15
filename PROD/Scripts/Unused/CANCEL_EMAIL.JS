
if (currentUserID == 'LAPHAMK') {
	showMessage=true;
	showDebug=true;
	} else {
	showMessage=false;
	showDebug=false;
	}

comment('The scheduled date is: ' + inspSchedDate + ' for type: ' + inspType + ' / ' + capId + ' / ' + capIDString);
if(inspSchedDate != null) var currentDt = new Date(inspSchedDate);
var dd = currentDt.getDate();
var mm = currentDt.getMonth() + 1;
var yyyy = currentDt.getFullYear();
var dd = currentDt.getDate();
var mm = currentDt.getMonth() + 1;
var yyyy = currentDt.getFullYear();
var myDateStr = mm + '/' + dd + '/' + yyyy;
comment('myDateStr = ' +myDateStr );
var StrCapID = String(capIDString);
var StrInspType = String(inspType);
comment('str: ' + StrCapID + ' / ' + StrInspType);
var insEmail = lastInspEmail(StrCapID , StrInspType);
comment(insEmail);
var sysDate = aa.date.getCurrentDate();
sysDate = convertDate(sysDate);
comment('sysDate=' + sysDate);
var sdd = sysDate.getDate();
var smm = sysDate.getMonth() + 1;
var syyyy = sysDate.getFullYear();
comment('FORMATED sys DATE: '+smm+'/'+sdd+'/'+syyyy);
var text2 = 'Permit # ' + capId.getCustomID() + ' Type: '  + inspType + ' scheduled on ' + inspSchedDate;
var addrResult = aa.address.getAddressByCapId(capId);
var addrArray = new Array();
addrArray = addrResult.getOutput();
var hseNum = addrArray[0].getHouseNumberStart();
var streetName = addrArray[0].getStreetName();
var zip = addrArray[0].getZip();
var city = addrArray[0].getCity();
var etext = 'at Address: ' + hseNum + ' ' + streetName + ', ' + city + ' ' + zip + '\n';
comment('A cancellation email would be sent TO:  ' + insEmail + ' with the following details:');
var header = 'Email:  ' + insEmail;
var emlText = text2 + '<br>' + etext + '<br>' + 'has been ' + inspResult + '.';
comment(text2 + '\n' + etext + '\n' + inspResult + '.');
if((insEmail != null) && (mm<=smm && dd<=sdd && yyyy<=syyyy) ) aa.sendMail('DoNotReply@CharlotteCountyFL.gov',insEmail,'','Inspection Cancel Notification for ' + capIDString, emlText);

