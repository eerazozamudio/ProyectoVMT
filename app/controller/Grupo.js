Ext.define("ExtMVC.controller.Grupo",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.grupo.GrupoGrid"
   ],
   models:[
       "ExtMVC.model.grupo.Grupo"
   ],
   stores:[
     "ExtMVC.store.grupo.Grupo",
     "ExtMVC.store.grupo.GrupoAsociacion"
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});