Ext.define("ExtMVC.controller.Comite", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.comite.ComiteGrid",
        "ExtMVC.view.comite.ComiteBuscarGrid",
        "ExtMVC.view.comite.ComiteTodosGrid",
        "ExtMVC.view.comite.ComiteForm"
    ],
    models: [
        "ExtMVC.model.comite.Comite"
    ],
    stores: [
        "ExtMVC.store.comite.Comite",
        "ExtMVC.store.comite.ComiteTodos",
        "ExtMVC.store.comite.ComiteCombo"
    ],
    init: function (application) {
        this.control({
            "comitegrid button#btnBuscar": {
                click: this.btnBuscarComitePorCentral_onClick
            },
            "buscarcentralcomitewindow comitebuscargrid button#btnBuscar": {
                click: this.btnBuscarComitePorCentralBuscar_onClick
            },
            "comitegrid": {
                select: this.selectGrilla
            },
            "buscarcentralcomitewindow comitebuscargrid": {
                itemdblclick: this.onGrillabuscarDobleClick
            },
            //@Grid
            "comitegrid button#btn_nuevo": {
                click: this.btn_nuevo_onClick
            },
            "comitegrid button#btn_editar": {
                click: this.btn_editar_onClick
            },
            "comitegrid button#btn_eliminar": {
                click: this.btn_eliminar_onClick
            },
            "comitegrid button#btn_comentario": {
                click: this.btn_comentario_onClick
            },


            //@Form
            "comiteform button#btn_cancelar": {
                click: this.btn_cancelar_onClick
            },
            "comiteform button#btn_grabar": {
                click: this.btn_grabar_onClick
            }
        });
    },

    btn_comentario_onClick:function(btn){
        w = Ext.create('ExtMVC.view.comite.ComiteComentario');
    },
    btn_grabar_onClick: function (btn, e, opc) {


        var win = btn.up("window");
        var form = win.down("form");
        var grid = Ext.ComponentQuery.query("comitegrid")[0];
        var values = form.getValues();
        var record = form.getRecord();
        var store = grid.getStore();
       // console.log(values);return false;
        if (form.getForm().isValid()) {

            var data = {
                comiteid: (values.comiteid == "") ? 0 : values.comiteid,
                centralid: values.centralid,
                codigointerno: values.codigointerno,
                direccion: values.direccion,
                idsuper: values.idsuper,
                idcoor: values.idcoor,
                primeraprioridad: values.primeraprioridad,
                segundaprioridad: values.segundaprioridad,
                puntococina : values.puntococina,
                lugar : values.lugar

            };
            m=new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
            Ext.Ajax.request({
                url: "resources/api/comite/grabar",
                method: "post",
                params: {
                    data: Ext.JSON.encode(data)
                },
                success: function (conn, response, options, eOpts) {
                    var rs = Ext.JSON.decode(conn.responseText);
                    if (rs.success) {
                            try{
                              var indice = grid.getSelectionModel().getCurrentPosition().row;
                            }catch(e){
                              var indice = null;
                            };
                            store.load({
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        "centralid": values.centralid,
                                                        "cadena": ""
                                                    }
                                            )
                                },
                                callback: function (record, option, success) {
                                    if(indice)
                                      grid.getSelectionModel().select(indice);
                                }
                            });

                    }
                    win.close();
                }

            });

        } else {

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Complete los datos...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });

        }


    },
    btn_cancelar_onClick: function (btn, e, opc) {

        var win = btn.up("window");
        win.close();

    },
    btn_nuevo_onClick: function (btn, e, opc) {
        var grid = Ext.ComponentQuery.query('#centralgrid')[0];
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {

            var win = Ext.create("ExtMVC.view.comite.ComiteForm");
            Ext.ComponentQuery.query('#centralid')[0].setValue(record[0].get('centralid'));
            win.down("#codigointerno").focus();

        } else {

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione una central primero...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });

        }

    },
    btn_editar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {

            var win = Ext.create("ExtMVC.view.comite.ComiteForm");
            win.down("form").loadRecord(record[0]);
            win.down("#codigointerno").focus();

        } else {

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un registro...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });

        }

    },
    btn_eliminar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            Ext.MessageBox.confirm('Eliminar', 'Desea eliminar el comite ?', function(btn){
                if(btn === 'yes'){
                    Ext.Ajax.request({
                        url : 'resources/api/comite/eliminar',
                        params : {
                          comiteid : record[0].get('comiteid'),
                        },
                        success : function(conn, response, options, eOpts) {
                            var rs = Ext.JSON.decode(conn.responseText);
                            gridcomite = Ext.ComponentQuery.query('#dgvComites')[0];
                            var store = gridcomite.getStore();
                            store.removeAll();
                            store.load({
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        "centralid": record[0].get("centralid"),
                                                        "cadena": ''

                                                    }
                                            )
                                }
                            });
                        }
                      });

                }

            });

        } else {

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un registro...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });

        }
    },
    onGrillabuscarDobleClick: function (grid, record, item, index, e, eOpts) {
        var panelreportesocio = Ext.ComponentQuery.query("reportesociopanel")[0];
        if(!panelreportesocio){
            var panelreportesocio = Ext.ComponentQuery.query("reporterequerimientoineipanel")[0];
        }
        var gridcentral = grid.up("window").down("centralbuscargrid");
        var recordcentral = gridcentral.getSelectionModel().getSelection();
        console.log(recordcentral[0]);
        panelreportesocio.down("#centralid").setValue(recordcentral[0].get("centralid"));
        panelreportesocio.down("#central").setValue(recordcentral[0].get("descripcion"));
        panelreportesocio.down("#comiteid").setValue(record.get("comiteid"));
        panelreportesocio.down("#comite").setValue(record.get("codigointerno"));
        panelreportesocio.down("#ubicacion").setValue(record.get("direccion"));
        grid.up("window").close();
    },
    selectGrilla: function (obj, record, index, eOpts) {

        var grid = Ext.ComponentQuery.query("sociogrid")[0];
        var store = grid.getStore();
        store.removeAll();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    centralid: record.get("centralid"),
                                    comiteid: record.get("comiteid"),
                                    cadena: ""

                                }
                        )
            }
        });
    },
    btnBuscarComitePorCentralBuscar_onClick: function (btn, e, opc) {
        var grid = Ext.ComponentQuery.query("centralbuscargrid")[0];
        var record = grid.getSelectionModel().getSelection();
        var cadena = btn.up("grid").down("#txtBuscar").getValue();
        if (record.length > 0) {
            var gridcomite = Ext.ComponentQuery.query("comitebuscargrid")[0];
            var store = gridcomite.getStore();
            console.log(record[0].get("centralid"));
            console.log(cadena);
            store.removeAll();
            store.load({
                params: {
                    data: Ext.JSON.encode
                            (
                                    {
                                        "centralid": record[0].get("centralid"),
                                        "cadena": cadena

                                    }
                            )
                }
            });
            btn.up("grid").down("#txtBuscar").focus();

        } else {

            alert("Seleccione una central!");


        }
    },
    btnBuscarComitePorCentral_onClick: function (btn, e, opc) {
        var grid = Ext.ComponentQuery.query("centralgrid")[0];
        var record = grid.getSelectionModel().getSelection();
        var cadena = btn.up("grid").down("#txtBuscar").getValue();
        if (record.length > 0) {
            var gridcomite = Ext.ComponentQuery.query("comitegrid")[0];
            var store = gridcomite.getStore();
            console.log(record[0].get("centralid"));
            console.log(cadena);
            store.removeAll();
            store.load({
                params: {
                    data: Ext.JSON.encode
                            (
                                    {
                                        "centralid": record[0].get("centralid"),
                                        "cadena": cadena

                                    }
                            )
                }
            });
            btn.up("grid").down("#txtBuscar").focus();

        } else {

            alert("Seleccione una central!");


        }
    }

});
