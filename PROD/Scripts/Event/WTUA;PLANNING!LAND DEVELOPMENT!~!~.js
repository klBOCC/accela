//WTUA;PLANNING!LAND DEVELOPMENT!~!~

//start replaced branch: CC_351_LD_WFUpdateAfter

	if (appMatch('Planning/Land Development/Grade & Fill/*') && wfTask == 'Issuance' && wfStatus == 'Issued') {
		scheduleInspection('ROW Inspection', 0, '');
		scheduleInspection('Preliminary Inspection', 60, '');
		scheduleInspection('Final Inspection', 120, '');
	}

	if (appMatch('Planning/Land Development/Excavations/II') && wfTask == 'Permit Issuance' && wfStatus == 'Issued') {
		editAppSpecific('Reclamation Date', dateAdd(null, 3650));
	}

	if (appMatch('Planning/Land Development/Excavations/III') && wfTask == 'Permit Issuance' && wfStatus == 'Issued') {
		editAppSpecific('Reclamation Date', dateAdd(null, 3650));
	}

	if (appMatch('Planning/Land Development/Excavations/Exemption') && wfTask == 'Overall Approval' && wfStatus == 'Approved') {
		scheduleInspection('Final Excavation Inspection', 365, '');
	}

	if (appMatch('Planning/Land Development/Plats/Preliminary') && wfTask == 'BCC Hearing' && wfStatus == 'Approved') {
		editAppSpecific('Expiration Date', dateAdd(null, 730));
	}

/*  This is old Accela code that is broken:
	if (appMatch('Planning/Land Development/ROW/Utility') && wfTask == 'Sufficiency Review' && wfStatus == 'Sufficient') {       
        sendToAddress = null;
		sendToAddress = 'fbenitez@accela.com';
		emailSubject = 'Release of power to structure notification';
		emailText = 'Permit Number : ' + capIDString + '\n';
		ca = getOwnerArray();
		for (ca1 in ca) {
			for (ca2 in ca[ca1]) {
				// TODO: source code for conversion had a syntax error here, fixed.
				//emailText += ca2 + ' = ' ca[ca1][ca2] + '\n';
				emailText += ca2 + ' = ' + ca[ca1][ca2] + '\n';				
			}
		}
		ad = aa.address.getAddressByCapId(capId).getOutput();
		emailText += 'Address = ' + ad[0].getHouseNumberStart() + ' ' + ad[0].getStreetPrefix() + ' ' + ad[0].getStreetName();
		emailText += ' ' + ad[0].getStreetSuffix() + ' ' + ad[0].getUnitStart() + ', ' + ad[0].getCity + ' ' + ad[0].getZip() + '\n';
		emailText += 'Please be advised that all applicable inspections have been completed for the above permit and we approve the release of power to the structure. ';
		emailText += 'A copy of the applicable permit is attached for your information.' + '\n';
		emailText += ' ' + '\n';
		emailText += 'Sincerely' + '\n';
		emailText += 'Charlotte County Building Construction Services';
		aa.sendMail('accela@accela.com', sendToAddress, '', emailSubject, emailText);  
	} 
*/
//end replaced branch: CC_351_LD_WFUpdateAfter;
// The code in this branch needs to be re-written 
