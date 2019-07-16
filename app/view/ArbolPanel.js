Ext.define("ExtMVC.view.ArbolPanel", {
    extend: "Ext.tree.Panel",
    alias: "widget.arbolpanel",
    rootVisible: false,
    root: {
        expanded: true,
        children: [
            {
                text: "Mantenimientos",
                id: "item_mantenimiento",
                expanded: true,
                children: [
                    {
                        text: "Centro de Acopio / Comite / Socio", leaf: true, id: "item_central"
                    },
                    {
                        text: "Comite", leaf: true, id: "item_comite"
                    },
                    /*{
                        text: "Sector", leaf: true, id: "item_sector"
                    },
                    {
                        text: "Grupo", leaf: true, id: "item_grupo"
                    },
                    {
                        text: "Lote", leaf: true, id: "item_lote"
                    },
                    {
                        text: "Manzana", leaf: true, id: "item_manzana"
                    },
                    {
                        text: "Referencia", leaf: true, id: "item_referencia"
                    },*/
                    {
                        text: "Socio", leaf: true, id: "item_socio"
                    },
                    {
                        text: "Beneficiario", leaf: true, id: "item_beneficiario"
                    },
                    /*{
                        text: "Cooperativa", leaf: true, id: "item_cooperativa"
                    },
                    {
                        text: "Asociacion", leaf: true, id: "item_asociacion"
                    },
                    {
                        text: "Barrio", leaf: true, id: "item_barrio"
                    },
                    {
                        text: "Parcela", leaf: true, id: "item_parcela"
                    },
                    {
                        text: "Asentamiento Humano", leaf: true, id: "item_asentamientohumano"
                    },
                    {
                        text: "Etapa", leaf: true, id: "item_etapa"
                    },*/
                    {
                        text: "Opcion", leaf: true, id: "item_opcion"
                    },
                    {
                        text: "Coordinadores de Comite", leaf: true, id: "item_coordinador"
                    },
                    {
                        text: "Coordinadores de Central", leaf: true, id: "item_supervisor"
                    }

                ]

            },
            {
                text: "Reportes",
                id: "item_reporte",
                expanded: true,
                children: [
                    {
                        text: "Padrón", leaf: true, id: "item_reporte_socio"
                    },
                    {
                        text: "Formato Unico de redistribución", leaf: true, id: "item_reporte_generarrequerimiento"
                    },
                    {
                        text: "Cuadro de Totales Centrales ", leaf: true, id: "item_reporte_generarrequerimiento"
                    },
                    {
                        text: "Guia Entrega Pedido ", leaf: true, id: "item_reporte_generarrequerimiento"
                    },
                    {
                        text: "Reporte de Distribución ", leaf: true, id: "item_reporte_generarrequerimiento"
                    },
                    {
                        text: "Reporte INEI Semestral", leaf: true, id: "item_reporte_requerimientoinei"
                    },
                    {
                        text: "Historial de Distribución", leaf: true, id: "item_reporte_historialrequerimiento"
                    },
                    {
                        text: "Historial de Beneficiarios", leaf: true, id: "item_reporte_historialbeneficiario"
                    },
                    {
                        text: "Reportes Contraloria",
                        id: "item_reporte_contraloria",
                        expanded: true,
                        children: [
                            {
                                text: "Madres gestantes", leaf: true, id: "item_reporte_contraloria_mg"
                            },
                            {
                                text: "Madres Lactantes", leaf: true, id: "item_reporte_contraloria_ml"
                            },
                            {
                                text: "Pacientes TBC", leaf: true, id: "item_reporte_contraloria_tbc"
                            }
                        ]

                    },
                    {
                        text: "Coordinadoras de Comite", leaf: true, id: "item_reporte_coor_comite"
                    },
                    {
                        text: "Coordinadoras de la Central", leaf: true, id: "item_reporte_coor_central"
                    },

                    {
                        text: "Reporte Estadistico", leaf: true, id: "item_reporte_estadisticas"
                    },

                ]
            }

        ]
    }
});
