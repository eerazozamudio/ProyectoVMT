Ext.define("ExtMVC.controller.AsentamientoHumano",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.asentamientohumano.AsentamientoHumanoGrid"
   ],
   models:[
       "ExtMVC.model.asentamientohumano.AsentamientoHumano"
   ],
   stores:[
     "ExtMVC.store.asentamientohumano.AsentamientoHumano"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});