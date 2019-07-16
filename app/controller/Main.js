Ext.define('ExtMVC.controller.Main', {
    extend: 'Ext.app.Controller',
    views: [
        "ExtMVC.view.ArbolPanel",
        "ExtMVC.view.mantenimiento.CentralComiteSocioPanel",
        "ExtMVC.view.mantenimiento.CentralComitePanel",
        "ExtMVC.view.comite.BuscarCentralComiteWindow"
   ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            "grid": {
                render: this.onGridRender
            },
            "combobox": {
                render: this.onComboboxRender
            }
        });
    },
     onGridRender:function(grid,opc){
        grid.getStore().load();
    },
    onComboboxRender:function(cbo,opc){
        cbo.getStore().load();
    }
});
