sap.ui.jsview("views.claimants", {

	oClaimantNameField: null,
	oLossNoField: null,
	oIDField: null,

	getControllerName: function() {
		return "views.claimants";
	},

	createContent: function(oController) {
		// Create an instance of the table control
		var oTable = new sap.ui.table.Table({
			id: 'tableId',
			title: "Claimants List",
			visibleRowCount: 22,
			firstVisibleRow: 0,
			selectionMode: sap.ui.table.SelectionMode.Single
		});

		// add TableToolbar
		var oTableToolbar = new sap.ui.commons.Toolbar();

		// add  name field
		var oClaimantNameLabel = new sap.ui.commons.Label({
			text: 'Claimant Name'
		});
		this.oClaimantNameField = new sap.ui.commons.TextField({
			id: 'ClaimantsNameFieldId',
			value: '',
			width: '10em'
		});
		oClaimantNameLabel.setLabelFor(this.oClaimantNameField);

		var oLossNoLabel = new sap.ui.commons.Label({
			text: 'FS-RI Loss No'
		});
		this.oLossNoField = new sap.ui.commons.TextField({
			id: 'oLossNoFieldId',
			value: '',
			width: '10em'
		});
		oLossNoLabel.setLabelFor(this.oLossNoField);

		oTableToolbar.addItem(oClaimantNameLabel);
		oTableToolbar.addItem(this.oClaimantNameField);

		oTableToolbar.addItem(oLossNoLabel);
		oTableToolbar.addItem(this.oLossNoField);

		// add button
		var oAddPersonButton = new sap.ui.commons.Button({
			id: 'addClaimantsButtonId',
			text: "Add Claimant",
			press: function() {
				oController.addNewPerson();
			}
		});
		oTableToolbar.addItem(oAddPersonButton);

		var oExportButton = new sap.ui.commons.Button({
			id: 'exportButtonId',
			text: "Export Claimants",
			press: function() {
				oController.exportClaimants(oTable);				
			}
		});
		oTableToolbar.addItem(oExportButton);

		var oUpdateButton = new sap.ui.commons.Button({
			id: 'updateButtonId',
			text: "Update Claimant",
			press: function() {
				oController.updateClaimant();
			}
		});
		oTableToolbar.addItem(oUpdateButton);

		var oDeleteButton = new sap.ui.commons.Button({
			id: 'deleteButtonId',
			text: "Delete Claimant",
			press: function() {
				oController.deleteClaimant();
			}
		});
		oTableToolbar.addItem(oDeleteButton);

		oTable.setToolbar(oTableToolbar);

		// define the columns and the control templates to be used

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ID"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", "ID"),
			sortProperty: "ID",
			filterProperty: "ID",
			width: "8px"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Claimant Name"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", "CLAIMANTNAME"),
			sortProperty: "CLAIMANTNAME",
			filterProperty: "CLAIMANTNAME",
			width: "28px"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Loss #"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LOSSNUMBER"),
			sortProperty: "LOSSNUMBER",
			filterProperty: "LOSSNUMBER",
			width: "10px"
		}));
		
    	oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Loss Status"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LOSSSTATUS"),
			sortProperty: "LOSSSTATUS",
			filterProperty: "LOSSSTATUS",
			width: "10px"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "GL Business Area"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", "BUSINESSAREA"),
			sortProperty: "BUSINESSAREA",
			filterProperty: "BUSINESSAREA",
			width: "10px"
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Company"
			}),
			template: new sap.ui.commons.TextView().bindProperty("text", {
                path: "COMPANYCODE",
   type: new sap.ui.model.type.String({}, {maxLength: 8}) }),
			sortProperty: "COMPANYCODE",
			filterProperty: "COMPANYCODE",
			width: "8px"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label(
			    {text: "last change" }),
			//template: new sap.ui.commons.TextView().bindProperty("text", "CHANGEDON"),
     template: new sap.ui.commons.TextView().bindProperty("text", {
   path: "CHANGEDON",
   type: new sap.ui.model.type.Date({pattern: "MM/dd/yyyy hh:mm "}) }),
			sortProperty: "CHANGEDON",
			filterProperty: "CHANGEDON",
			width: "10px"
		}));
		
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "exported"}),
            template: new sap.ui.commons.TextView().bindProperty("text", {
                    path: "EXPORTEDON",
                    type: new sap.ui.model.type.Date({pattern: "MM/dd/yyyy hh:mm "}) }),
			sortProperty: "EXPORTEDON",
			filterProperty: "EXPORTEDON",
			width: "10px"
		}));

		// bind table rows to /Persons based on the model defined in the init method of the controller
		oTable.bindRows("/claimants");
// x
		return oTable;
	},

	getClaimantNameField: function() {
		return this.oClaimantNameField;
	},

	getLossNoField: function() {
		return this.oLossNoField;
	}

});