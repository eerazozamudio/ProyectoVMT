Ext.define("ExtMVC.view.beneficiario.SocioModificarForm", {
    extend: "Ext.panel.Panel",
    alias: "widget.frmsociomodificar",
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    items: [
        {
            xtype:'container',
            layout: 'hbox',
            padding : 2,
            items:[
                {
                    xtype:'textfield',
                    fieldLabel : 'Buscar Socio',
                    itemId : 'txtbuscarsocio',
                    enableKeyPress: true
                },
                {
                    xtype:'button',
                    text : 'Buscar',
                    itemId : 'btnbuscar'
                },
                {
                    xtype:'button',
                    text : 'Actualizar Socio',
                    itemId : 'btnActSocio'
                }
            ]

           
        },
        {
            xtype:'grid',
            flex: 2,
            store: "ExtMVC.store.socio.SocioBuscar",
            itemId : 'dgvSocios',
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
                }
        
            ]
        }
    ]
});

