function DateWithinXyears(pFileDate, numYears) {
	// This function will check if the date passed in is within X years of today (in the past if numYears is positive).

	var fileDate = new Date(pFileDate);

	var compareDate = new Date();
	compareDate.setDate(compareDate.getDate() - (365 * numYears));

	if (fileDate >= compareDate)
		return true;
	else
		return false;
}
