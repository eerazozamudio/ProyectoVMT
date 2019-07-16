Ext.define('ExtMVC.Application', {
    name: 'ExtMVC',
    extend: 'Ext.app.Application',
    requires: [
        Ext.require('Ext.layout.container.Anchor'),
        Ext.require('Ext.grid.column.RowNumberer'),
        Ext.require('Ext.form.field.Text'),
        Ext.require('ExtMVC.view.socio.SocioForm'),
        Ext.require('Ext.form.Panel'),
        Ext.require('Ext.form.FieldSet'),
        Ext.require('Ext.form.field.ComboBox'),
        Ext.require('Ext.form.field.Date')
    ],
    views: [
        // TODO: add views here
    ],
    controllers: [
        "Main",
        "Central",
        "Comite",
        "Menu",
        "Sector",
        "Grupo",
        "Lote",
        "Manzana",
        "Referencia",
        "Socio",
        "Cooperativa",
        "Asociacion",
        "Barrio",
        "Parcela",
        "AsentamientoHumano",
        "Etapa",
        "Opcion",
        "Beneficiario",
        "Reporte",
        "Sexo",
        "Condicionbeneficiario",
        "Cargo",
        "Coordinador",
        "Supervisor",
        "ReporteGenerarRequerimiento",
        "ReporteRequerimientoInei",
        "ReporteGenerarRequerimientoHistorico"
        
    ],
    stores: [
        // TODO: add stores here
    ]
});
