Ext.define("ExtMVC.controller.Coordinador", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.coordinador.CoordinadorGrid",
        "ExtMVC.view.coordinador.CoordinadorForm"
    ],
    models: [
        "ExtMVC.model.coordinador.Coordinador"
    ],
    stores: [
        "ExtMVC.store.coordinador.Coordinador",
        "ExtMVC.store.coordinador.CoordinadorCombo"
    ],
    init: function (appliaction) {
        this.control({
            "coordinadorgrid button#btn_nuevo": {
                
                click: this.nuevo_onClick
                
            },
            "coordinadorform button#btn_grabar": {
                
                click: this.btn_grabar_onClick
            },
            "coordinadorform button#btn_cancelar": {
                
                click: this.cancelar_onClick
                
            },"coordinadorgrid button#btn_editar": {
                click: this.editar_onClick
            },
             "coordinadorgrid": {
                itemdblclick: this.onGrillaDobleClick
            },
            "coordinadorgrid button#btn_eliminar": {
                click: this.eliminar_onClick
            }

        });
    },
    eliminar_onClick: function (btn, e, opc) {

        var grid = btn.up("coordinadorgrid");
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        if (record.length > 0) {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Desea eliminar...?",
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: "S&iacute",
                    no: "No"
                },
                icon: Ext.Msg.QUESTION,
                fn: function (rs) {
                    if (rs === "yes") {
                        var data = {
                            idcoor: record[0].get("idcoor")
                        };
                        Ext.Ajax.request({
                            url: "resources/api/coordinador/eliminar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode(data)
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {
                                    store.removeAll();
                                    store.load();
                                } else {
                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El registro no pudo ser eliminado...",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });
                                }
                            }
                        });
                    }
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
    
    onGrillaDobleClick: function (grid, record, item, index, e, eOpts) {
        var win = Ext.create("ExtMVC.view.coordinador.CoordinadorForm");
        win.setTitle("Editar Coordinador");
        win.down("form").loadRecord(record);
        win.down("#nombres").focus();
    },
    
    editar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.coordinador.CoordinadorForm");
            win.setTitle("Editar Coordinador");
            win.down("form").loadRecord(record[0]);
            win.down("#nombres").focus();
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
    
    cancelar_onClick: function (btn, e, opc) {

        btn.up("window").close();

    },
    btn_grabar_onClick: function (btn, e, opc) {

        var win = btn.up("window");
        var form = win.down("form");
        var grid = Ext.ComponentQuery.query("coordinadorgrid")[0];
        var values = form.getValues();
        var record = form.getRecord();
        var store = grid.getStore();

        console.log(values.idcoor);

        if (form.getForm().isValid()) {

            var data = {
                idcoor: (values.idcoor == "") ? 0 : values.idcoor,
                apellidos: values.apellidos,
                nombres: values.nombres,
                telefono: values.telefono,
                idcargo: values.idcargo,
                dni : values.dni,
                direccion:values.direccion
             };
            Ext.Ajax.request({
                url: "resources/api/coordinador/grabar",
                method: "post",
                params: {
                    data: Ext.JSON.encode(data)
                },
                success: function (conn, response, options, eOpts) {
                    var rs = Ext.JSON.decode(conn.responseText);
                    if (rs.success) {
                       if (!record) {
                            store.load();
                            form.getForm().reset();
                            win.down("#apellidos").focus();
                        } else {
                            var indice = grid.getSelectionModel().getCurrentPosition().row;
                            store.load({
                                callback: function (record, option, success) {
                                    grid.getSelectionModel().select(indice);
                                }
                            });
                            win.close();

                        }
                    }
                }
            });


        }

    },
    nuevo_onClick: function (btn, e, opc) {

        var win = Ext.create("ExtMVC.view.coordinador.CoordinadorForm");

    }

});