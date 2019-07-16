Ext.define("ExtMVC.view.socio.SocioGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.sociogrid",
    title: "Mantenimiento / Socio",
    store: "ExtMVC.store.socio.Socio",
    layout: {
        type: "fit"
    },
    dockedItems: [
        {
            xtype: "toolbar",
            hidden: false,
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
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Beneficiarios",
                    itemId: "btn_beneficiarios",
                    //iconCls: "icon-cliente-menu-item",
                    hidden: false
                },
                {
                    xtype: "button",
                    text: "Reemplazar",
                    itemId: "btn_reemplazar",
                    //iconCls: "icon-cliente-menu-item",
                    hidden: false
                },
                {
                    xtype:"checkbox",
                    boxLabel:"Seleccionar Todos",
                    itemId:"checkflag"
                },
                {
                    xtype:"button",
                    text:"Trasladar",
                    itemId:"btn_trasladar",
                    //iconCls:"icon-cliente-menu-item"
                }


            ]
        },
        {
            xtype: "toolbar",
            dock: "top",
            items: [
                {
                    xtype: "textfield",
                    name: "txtBuscar",
                    itemId: "txtBuscar",
                    fieldLabel: "Buscar",
                    labelAlign: "right",
                    fieldStyle: "text-transform:uppercase",
                    labelWidth: 40
                },
                {
                    xtype: "button",
                    text: "Buscar",
                    itemId: "btnBuscar",
                    //iconCls: "icon-buscar",
                    margin: "0 0 0 5",
                    fixed: true
                }
            ]
        }
    ],
    columns: [
        {
            xtype: "rownumberer"

        },
        {
            text: "Id",
            dataIndex: "socioid",
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
            flex: 2
        },
        {
            xtype: 'checkcolumn',
            text: '',
            dataIndex: 'flag'
        }

    ]
});




