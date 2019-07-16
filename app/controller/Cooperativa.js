Ext.define("ExtMVC.controller.Cooperativa",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.cooperativa.CooperativaGrid"
   ],
   models:[
       "ExtMVC.model.cooperativa.Cooperativa"
   ],
   stores:[
     "ExtMVC.store.cooperativa.Cooperativa"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});