Ext.define("ExtMVC.controller.Supervisor", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.supervisor.SupervisorGrid",
        "ExtMVC.view.supervisor.SupervisorForm"
    ],
    models: [
        "ExtMVC.model.supervisor.Supervisor"
    ],
    stores: [
        "ExtMVC.store.supervisor.Supervisor",
        "ExtMVC.store.supervisor.SupervisorCombo"
    ],
    init: function (appliaction) {
        this.control({
            
            "supervisorgrid button#btn_nuevo": {
                
                click: this.nuevo_onClick
                
            },
            "supervisorform button#btn_grabar": {
                
                click: this.btn_grabar_onClick
            },
            "supervisorform button#btn_cancelar": {
                
                click: this.cancelar_onClick
                
            },"supervisorgrid button#btn_editar": {
                click: this.editar_onClick
            },
             "supervisorgrid": {
                itemdblclick: this.onGrillaDobleClick
            },
            "supervisorgrid button#btn_eliminar": {
                click: this.eliminar_onClick
            }

        });
    },
    eliminar_onClick: function (btn, e, opc) {

        var grid = btn.up("supervisorgrid");
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
                            idsuper: record[0].get("idsuper")
                        };
                        Ext.Ajax.request({
                            url: "resources/api/supervisor/eliminar",
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
        var win = Ext.create("ExtMVC.view.supervisor.SupervisorForm");
        win.setTitle("Editar Supervisor");
        win.down("form").loadRecord(record);
        win.down("#apellidos").focus();
    },
    
    editar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.supervisor.SupervisorForm");
            win.setTitle("Editar Supervisor");
            win.down("form").loadRecord(record[0]);
            win.down("#apellidos").focus();
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
        var grid = Ext.ComponentQuery.query("supervisorgrid")[0];
        var values = form.getValues();
        var record = form.getRecord();
        var store = grid.getStore();

        console.log(values.idcoor);

        if (form.getForm().isValid()) {

            var data = {
                idsuper: (values.idsuper == "") ? 0 : values.idsuper,
                apellidos: values.apellidos,
                nombres: values.nombres,
                telefono: values.telefono
                
             };
            Ext.Ajax.request({
                url: "resources/api/supervisor/grabar",
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

        var win = Ext.create("ExtMVC.view.supervisor.SupervisorForm");

    }

});