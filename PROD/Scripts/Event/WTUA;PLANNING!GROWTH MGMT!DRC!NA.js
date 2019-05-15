
clsPrntTsk = true;
allTsks = new Array();
allSubTsks = new Array();
allTsks = loadTasks(capId);
for (x in allTsks)
	//start replaced branch: WTUA:CloseParent
{
	if (appMatch('Planning/Growth Mgmt/DRC/NA') && (isTaskActive(x, 'PR-DRC1') || (allTsks[x].process == 'PR-DRC1' && !matches(taskStatus(x, 'PR-DRC1'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
		comment(x + ' status = ' + taskStatus(x, 'PR-DRC1'));
	}

	if (appMatch('Building/Accessories/Commercial/Boatlift') && (isTaskActive(x, 'PR-COMMBOAT') || (allTsks[x].process == 'PR-COMMBOAT' && !matches(taskStatus(x, 'PR-COMMBOAT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Cage') && (isTaskActive(x, 'PR-COMMCAGE') || (allTsks[x].process == 'PR-COMMCAGE' && !matches(taskStatus(x, 'PR-COMMCAGE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Carport') && (isTaskActive(x, 'PR-COMMCAR') || (allTsks[x].process == 'PR-COMMCAR' && !matches(taskStatus(x, 'PR-COMMCAR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Deck') && (isTaskActive(x, 'PR-COMMDECK') || (allTsks[x].process == 'PR-COMMDECK' && !matches(taskStatus(x, 'PR-COMMDECK'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Dock') && (isTaskActive(x, 'PR-COMMDOCK') || (allTsks[x].process == 'PR-COMMDOCK' && !matches(taskStatus(x, 'PR-COMMDOCK'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Door') && (isTaskActive(x, 'PR-COMMDOOR') || (allTsks[x].process == 'PR-COMMDOOR' && !matches(taskStatus(x, 'PR-COMMDOOR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Fence') && (isTaskActive(x, 'PR-COMMFENC') || (allTsks[x].process == 'PR-COMMFENC' && !matches(taskStatus(x, 'PR-COMMFENC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Garage') && (isTaskActive(x, 'PR-COMMGAR') || (allTsks[x].process == 'PR-COMMGAR' && !matches(taskStatus(x, 'PR-COMMGAR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Irrigation System') && (isTaskActive(x, 'PR-COMMIRR') || (allTsks[x].process == 'PR-COMMIRR' && !matches(taskStatus(x, 'PR-COMMIRR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Lanai') && (isTaskActive(x, 'PR-COMMLAN') || (allTsks[x].process == 'PR-COMMLAN' && !matches(taskStatus(x, 'PR-COMMLAN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Seawall') && (isTaskActive(x, 'PR-COMMSEAC') || (allTsks[x].process == 'PR-COMMSEAC' && !matches(taskStatus(x, 'PR-COMMSEAC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Shed') && (isTaskActive(x, 'PR-COMMSHED') || (allTsks[x].process == 'PR-COMMSHED' && !matches(taskStatus(x, 'PR-COMMSHED'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Shutters') && (isTaskActive(x, 'PR-COMMSHUT') || (allTsks[x].process == 'PR-COMMSHUT' && !matches(taskStatus(x, 'PR-COMMSHUT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Sign') && (isTaskActive(x, 'PR-COMMSIGN') || (allTsks[x].process == 'PR-COMMSIGN' && !matches(taskStatus(x, 'PR-COMMSIGN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Slab') && (isTaskActive(x, 'PR-COMMSLAB') || (allTsks[x].process == 'PR-COMMSLAB' && !matches(taskStatus(x, 'PR-COMMSLAB'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Swimming Pool') && (isTaskActive(x, 'PR-COMMPOOL') || (allTsks[x].process == 'PR-COMMPOOL' && !matches(taskStatus(x, 'PR-COMMPOOL'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Wall Exterior') && (isTaskActive(x, 'PR-COMMWALLX') || (allTsks[x].process == 'PR-COMMWALLX' && !matches(taskStatus(x, 'PR-COMMWALLX'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Wall Interior') && (isTaskActive(x, 'PR-COMMWALLI') || (allTsks[x].process == 'PR-COMMWALLI' && !matches(taskStatus(x, 'PR-COMMWALLI'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Commercial/Window') && (isTaskActive(x, 'PR-COMMWIN') || (allTsks[x].process == 'PR-COMMWIN' && !matches(taskStatus(x, 'PR-COMMWIN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Barn') && (isTaskActive(x, 'PR-RESBARN') || (allTsks[x].process == 'PR-RESBARN' && !matches(taskStatus(x, 'PR-RESBARN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Boatlift') && (isTaskActive(x, 'PR-RESBOAT') || (allTsks[x].process == 'PR-RESBOAT' && !matches(taskStatus(x, 'PR-RESBOAT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Cage') && (isTaskActive(x, 'PR-RESCAGE') || (allTsks[x].process == 'PR-RESCAGE' && !matches(taskStatus(x, 'PR-RESCAGE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Canopy') && (isTaskActive(x, 'PR-RESCAN') || (allTsks[x].process == 'PR-RESCAN' && !matches(taskStatus(x, 'PR-RESCAN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Carport') && (isTaskActive(x, 'PR-RESCAR') || (allTsks[x].process == 'PR-RESCAR' && !matches(taskStatus(x, 'PR-RESCAR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Deck') && (isTaskActive(x, 'PR-RESDECK') || (allTsks[x].process == 'PR-RESDECK' && !matches(taskStatus(x, 'PR-RESDECK'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Dock') && (isTaskActive(x, 'PR-RESDOCK') || (allTsks[x].process == 'PR-RESDOCK' && !matches(taskStatus(x, 'PR-RESDOCK'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Door') && (isTaskActive(x, 'PR-RESDOOR') || (allTsks[x].process == 'PR-RESDOOR' && !matches(taskStatus(x, 'PR-RESDOOR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Fence') && (isTaskActive(x, 'PR-RESFENCE') || (allTsks[x].process == 'PR-RESFENCE' && !matches(taskStatus(x, 'PR-RESFENCE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Garage') && (isTaskActive(x, 'PR-RESGAR') || (allTsks[x].process == 'PR-RESGAR' && !matches(taskStatus(x, 'PR-RESGAR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Irrigation System') && (isTaskActive(x, 'PR-RESIRR') || (allTsks[x].process == 'PR-RESIRR' && !matches(taskStatus(x, 'PR-RESIRR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Lanai') && (isTaskActive(x, 'PR-RESLANAI') || (allTsks[x].process == 'PR-RESLANAI' && !matches(taskStatus(x, 'PR-RESLANAI'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Seawall') && (isTaskActive(x, 'PR-RESSEAC') || (allTsks[x].process == 'PR-RESSEAC' && !matches(taskStatus(x, 'PR-RESSEAC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Shed') && (isTaskActive(x, 'PR-RESSHED') || (allTsks[x].process == 'PR-RESSHED' && !matches(taskStatus(x, 'PR-RESSHED'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Shutters') && (isTaskActive(x, 'PR-RESSHUT') || (allTsks[x].process == 'PR-RESSHUT' && !matches(taskStatus(x, 'PR-RESSHUT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Slab') && (isTaskActive(x, 'PR-RESSLAB') || (allTsks[x].process == 'PR-RESSLAB' && !matches(taskStatus(x, 'PR-RESSLAB'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Swimming Pool') && (isTaskActive(x, 'PR-RESPOOL') || (allTsks[x].process == 'PR-RESPOOL' && !matches(taskStatus(x, 'PR-RESPOOL'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Wall Exterior') && (isTaskActive(x, 'PR-RESWALLX') || (allTsks[x].process == 'PR-RESWALLX' && !matches(taskStatus(x, 'PR-RESWALLX'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Wall Interior') && (isTaskActive(x, 'PR-RESWALLI') || (allTsks[x].process == 'PR-RESWALLI' && !matches(taskStatus(x, 'PR-RESWALLI'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Accessories/Residential/Window') && (isTaskActive(x, 'PR-RESWIN') || (allTsks[x].process == 'PR-RESWIN' && !matches(taskStatus(x, 'PR-RESWIN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Addition') && (isTaskActive(x, 'PR-COMMADD') || (allTsks[x].process == 'PR-COMMADD' && !matches(taskStatus(x, 'PR-COMMADD'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Build out') && (isTaskActive(x, 'PR-COMMBO') || (allTsks[x].process == 'PR-COMMBO' && !matches(taskStatus(x, 'PR-COMMBO'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Change of Occupancy') && (isTaskActive(x, 'PR-COMMCHG') || (allTsks[x].process == 'PR-COMMCHG' && !matches(taskStatus(x, 'PR-COMMCHG'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Commercial Building') && (isTaskActive(x, 'PR-COMMBLDG') || (allTsks[x].process == 'PR-COMMBLDG' && !matches(taskStatus(x, 'PR-COMMBLDG'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Communication Tower') && (isTaskActive(x, 'PR-COMMTOWER') || (allTsks[x].process == 'PR-COMMTOWER' && !matches(taskStatus(x, 'PR-COMMTOWER'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/DCA Office') && (isTaskActive(x, 'PR-DCACOMM') || (allTsks[x].process == 'PR-DCACOMM' && !matches(taskStatus(x, 'PR-DCACOMM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Foundation') && (isTaskActive(x, 'PR-FOUND') || (allTsks[x].process == 'PR-FOUND' && !matches(taskStatus(x, 'PR-FOUND'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Landscape') && (isTaskActive(x, 'PR-LANDSCP') || (allTsks[x].process == 'PR-LANDSCP' && !matches(taskStatus(x, 'PR-LANDSCP'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Miscellaneous') && (isTaskActive(x, 'PR-COMMMISC') || (allTsks[x].process == 'PR-COMMMISC' && !matches(taskStatus(x, 'PR-COMMMISC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Modular') && (isTaskActive(x, 'PR-DCACOMM') || (allTsks[x].process == 'PR-DCACOMM' && !matches(taskStatus(x, 'PR-DCACOMM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Multi-Family') && (isTaskActive(x, 'PR-COMMMULTI') || (allTsks[x].process == 'PR-COMMMULTI' && !matches(taskStatus(x, 'PR-COMMMULTI'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Remodel') && (isTaskActive(x, 'PR-COMMINREM') || (allTsks[x].process == 'PR-COMMINREM' && !matches(taskStatus(x, 'PR-COMMINREM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/Shell') && (isTaskActive(x, 'PR-COMMSHEL') || (allTsks[x].process == 'PR-COMMSHEL' && !matches(taskStatus(x, 'PR-COMMSHEL'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Commercial/SUBDRY') && (isTaskActive(x, 'PR-RESSHUT') || (allTsks[x].process == 'PR-RESSHUT' && !matches(taskStatus(x, 'PR-RESSHUT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Addition') && (isTaskActive(x, 'PR-RESADD') || (allTsks[x].process == 'PR-RESADD' && !matches(taskStatus(x, 'PR-RESADD'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/DCA Home') && (isTaskActive(x, 'PR-DCARES') || (allTsks[x].process == 'PR-DCARES' && !matches(taskStatus(x, 'PR-DCARES'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Duplex') && (isTaskActive(x, 'PR-DUPLEX') || (allTsks[x].process == 'PR-DUPLEX' && !matches(taskStatus(x, 'PR-DUPLEX'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Master Plan') && (isTaskActive(x, 'PR-MASTER') || (allTsks[x].process == 'PR-MASTER' && !matches(taskStatus(x, 'PR-MASTER'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Miscellaneous') && (isTaskActive(x, 'PR-MISCRES') || (allTsks[x].process == 'PR-MISCRES' && !matches(taskStatus(x, 'PR-MISCRES'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Mobile Home') && (isTaskActive(x, 'PR-MOBILE') || (allTsks[x].process == 'PR-MOBILE' && !matches(taskStatus(x, 'PR-MOBILE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Modular') && (isTaskActive(x, 'PR-MOBILE') || (allTsks[x].process == 'PR-MOBILE' && !matches(taskStatus(x, 'PR-MOBILE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Remodel') && (isTaskActive(x, 'PR-RESINREM') || (allTsks[x].process == 'PR-RESINREM' && !matches(taskStatus(x, 'PR-RESINREM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Single Family') && (isTaskActive(x, 'PR-SINGFAM') || (allTsks[x].process == 'PR-SINGFAM' && !matches(taskStatus(x, 'PR-SINGFAM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/SUBDRY') && (isTaskActive(x, 'PR-RESSHUT') || (allTsks[x].process == 'PR-RESSHUT' && !matches(taskStatus(x, 'PR-RESSHUT'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Construction/Residential/Townhouse') && (isTaskActive(x, 'PR-TOWN') || (allTsks[x].process == 'PR-TOWN' && !matches(taskStatus(x, 'PR-TOWN'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Demolitions') && (isTaskActive(x, 'PR-TRADEDEM') || (allTsks[x].process == 'PR-TRADEDEM' && !matches(taskStatus(x, 'PR-TRADEDEM'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Electrical') && (isTaskActive(x, 'PR-TRADEELE') || (allTsks[x].process == 'PR-TRADEELE' && !matches(taskStatus(x, 'PR-TRADEELE'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Fire') && (isTaskActive(x, 'PR-TRADEFIR') || (allTsks[x].process == 'PR-TRADEFIR' && !matches(taskStatus(x, 'PR-TRADEFIR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Irrigation System') && (isTaskActive(x, 'PR-COMMIRR') || (allTsks[x].process == 'PR-COMMIRR' && !matches(taskStatus(x, 'PR-COMMIRR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Mechanical') && (isTaskActive(x, 'PR-TRADEMEC') || (allTsks[x].process == 'PR-TRADEMEC' && !matches(taskStatus(x, 'PR-TRADEMEC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Plumbing') && (isTaskActive(x, 'PR-TRADEPLU') || (allTsks[x].process == 'PR-TRADEPLU' && !matches(taskStatus(x, 'PR-TRADEPLU'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Commercial/Roofing') && (isTaskActive(x, 'PR-TRADEROO') || (allTsks[x].process == 'PR-TRADEROO' && !matches(taskStatus(x, 'PR-TRADEROO'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Residential/Irrigation System') && (isTaskActive(x, 'PR-COMMIRR') || (allTsks[x].process == 'PR-COMMIRR' && !matches(taskStatus(x, 'PR-COMMIRR'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Residential/Mechanical') && (isTaskActive(x, 'PR-TRADEMEC') || (allTsks[x].process == 'PR-TRADEMEC' && !matches(taskStatus(x, 'PR-TRADEMEC'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

	if (appMatch('Building/Trade Permits/Residential/Plumbing') && (isTaskActive(x, 'PR-TRADEPLU') || (allTsks[x].process == 'PR-TRADEPLU' && !matches(taskStatus(x, 'PR-TRADEPLU'), 'Approved', 'Not Required', null)))) {
		clsPrntTsk = false;
	}

}
//end replaced branch: WTUA:CloseParent;
if (clsPrntTsk) {
	closeTask('Reviews', 'Approved', 'Closed by Script', '');
} else {
	comment('NOT YET');
}
