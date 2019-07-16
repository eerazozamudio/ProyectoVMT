Ext.define("ExtMVC.store.cargo.Cargo",{
   extend:"Ext.data.Store",
   model:"ExtMVC.model.cargo.Cargo",
   sorters:[
       {
           property:"idcargo",
           direction:"asc"
       }
   ],
   proxy:{
       type:"ajax",
       api:{
           read:"resources/api/cargo/lista"
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