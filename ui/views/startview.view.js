sap.ui.jsview("views.startview", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf ui5eccdeployment.startview
	 */
	getControllerName : function() {
		return "views.startview";
	},
	
	
	createContent : function(oController) {
        // Create an instance of the table control
        var oTable = new sap.ui.table.Table({ title : "BP  List", visibleRowCount : 12,
            firstVisibleRow : 1, selectionMode : sap.ui.table.SelectionMode.Single });

        // add TableToolbar
        var oTableToolbar = new sap.ui.commons.Toolbar();

        // add  name field
        var oNameOrg1Label = new sap.ui.commons.Label({ text : 'Name Org 1' });
        this.oNameOrg1Field = new sap.ui.commons.TextField({ id : 'NameOrg1FieldId', value : '',
            width : '10em' });

        oNameOrg1Label.setLabelFor(this.oNameOrg1Field);
        oTableToolbar.addItem(oNameOrg1Label);
        oTableToolbar.addItem(this.oNameOrg1Field);


        // add button
        var oSearchBPButton = new sap.ui.commons.Button({
            id : 'searchBpButtonId',
            text : "Search BP",
            press : function() {
              oController.searchBP();
            } });
        oTableToolbar.addItem(oSearchBPButton);

        oTable.setToolbar(oTableToolbar);

        // define the columns and the control templates to be used
        
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({ text : "Partner Nr" }),
            template : new sap.ui.commons.TextView().bindProperty("text", "Partner"),
            sortProperty : "Partner", filterProperty : "Partner", width : "30px" }));
        
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({ text : "Name Org1" }),
            template : new sap.ui.commons.TextView().bindProperty("text", "NameOrg1"),
            sortProperty : "NameOrg1", filterProperty : "NameOrg1", width : "100px" }));
   

        // bind table rows to /Persons based on the model defined in the init method of the controller
        oTable.bindRows("/but000Set");

        return oTable;
    },

    getNameOrg1Field : function() {
        return this.oNameOrg1Field;
    }
	
	
	
	
/*	createContentx : function(oController) {
		var sServiceUrl = "http://ustrlxse1db80.genre.com:8000/sap/opu/odata/SAP/ZGW_BP_SRV";
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, false);
		
		var oTable = sap.ui.getCore().byId("but000TableID");

		oTable.setModel(oModel);

		
		var oTable = new sap.ui.table.DataTable({

			id : "but000TableID",

			title : "BUT000 Browser",

			width : "100%",

			visibleRowCount : 10,

			selectionMode : sap.ui.table.SelectionMode.Single,

			setEditable : false,

			rowSelectionChange : function(oEvent) {
			},

		});

		oTable.addColumn(new sap.ui.table.Column({

			label : new sap.ui.commons.Label({

				text : "BP ID"

			}),

			template : new sap.ui.commons.TextField().bindProperty("value",

			"Partner"),

			sortProperty : "Partner"

		}));
		
		oTable.bindRows("/but000Set", null, null,[  ]);

		oTable.placeAt("content");
		
		return oTable;


	}*/

});
