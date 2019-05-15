function proximityInfo(svc, layer, numDistance) {
	var distanceType = "feet"
		if (arguments.length == 4)
			distanceType = arguments[3];
		var bufferTargetResult = aa.gis.getGISType(svc, layer);
	if (bufferTargetResult.getSuccess()) {
		var buf = bufferTargetResult.getOutput();
		buf.addAttributeName(layer + "_ID");
	} else {
		aa.print("**WARNING: Getting GIS Type for Buffer Target.  Reason is: " + bufferTargetResult.getErrorType() + ":" + bufferTargetResult.getErrorMessage());
		return false
	}
	var gisObjResult = aa.gis.getCapGISObjects(capId);
	if (gisObjResult.getSuccess())
		var fGisObj = gisObjResult.getOutput();
	else {
		aa.print("**WARNING: Getting GIS objects for Cap.  Reason is: " + gisObjResult.getErrorType() + ":" + gisObjResult.getErrorMessage());
		return false
	}
	for (a1 in fGisObj) {
		var bufchk = aa.gis.getBufferByRadius(fGisObj[a1], numDistance, distanceType, buf);
		if (bufchk.getSuccess())
			var proxArr = bufchk.getOutput();
		else {
			aa.print("**WARNING: Retrieving Buffer Check Results.  Reason is:  missing " + layer + " / " + bufchk.getErrorType() + ":" + bufchk.getErrorMessage());
			return 0
		}
		for (a2 in proxArr) {
			var proxObj = proxArr[a2].getGISObjects();
			for (z1 in proxObj) {
				var v = proxObj[z1].getAttributeValues();
				for (g in v) {
					myName = v[g]
				}
				return myName;
			}

		}
	}
}

