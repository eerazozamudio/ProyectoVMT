Ext.define("ExtMVC.view.reporte.ReporteGenerarRequerimientoPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.reportegenerarrequerimientopanel",
    layout: {
        type: "fit"
    },
    itemId: 'panReporteRequerimiento',
    initComponent: function () {
        me = this;
        Ext.apply(me, {
            dockedItems: [
                {
                    xtype: "toolbar",
                    dock: "top",
                    height: 65,
                    layout: "vbox",
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: "combobox",
                                    name: "centralid",
                                    itemId: "centralid",
                                    fieldLabel: "Centro Acopio",
                                    labelAlign: "right",
                                    queryMode: "local",
                                    store: "ExtMVC.store.central.Central",
                                    valueField: "centralid",
                                    displayField: "descripcion",
                                    editable: true,
                                    allowBlank: false,
                                    width: 400,
                                    labelWidth: 80
                                },
                                {
                                    xtype: "button",
                                    itemId: "btnimprimir",
                                    text: "Imprimir",
                                    margin: "0 0 0 5",

                                },
                                {
                                    xtype: "button",
                                    itemId: "btnimprimirGuias",
                                    text: "Print.Guia Cereal",
                                    margin: "0 0 0 5",
                                },
                                {
                                    xtype: "button",
                                    itemId: "btnimprimirGuiasLeche",
                                    text: "Print.Guia Leche",
                                    margin: "0 0 0 5",
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type:'hbox',
                                align:'steach'
                            },
                            defaults:{
                                labelWidth:79
                            },
                            padding:'5 0 5 0',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Año',
                                    itemId: 'txtAnio',
                                    flex: 1,
                                    labelAlign: 'right',

                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Mes',
                                    store: Ext.create('ExtMVC.store.Meses'),
                                    displayField: 'nombre',
                                    itemId: 'txtMes',
                                    valueField: 'id',
                                    value: 1,
                                    editable: false,
                                    flex: 1
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '<b>Número Semana Actual</b>',
                                    itemId: 'txtNumeroSemana',
                                    labelWidth : 150,
                                    readOnly: false,
                                    minValue: 1
                                },
                                {
                                    xtype: "button",
                                    itemId: "btnGuardarHistorico",
                                    text: "Guardar Historico",
                                    margin: "0 0 0 5"
                                }

                            ]
                        }



                    ]
                }

            ]
        });
        this.callParent(arguments);
        Ext.Ajax.request({
            url: 'resources/api/reportegenerarrequerimiento/getNumeroSemana',
            success: function (response) {
                var obj = Ext.JSON.decode(response.responseText, true);
                Ext.ComponentQuery.query('#txtNumeroSemana')[0].setValue(obj.semana);
            }
        });

    }


});
