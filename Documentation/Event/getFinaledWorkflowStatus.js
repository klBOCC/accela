	logDebug("FUNCTION: getFinaledWorkflowStatus() ... ");
	
	//Need to check the Record Types and return status of "C of O Issued" or "Finaled" (default)
	
	logDebug("Application Type is: " + appTypeString);
	
	//This function is called for the Building module, so no need to check that here
	if(appTypeArray[1] == "Construction")
	{
		if(appTypeArray[2] == "Commercial" && matches(appTypeArray[3], "Addition", "Build Out", "Change of Occupancy", "Commercial Building", "DCA Office", "Modular", "Multi-Family"))
		{
			logDebug("Return status of C of O Issued");
			return "C of O Issued";
		}
		
		if(appTypeArray[2] == "Residential" && matches(appTypeArray[3], "Addition", "DCA Home", "Duplex", "Mobile Home", "Modular", "Single Family", "Townhouse"))
		{
			logDebug("Return status of C of O Issued");
			return "C of O Issued";
		}
		 
		//Default need to return "Finaled"
		logDebug("Return status of Finaled");
		return "Finaled";
	}
	else
	{
		logDebug("Return status of Finaled");
		return "Finaled";
	}
}

// end of Roland's functions



////////////////////////////////////////////////////////////////////////////////////////////
//20180601 - kl -longshoreman's removed (former 20141017 - bec - Longshoreman functions)
//Start the script for validating the licensed professional
////////////////////////////////////////////////////////////////////////////////////////////

