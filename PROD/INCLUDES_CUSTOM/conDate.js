function conDate(thisDate) {
	//transform the date from asi
	if (thisDate != null)
		return new Date(thisDate.getMonth() + "/" + (thisDate.getDayOfMonth() + 1) + "/" + thisDate.getYear());
	else
		return null;

}
