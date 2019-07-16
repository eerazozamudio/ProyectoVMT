Ext.define("ExtMVC.controller.Socio", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.socio.SocioGrid",
        "ExtMVC.view.socio.SocioTodosGrid",
        "ExtMVC.view.socio.SocioForm",
        "ExtMVC.view.reporte.socio.ReporteSocioPanel",
        "ExtMVC.view.socio.SocioTrasladarForm"
    ],
    models: [
        "ExtMVC.model.socio.Socio"
    ],
    stores: [
        "ExtMVC.store.socio.Socio",
        "ExtMVC.store.socio.SocioTodos"
    ],
    init: function (application) {
        this.control({
            "sociogrid button#btn_nuevo": {
                click: this.nuevo_onClick
            },
            "socioform button#btn_cancelar": {
                click: this.cancelar_onClick
            },
            "socioform combobox#opcionid": {
                select: this.selectComboOpcion
            },
            "socioform form#formsector combobox#sectorid": {
                select: this.selectComboSector
            },
            "socioform form#formpachacamac combobox#etapaid": {
                select: this.selectComboEtapa
            },
            "socioform form#formpachacamac combobox#sectoridetapa": {
                select: this.selectComboSectorEtapaCuatro
            },
            "socioform form#formasociacion combobox#asociacionid": {
                select: this.selectComboAsociacion
            },
            "socioform button#btn_grabar": {
                click: this.grabar_onClick
            },
            "sociogrid button#btnBuscar": {
                click: this.btnBuscarSocioPorComite_onClick
            },
            "sociogrid button#btn_editar": {
                click: this.btnEditar_onClick
            },
            "sociogrid button#btn_eliminar": {
                click: this.btnEliminar_onClick
            },
            "sociogrid button#btn_beneficiarios": {
                click: this.btnBeneficiarios_onClick
            },
            "sociogrid": {
                itemdblclick: this.onGrillaDobleClick
            },
            "sociotodosgrid button#btnBuscar": {
                click: this.btnBuscar_onClick
            },
            "sociotodosgrid button#btnRefrescar": {
                click: this.btnRefrescar_onClick
            },
            "sociotodosgrid button#btnActivar": {
                click: this.btnActivar_onClick
            },
            "sociogrid  button#btn_reemplazar": {
                click: this.btn_reemplazar_onClick
            },
            "sociogrid checkboxfield#checkflag": {
                change: this.checkflag_onChange
            },
            "sociogrid button#btn_trasladar": {
                click: this.btn_trasladar_onClick
            },
            "sociotrasladarform combobox#centralidcbo": {
                change: this.centralidcbo_onChange
            },
            "sociotrasladarform button#btn_cancelar": {
                click: this.btn_cancelar_onClick
            },
            "sociotrasladarform button#btn_grabar": {
                click: this.btn_grabar_onClick
            }
        });
    },
    btn_grabar_onClick: function (btn, e, opc) {
        var win = btn.up("window");
        var form = win.down("form");
        var values = form.getValues();

        if (form.getForm().isValid()) {



            var grid = Ext.ComponentQuery.query("sociogrid")[0];
            var store = grid.getStore();


            var array = new Array();

            store.each(function (record, key) {

                if (record.get("flag") == true) {

                    array.push(record.get("socioid"));


                }

            });

            var cadena = "";
            var coma = ",";

            for (var i = 0; i < array.length; i++) {
                if (array.length - 1 == i) {
                    coma = "";
                }
                cadena += array[i] + coma;
            }
            console.log(cadena);

            var data = {
                centralid: values.centralidcbo,
                comiteid: values.comiteidcbo,
                cadena: cadena
            };


            m= new Ext.LoadMask({ msg : '...Cargando', target:form}).show();

            Ext.Ajax.request({
                url: "resources/api/socio/trasladar",
                method: "post",
                params: {
                    data: Ext.JSON.encode(data)
                },
                success: function (conn, response, options, eopts) {
                    var rs = Ext.JSON.decode(conn.responseText);
                    if (rs.success) {

                        store.load({
                                                        params: {
                                                            data: Ext.JSON.encode
                                                                    (
                                                                            {
                                                                                centralid: values.centralid,
                                                                                comiteid: values.comiteid,
                                                                                cadena: ""
                                                                            }
                                                                    )
                                                        }
                                                    });
                                                    win.close();

                    }
                }

            });
        }


    },
    btn_cancelar_onClick: function (btn, e, opt) {

        var win = btn.up("window");
        win.close();

    },
    btnActivar_onClick:function(b,e,opt){
        grid = b.up("grid");
        record = grid.getSelectionModel().getSelection()[0];
         Ext.Ajax.request({
            url:"resources/api/socio/activar",
            params : {
                idsocio : record.get('socioid')
            },
            method:"post",
            success:function(conn, response, options, eOpts){
                grid.getStore().reload();
            }
        });
        
    },
    centralidcbo_onChange: function (obj, newValue, oldValue, eOpts) {

        var centraid = newValue;

        var cbocomite = obj.up("window").down("#comiteidcbo");
        var storecomite = cbocomite.getStore();
        storecomite.removeAll();
        cbocomite.reset();
        storecomite.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    centralid: centraid
                                }
                        )
            }

        });

    },
    btn_trasladar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var store = grid.getStore();
        var flag = false;
        store.each(function (record) {

            if (record.get("flag")) {
                flag = true;
            }

        });
        if (!flag) {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione con Check como minimo un socio",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
            return false;
        } else {


            var win = Ext.create("ExtMVC.view.socio.SocioTrasladarForm");

            win.down("#centralidcbo").suspendEvents(false);

            var centralgrid = Ext.ComponentQuery.query("centralgrid")[0];
            var recordcentral = centralgrid.getSelectionModel().getSelection();

            var comitegrid = Ext.ComponentQuery.query("comitegrid")[0];
            var recordcomite = comitegrid.getSelectionModel().getSelection();



            win.down("#centralid").setValue(recordcentral[0].get("centralid"));
            win.down("#central").setValue(recordcentral[0].get("descripcion"));

            win.down("#comiteid").setValue(recordcomite[0].get("comiteid"));
            win.down("#comite").setValue(recordcomite[0].get("codigointerno"));





        }

    },
    checkflag_onChange: function (obj, newValue, oldValue, eOpts) {
        var grid = obj.up("grid");
        var store = grid.getStore();

        if (newValue) {

            store.each(function (record) {
                record.set("flag", true);

            });

        } else {

            store.each(function (record) {
                record.set("flag", false);

            });

        }

    },
    btn_reemplazar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.socio.SocioForm");
            win.setTitle("Reemplazar al Socio  :  " + record[0].get("apepater") + " " + record[0].get("apemater") + " " + record[0].get("nombre") + "  con DNI  :  " + record[0].get("dni"));
            win.down("#form1").loadRecord(record[0]);
            win.down("#form1").down("#apepater").reset();
            win.down("#form1").down("#apemater").reset();
            win.down("#form1").down("#nombre").reset();
            win.down("#form1").down("#dni").reset();
            win.down("#form1").down("#apepater").focus();
            var fila = record[0];
            var opcion = fila.get("opcionid");
            if (opcion == 1) {
                var sectorid = fila.get("sectorid");
                win.down("#formsector").down("#sectorid").setValue(sectorid);
                win.down("#formsector").down("#fieldsetsector").setVisible(true);
                if (sectorid != 8) {
                    var grupoid = fila.get("grupoid");
                    win.down("#formsector").down("#grupoid").setVisible(true);
                    win.down("#formsector").down("#grupoid").setValue(grupoid);
                } else {
                    var parcelaid = fila.get("parcelaid");
                    win.down("#formsector").down("#parcelaid").setVisible(true);
                    win.down("#formsector").down("#parcelaid").setValue(parcelaid);
                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formsector").down("#manzanaid").setValue(manzanaid);
                win.down("#formsector").down("#loteid").setValue(loteid);
                win.down("#formsector").down("#manzanaid").setVisible(true);
                win.down("#formsector").down("#loteid").setVisible(true);

            } else if (opcion == 2) {

                var etapaid = fila.get("etapaid");
                win.down("#formpachacamac").down("#etapaid").setValue(etapaid);
                win.down("#formpachacamac").down("#fieldsetpachacamac").setVisible(true);

                if (etapaid != 4) {

                } else {

                    var sectorid = fila.get("sectorid");
                    var barrioid = fila.get("barrioid");
                    var cbobarrio = win.down("#formpachacamac").down("#barrioid");
                    var store = cbobarrio.getStore();
                    store.load({
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                opcion: sectorid
                                            }
                                    )
                        }
                    });
                    win.down("#formpachacamac").down("#sectoridetapa").setValue(sectorid);
                    win.down("#formpachacamac").down("#barrioid").setValue(barrioid);
                    win.down("#formpachacamac").down("#containeretapasector").setVisible(true);
                    win.down("#formpachacamac").down("#containeretapacuatrosector").setVisible(true);

                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formpachacamac").down("#manzanaid").setValue(manzanaid);
                win.down("#formpachacamac").down("#loteid").setValue(loteid);
                win.down("#formpachacamac").down("#containerPachacamacMzLt").setVisible(true);



            } else if (opcion == 3) {
                var aahhid = fila.get("asentamientohumanoid");
                win.down("#formaahh").down("#asentamientohumanoid").setValue(aahhid);
                win.down("#formaahh").down("#fieldsetaahh").setVisible(true);

                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formaahh").down("#manzanaid").setValue(manzanaid);
                win.down("#formaahh").down("#loteid").setValue(loteid);
                win.down("#formaahh").setVisible(true);


            } else if (opcion == 4) {
                var asociacionid = fila.get("asociacionid");
                win.down("#formasociacion").down("#asociacionid").setValue(asociacionid);
                win.down("#formasociacion").down("#fieldsetasociacion").setVisible(true);
                if (asociacionid != 12) {

                } else {
                    var grupoid = fila.get("grupoid");
                    win.down("#formasociacion").down("#grupoid").setValue(grupoid);
                    win.down("#formasociacion").down("#grupoid").setVisible(true);
                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formasociacion").down("#manzanaid").setValue(manzanaid);
                win.down("#formasociacion").down("#loteid").setValue(loteid);
                win.down("#formasociacion").down("#containerasociacionMzLt").setVisible(true);

            } else if (opcion == 5) {
                var cooperativaid = fila.get("cooperativaid");
                win.down("#formcooperativa").down("#cooperativaid").setValue(cooperativaid);
                win.down("#formcooperativa").down("#fieldsetcooperativa").setVisible(true);

                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formcooperativa").down("#manzanaid").setValue(manzanaid);
                win.down("#formcooperativa").down("#loteid").setValue(loteid);
                win.down("#formcooperativa").down("#containercooperativaMzLt").setVisible(true);
            }
            var referenciaid = fila.get("referenciaid");
            var observacion = fila.get("observacion");
            win.down("#referenciaid").setValue(referenciaid == 0 ? null : referenciaid);
            win.down("#observacion").setValue(observacion);


        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un Socio...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
        }

    },
    btnRefrescar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var store = grid.getStore();
        store.removeAll();
        var txtbuscar = grid.down("#txtBuscar");
        txtbuscar.reset();
        txtbuscar.focus();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    cadena: ""
                                }
                        )
            }
        });
    },
    btnBuscar_onClick: function (btn, e, opc) {

        var grid = btn.up("grid");
        var store = grid.getStore();
        store.removeAll();
        var cadena = grid.down("#txtBuscar").getValue();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    cadena: cadena
                                }
                        )
            }
        });
    },
    btnBeneficiarios_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.beneficiario.BeneficiarioWindow");
            win.down("#socioid").setValue(record[0].get("socioid"));
            var socionombre = record[0].get("apepater") + " " + record[0].get("apemater") + " " + record[0].get("nombre");
            win.down("#socionombre").setValue(socionombre);
            win.down("#sociodni").setValue(record[0].get("dni"));
            var grid = win.down("grid");
            var store = grid.getStore();
            store.removeAll();
            store.load({
                params: {
                    data: Ext.JSON.encode
                            (
                                    {
                                        socioid: record[0].get("socioid")
                                    }
                            )
                }
            });
        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un socio",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
        }

    },
    btnEliminar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        if (record.length > 0) {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Desea Eliminar",
                buttons: Ext.Msg.YESNO,
                buttonText: {
                    yes: "Si",
                    no: "No"
                },
                icon: Ext.Msg.QUESTION,
                fn: function (rs) {
                    if (rs === "yes") {
                        var data = {
                            "socioid": record[0].get("socioid")
                        };
                        Ext.Ajax.request({
                            url: "resources/api/socio/eliminar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode(data)
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {
                                    store.removeAll();
                                    store.load({
                                        params: {
                                            data: Ext.JSON.encode
                                                    (
                                                            {
                                                                centralid: record[0].get("centralid"),
                                                                comiteid: record[0].get("comiteid"),
                                                                cadena: ""
                                                            }
                                                    )
                                        }
                                    });
                                } else {
                                    if (rs.error == "CONSTRAINT") {
                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El Socio seleccionado no puede ser eliminado porque tiene beneficiarios asignados...!",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });
                                    } else {
                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El registro no pudo ser eliminado",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un socio",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
        }
    },
    onGrillaDobleClick: function (grid, record, item, index, e, eOpts) {
        var win = Ext.create("ExtMVC.view.socio.SocioForm");
        win.setTitle("Editar Socio");
        win.down("#form1").loadRecord(record);
        var fila = record;
        var opcion = fila.get("opcionid");
        if (opcion == 1) {
            var sectorid = fila.get("sectorid");
            win.down("#formsector").down("#sectorid").setValue(sectorid);
            win.down("#formsector").down("#fieldsetsector").setVisible(true);
            if (sectorid != 8) {
                var grupoid = fila.get("grupoid");
                win.down("#formsector").down("#grupoid").setVisible(true);
                win.down("#formsector").down("#grupoid").setValue(grupoid);
            } else {
                var parcelaid = fila.get("parcelaid");
                win.down("#formsector").down("#parcelaid").setVisible(true);
                win.down("#formsector").down("#parcelaid").setValue(parcelaid);
            }
            var manzanaid = fila.get("manzanaid");
            var loteid = fila.get("loteid");
            win.down("#formsector").down("#manzanaid").setValue(manzanaid);
            win.down("#formsector").down("#loteid").setValue(loteid);
            win.down("#formsector").down("#manzanaid").setVisible(true);
            win.down("#formsector").down("#loteid").setVisible(true);

        } else if (opcion == 2) {

            var etapaid = fila.get("etapaid");
            win.down("#formpachacamac").down("#etapaid").setValue(etapaid);
            win.down("#formpachacamac").down("#fieldsetpachacamac").setVisible(true);

            if (etapaid != 4) {




            } else {

                var sectorid = fila.get("sectorid");
                var barrioid = fila.get("barrioid");
                var cbobarrio = win.down("#formpachacamac").down("#barrioid");
                var store = cbobarrio.getStore();
                store.load({
                    params: {
                        data: Ext.JSON.encode
                                (
                                        {
                                            opcion: sectorid
                                        }
                                )
                    }
                });
                win.down("#formpachacamac").down("#sectoridetapa").setValue(sectorid);
                win.down("#formpachacamac").down("#barrioid").setValue(barrioid);
                win.down("#formpachacamac").down("#containeretapasector").setVisible(true);
                win.down("#formpachacamac").down("#containeretapacuatrosector").setVisible(true);

            }
            var manzanaid = fila.get("manzanaid");
            var loteid = fila.get("loteid");
            win.down("#formpachacamac").down("#manzanaid").setValue(manzanaid);
            win.down("#formpachacamac").down("#loteid").setValue(loteid);
            win.down("#formpachacamac").down("#containerPachacamacMzLt").setVisible(true);



        } else if (opcion == 3) {
            var aahhid = fila.get("asentamientohumanoid");
            win.down("#formaahh").down("#asentamientohumanoid").setValue(aahhid);
            win.down("#formaahh").down("#fieldsetaahh").setVisible(true);

            var manzanaid = fila.get("manzanaid");
            var loteid = fila.get("loteid");
            win.down("#formaahh").down("#manzanaid").setValue(manzanaid);
            win.down("#formaahh").down("#loteid").setValue(loteid);
            win.down("#formaahh").setVisible(true);


        } else if (opcion == 4) {
            var asociacionid = fila.get("asociacionid");
            win.down("#formasociacion").down("#asociacionid").setValue(asociacionid);
            win.down("#formasociacion").down("#fieldsetasociacion").setVisible(true);
            if (asociacionid != 12) {

            } else {
                var grupoid = fila.get("grupoid");
                win.down("#formasociacion").down("#grupoid").setValue(grupoid);
                win.down("#formasociacion").down("#grupoid").setVisible(true);
            }
            var manzanaid = fila.get("manzanaid");
            var loteid = fila.get("loteid");
            win.down("#formasociacion").down("#manzanaid").setValue(manzanaid);
            win.down("#formasociacion").down("#loteid").setValue(loteid);
            win.down("#formasociacion").down("#containerasociacionMzLt").setVisible(true);

        } else if (opcion == 5) {
            var cooperativaid = fila.get("cooperativaid");
            win.down("#formcooperativa").down("#cooperativaid").setValue(cooperativaid);
            win.down("#formcooperativa").down("#fieldsetcooperativa").setVisible(true);

            var manzanaid = fila.get("manzanaid");
            var loteid = fila.get("loteid");
            win.down("#formcooperativa").down("#manzanaid").setValue(manzanaid);
            win.down("#formcooperativa").down("#loteid").setValue(loteid);
            win.down("#formcooperativa").down("#containercooperativaMzLt").setVisible(true);
        }
        var referenciaid = fila.get("referenciaid");
        var observacion = fila.get("observacion");
        win.down("#referenciaid").setValue(referenciaid == 0 ? null : referenciaid);
        win.down("#observacion").setValue(observacion);

    },
    btnEditar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.socio.SocioForm");
            win.setTitle("Editar Socio");
            win.down("#form1").loadRecord(record[0]);
            var fila = record[0];
            var opcion = fila.get("opcionid");
            if (opcion == 1) {
                var sectorid = fila.get("sectorid");
                win.down("#formsector").down("#sectorid").setValue(sectorid);
                win.down("#formsector").down("#fieldsetsector").setVisible(true);
                if (sectorid != 8) {
                    var grupoid = fila.get("grupoid");
                    win.down("#formsector").down("#grupoid").setVisible(true);
                    win.down("#formsector").down("#grupoid").setValue(grupoid);
                } else {
                    var parcelaid = fila.get("parcelaid");
                    win.down("#formsector").down("#parcelaid").setVisible(true);
                    win.down("#formsector").down("#parcelaid").setValue(parcelaid);
                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formsector").down("#manzanaid").setValue(manzanaid);
                win.down("#formsector").down("#loteid").setValue(loteid);
                win.down("#formsector").down("#manzanaid").setVisible(true);
                win.down("#formsector").down("#loteid").setVisible(true);

            } else if (opcion == 2) {

                var etapaid = fila.get("etapaid");
                win.down("#formpachacamac").down("#etapaid").setValue(etapaid);
                win.down("#formpachacamac").down("#fieldsetpachacamac").setVisible(true);

                if (etapaid != 4) {

                } else {

                    var sectorid = fila.get("sectorid");
                    var barrioid = fila.get("barrioid");
                    var cbobarrio = win.down("#formpachacamac").down("#barrioid");
                    var store = cbobarrio.getStore();
                    store.load({
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                opcion: sectorid
                                            }
                                    )
                        }
                    });
                    win.down("#formpachacamac").down("#sectoridetapa").setValue(sectorid);
                    win.down("#formpachacamac").down("#barrioid").setValue(barrioid);
                    win.down("#formpachacamac").down("#containeretapasector").setVisible(true);
                    win.down("#formpachacamac").down("#containeretapacuatrosector").setVisible(true);

                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formpachacamac").down("#manzanaid").setValue(manzanaid);
                win.down("#formpachacamac").down("#loteid").setValue(loteid);
                win.down("#formpachacamac").down("#containerPachacamacMzLt").setVisible(true);



            } else if (opcion == 3) {
                var aahhid = fila.get("asentamientohumanoid");
                win.down("#formaahh").down("#asentamientohumanoid").setValue(aahhid);
                win.down("#formaahh").down("#fieldsetaahh").setVisible(true);

                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formaahh").down("#manzanaid").setValue(manzanaid);
                win.down("#formaahh").down("#loteid").setValue(loteid);
                win.down("#formaahh").setVisible(true);


            } else if (opcion == 4) {
                var asociacionid = fila.get("asociacionid");
                win.down("#formasociacion").down("#asociacionid").setValue(asociacionid);
                win.down("#formasociacion").down("#fieldsetasociacion").setVisible(true);
                if (asociacionid != 12) {

                } else {
                    var grupoid = fila.get("grupoid");
                    win.down("#formasociacion").down("#grupoid").setValue(grupoid);
                    win.down("#formasociacion").down("#grupoid").setVisible(true);
                }
                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formasociacion").down("#manzanaid").setValue(manzanaid);
                win.down("#formasociacion").down("#loteid").setValue(loteid);
                win.down("#formasociacion").down("#containerasociacionMzLt").setVisible(true);

            } else if (opcion == 5) {
                var cooperativaid = fila.get("cooperativaid");
                win.down("#formcooperativa").down("#cooperativaid").setValue(cooperativaid);
                win.down("#formcooperativa").down("#fieldsetcooperativa").setVisible(true);

                var manzanaid = fila.get("manzanaid");
                var loteid = fila.get("loteid");
                win.down("#formcooperativa").down("#manzanaid").setValue(manzanaid);
                win.down("#formcooperativa").down("#loteid").setValue(loteid);
                win.down("#formcooperativa").down("#containercooperativaMzLt").setVisible(true);
            }
            var referenciaid = fila.get("referenciaid");
            var observacion = fila.get("observacion");
            win.down("#referenciaid").setValue(referenciaid == 0 ? null : referenciaid);
            win.down("#observacion").setValue(observacion);


        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un Socio...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
        }
    },
    btnBuscarSocioPorComite_onClick: function (btn, e, opc) {

        var grid = Ext.ComponentQuery.query("comitegrid")[0];
        var record = grid.getSelectionModel().getSelection();
        var cadena = btn.up("grid").down("#txtBuscar").getValue();
        if (record.length > 0) {
            var gridsocio = Ext.ComponentQuery.query("sociogrid")[0];
            var store = gridsocio.getStore();
            console.log(record[0].get("comiteid"));
            console.log(cadena);
            store.removeAll();
            store.load({
                params: {
                    data: Ext.JSON.encode
                            (
                                    {
                                        "centralid": record[0].get("centralid"),
                                        "comiteid": record[0].get("comiteid"),
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
    grabar_onClick: function (btn, e, opc) {
        var win = btn.up("window");
        var formdatosper = win.down("#form1");
        var grid = Ext.ComponentQuery.query("sociogrid")[0];
        var values = formdatosper.getValues();
        var record = formdatosper.getRecord();
        var store = grid.getStore();
        if (formdatosper.getForm().isValid()) {

            //     if (!record) {

            var opcion = btn.up("window").down("#opcionid").getValue();
            //Eligiendo  la opcionSector
            if (opcion == 1) {

                //Eligiendo cualquier sector dieferente de sectorid=8
                var cbosector = btn.up("window").down("#formsector").down("#sectorid");
                var sectorid = cbosector.getValue();
                if (sectorid != 8 && sectorid != null) {
                    var cbogrupo = btn.up("window").down("#formsector").down("#grupoid");
                    var grupoid = cbogrupo.getValue();
                    if (grupoid == null) {
                        alert("seleccione un grupo");
                        return false;
                    } else {
                        var manzana = btn.up("window").down("#formsector").down("#manzanaid");
                        var manzanaid = manzana.getValue();
                        if (manzanaid == null) {
                            alert("seleccione una manzana");
                            return false;
                        }
                        var lote = btn.up("window").down("#formsector").down("#loteid");
                        var loteid = lote.getValue();
                        if (loteid == null) {
                            alert("seleccione un lote");
                            return false;
                        }
                        var referencia = btn.up("window").down("#referenciaid");
                        var referenciaid = referencia.getValue();

                        var observacion = btn.up("window").down("#observacion");
                        var observacionvalue = observacion.getValue();

                        var data = {
                            "socioid": values.socioid,
                            "centralid": values.centralid,
                            "comiteid": values.comiteid,
                            "apepater": values.apepater,
                            "apemater": values.apemater,
                            "nombre": values.nombre,
                            "dni": values.dni,
                            "opcionid": values.opcionid,
                            "sectorid": sectorid,
                            "grupoid": grupoid,
                            "manzanaid": manzanaid,
                            "loteid": loteid,
                            "referenciaid": referenciaid,
                            "observacion": observacionvalue
                        };

                        console.log(values.apepater);

                        if (!record) {




                            Ext.Ajax.request({
                                url: "resources/api/socio/existeDni",
                                method: "post",
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        dni: values.dni
                                                    }

                                            )
                                },
                                success: function (conn, response, options, eOpts) {
                                    var rs = Ext.JSON.decode(conn.responseText);
                                    if (rs.success) {

                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El DNI del socio ya existe!",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });

                                    } else {

                                        _msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();

                                        Ext.Ajax.request({
                                            url: "resources/api/socio/registrarSectorGrupo",
                                            method: "post",
                                            params: {
                                                data: Ext.JSON.encode(data)
                                            },
                                            success: function (conn, response, options, eOpts) {
                                                var rs = Ext.JSON.decode(conn.responseText);
                                                if (rs.success) {
                                                    store.load({
                                                        params: {
                                                            data: Ext.JSON.encode
                                                                    (
                                                                            {
                                                                                centralid: values.centralid,
                                                                                comiteid: values.comiteid,
                                                                                cadena: ""
                                                                            }
                                                                    )
                                                        }
                                                    });
                                                    win.close();
                                                }
                                            }
                                        });





                                    }





                                }

                            });


                        } else {


                            Ext.Ajax.request({
                                url: "resources/api/socio/existeDniActualizar",
                                method: "post",
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        dni: values.dni,
                                                        socioid: values.socioid
                                                    }
                                            )
                                },
                                success: function (conn, response, options, eOpts) {

                                    var rs = Ext.JSON.decode(conn.responseText);
                                    if (rs.success) {

                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El DNI del socio ya existe!",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });


                                    } else {



                                        Ext.Ajax.request({
                                            url: "resources/api/socio/actualizarSectorGrupo",
                                            method: "post",
                                            params: {
                                                data: Ext.JSON.encode(data)
                                            },
                                            success: function (conn, response, options, eOpts) {
                                                var rs = Ext.JSON.decode(conn.responseText);
                                                if (rs.success) {
                                                    store.load({
                                                        params: {
                                                            data: Ext.JSON.encode
                                                                    (
                                                                            {
                                                                                centralid: values.centralid,
                                                                                comiteid: values.comiteid,
                                                                                cadena: ""
                                                                            }
                                                                    )
                                                        }
                                                    });
                                                    win.close();
                                                }
                                            }
                                        });





                                    }

                                }

                            });








                        }

                    }


                } else if (sectorid == 8) {
                    var cboparcela = btn.up("window").down("#formsector").down("#parcelaid");
                    var parcelaid = cboparcela.getValue();
                    if (parcelaid == null) {
                        alert("seleccione una Parcela");
                        return false;
                    } else {
                        var manzana = btn.up("window").down("#formsector").down("#manzanaid");
                        var manzanaid = manzana.getValue();
                        if (manzanaid == null) {
                            alert("seleccione una manzana");
                            return false;
                        }
                        var lote = btn.up("window").down("#formsector").down("#loteid");
                        var loteid = lote.getValue();
                        if (loteid == null) {
                            alert("seleccione un lote");
                            return false;
                        }
                        var referencia = btn.up("window").down("#referenciaid");
                        var referenciaid = referencia.getValue();

                        var observacion = btn.up("window").down("#observacion");
                        var observacionvalue = observacion.getValue();

                        var data = {
                            "socioid": values.socioid,
                            "centralid": values.centralid,
                            "comiteid": values.comiteid,
                            "apepater": values.apepater,
                            "apemater": values.apemater,
                            "nombre": values.nombre,
                            "dni": values.dni,
                            "opcionid": values.opcionid,
                            "sectorid": sectorid,
                            "parcelaid": parcelaid,
                            "manzanaid": manzanaid,
                            "loteid": loteid,
                            "referenciaid": referenciaid,
                            "observacion": observacionvalue
                        };

                        if (!record) {


                            Ext.Ajax.request({
                                url: "resources/api/socio/existeDni",
                                method: "post",
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        dni: values.dni
                                                    }

                                            )
                                },
                                success: function (conn, response, options, eOpts) {
                                    var rs = Ext.JSON.decode(conn.responseText);
                                    if (rs.success) {

                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El DNI del socio ya existe!",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });

                                    } else {

                                      _msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                        Ext.Ajax.request({
                                            url: "resources/api/socio/registrarSectorParcela",
                                            method: "post",
                                            params: {
                                                data: Ext.JSON.encode(data)
                                            },
                                            success: function (conn, response, options, eOpts) {
                                                var rs = Ext.JSON.decode(conn.responseText);
                                                if (rs.success) {
                                                    store.load({
                                                        params: {
                                                            data: Ext.JSON.encode
                                                                    (
                                                                            {
                                                                                centralid: values.centralid,
                                                                                comiteid: values.comiteid,
                                                                                cadena: ""
                                                                            }
                                                                    )
                                                        }
                                                    });
                                                    win.close();
                                                }
                                            }
                                        });





                                    }





                                }

                            });













                        } else {





                            Ext.Ajax.request({
                                url: "resources/api/socio/existeDniActualizar",
                                method: "post",
                                params: {
                                    data: Ext.JSON.encode
                                            (
                                                    {
                                                        dni: values.dni,
                                                        socioid: values.socioid
                                                    }
                                            )
                                },
                                success: function (conn, response, options, eOpts) {

                                    var rs = Ext.JSON.decode(conn.responseText);
                                    if (rs.success) {

                                        Ext.Msg.show({
                                            title: "Mensaje",
                                            msg: "El DNI del socio ya existe!",
                                            buttons: Ext.Msg.OK,
                                            buttonText: {
                                                ok: "Aceptar"
                                            },
                                            icon: Ext.Msg.ERROR
                                        });


                                    } else {



                                        Ext.Ajax.request({
                                            url: "resources/api/socio/actualizarSectorParcela",
                                            method: "post",
                                            params: {
                                                data: Ext.JSON.encode(data)
                                            },
                                            success: function (conn, response, options, eOpts) {
                                                var rs = Ext.JSON.decode(conn.responseText);
                                                if (rs.success) {
                                                    store.load({
                                                        params: {
                                                            data: Ext.JSON.encode
                                                                    (
                                                                            {
                                                                                centralid: values.centralid,
                                                                                comiteid: values.comiteid,
                                                                                cadena: ""
                                                                            }
                                                                    )
                                                        }
                                                    });
                                                    win.close();
                                                }
                                            }
                                        });





                                    }

                                }

                            });







                        }


                    }




                } else {
                    alert("seleccione un sector");
                }

            } else if (opcion == 2) {

                var cboetapa = btn.up("window").down("#formpachacamac").down("#etapaid");
                var etapaid = cboetapa.getValue();
                if (etapaid != 4 && etapaid != null) {
                    var manzana = btn.up("window").down("#formpachacamac").down("#manzanaid");
                    var manzanaid = manzana.getValue();
                    if (manzanaid == null) {
                        alert("seleccione una manzana");
                        return false;
                    }
                    var lote = btn.up("window").down("#formpachacamac").down("#loteid");
                    var loteid = lote.getValue();
                    if (loteid == null) {
                        alert("seleccione un lote");
                        return false;
                    }
                    var referencia = btn.up("window").down("#referenciaid");
                    var referenciaid = referencia.getValue();

                    var observacion = btn.up("window").down("#observacion");
                    var observacionvalue = observacion.getValue();

                    var data = {
                        "socioid": values.socioid,
                        "centralid": values.centralid,
                        "comiteid": values.comiteid,
                        "apepater": values.apepater,
                        "apemater": values.apemater,
                        "nombre": values.nombre,
                        "dni": values.dni,
                        "opcionid": values.opcionid,
                        "etapaid": etapaid,
                        "manzanaid": manzanaid,
                        "loteid": loteid,
                        "referenciaid": referenciaid,
                        "observacion": observacionvalue
                    };

                    if (!record) {

                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDni",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni
                                                }

                                        )
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });

                                } else {

_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                    Ext.Ajax.request({
                                        url: "resources/api/socio/registrarPachacamacEtapa",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });





                                }





                            }

                        });










                    } else {



                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDniActualizar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni,
                                                    socioid: values.socioid
                                                }
                                        )
                            },
                            success: function (conn, response, options, eOpts) {

                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });


                                } else {



                                   m= new Ext.LoadMask({ msg : '...Cargando', target:win}).show();

                                    Ext.Ajax.request({
                                        url: "resources/api/socio/actualizarPachacamacEtapa",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });




                                }

                            }

                        });












                    }



                } else if (etapaid == 4) {
                    var cbosector = btn.up("window").down("#formpachacamac").down("#sectoridetapa");
                    var sectorid = cbosector.getValue();
                    if (sectorid == null) {
                        alert("seleccione un sector");
                        return false;
                    }
                    var cbobarrio = btn.up("window").down("#formpachacamac").down("#barrioid");
                    var barrioid = cbobarrio.getValue();
                    if (barrioid == null) {
                        alert("seleccione un Barrio");
                        return false;
                    }
                    var manzana = btn.up("window").down("#formpachacamac").down("#manzanaid");
                    var manzanaid = manzana.getValue();
                    if (manzanaid == null) {
                        alert("seleccione una manzana");
                        return false;
                    }
                    var lote = btn.up("window").down("#formpachacamac").down("#loteid");
                    var loteid = lote.getValue();
                    if (loteid == null) {
                        alert("seleccione un lote");
                        return false;
                    }
                    var referencia = btn.up("window").down("#referenciaid");
                    var referenciaid = referencia.getValue();

                    var observacion = btn.up("window").down("#observacion");
                    var observacionvalue = observacion.getValue();

                    var data = {
                        "socioid": values.socioid,
                        "centralid": values.centralid,
                        "comiteid": values.comiteid,
                        "apepater": values.apepater,
                        "apemater": values.apemater,
                        "nombre": values.nombre,
                        "dni": values.dni,
                        "opcionid": values.opcionid,
                        "etapaid": etapaid,
                        "sectorid": sectorid,
                        "barrioid": barrioid,
                        "manzanaid": manzanaid,
                        "loteid": loteid,
                        "referenciaid": referenciaid,
                        "observacion": observacionvalue
                    };
                    if (!record) {


                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDni",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni
                                                }

                                        )
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });

                                } else {

_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                    Ext.Ajax.request({
                                        url: "resources/api/socio/registrarPachacamacEtapaSectorBarrio",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });






                                }





                            }

                        });










                    } else {


                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDniActualizar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni,
                                                    socioid: values.socioid
                                                }
                                        )
                            },
                            success: function (conn, response, options, eOpts) {

                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });


                                } else {


                                  m= new Ext.LoadMask({ msg : '...Cargando', target:win}).show();

                                    Ext.Ajax.request({
                                        url: "resources/api/socio/actualizarPachacamacEtapaSectorBarrio",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });





                                }

                            }

                        });











                    }



                } else {
                    alert("seleccione una Etapa");
                }

            } else if (opcion == 3) {
                var cboaahh = btn.up("window").down("#formaahh").down("#asentamientohumanoid");
                var aahhid = cboaahh.getValue();

                if (aahhid == null) {
                    alert("seleccione un AAHH");
                    return false;
                }

                var manzana = btn.up("window").down("#formaahh").down("#manzanaid");
                var manzanaid = manzana.getValue();
                if (manzanaid == null) {
                    alert("seleccione una manzana");
                    return false;
                }
                var lote = btn.up("window").down("#formaahh").down("#loteid");
                var loteid = lote.getValue();
                if (loteid == null) {
                    alert("seleccione un lote");
                    return false;
                }
                var referencia = btn.up("window").down("#referenciaid");
                var referenciaid = referencia.getValue();

                var observacion = btn.up("window").down("#observacion");
                var observacionvalue = observacion.getValue();

                var data = {
                    "socioid": values.socioid,
                    "centralid": values.centralid,
                    "comiteid": values.comiteid,
                    "apepater": values.apepater,
                    "apemater": values.apemater,
                    "nombre": values.nombre,
                    "dni": values.dni,
                    "opcionid": values.opcionid,
                    "aahhid": aahhid,
                    "manzanaid": manzanaid,
                    "loteid": loteid,
                    "referenciaid": referenciaid,
                    "observacion": observacionvalue
                };
                if (!record) {


                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDni",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni
                                            }

                                    )
                        },
                        success: function (conn, response, options, eOpts) {
                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });

                            } else {

_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                Ext.Ajax.request({
                                    url: "resources/api/socio/registrarAAHH",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });




                            }





                        }

                    });












                } else {

                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDniActualizar",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni,
                                                socioid: values.socioid
                                            }
                                    )
                        },
                        success: function (conn, response, options, eOpts) {

                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });


                            } else {


                                Ext.Ajax.request({
                                    url: "resources/api/socio/actualizarAAHH",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });






                            }

                        }

                    });











                }


            } else if (opcion == 4) {
                var cboasociacion = btn.up("window").down("#formasociacion").down("#asociacionid");
                var asociacionid = cboasociacion.getValue();
                if (asociacionid != 12 && asociacionid != null) {

                    var manzana = btn.up("window").down("#formasociacion").down("#manzanaid");
                    var manzanaid = manzana.getValue();
                    if (manzanaid == null) {
                        alert("seleccione una manzana");
                        return false;
                    }
                    var lote = btn.up("window").down("#formasociacion").down("#loteid");
                    var loteid = lote.getValue();
                    if (loteid == null) {
                        alert("seleccione un lote");
                        return false;
                    }
                    var referencia = btn.up("window").down("#referenciaid");
                    var referenciaid = referencia.getValue();

                    var observacion = btn.up("window").down("#observacion");
                    var observacionvalue = observacion.getValue();

                    var data = {
                        "socioid": values.socioid,
                        "centralid": values.centralid,
                        "comiteid": values.comiteid,
                        "apepater": values.apepater,
                        "apemater": values.apemater,
                        "nombre": values.nombre,
                        "dni": values.dni,
                        "opcionid": values.opcionid,
                        "asociacionid": asociacionid,
                        "manzanaid": manzanaid,
                        "loteid": loteid,
                        "referenciaid": referenciaid,
                        "observacion": observacionvalue
                    };
                    if (!record) {


                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDni",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni
                                                }

                                        )
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });

                                } else {
_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                    Ext.Ajax.request({
                                        url: "resources/api/socio/registrarAsociacion",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });



                                }


                            }

                        });








                    } else {


                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDniActualizar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni,
                                                    socioid: values.socioid
                                                }
                                        )
                            },
                            success: function (conn, response, options, eOpts) {

                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });


                                } else {



                                    Ext.Ajax.request({
                                        url: "resources/api/socio/actualizarAsociacion",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });





                                }

                            }

                        });










                    }



                } else if (asociacionid == 12) {

                    var cbogrupo = btn.up("window").down("#formasociacion").down("#grupoid");
                    var grupoid = cbogrupo.getValue();

                    if (grupoid == null) {
                        alert("seleccione una grupo");
                        return false;
                    }

                    var manzana = btn.up("window").down("#formasociacion").down("#manzanaid");
                    var manzanaid = manzana.getValue();
                    if (manzanaid == null) {
                        alert("seleccione una manzana");
                        return false;
                    }
                    var lote = btn.up("window").down("#formasociacion").down("#loteid");
                    var loteid = lote.getValue();
                    if (loteid == null) {
                        alert("seleccione un lote");
                        return false;
                    }
                    var referencia = btn.up("window").down("#referenciaid");
                    var referenciaid = referencia.getValue();

                    var observacion = btn.up("window").down("#observacion");
                    var observacionvalue = observacion.getValue();

                    var data = {
                        "socioid": values.socioid,
                        "centralid": values.centralid,
                        "comiteid": values.comiteid,
                        "apepater": values.apepater,
                        "apemater": values.apemater,
                        "nombre": values.nombre,
                        "dni": values.dni,
                        "opcionid": values.opcionid,
                        "asociacionid": asociacionid,
                        "grupoid": grupoid,
                        "manzanaid": manzanaid,
                        "loteid": loteid,
                        "referenciaid": referenciaid,
                        "observacion": observacionvalue
                    };

                    if (!record) {

                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDni",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni
                                                }

                                        )
                            },
                            success: function (conn, response, options, eOpts) {
                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });

                                } else {

_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                    Ext.Ajax.request({
                                        url: "resources/api/socio/registrarAsociacionGrupo",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });




                                }





                            }

                        });











                    } else {


                        Ext.Ajax.request({
                            url: "resources/api/socio/existeDniActualizar",
                            method: "post",
                            params: {
                                data: Ext.JSON.encode
                                        (
                                                {
                                                    dni: values.dni,
                                                    socioid: values.socioid
                                                }
                                        )
                            },
                            success: function (conn, response, options, eOpts) {

                                var rs = Ext.JSON.decode(conn.responseText);
                                if (rs.success) {

                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg: "El DNI del socio ya existe!",
                                        buttons: Ext.Msg.OK,
                                        buttonText: {
                                            ok: "Aceptar"
                                        },
                                        icon: Ext.Msg.ERROR
                                    });


                                } else {



                                    Ext.Ajax.request({
                                        url: "resources/api/socio/actualizarAsociacionGrupo",
                                        method: "post",
                                        params: {
                                            data: Ext.JSON.encode(data)
                                        },
                                        success: function (conn, response, options, eOpts) {
                                            var rs = Ext.JSON.decode(conn.responseText);
                                            if (rs.success) {
                                                store.load({
                                                    params: {
                                                        data: Ext.JSON.encode
                                                                (
                                                                        {
                                                                            centralid: values.centralid,
                                                                            comiteid: values.comiteid,
                                                                            cadena: ""
                                                                        }
                                                                )
                                                    }
                                                });
                                                win.close();
                                            }
                                        }
                                    });





                                }

                            }

                        });











                    }


                } else {
                    alert("seleccione una Asociacion");
                }

            } else if (opcion == 5) {

                var cbocooperativa = btn.up("window").down("#formcooperativa").down("#cooperativaid");
                var cooperativaid = cbocooperativa.getValue();

                if (cooperativaid == null) {
                    alert("seleccione una Cooperativa");
                    return false;
                }

                var manzana = btn.up("window").down("#formcooperativa").down("#manzanaid");
                var manzanaid = manzana.getValue();
                if (manzanaid == null) {
                    alert("seleccione una manzana");
                    return false;
                }
                var lote = btn.up("window").down("#formcooperativa").down("#loteid");
                var loteid = lote.getValue();
                if (loteid == null) {
                    alert("seleccione un lote");
                    return false;
                }
                var referencia = btn.up("window").down("#referenciaid");
                var referenciaid = referencia.getValue();

                var observacion = btn.up("window").down("#observacion");
                var observacionvalue = observacion.getValue();

                var data = {
                    "socioid": values.socioid,
                    "centralid": values.centralid,
                    "comiteid": values.comiteid,
                    "apepater": values.apepater,
                    "apemater": values.apemater,
                    "nombre": values.nombre,
                    "dni": values.dni,
                    "opcionid": values.opcionid,
                    "cooperativaid": cooperativaid,
                    "manzanaid": manzanaid,
                    "loteid": loteid,
                    "referenciaid": referenciaid,
                    "observacion": observacionvalue
                };
                if (!record) {


                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDni",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni
                                            }

                                    )
                        },
                        success: function (conn, response, options, eOpts) {
                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });

                            } else {

_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                Ext.Ajax.request({
                                    url: "resources/api/socio/registrarCooperativa",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });




                            }





                        }

                    });








                } else {


                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDniActualizar",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni,
                                                socioid: values.socioid
                                            }
                                    )
                        },
                        success: function (conn, response, options, eOpts) {

                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });


                            } else {



                                Ext.Ajax.request({
                                    url: "resources/api/socio/actualizarCooperativa",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });





                            }

                        }

                    });









                }


            } else if (opcion == 6) {

                var referencia = btn.up("window").down("#referenciaid");
                var referenciaid = referencia.getValue();

                var observacion = btn.up("window").down("#observacion");
                var observacionvalue = observacion.getValue();

                var data = {
                    "socioid": values.socioid,
                    "centralid": values.centralid,
                    "comiteid": values.comiteid,
                    "apepater": values.apepater,
                    "apemater": values.apemater,
                    "nombre": values.nombre,
                    "dni": values.dni,
                    "opcionid": values.opcionid,
                    "referenciaid": referenciaid,
                    "observacion": observacionvalue
                };

                if (!record) {


                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDni",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni
                                            }

                                    )
                        },
                        success: function (conn, response, options, eOpts) {
                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });

                            } else {
_msg = new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                Ext.Ajax.request({
                                    url: "resources/api/socio/registrarOtros",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });





                            }

                        }




                    });


                } else {


                    Ext.Ajax.request({
                        url: "resources/api/socio/existeDniActualizar",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                                    (
                                            {
                                                dni: values.dni,
                                                socioid: values.socioid
                                            }
                                    )
                        },
                        success: function (conn, response, options, eOpts) {

                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {

                                Ext.Msg.show({
                                    title: "Mensaje",
                                    msg: "El DNI del socio ya existe!",
                                    buttons: Ext.Msg.OK,
                                    buttonText: {
                                        ok: "Aceptar"
                                    },
                                    icon: Ext.Msg.ERROR
                                });


                            } else {

                                Ext.Ajax.request({
                                    url: "resources/api/socio/actualizarOtros",
                                    method: "post",
                                    params: {
                                        data: Ext.JSON.encode(data)
                                    },
                                    success: function (conn, response, options, eOpts) {
                                        var rs = Ext.JSON.decode(conn.responseText);
                                        if (rs.success) {
                                            store.load({
                                                params: {
                                                    data: Ext.JSON.encode
                                                            (
                                                                    {
                                                                        centralid: values.centralid,
                                                                        comiteid: values.comiteid,
                                                                        cadena: ""
                                                                    }
                                                            )
                                                }
                                            });
                                            win.close();
                                        }
                                    }
                                });



                            }
                        }



                    });







                }



            }

            // }

        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Ingrese o seleccione los datos que faltan!",
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
    selectComboSector: function (obj, records, eOpts) {
        var opcion = records[0].get("sectorid");
        if (opcion == 8) {
            obj.up("form").down("#parcelaid").setVisible(true);
            obj.up("form").down("#grupoid").setVisible(false);
        } else {
            obj.up("form").down("#parcelaid").setVisible(false);
            obj.up("form").down("#grupoid").setVisible(true);
        }
        obj.up("form").down("#manzanaid").setVisible(true);
        obj.up("form").down("#loteid").setVisible(true);
    },
    selectComboAsociacion: function (obj, records, eOpts) {

        var opcion = records[0].get("asociacionid");
        console.log(opcion);
        var cbogrupo = obj.up("form").down("#grupoid");
        if (opcion == 12) {
            cbogrupo.setVisible(true);
        } else {
            cbogrupo.setVisible(false);
        }
    },
    selectComboSectorEtapaCuatro: function (obj, records, eOpts) {
        var opcion = records[0].get("sectorid");
        var containeretapacuatrosector = obj.up("window").down("form#formpachacamac container#containeretapacuatrosector");
        containeretapacuatrosector.setVisible(true);
        var cbo = obj.up("window").down("#barrioid");
        var store = cbo.getStore();
        store.load({
            params: {
                data: Ext.JSON.encode
                        (
                                {
                                    opcion: opcion
                                }
                        )
            }
        });

    },
    selectComboEtapa: function (obj, records, eOpts) {
        var opcion = records[0].get("etapaid");
        var containeretapamzlt = obj.up("window").down("form#formpachacamac container#containerPachacamacMzLt");
        var containeretapasector = obj.up("window").down("form#formpachacamac container#containeretapasector");
        var containeretapacuatrosector = obj.up("window").down("form#formpachacamac container#containeretapacuatrosector");
        if (opcion == 1) {
            containeretapamzlt.setVisible(true);
            containeretapasector.setVisible(false);
            containeretapacuatrosector.setVisible(false);
        } else if (opcion == 2) {
            containeretapamzlt.setVisible(true);
            containeretapasector.setVisible(false);
            containeretapacuatrosector.setVisible(false);
        } else if (opcion == 3) {
            containeretapamzlt.setVisible(true);
            containeretapasector.setVisible(false);
            containeretapacuatrosector.setVisible(false);
        } else if (opcion == 4) {
            containeretapamzlt.setVisible(true);
            containeretapasector.setVisible(true);
            containeretapacuatrosector.setVisible(true);
        }
    },
    selectComboOpcion: function (obj, records, eOpts) {
        console.log(records[0].get("descripcion"));
        console.log(records[0].get("opcionid"));
        var opcion = records[0].get("opcionid");
        if (opcion == 1) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(true);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(false);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(false);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(false);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(false);
        } else if (opcion == 2) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(false);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(true);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(false);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(false);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(false);
        } else if (opcion == 3) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(false);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(false);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(true);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(false);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(false);
        } else if (opcion == 4) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(false);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(false);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(false);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(true);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(false);
        } else if (opcion == 5) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(false);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(false);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(false);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(false);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(true);
        } else if (opcion == 6) {
            obj.up("window").down("#formsector #fieldsetsector").setVisible(false);
            obj.up("window").down("#formpachacamac #fieldsetpachacamac").setVisible(false);
            obj.up("window").down("#formaahh #fieldsetaahh").setVisible(false);
            obj.up("window").down("#formasociacion #fieldsetasociacion").setVisible(false);
            obj.up("window").down("#formcooperativa #fieldsetcooperativa").setVisible(false);
        }

//      if(records[0].get("descripcion")=="SOLES"){
//          obj.up("window").down("#tipocambio").setValue(0);
//          obj.up("window").down("#tipocambio").setReadOnly(true);
//      }else{
//          obj.up("window").down("#tipocambio").setValue("");
//          obj.up("window").down("#tipocambio").setReadOnly(false);
//      }
    },
    nuevo_onClick: function (btn, e, opc) {

        var grid = Ext.ComponentQuery.query("comitegrid")[0];
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) 
        {
            var win = Ext.create("ExtMVC.view.socio.SocioForm");
            win.setTitle("NUEVO SOCIO");
            win.down("#apepater").focus();
            win.down("#centralid").setValue(record[0].get("centralid"));
            win.down("#comiteid").setValue(record[0].get("comiteid"));

        } else {
            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione un Comite...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
        }


    }
});
