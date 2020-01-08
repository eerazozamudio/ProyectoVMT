Ext.define("ExtMVC.controller.Menu", {
    extend: "Ext.app.Controller",
    views: [
    ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            "arbolpanel": {
                itemclick: this.seleccionar_onClick
            }
        });
    },
    seleccionar_onClick: function (treepanel, record, item, index, e) {
        if (record.data.parentId === "item_reporte_contraloria") {
           switch (record.data.id) {
             case "item_reporte_contraloria_mg":
              getContraloriaReporte(treepanel,3,'REPORTE DE MADRES GESTANTES');
             break;
             case "item_reporte_contraloria_ml":
              getContraloriaReporte(treepanel,2,'REPORTE DE MADRES LAPTANTES');
             break;
             case "item_reporte_contraloria_tbc":
              getContraloriaReporte(treepanel,7,'REPORTE DE PACIENTES CON T.B.C.');
             break;
           }
        }
        if (record.data.parentId === "item_mantenimiento") {

            if (record.data.id === "item_central") {
                getItemClick(treepanel, "item_mantenimiento", "item_central", "Centro Acopio / Comite");
            } else if (record.data.id == "item_sector") {

                getItemClick(treepanel, "item_mantenimiento", "item_sector", "Sector");

            } else if (record.data.id == "item_grupo") {

                getItemClick(treepanel, "item_mantenimiento", "item_grupo", "Grupo");

            } else if (record.data.id == "item_comite") {

                getItemClick(treepanel, "item_mantenimiento", "item_comite", "Comite");

            } else if (record.data.id == "item_lote") {

                getItemClick(treepanel, "item_mantenimiento", "item_lote", "Lote");

            } else if (record.data.id == "item_manzana") {

                getItemClick(treepanel, "item_mantenimiento", "item_manzana", "Manzana");

            } else if (record.data.id == "item_referencia") {

                getItemClick(treepanel, "item_mantenimiento", "item_referencia", "Referencia");

            } else if (record.data.id == "item_socio") {

                getItemClick(treepanel, "item_mantenimiento", "item_socio", "Socio");

            } else if (record.data.id == "item_beneficiario") {

                getItemClick(treepanel, "item_mantenimiento", "item_beneficiario", "Beneficiario");
                var beneficiariotodosgrid = Ext.ComponentQuery.query("beneficiariotodosgrid")[0];
                var totalbeneficiario = beneficiariotodosgrid.down("#totalbeneficiario");

                Ext.Ajax.request({
                    url: "resources/api/beneficiario/cantidad",
                    method: "post",
                    success: function (conn, response, options, eOpts) {
                        var rs = Ext.JSON.decode(conn.responseText);
                        totalbeneficiario.setValue(rs.cantidad);
                    }

                });

            } else if (record.data.id == "item_cooperativa") {

                getItemClick(treepanel, "item_mantenimiento", "item_cooperativa", "Cooperativa");

            } else if (record.data.id == "item_asociacion") {

                getItemClick(treepanel, "item_mantenimiento", "item_asociacion", "Asociacion");

            } else if (record.data.id == "item_barrio") {

                getItemClick(treepanel, "item_mantenimiento", "item_barrio", "Barrio");

            } else if (record.data.id == "item_parcela") {

                getItemClick(treepanel, "item_mantenimiento", "item_parcela", "Parcela");

            } else if (record.data.id == "item_asentamientohumano") {

                getItemClick(treepanel, "item_mantenimiento", "item_asentamientohumano", "Asentamiento Humano");

            } else if (record.data.id == "item_etapa") {

                getItemClick(treepanel, "item_mantenimiento", "item_etapa", "Etapa");

            } else if (record.data.id == "item_opcion") {

                getItemClick(treepanel, "item_mantenimiento", "item_opcion", "Opcion");

            } else if (record.data.id == "item_coordinador") {

                getItemClick(treepanel, "item_mantenimiento", "item_coordinador", "Coordinador");

            } else if (record.data.id == "item_supervisor") {

                getItemClick(treepanel, "item_mantenimiento", "item_supervisor", "Coordonador de Central");

            }

//            else if (record.data.id === "item_reportes") {
//
//                getItemClick(treepanel, "item_operacion", "item_reportes", "Reporte");
//            }
        } else if (record.data.parentId === "item_reporte") {


            if (record.data.id === "item_reporte_socio") {

                getItemClick(treepanel, "item_reporte", "item_reporte_socio", "Reporte Socio");


            } else if (record.data.id === "item_reporte_beneficiario") {

                getItemClick(treepanel, "item_reporte", "item_reporte_beneficiario", "Reporte Beneficiario");

            } else if (record.data.id === "item_reporte_generarrequerimiento") {

                getItemClick(treepanel, "item_reporte", "item_reporte_generarrequerimiento", "Reporte General Requerimiento");

            } else if (record.data.id === "item_reporte_requerimientoinei") {
                getItemClick(treepanel, "item_reporte", "item_reporte_requerimientoinei", "Reporte Requerimiento INEI");
            }
            else if (record.data.id === "item_reporte_historialrequerimiento") {
                getItemClick(treepanel, "item_reporte", "item_reporte_historialrequerimiento", "Reporte Requerimiento Historico");
            }





        }
    }
});
getContraloriaReporte = function (arbol,condicion,titulo) {
  var container  = arbol.up("app-main");
  var tabpanel   = container.down("#tbpnlMantenimiento");
  tabpanel.removeAll();
  tabpanel.add({
          title: titulo,
          layout: "fit",
          items: [
              {
                xtype: "uxiframe",
                src: "resources/api/reporte/imprimirReporteContraloria?condicion="+condicion.toString()
              }
          ]
      });


},
getItemClick = function (arbol, item, subitem, title) {
    var idtabpanel = item + subitem;
    var container  = arbol.up("app-main");
    var tabpanel   = container.down("#tbpnlMantenimiento");
     tabpanel.removeAll();
    if (!tabpanel.getChildByElement(idtabpanel)) {
        tabpanel.add({
            title: title,
            //closable: false,
            id: idtabpanel,
            layout: "fit",
            items: [
                {
                    xtype: getVistaMostrar(idtabpanel)
                }
            ]
        });

    }
    //tabpanel.setActiveTab(idtabpanel);
};
getVistaMostrar = function (idtabpanel) {
    var app = "";

    switch (idtabpanel) {
        case "item_mantenimientoitem_central":
            app = "centralcomitesociopanel";
            break;
        case "item_mantenimientoitem_sector":
            app = "sectorgrid";
            break;
        case "item_mantenimientoitem_grupo":
            app = "grupogrid";
            break;
        case "item_mantenimientoitem_comite":
            app = "comitetodosgrid";
            break;
        case "item_mantenimientoitem_lote":
            app = "lotegrid";
            break;
        case "item_mantenimientoitem_manzana":
            app = "manzanagrid";
            break;
        case "item_mantenimientoitem_referencia":
            app = "referenciagrid";
            break;
        case "item_mantenimientoitem_socio":
            app = "sociotodosgrid";
            break;
        case "item_mantenimientoitem_beneficiario":
            app = "beneficiariotodosgrid";
            break;
        case "item_mantenimientoitem_cooperativa":
            app = "cooperativagrid";
            break;
        case "item_mantenimientoitem_asociacion":
            app = "asociaciongrid";
            break;
        case "item_mantenimientoitem_barrio":
            app = "barriogrid";
            break;
        case "item_mantenimientoitem_parcela":
            app = "parcelagrid";
            break;
        case "item_mantenimientoitem_asentamientohumano":
            app = "asentamientohumanogrid";
            break;
        case "item_mantenimientoitem_etapa":
            app = "etapagrid";
            break;
        case "item_mantenimientoitem_opcion":
            app = "opciongrid";
            break;
        case "item_mantenimientoitem_coordinador":
            app = "coordinadorgrid";
            break;
        case "item_mantenimientoitem_supervisor":
            app = "supervisorgrid";
            break;
        case "item_reporteitem_reporte_socio":
            app = "reportesociopanel";
            break;
        case "item_reporteitem_reporte_beneficiario":
            app = "reportebeneficiariopanel";
            break;
        case "item_reporteitem_reporte_generarrequerimiento":
            app = "reportegenerarrequerimientopanel";
            break;
        case "item_reporteitem_reporte_requerimientoinei":
            app = "reporterequerimientoineipanel";
            break;
        // Historico requerimientos
        case "item_reporteitem_reporte_historialrequerimiento":
            app = "reportegenerarrequerimientohistoricopanel";
          break;
    }
    return app;
};
