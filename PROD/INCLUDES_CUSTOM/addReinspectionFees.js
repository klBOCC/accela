
function addReinspectionFees() {

	if (!feeExists('REINS.01')) {
		addFee('REINS.01', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}

	if (feeExists('REINS.01') && !feeExists('REINS.02')) {
		addFee('REINS.02', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}

	if (feeExists('REINS.02') && !feeExists('REINS.03')) {
		addFee('REINS.03', 'REINSPECTION', 'ORIGINAL', 1, 'Y');
	}
}
