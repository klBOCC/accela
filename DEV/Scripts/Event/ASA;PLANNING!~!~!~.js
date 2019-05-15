// comment

if (proximity('AGIS_CHARCO', 'Community Planning Areas', 1)) {
	addStdCondition('CC PERMIT', 'Community Planning Area');
}

// DISABLED: ASA:Planning/*/*/*:2
// if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
// 	addAppCondition('CC PERMIT', 'Applied', 'Babcock Ranch', 'This parcel is in the Babcock Ranch development.', 'Notice');
// 	}

// DISABLED: ASA:Planning/*/*/*:3
// if (proximity('AGIS_CHARCO', 'CH', 1)) {
// 	addAppCondition('CC PERMIT', 'Applied', 'Charlotte Harbor CRA', 'This parcel is in the Charlotte Harbor CRA.', 'Notice');
// 	}

if (proximity('AGIS_CHARCO', 'Babcock_Lots', 1)) {
	addStdCondition('CC PERMIT', 'Babcock Ranch');
}

if (proximity('AGIS_CHARCO', 'CH', 1)) {
	addStdCondition('CC PERMIT', 'Charlotte Harbor CRA');
}
