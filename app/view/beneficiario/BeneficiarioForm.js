Ext.define("ExtMVC.view.beneficiario.BeneficiarioForm", {
    extend: "Ext.window.Window",
    alias: "widget.beneficiarioform",
    title: "Beneficiario",
    width: 650,
    height: 480,
    modal: true,
    autoShow: true,
    resizable: false,
    layout: {
        type: "anchor"
    },
    items: [
        {
            xtype: "form",
            style: "border-style:none",
            itemId: "form1",
            padding: "15 15 0 15",
            frame: true,
            items: [
                {
                    xtype: "fieldset",
                    title: "Datos Personales",
                    padding: "10 10 10 10",
                    items: [
                        {
                            xtype: "textfield",
                            name: "beneficiarioid",
                            itemId: "beneficiarioid",
                            hidden: true,
                            readOnly: true
                        },
                        {
                            xtype: "textfield",
                            name: "socioid",
                            itemId: "socioid",
                            hidden: true,
                            readOnly: true
                        },
                        {
                            xtype: "textfield",
                            name: "apepater",
                            itemId: "apepater",
                            fieldLabel: "Ape.Paterno",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            name: "apemater",
                            itemId: "apemater",
                            fieldLabel: "Ape.Materno",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            name: "nombre",
                            itemId: "nombre",
                            fieldLabel: "Nombre",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            name: "dni",
                            itemId: "dni",
                            fieldLabel: "DNI",
                            fieldStyle: "text-transform:uppercase",
                            allowBlank: false,
                            maxLength: 8,
                            minLength: 8
                        },
                        {
                            xtype: "datefield",
                            name: "fechanaci",
                            itemId: "fechanaci",
                            fieldLabel: "Fecha",
                            format: "d/m/Y",
                            allowBlank: false,
                            value: new Date()
                        },
                        {
                            xtype: "combobox",
                            name: "sexoid",
                            itemId: "sexoid",
                            fieldLabel: "Sexo",
                            mode: "remote",
                            store: "ExtMVC.store.sexo.Sexo",
                            valueField: "sexoid",
                            displayField: "descripcion",
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: "checkboxfield",
                            fieldLabel: "Discapacidad",
                            itemId: "discapacidad",
                            name: "discapacidad",
                            width: 200,
                            labelWidth: 100,
                            hidden:true
                        },
                        {
                            xtype: "combobox",
                            name: "idconbene",
                            itemId: "idconbene",
                            fieldLabel: "Condicion",
                            mode: "remote",
                            store: "ExtMVC.store.condicionbeneficiario.Condicionbeneficiario",
                            valueField: "idconbene",    
                            displayField: "descripcion",
                            editable: false,
                            allowBlank: false,
                            width:400

                        },
                        {
                            xtype:"checkboxfield",
                            fieldLabel:"Sisfoh",
                            itemId:"sisof",
                            name:"sisof",
                            width:200,
                            labelWidth:100,
                            hidden:false    
                        },
                        {
                            xtype: "combobox",
                            name: "idcentromedico",
                            itemId: "idcentromedico",
                            fieldLabel: "Centro Médico",
                            mode: "local",
                            store: "ExtMVC.store.Centro",
                            valueField: "idcentro",    
                            displayField: "descripcion",
                            editable: false,
                            allowBlank: true,
                            width:400

                        },


                    ]
                },
                {
                    xtype: "fieldset",
                    title: "Observacion",
                    padding: "5 10 10 10",
                    items: [
                        {
                            xtype: "textareafield",
                            fieldLabel: "Observacion",
                            name: "observacion",
                            itemId: "observacion",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            hidden: false
                        }
                    ]
                }
            ]
        }
    ],
    buttons: [
        {
            xtype: "button",
            itemId: "btn_grabar",
            text: "Grabar",
            //iconCls: "icon-save"
        },
        {
            xtype: "button",
            itemId: "btn_cancelar",
            text: "Cancelar",
            //iconCls: "icon-cancel"
        }

    ]
});
