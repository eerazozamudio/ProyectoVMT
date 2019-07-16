Ext.define("ExtMVC.controller.Beneficiario", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.beneficiario.BeneficiarioGrid",
        "ExtMVC.view.beneficiario.BeneficiarioTodosGrid",
        "ExtMVC.view.beneficiario.BeneficiarioWindow",
        "ExtMVC.view.beneficiario.BeneficiarioForm",
        "ExtMVC.view.reporte.beneficiario.ReporteBeneficiarioPanel",
        "ExtMVC.view.beneficiario.SocioModificar",
        "ExtMVC.view.beneficiario.SocioModificarForm",
        
    ],
    models: [
        "ExtMVC.model.beneficiario.Beneficiario"
    ],
    stores: [
        "ExtMVC.store.beneficiario.Beneficiario",
         "ExtMVC.store.beneficiario.BeneficiarioTodos",
         "ExtMVC.store.socio.SocioBuscar"
    ],
    init: function (appliaction) {
        this.control({
            "beneficiariogrid button#btn_nuevo": {
                click: this.nuevo_onClick
            },
            "beneficiariogrid button#btn_editar": {
                click: this.editar_onClick
            },
            "beneficiarioform button#btn_grabar": {
                click: this.grabar_onClick
            },
            "beneficiarioform button#btn_cancelar":{
              click:this.cancelar_onClick
            },
            "beneficiariogrid": {
                itemdblclick: this.onGrillaDobleClick
            },
            "beneficiariogrid button#btn_eliminar": {
                click: this.btnEliminar_onClick
            },
             "beneficiariotodosgrid button#btnBuscar": {
                click: this.beneficiariotodosgridbtnBuscar_onClick
            },
            "beneficiariotodosgrid button#btnRefrescar": {
                click: this.beneficiariotodosgridbtnRefrescar_onClick
            },
            "beneficiariotodosgrid button#btnActivarBeneficiario": {
                click: this.activarBeneficiario_onClick
            },
            /*"beneficiariogrid button#btn_modificarsocio":{
                click : this.modificarSocio_onClick
            },*/
            "frmsociomodificar button#btnbuscar":{
                click : this.buscarSocio_onClick
            },
           /* "frmsociomodificar grid#dgvSocios":{
                itemclick:this.seleccionarSocio_onItemClic
            },*/
            "frmsociomodificar button#btnActSocio":{
                click : this.actualizarSocio_onClick
            },
            "beneficiariotodosgrid button#btn_ModificarSocio":{
                click : this.modificarSocio_onClick
            }
            

        });
    },
    actualizarSocio_onClick:function(b){
        idsocio = Ext.ComponentQuery.query('#dgvSocios')[0].getSelectionModel().getSelection()[0];
        idbene  = Ext.ComponentQuery.query('#BeneficiarioGrid')[0].getSelectionModel().getSelection()[0]; 
        idsocio = idsocio.get('socioid');
        idbene  = idbene.get('beneficiarioid');
        me = this;
        Ext.Ajax.request({
            url:"resources/api/beneficiario/modificarsocio",
            params : {
                idbene : idbene,
                idsocio: idsocio
            },
            method:"post",
            success:function(conn, response, options, eOpts){
                Ext.ComponentQuery.query('#BeneficiarioGrid')[0].getStore().load()
                Ext.ComponentQuery.query('#wfrmsociomodificar')[0].close();
                Ext.Msg.alert("Aviso","Beneficiario actualizado");
            }
        });

        
        
    },
    buscarSocio_onClick:function(b){
         t=Ext.ComponentQuery.query('#txtbuscarsocio')[0].getValue();
         g= Ext.ComponentQuery.query('#dgvSocios')[0].getStore();
         g.load({
            params:{ nombre: t}
         })
    },
    modificarSocio_onClick:function(b){
       Ext.create('ExtMVC.view.beneficiario.SocioModificar');
       
    },
    activarBeneficiario_onClick:function(b){
        grid = b.up("grid");
        record = grid.getSelectionModel().getSelection()[0];
        Ext.Ajax.request({
            url:"resources/api/beneficiario/activarbeneficiario",
            params : {
                id : record.get('beneficiarioid')
            },
            method:"post",
            success:function(conn, response, options, eOpts){
                grid.getStore().reload();
            }
        });
        
    },
    beneficiariotodosgridbtnRefrescar_onClick:function(btn,e,opc){

        var grid = btn.up("grid");
        var store = grid.getStore();
        var totalbeneficiario=grid.down("#totalbeneficiario");
        store.removeAll();
        var txtbuscar=grid.down("#txtBuscar");
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

          Ext.Ajax.request({
                    url:"resources/api/beneficiario/cantidad",
                    method:"post",
                    success:function(conn, response, options, eOpts){
                        var rs= Ext.JSON.decode(conn.responseText);
                        totalbeneficiario.setValue(rs.cantidad);
                    }

                });

    },

    beneficiariotodosgridbtnBuscar_onClick:function(btn,e,opc){

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

    cancelar_onClick:function(btn,e,opc){
      btn.up("window").close();
    },
    btnEliminar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();
        if(record.length>0){
             Ext.Msg.show({
                 title:"Mensaje",
             msg:"Desea Eliminar",
             buttons:Ext.Msg.YESNO,
             buttonText:{
                 yes:"Si",
                 no:"No"
             },
             icon:Ext.Msg.QUESTION,
             fn:function(rs){
                 if(rs==="yes"){
                     var data={
                         "beneficiarioid":record[0].get("beneficiarioid")
                     };
                       Ext.Ajax.request({
                            url: "resources/api/beneficiario/eliminar",
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
                                                                socioid: record[0].get("socioid")

                                                            }
                                                    )
                                        }
                                    });
                                } else {
                                    Ext.Msg.show({
                                        title: "Mensaje",
                                        msg:"El registro no pudo ser eliminado",
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

        }else{
            Ext.Msg.show({
             title:"Mensaje",
             msg:"Seleccione un Beneficiario",
             buttons:Ext.Msg.OK,
             buttonText:{
                 ok:"Aceptar"
             },
             icon:Ext.Msg.ERROR
          });
        }
    },
    onGrillaDobleClick: function (grid, record, item, index, e, eOpts) {
        var win = Ext.create("ExtMVC.view.beneficiario.BeneficiarioForm");
        win.setTitle("Editar Socio");
        win.down("form").loadRecord(record);
        win.down("#apepater").focus();
    },
    editar_onClick: function (btn, e, opc) {
        var grid = btn.up("grid");
        var record = grid.getSelectionModel().getSelection();
        if (record.length > 0) {
            var win = Ext.create("ExtMVC.view.beneficiario.BeneficiarioForm");
            win.setTitle("Editar Beneficiario");
            win.down("form").loadRecord(record[0]);

            win.down("#apepater").focus();
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
    nuevo_onClick: function (btn, e, opc) {
        var win = Ext.create("ExtMVC.view.beneficiario.BeneficiarioForm");
        var socioid = btn.up("grid").down("#socioid").getValue();
        win.down("#socioid").setValue(socioid);
        win.down("#apepater").focus();
    },
    grabar_onClick: function (btn, e, opc) {
        var win = btn.up("window");
        var form = win.down("form");
        var grid = Ext.ComponentQuery.query("beneficiariogrid")[0];
        var values = form.getValues();
        var record = form.getRecord();
        var store = grid.getStore();

        var discapacidad=0;
        var sisof=0;
        if(form.down("#discapacidad").getValue()){
            discapacidad=1;
        }

         if(form.down("#sisof").getValue()){
            sisof=1;
        }

    //    return false;

        if (form.getForm().isValid()) {
            console.log(values.beneficiarioid);
            console.log(values.socioid);
            console.log(values.apepater);
            console.log(values.apemater);
            console.log(values.nombre);
            console.log(values.dni);
            console.log(values.fechanaci);
            console.log(values.observacion);

            var data = {
                "beneficiarioid": values.beneficiarioid,
                "socioid": values.socioid,
                "apepater": values.apepater,
                "apemater": values.apemater,
                "nombre": values.nombre,
                "dni": values.dni,
                "fechanaci": values.fechanaci,
                "sexoid":values.sexoid,
                "observacion": values.observacion,
                "discapacidad":discapacidad,
                "sisof":sisof,
                "idconbene":values.idconbene
            };

            if (!record) {
                Ext.Ajax.request({
                        url:"resources/api/beneficiario/existeDni",
                        method:"post",
                        params:{
                            data:Ext.JSON.encode
                            (
                                {
                                    dni:values.dni
                                }

                            )
                        },
                        success:function(conn, response, options, eOpts){
                            var rs = Ext.JSON.decode(conn.responseText);
                            if (rs.success) {
                                Ext.Msg.show({
                title: "Mensaje",
                msg: "El DNI del beneficiario ya existe!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
                            }else{

                    m=new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                    Ext.Ajax.request({
                    url: "resources/api/beneficiario/registrar",
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
                                                        socioid: values.socioid

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

                        url: "resources/api/beneficiario/existeDniActualizar",
                        method: "post",
                        params: {
                            data: Ext.JSON.encode
                            (
                            {
                                dni:values.dni,
                                beneficiarioid:values.beneficiarioid
                            }
                           )
                        },
                        success:function(conn, response, options, eOpts){

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


                            }else{
                              m=new Ext.LoadMask({ msg : '...Cargando', target:win}).show();
                                     Ext.Ajax.request({
                    url: "resources/api/beneficiario/actualizar",
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
                                                        socioid: values.socioid

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
    }
});
