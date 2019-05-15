var PermitId1 = aa.env.getValue("PermitId1");
var PermitId2 = aa.env.getValue("PermitId2");
var PermitId3 = aa.env.getValue("PermitId3");
var capIDModel = aa.cap.getCapIDModel(PermitId1, PermitId2, PermitId3).getOutput();
aa.print("capIDModel: " + capIDModel);


if (typeof (STRUCTURE) != 'undefined') {
    damageAmt = 0;
    valuation = 0;
    removeASITable('STRUCTURE');
    for (rec in STRUCTURE) {
        arrNewTableRec = [];
        valuation = 0;
        arrNewTableRec['Structure Description'] = STRUCTURE[rec]['Structure Description'];
        arrNewTableRec['Structure Value'] = STRUCTURE[rec]['Structure Value'];
        arrNewTableRec['Damage Percent'] = STRUCTURE[rec]['Damage Percent'];

        if (STRUCTURE[rec]['Damage Percent'] > 0 && STRUCTURE[rec]['Structure Value'] > 0) {
            valuation = parseFloat(STRUCTURE[rec]['Damage Percent']) * parseFloat(STRUCTURE[rec]['Structure Value']);
            valuation = round(valuation, 2);
        }

        arrNewTableRec['Damage Valuation Amount'] = valuation.toString();
        addToASITable('STRUCTURE', arrNewTableRec);

    }
}



if (typeof (BUILDINGDETAIL) != 'undefined') {
    sumT = 0;
    removeASITable('BUILDING DETAIL');
    for (rec in BUILDINGDETAIL) {
        arrNewTableRec = [];
        valuation = 0;
        arrNewTableRec['Building Unit'] = BUILDINGDETAIL[rec]['Building Unit'];
        arrNewTableRec['Foundation'] = BUILDINGDETAIL[rec]['Foundation'];
        arrNewTableRec['Superstructure'] = BUILDINGDETAIL[rec]['Superstructure'];
        arrNewTableRec['Roofing'] = BUILDINGDETAIL[rec]['Roofing'];
        arrNewTableRec['Exterior Finish'] = BUILDINGDETAIL[rec]['Exterior Finish'];
        arrNewTableRec['Interior Finish'] = BUILDINGDETAIL[rec]['Interior Finish'];
        arrNewTableRec['Doors Windows'] = BUILDINGDETAIL[rec]['Doors Windows'];
        
        if (BUILDINGDETAIL[rec]['Doors Windows'] == ""){
            BUILDINGDETAIL[rec]['Doors Windows'] = 0;
        }

        if (BUILDINGDETAIL[rec]['Interior Finish'] == ""){
            BUILDINGDETAIL[rec]['Interior Finish'] = 0;
        }

        if (BUILDINGDETAIL[rec]['Exterior Finish'] == ""){
            BUILDINGDETAIL[rec]['Exterior Finish'] = 0;
        }

        if (BUILDINGDETAIL[rec]['Roofing'] == "") {
            BUILDINGDETAIL[rec]['Roofing'] = 0;
        }

        if (BUILDINGDETAIL[rec]['Superstructure'] == "") {
            BUILDINGDETAIL[rec]['Superstructure'] = 0;
        }

        if (BUILDINGDETAIL[rec]['Foundation'] == "") {
            BUILDINGDETAIL[rec]['Foundation'] = 0;
        }
 
        sumT = parseFloat(BUILDINGDETAIL[rec]['Doors Windows']) + parseFloat(BUILDINGDETAIL[rec]['Interior Finish']) + parseFloat(BUILDINGDETAIL[rec]['Exterior Finish']) + parseFloat(BUILDINGDETAIL[rec]['Roofing']) + parseFloat(BUILDINGDETAIL[rec]['Superstructure']) + parseFloat(BUILDINGDETAIL[rec]['Foundation']);
        sumT = round(sumT, 2);

        aa.print("SumT = " + sumT);

        if (sumT != 100) {
            aa.print("The total must equal 100 (representing 100%).  Recheck your percentages and save again.")
        }

        arrNewTableRec['Total Percent'] = sumT.toString();
        addToASITable('BUILDING DETAIL', arrNewTableRec);

    }
}


function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
