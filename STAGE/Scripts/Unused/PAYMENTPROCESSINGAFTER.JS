
if (currentUserID == 'LAPHAMK') {
	showMessage=true;
	showDebug=true;
	} else {
	showMessage=true;
	showDebug=false;
	}

branch('PPA:' + appTypeArray[0] + '/*/*/*');
branch('PPA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/*/*');
branch('PPA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/' + appTypeArray[2] + '/*');
branch('PPA:' + appTypeString);

