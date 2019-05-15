function conSysDate(thisDate) {
	//transform the date from asi
	if (thisDate != null)
		return new Date(thisDate.getMonth() + "/" + thisDate.getDayOfMonth() + "/" + thisDate.getYear());
	else
		return null;

}
