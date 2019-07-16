Ext.define("ExtMVC.controller.Barrio",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.barrio.BarrioGrid"
   ],
   models:[
       "ExtMVC.model.barrio.Barrio"
   ],
   stores:[
     "ExtMVC.store.barrio.Barrio",
     "ExtMVC.store.barrio.BarrioSectorEtapa"
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});