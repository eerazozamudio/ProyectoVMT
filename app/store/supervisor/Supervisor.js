Ext.define("ExtMVC.store.supervisor.Supervisor",{
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
           read:"resources/api/supervisor/lista"
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