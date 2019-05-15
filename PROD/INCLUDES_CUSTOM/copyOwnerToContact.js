function copyOwnerToContact(nContactType) {
	//have to specify a temporary CAP that has an owner attached to get access to the base contact info
	//This is the problimatic area since you have to pull the ContactModel from another CAP and cannot create
	//a new instance of the object

	//get cap contact model from existing cap

	//get owner from current cap
	var OwnersResult = aa.owner.getOwnerByCapId(capId);
	if (OwnersResult.getSuccess())
		Owners = OwnersResult.getOutput();
	else {
		logDebug("Error Retrieving Cap Owner");
		return null;
	}

	var owner = Owners[0];
	capContactResult = aa.people.getCapContactByCapID(capId);

	if (capContactResult.getSuccess()) {
		Contacts = capContactResult.getOutput();
		if (Contacts.length > 0) {
			var theContact = Contacts[0].getCapContactModel();
			var People = Contacts[0].getPeople();
			var cAddress = People.getCompactAddress();
			cAddress.setAddressId(null);
			cAddress.setAddressLine1(owner.getMailAddress1());
			cAddress.setAddressLine2(owner.getMailAddress2());
			cAddress.setAddressLine3(owner.getMailAddress3());
			cAddress.setCity(owner.getMailCity());
			cAddress.setCountry(owner.getCountry());
			cAddress.setState(owner.getMailState());
			cAddress.setZip(owner.getMailZip());

			People.setBusinessName(null);
			People.setCompactAddress(cAddress);
			People.setContactType(nContactType);
			//People.setContactTypeFlag("Y");
			People.setEmail(null);
			People.setFax(owner.getFax());
			People.setComment(null);

			People.setPhone1(owner.getPhone());
			People.setPhone2(null);

			theContact.setCapID(capId);
			theContact.setCountry(owner.getCountry());
			theContact.setEmail(null);
			theContact.setFirstName(owner.getOwnerFirstName());
			theContact.setLastName(owner.getOwnerLastName());
			theContact.setFullName(owner.getOwnerFullName());
			theContact.setPeople(People);
			//theContact.setServiceProviderCode(aa.getServiceProviderCode());

			aa.people.createCapContact(theContact);
		} else {
			logDebug("No Contact to copy");
			return false;
		}
	} else {
		logDebug("Error Retrieving Cap Contact Model");
		return null;
	}
}
