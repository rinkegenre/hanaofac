sap.ui.controller("views.claimants", {

	onInit: function() {
		var URL = "https://s10hanaxs.hanatrial.ondemand.com/s0009272344trial/thrinke/ofac/services/claimant.xsodata/";
		var odataModel = new sap.ui.model.odata.ODataModel(URL,
			true);
		this.getView().setModel(odataModel);
	},

	addNewPerson: function() {
		var claimants = {};

		claimants.ID = '0';

		var lossNumber = this.getView().getLossNoField()
			.getValue();
		claimants.LOSSNUMBER = lossNumber;
		claimants.LOSSSTATUS = 'open';
		var claimantName = this.getView()
			.getClaimantNameField().getValue();
		claimants.CLAIMANTNAME = claimantName;

		claimants.COMPANYCODE = 'GRAG';
		claimants.BUSINESSAREA = "NA";

		this.getView().getModel()
			.create("/claimants", claimants, null,
				this.successMsg, this.errorMsg);
	},

	exportClaimants: function(oTable) {
	    jQuery.sap.require("sap.ui.core.util.Export");
        jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
		
		var oModel = this.getView().getModel();
		var oExportType = new sap.ui.core.util.ExportTypeCSV({separatorChar:";",charset:"utf-8"});
		var oPath =  oTable.getBinding("").getPath();
        //sap.log.info("test log");
		
		var oExport = new sap.ui.core.util.Export({
			exportType: oExportType,
			models: oModel,
			rows: { path:oPath }
		});
		oTable.exportData(oExport).saveFile().always(function() {
			this.destroy();
		});
	},

	successMsg: function() {
		sap.ui.commons.MessageBox
			.alert("Person entity has been successfully created");
	},

	errorMsg: function() {
		sap.ui.commons.MessageBox
			.alert("Error occured when creating person entityx");
	},

	onAfterRendering: function() {
		this.getView().getClaimantNameField().focus();
	},

	deleteClaimant: function() {
		var oTable = sap.ui.getCore().getElementById('tableId');
		var i = oTable.getSelectedIndex();
		if (i === -1) {

			return;
		}
		var start = oTable.getFirstVisibleRow();
		var oModel = this.getView().getModel();
		var selectedRow = oTable.getRows()[i - start];

		var selectedCells = selectedRow.getCells();
		var selectedID = selectedCells[0].getText();

		var oDeleteDialog = new sap.ui.commons.Dialog();
		oDeleteDialog.setTitle("Delete Claimant");
		var oText = new sap.ui.commons.TextView({
			text: "Are you sure to delete this Claimant?"
		});
		oDeleteDialog.addContent(oText);
		oDeleteDialog.addButton(new sap.ui.commons.Button({
			text: "Confirm",
			press: function() {
				oDeleteDialog.close();
				oModel.remove("/claimants('" + selectedID + "')", null, function() {
					sap.ui.getCore().getModel().refresh();
					oDeleteDialog.close();
				}, function() {
					oDeleteDialog.close();
					alert("Delete failed");
				});
			}
		}));
		oDeleteDialog.open();
	}, // delete

	selectDialog: function() {
		var oSelectDialog = new sap.ui.commons.Dialog();
		oSelectDialog.setTitle("Select Claimant");
		var oText = new sap.ui.commons.TextView({
			text: "Please select a row"
		});
		oSelectDialog.addContent(oText);
		oSelectDialog.addButton(new sap.ui.commons.Button({
			text: "Continue",
			press: function() {oSelectDialog.close();}
		}));
		oSelectDialog.open();
	},

	updateClaimant: function() {
		var oTable = sap.ui.getCore().getElementById('tableId');
		var i = oTable.getSelectedIndex();
		if (i === -1) {
			this.selectDialog();
			return;
		}
		var start = oTable.getFirstVisibleRow();
		var oModel = this.getView().getModel();
		var claimantrow = oTable.getRows()[i - start];

		var claimantrowCells = claimantrow.getCells();
		var selectedID = claimantrowCells[0].getText();

		var oUpdateDialog = new sap.ui.commons.Dialog();
		oUpdateDialog.setTitle("Update claimant data");
		var oSimpleForm = new sap.ui.layout.form.SimpleForm({
			maxContainerCols: 2,
			content: [new sap.ui.core.Title({
				text: "Claimant"
			}), new sap.ui.commons.Label({
				text: "Name"
			}), new sap.ui.commons.TextField({
				value: claimantrowCells[1].getText()
			}), new sap.ui.commons.Label({
				text: "Loss #"
			}), new sap.ui.commons.TextField({
				value: claimantrowCells[2].getText()
			}), new sap.ui.commons.Label({
				text: "Loss Status"
			}), new sap.ui.commons.TextField({
				value: claimantrowCells[3].getText()
			}), new sap.ui.commons.Label({
				text: "Business Area"
			}), new sap.ui.commons.TextField({
				value: claimantrowCells[4].getText()
			}), new sap.ui.commons.Label({
				text: "Company"
			}), new sap.ui.commons.TextField({
				value: claimantrowCells[5].getText(),
				maxlength: 5
			})
			]
		});
		oUpdateDialog.addContent(oSimpleForm);
		oUpdateDialog.addButton(new sap.ui.commons.Button({
			text: "Submit",
			press: function() {
				var content = oSimpleForm.getContent();
				var claimants = {};
				claimants.ID = selectedID;
				claimants.CLAIMANTNAME = content[2].getValue();
				claimants.LOSSNUMBER = content[4].getValue();
				claimants.LOSSSTATUS = content[6].getValue();
				claimants.BUSINESSAREA = content[8].getValue();
				claimants.COMPANYCODE = content[10].getValue();
				oModel.update(
					"/claimants('" + selectedID + "')",
					claimants,
					null,
					function() {
						oModel.refresh();
						oUpdateDialog.close();
					}, function() {
						oUpdateDialog.close();
						alert("Update failed");
}, true
					);
			}
		}));
		oUpdateDialog.open();
	} // update
});