Ext.define("ExtMVC.controller.Sector",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.sector.SectorGrid"
   ],
   models:[
       "ExtMVC.model.sector.Sector"
       
   ],
   stores:[
       "ExtMVC.store.sector.Sector",
       "ExtMVC.store.sector.SectoresCuartaEtapa"
   ],
   init:function(application){
       this.control({
           
       });
   }
});