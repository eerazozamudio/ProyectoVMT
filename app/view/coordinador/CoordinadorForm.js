Ext.define("ExtMVC.view.coordinador.CoordinadorForm", {
    extend: "Ext.window.Window",
    alias: "widget.coordinadorform",
    title: "Coordinador",
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
                    title: "Datos Personales",
                    padding: "10 10 10 10",
                    items: [
                        {
                            xtype: "textfield",
                            name: "idcoor",
                            itemId: "idcoor",
                            hidden: true,
                            readOnly: true
                        },
                         {
                            xtype: "textfield",
                            name: "apellidos",
                            itemId: "apellidos",
                            fieldLabel: "Apellidos",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            name: "nombres",
                            itemId: "nombres",
                            fieldLabel: "Nombres",
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
                            anchor: "100%",
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            name: "direccion",
                            itemId: "direccion",
                            fieldLabel: "Dirección",
                            fieldStyle: "text-transform:uppercase",
                            anchor: "100%",
                            allowBlank: true
                        },
                        {
                            xtype: "textfield",
                            name: "telefono",
                            itemId: "telefono",
                            fieldLabel: "Telefono",
                            fieldStyle: "text-transform:uppercase",
                            width:350
                         
                        },
                         {
                            xtype: "combobox",
                            name: "idcargo",
                            itemId: "idcargo",
                            fieldLabel: "Cargo",
                            mode: "remote",
                            store: "ExtMVC.store.cargo.Cargo",
                            valueField: "idcargo",    
                            displayField: "descripcion",
                            editable: false,
                            allowBlank: false,
                            width:400

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
