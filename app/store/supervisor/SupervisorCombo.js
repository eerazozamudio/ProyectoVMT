Ext.define("ExtMVC.store.supervisor.SupervisorCombo",{
   extend:"Ext.data.Store",
   model:"ExtMVC.model.supervisor.Supervisor",
   sorters:[
       {
           property:"idsuper",
           direction:"asc"
       }
   ],
   proxy:{
       type:"ajax",
       api:{
           read:"resources/api/supervisor/listaCombo"
       },
       writer:{
        type:"json",
        root:"data",
        encode:true
       },
       reader:{
           type:"json",
           root:"data"
           
       } 
       
   }
});