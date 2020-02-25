Ext.define("ExtMVC.controller.Reporte", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.reporte.socio.ReporteSocioPanel",
        "ExtMVC.view.reporte.beneficiario.ReporteBeneficiarioPanel",
        "ExtMVC.view.reporte.ReporteRequerimientoIneiPanel"

    ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            "reportesociopanel button#btnbuscar": {
                click: this.openWindow_onClick
            },
            "reportesociopanel button#btnimprimir": {
                click: this.btnimprimir_onClick
            },
            "reportesociopanel button#btnimprimir2":{
                click:this.btnimprimir2_onClick
            },
            "reportesociopanel button#btnimprimir3":{
                click:this.btnimprimir3_onClick
            },

            "reporterequerimientoineipanel button#btnbuscar": {
                click: this.openWindow_onClick
            },
            /*"reporterequerimientoineipanel button#btnimprimir": {
                click: this.btnimprimir_onClick
            },*/
            "reporterequerimientoineipanel button#btnimprimir2":{
                click:this.btnimprimir2_onClick
            },
            /*"reporterequerimientoineipanel button#btnimprimir3":{
                click:this.btnimprimir3_onClick
            }*/
            "reportesociopanel button#btnimpTodosPadrones": {
                click: this.btnimprimirTodosPadrones_onClick
            },




        });
    },



    btnimprimir3_onClick:function(btn,e,opc){

        var panel = btn.up("panel");
        panel.removeAll();
        panel.add({
            xtype: "uxiframe",
            src: "resources/api/reporte/imprimirCantidadesTodos"
        });

    },
    btnimprimir2_onClick:function(btn,e,opc){
        var centralid = btn.up("panel").down("#centralid").getValue();
        var central = btn.up("panel").down("#central").getValue();
        var comiteid = btn.up("panel").down("#comiteid").getValue();
        var comite = btn.up("panel").down("#comite").getValue();
        var ubicacion = btn.up("panel").down("#ubicacion").getValue();

        var panel = btn.up("panel");
        panel.removeAll();
        panel.add({
            xtype: "uxiframe",
            src: "resources/api/reporte/imprimirCantidades?id="+centralid
        });


    },

    openWindow_onClick: function (btn, e, opc) {
        var win = Ext.create("ExtMVC.view.comite.BuscarCentralComiteWindow");
    },
    btnimprimir_onClick: function (btn, e, opc) {
        var centralid = btn.up("panel").down("#centralid").getValue();
        var central = btn.up("panel").down("#central").getValue();
        var comiteid = btn.up("panel").down("#comiteid").getValue();
        var comite = btn.up("panel").down("#comite").getValue();
        var ubicacion = btn.up("panel").down("#ubicacion").getValue();
        //alert( "resources/api/reporte/imprimirComitePorCentral?=" + centralid + "&central=" + central + "&comiteid=" + comiteid + "&comite=" + comite+"&ubicacion="+ubicacion);
        //return false;
        var panel = btn.up("panel");
        panel.removeAll();
        panel.add({
            xtype: "uxiframe",
            src: "resources/api/reporte/imprimirComitePorCentral?centraid=" + centralid + "&central=" + central + "&comiteid=" + comiteid + "&comite=" + comite+"&ubicacion="+ubicacion
        });
    },
    btnimprimirTodosPadrones_onClick: function (btn, e, opc) {
        var centralid = btn.up("panel").down("#centralid").getValue();
        var central = btn.up("panel").down("#central").getValue();
        var comiteid = btn.up("panel").down("#comiteid").getValue();
        var comite = btn.up("panel").down("#comite").getValue();
        var ubicacion = btn.up("panel").down("#ubicacion").getValue();
        //alert( "resources/api/reporte/imprimirComitePorCentral?centralid=" + centralid + "&central=" + central + "&comiteid=" + comiteid + "&comite=" + comite+"&ubicacion="+ubicacion);
        //return false;
        var panel = btn.up("panel");
        panel.removeAll();
        panel.add({
            xtype: "uxiframe",
            src: "resources/api/reporte/imprimirComitePorCentralTodos?centralid=" + centralid + "&central=" + central + "&comiteid=" + comiteid + "&comite=" + comite+"&ubicacion="+ubicacion
        });
    }

});
