function seaTurtle() {

	if (proximity('AGIS_CHARCO', 'Sea Turtle Lighting Zones', 1)) {
		var cap = aa.cap.getCap(capId).getOutput();
		var CapTypeResult = cap.getCapType();
		addrResult = aa.address.getAddressByCapId(capId);
		var addrArray = new Array();
		var addrArray = addrResult.getOutput();
		var streetName = addrArray[0].getStreetName();
		var hseNum = addrArray[0].getHouseNumberStart();
		var streetSuffix = addrArray[0].getStreetSuffix();
		var city = addrArray[0].getCity();
		var zip = addrArray[0].getZip();
		if (streetSuffix == null) {
			streetSuffix = '';
		}
		var etext;
		etext = 'Permit # ' + capIDString + '<BR>Permit type: ' + CapTypeResult + '<BR>ADDRESS: ' + hseNum + ' ' + streetName + ' ' + streetSuffix + ', ' + city + ' ' + zip;
		email('info@coastalwildlifeclub.org', 'NoReply@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
		email('Kevin.Lapham@charlottecountyfl.gov', 'coastalWildlife.CondAUDIT@CharlotteCountyFL.gov', 'Sea Turtle Monitoring Notification for Permit ' + capIDString, 'The following permit is in a Sea Turtle Monitoring Zone:<br>' + etext);
	}
}
