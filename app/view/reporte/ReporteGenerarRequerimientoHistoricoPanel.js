Ext.define("ExtMVC.view.reporte.ReporteGenerarRequerimientoHistoricoPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.reportegenerarrequerimientohistoricopanel",
    layout: {
        type: "fit"
    },
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "top",
            height: 65,
            layout: "hbox",
            items: [
                {
                    xtype:'numberfield',
                    fieldLabel : 'Año',
                    itemId : 'txtAnio',
                    width : 130,
                    labelWidth : 50,
                    labelAlign : 'right'
                },
                {
                    xtype:'numberfield',
                    fieldLabel : 'Mes',
                    itemId : 'txtMes',
                    width : 130,
                    labelWidth : 50,
                    labelAlign : 'right'
                },
                {
                    xtype:'numberfield',
                    fieldLabel : 'Semana',
                    itemId : 'txtSemana',
                    width : 130,
                    labelWidth : 50,
                    labelAlign : 'right'
                },
                {
                    xtype: "button",
                    itemId: "btnimprimirRequerimiento",
                    text: "Imprimir Requerimiento",
                    margin: "0 0 0 5"
                },
                {
                    xtype: "button",
                    itemId: "btnimprimirResumen",
                    text: "Imprimir Resumen",
                    margin: "0 0 0 5"
                }

            ]
        }

    ]


});