// DUPA - document update after   
var capId = aa.env.getValue("CapID");
var documentModelArray = aa.env.getValue("DocumentModel");

var DMdescription = documentModelArray.getDocDescription();
var DocNumber = documentModelArray.getDocumentNo();
var myText = String(DMdescription);
aa.print("DMdescription=" + DMdescription + " : IS A TYPE:  " + typeof DMdescription);
var myLen = myText.length;
aa.print("myText.length=" + myText.length);
if (myLen > 40) {

    var newDesc = myText.substring(0, 40);

    aa.print("The description length is " + myLen + " and has exceeded the 40 character limitation.");
    aa.print("The description has been modified and saved as: " + newDesc);


    docModel = aa.document.getDocumentByPK(DocNumber).getOutput();
    docModel.setDocDescription(newDesc);
    updDocResult = aa.document.updateDocument(docModel);

    if (updDocResult.getSuccess()) {
        updDocResult.getOutput();
        aa.print("Successfully updated document description.");
    }
    else {
        aa.print("Failed to update document. " + updDocResult.getErrorMessage());
    }
}