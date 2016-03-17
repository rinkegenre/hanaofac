sap.ui.controller("views.startview", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf ui5eccdeployment.startview
*/
//	onInit: function() {
//
//
//	},
	 onInit : function() {	        
	        var bpListOdataServiceUrl = "http://ustrlxse1db80.genre.com:8000/sap/opu/odata/SAP/ZGW_BP_SRV";
	        var odataModel = new sap.ui.model.odata.ODataModel(bpListOdataServiceUrl, true);
	        this.getView().setModel(odataModel);
	    },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf ui5eccdeployment.startview
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf ui5eccdeployment.startview
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf ui5eccdeployment.startview
*/
//	onExit: function() {
//
//	}
	
	    searchBP: function() {
	    	sap.ui.commons.MessageBox.alert("functionality not implemented");
	    		},

	    		getUrl : function(sUrl) {
		if (sUrl == "")
		return sUrl;
		if (window.location.hostname == "localhost") {
		return "proxy" + sUrl;
		} else {
		return sUrl;
		}
		},
		
		doIt : function(oEvent) { alert(oEvent.getSource().getId() + " does it!"); }

});