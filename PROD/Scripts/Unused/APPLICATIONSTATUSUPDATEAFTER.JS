
// DISABLED: ApplicationStatusUpdateAfter:1
// showMessage = true;
// showDebug=false;
branch('ASUA:' + appTypeArray[0] + '/*/*/*');
branch('ASUA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/*/*');
branch('ASUA:' + appTypeArray[0] + '/' + appTypeArray[1] + '/' + appTypeArray[2] + '/*');
branch('ASUA:' + appTypeString);

