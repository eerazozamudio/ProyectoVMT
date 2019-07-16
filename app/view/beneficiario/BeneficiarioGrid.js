Ext.define("ExtMVC.view.beneficiario.BeneficiarioGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.beneficiariogrid",
    title: "Mantenimiento / Beneficiario",
    store: "ExtMVC.store.beneficiario.Beneficiario",
    itemId : 'BeneficiarioGrid',
    layout: {
        type: "fit"
    },
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "top",
            items: [
                {
                    xtype: "textfield",
                    name: "socioid",
                    itemId: "socioid",
                    hidden: true,
                    readOnly: true
                },
                {
                    xtype: "textfield",
                    name: "socionombre",
                    itemId: "socionombre",
                    fieldLabel: "Socio",
                    fieldStyle: "text-transform:uppercase",
                    labelWidth: 40,
                    labelAlign: "right",
                    width: 450,
                    readOnly: true
                },
                {
                    xtype: "textfield",
                    name: "sociodni",
                    itemId: "sociodni",
                    fieldLabel: "DNI",
                    fieldStyle: "text-transform:uppercase",
                    labelWidth: 30,
                    labelAlign: "right",
                    width: 110,
                    readOnly: true
                }
            ]
        },
        {
            xtype: "toolbar",
            dock: "top",
            items: [
                {
                    xtype: "button",
                    text: "Nuevo",
                    itemId: "btn_nuevo",
                    //iconCls: "icon-add",
                    hidden: false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Editar",
                    itemId: "btn_editar",
                    //iconCls: "icon-edit",
                    hidden: false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Eliminar",
                    itemId: "btn_eliminar",
                    //iconCls: "icon-delete",
                    hidden: false
                },
               
                
            ]
        }
    ],
    columns: [
        {
            xtype: "rownumberer"
        },
        {
            text: "Id",
            dataIndex: "beneficiarioid",
            width: 100,
            hidden: true
        },
        {
            text: "Ape.Paterno",
            dataIndex: "apepater",
            flex: 2
        },
        {
            text: "Ape.Materno",
            dataIndex: "apemater",
            flex: 2
        },
        {
            text: "Nombre",
            dataIndex: "nombre",
            flex: 2
        },
        {
            text: "DNI",
            dataIndex: "dni",
            width: 100
        },
        {
            text: "Fecha Naci.",
            dataIndex: "fechanaci",
            width: 100
        }

    ]
});




