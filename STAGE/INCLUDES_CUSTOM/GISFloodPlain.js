function GISFloodPlain(svc, layer, distance, attrib) {
	//return attributes from multiple GIS Objects when a parcel crosses multiple flood zones
	var ret = "";
	var myBuff = getGISBufferInfo(svc, layer, distance, attrib);
	for (x in myBuff) {
		var var1 = myBuff[x][attrib];
		if (ret == "")
			ret = var1;
		else if (ret.indexOf(var1) < 0)
			ret += "," + var1;
	}

	return ret;
}
