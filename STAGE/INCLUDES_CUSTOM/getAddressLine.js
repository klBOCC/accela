function getAddressLine(getPrimary) {
	//gets address returns, returns false if address not found
	//capId optional

	if (arguments.length == 2)
		itemCap = arguments[1]; // use cap ID specified in args;
	else
		itemCap = capId;

	var addressLineArray = new Array();

	addrResult = aa.address.getAddressByCapId(itemCap);

	if (addrResult.getSuccess()) {
		addr = addrResult.getOutput();

		if (addr.length > 0) {
			for (ad in addr) {
				var addressLine = "";
				//Build address into a line
				if (addr[ad].getHouseNumberStart() != null)
					addressLine += addr[ad].getHouseNumberStart();
				if (addr[ad].getStreetDirection() != null)
					addressLine += " " + addr[ad].getStreetDirection();
				if (addr[ad].getStreetName() != null)
					addressLine += " " + addr[ad].getStreetName();
				if (addr[ad].getStreetSuffix() != null)
					addressLine += " " + addr[ad].getStreetSuffix();
				if (addr[ad].getStreetSuffixdirection() != null)
					addressLine += " " + addr[ad].getStreetSuffixdirection();
				/*Get city,state,zip
				if(addr[ad].getCity() != null) addressLine += ", " + addr[0].getCity();
				if(addr[ad].getState() != null) addressLine += ", " + addr[0].getState();
				if(addr[ad].getZip() != null) addressLine += " " + addr[0].getZip(); */

				//check for primary if getPrimary = "Y"
				if (getPrimary.equals("Yes")) {
					if (addr[ad].getPrimaryFlag() == "Y") {
						logDebug("Sending Primary Address");
						return addressLine;
					}
				} else {
					logDebug("Adding " + [ad] + " to array");
					addressLineArray.push(addressLine);
				}

			}
		} else
			return false;

		if (addressLineArray.length > 0)
			return addressLineArray[0];
	} else
		return false;

}
