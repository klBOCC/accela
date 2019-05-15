
showDebug=false;
showMessage=false;
branch('WTUA:' + appTypeString);
branch('WTUA:' + appTypeArray[0] + '/*/*/*');
branch('WTUA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/*/*');
branch('WTUA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/' + appTypeArray[2] + '/*');

