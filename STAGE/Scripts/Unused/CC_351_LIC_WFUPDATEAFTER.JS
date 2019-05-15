
comment('CC_351_LIC_WFUpdateAfter Executing message');
if (appMatch('Licenses/Contractors/Locally Licensed/*')  && wfTask == 'Quality Review'  && wfStatus == 'Approved') {
	comment('Passed Criteria message');
	updateTask('Status','Active','Issuance');
	LicType = lookup('CC_LIC_TYPE',AInfo['Certificate of Competency Category']);
	comment('Lookup Result message - ' + LicType + '  CAPID '+ capIDString);
	createRefLicProf(capIDString,LicType,'COC Applicant');
	licEditExpInfo('Active',dateAdd(null,730));
// DISABLED: CC_351_LIC_WFUpdateAfter:6
// 	lic = new licenseObject(capIDString);
// 	lic.setExpiration(expDate);
// 	lic.setLastRenewal(dateAdd(null,0));
// 	}

