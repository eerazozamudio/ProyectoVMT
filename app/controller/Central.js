Ext.define("ExtMVC.controller.Central", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.central.CentralGrid",
        "ExtMVC.view.central.CentralBuscarGrid"
    ],
    models: [
        "ExtMVC.model.central.Central"
    ],
    stores: [
        "ExtMVC.store.central.Central",
         "ExtMVC.store.central.CentralCombo"
    ],
    init: function (application) {
        this.control({
            "centralgrid": {
                select: this.selectGrilla
            },
            "buscarcentralcomitewindow centralbuscargrid": {
                select: this.selectbuscarGrilla
            },
            "centralgrid toolbar #btn_cetral_coordonadora":{
                click : this.onClickAgregarCoordinadora
            },
            "centralgrid toolbar #btn_eliminar_central":{
                click : this.onClickEliminarCentral
            }

        });
    },
    onClickEliminarCentral:function(b){
        r  = b.up('centralgrid').getSelectionModel().getSelection()[0];
        if(r){
            Ext.MessageBox.confirm('Eliminar Central', 'Desea eliminar la central?', function(btn){
                if(btn == 'yes'){
                    Ext.Ajax.request({
                        url: 'resources/api/central/eliminarcentral',
                        params: {
                            idcentral: r.get('centralid'),
                        },
                        success: function(response){
                            Ext.ComponentQuery.query('#centralgrid')[0].getStore().load();
                            w.close();
                        }
                    });
                }
            });
        }
    },
    onClickAgregarCoordinadora:function(btn){
        r  = btn.up('centralgrid').getSelectionModel().getSelection()[0];
        if(r){
            w = Ext.create('Ext.window.Window',{
            autoShow:true,
            title : 'Coordinadora de Central',
            width:500,
            height:150,
            modal : true,
            layout:'fit',
            items:
            [
                {
                    xtype:'form',
                    bodyPadding : 5,
                    layout:{
                        type:'vbox',
                        align:'stretch'
                    },
                    items:[
                        {
                            xtype:'combo',
                            fieldLabel : 'Coordinadora',
                            queryMode: "local",
                            store: "ExtMVC.store.supervisor.SupervisorCombo",
                            valueField: "idsuper",
                            displayField: "supervisor",
                            itemId : 'cbo_central_coordinadora',
                            editable: true,
                            allowBlank: true,
                            forceSelection :true,
                            minChars :3,
                            typeAhead :true
                        }
                    ],
                    buttons:[
                        {
                            text:'Actualizar',
                            itemId : 'btn_central_actualizar',
                            handler:function(){
                                Ext.Ajax.request({
                                    url: 'resources/api/central/actulizarcoordinadora',
                                    params: {
                                        idcentral: r.get('centralid'),
                                        idcor    : Ext.ComponentQuery.query('#cbo_central_coordinadora')[0].getValue()
                                    },
                                    success: function(response){
                                        Ext.ComponentQuery.query('#centralgrid')[0].getStore().load();
                                        w.close();
                                    }
                                });
                            }
                        }
                    ]
                }   
            ]
          });
        }
    },
    selectGrilla: function (obj, record, index, eOpts) {
        var grid = Ext.ComponentQuery.query("comitegrid")[0];
        var store = grid.getStore();
        store.removeAll();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    centralid: record.get("centralid"),
                                    cadena: ""

                                }
                        )
            }
        });
        var sociogrid = Ext.ComponentQuery.query("sociogrid")[0];
        var sociostore = sociogrid.getStore();
        sociostore.removeAll();
    },
    
    selectbuscarGrilla: function (obj, record, index, eOpts) {
        var grid = Ext.ComponentQuery.query("buscarcentralcomitewindow comitebuscargrid")[0];
        var store = grid.getStore();
        store.removeAll();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    centralid: record.get("centralid"),
                                    cadena: ""

                                }
                        )
            }
        });
        
    }

});