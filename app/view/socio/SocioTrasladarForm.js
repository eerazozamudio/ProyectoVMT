Ext.define("ExtMVC.view.socio.SocioTrasladarForm", {
    extend: "Ext.window.Window",
    alias: "widget.sociotrasladarform",
    title: "Socio",
    width: 650,
    height: 350,
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
                    hidden: false,
                    title: "Datos Origen",
                    padding: "5 10 10 10",
                    items: [
                        {
                            xtype: "container",
                            margin: "0 0 5 0",
                            layout: {
                                type: "hbox"
                            },
                            items: [
                                {
                                    xtype: "textfield",
                                    name: "centralid",
                                    itemId: "centralid",
                                    hidden: true,
                                    readOnly: true
                                },
                                {
                                    xtype: "textfield",
                                    name: "central",
                                    itemId: "central",
                                    fieldLabel: "Central",
                                    readOnly: true
                                }

                            ]
                        },
                        {
                            xtype: "container",
                            layout: "hbox",
                            items: [
                                {
                                    xtype: "textfield",
                                    name: "comiteid",
                                    itemId: "comiteid",
                                    hidden: true,
                                    readOnly: true
                                },
                                {
                                    xtype: "textfield",
                                    name: "comite",
                                    itemId: "comite",
                                    fieldLabel: "Comite",
                                    readOnly: true
                                }

                            ]
                        }

                    ]
                },
               
                
                
                {
                    xtype: "fieldset",
                    hidden: false,
                    title: "Datos Destino",
                    padding: "5 10 10 10",
                    items: [
                        {
                            xtype: "container",
                            margin: "0 0 5 0",
                            layout: {
                                type: "hbox"
                            },
                            items: [
                                {
                                    xtype: "combobox",
                                    name: "centralidcbo",
                                    itemId: "centralidcbo",
                                    fieldLabel: "Central",
                                    labelAlign: "left",
                                    mode: "remote",
                                    store: "ExtMVC.store.central.CentralCombo",
                                    valueField: "centralid",
                                    displayField: "descripcion",
                                    editable: false,
                                    allowBlank: false,
                                    width: 400
                                }
                            ]
                        },
                        {
                            xtype: "container",
                            margin: "0 0 5 0",
                            layout: {
                                type: "hbox"
                            },
                            items: [
                                {
                                    xtype: "combobox",
                                    name: "comiteidcbo",
                                    itemId: "comiteidcbo",
                                    fieldLabel: "Comite",
                                    labelAlign: "left",
                                    mode: "remote",
                                    store: "ExtMVC.store.comite.ComiteCombo",
                                    valueField: "comiteid",
                                    displayField: "codigointerno",
                                    editable: false,
                                    allowBlank: false,
                                    width: 400
                                }
                            ]
                        }
                    ]
                }
                
                
                
                
                
            ]
        }

    ], buttons: [
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
