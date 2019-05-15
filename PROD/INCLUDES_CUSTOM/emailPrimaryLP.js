function emailPrimaryLP(emailSubject, emailMessage) {
	recLicProfArray = getLicenseProfessional(capId);

	if (recLicProfArray != null)
		for (recLic in recLicProfArray) {
			var recLP = "";

			recLP = recLicProfArray[recLic];

			if (recLP.getPrintFlag() != "Y")
				continue;

			recLPEmail = recLP.getEmail();

			if (recLPEmail != null)
				email(recLPEmail, "noreply@charlottefl.com", emailSubject, emailMessage);
		}
}
