var inspectionList = aa.env.getValue("InspectionList");
var Product = aa.env.getValue("Product");
var InspArr = inspectionList.toArray();

if (inspectionList != null) {
	for (x in InspArr) {
		var InspModel = InspArr[x];
		var inspGroup = InspModel.getInspectionGroup();
		var inspType = InspModel.getInspectionType();
		var capId = InspModel.getCapID();
		var capIDString = capId.getCustomID();
		var inspStatus = InspModel.getInspectionStatus();
		var inspTor = InspModel.getInspector();
		var myID = InspModel.getIdNumber();
		createPendingInspection(inspGroup, inspType, capId);
		if ((inspTor == null) || inspTor == "") {
			inspTor = "CHARCO/IS/APPSUP/NA/NA/NA/Kevin Lapham"
		}
		var schedDate = InspModel.getScheduledDate()
		var schedTime = InspModel.getScheduledTime()
		logDebug("InspModel=" + InspModel + "\n");
		logDebug("inspGroup=" + inspGroup + "\n");
		logDebug("inspType=" + inspType + "\n");
		logDebug("capId=" + capId + "\n");
		logDebug("capIDString=" + capIDString + "\n");
		logDebug("inspStatus=" + inspStatus + "\n");
		logDebug("inspTor=" + inspTor + "\n");
		logDebug("schedDate=" + schedDate + "\n");
		logDebug("schedTime=" + schedTime + "\n");

		var nameArray = new Array();
		nameArray = String(inspTor).split("/");
		var inspTor2 = nameArray[6];
		var nameArray2 = new Array();
		nameArray2 = String(inspTor2).split(" ");
		var firstname = nameArray2[0]; var lastname = nameArray2[1];
		var lastInspObj = aa.person.getUser(firstname, "", lastname).getOutput();
		var userEml = lastInspObj.getEmail();
		var addrResult = aa.address.getAddressByCapId(capId);
		var addrArray = new Array();
		addrArray = addrResult.getOutput();
		var hseNum = addrArray[0].getHouseNumberStart();
		var streetName = addrArray[0].getStreetName();
		var zip = addrArray[0].getZip();
		var city = addrArray[0].getCity();
		var etext = "at Address: " + hseNum + " " + streetName + ", " + city + " " + zip + "\n" + "has been cancelled.";
		var sysDate = aa.date.getCurrentDate(); sysDate = convertDate(sysDate);
		var dd = sysDate.getDate(); var mm = sysDate.getMonth(); var yyyy = sysDate.getYear();
		var dd2 = schedDate.getDate(); var mm2 = schedDate.getMonth(); var yyyy2 = schedDate.getYear();
		if ((mm == mm2 || mm > mm2) && (dd == dd2 || dd > dd2) && (yyyy == yyyy2 || yyyy > yyyy2)) {
			if (capIDString == null) {
				var mycapIDstring = new Array();
				mycapIDstring = String(InspModel).split(" ");
				var mycapIDstringOutput = mycapIDstring[3] + mycapIDstring[4];
				mycapIDstringOutput = mycapIDstringOutput.replace("Result", "");
				capIDString = mycapIDstringOutput;
				if (capIDString == null || capIDString == " " || capIDString == "" || capIDString == "= " || capIDString == "=") {
					capIDString = "ACA info N/A"//"N/A (ACA missing info)"
				} else {
					var mySearch = /null/i;
					var result = mySearch.test(capIDString);
					if (result == true) {
						capIDString = "n/a (customer cancelled in ACA)";
					}
				}
			}
			if (inspType != "Initial Inspection" && inspType != "Follow-up Inspection") {  //this is only Codes Enforcement
				aa.print("EMAIL: " + userEml + "\n" + "INSPECTION: " + inspType + "(ID # " + myID + ") scheduled on " + schedDate + "\n" + "for Permit # " + capIDString + " at \n" + etext + "<BR> capIDString: " + capIDString + "<BR> capId: " + capId + "<BR> myID: " + myID);
				//aa.sendMail("DoNotReply@charlottecountyFL.gov", "kevin.lapham@charlottecountyFL.gov", "", inspType + " Inspection Cancellation ID# " + myID, "Inspector email: " + userEml + "<BR>" + "INSPECTION: " + inspType + " scheduled on " + schedDate + "<BR>" + "for Permit " + capIDString + "<BR>" + etext); // + "<BR> inspLIST:" + inspectionList + "<BR> inspMod:" + InspModel); // + "<BR> capIDString: " + capIDString + "<BR> capId: " + capId);
				//if (userEml.length > 1) {
				if (userEml != "") {
					var newCapId = capIDString;
					var mySearchACA = /=/;
					var result = mySearchACA.test(capIDString);
					if (result == true) {
						var newCapId = capIDString.replace("=", "");
					}
					//aa.sendMail("DoNotReply@charlottecountyFL.gov", "kevin.lapham@charlottecountyFL.gov", "", inspType + " Inspection Cancellation ID# " + myID, "MSG SENT TO Inspector email: " + userEml + "<BR>" + "INSPECTION: " + inspType + " scheduled on " + schedDate + "<BR>" + "for Permit " + newCapId + "<BR>" + etext);
					aa.sendMail("DoNotReply@charlottecountyFL.gov", userEml, "", inspType + " Cancellation for " + newCapId, "INSPECTION: " + inspType + " scheduled on " + schedDate + "<BR>" + "for Permit # " + newCapId + "<BR>" + etext);
				}
				aa.print("--------------------------");
			}
		}
	}
}
