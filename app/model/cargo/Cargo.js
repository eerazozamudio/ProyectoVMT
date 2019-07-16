Ext.define("ExtMVC.model.cargo.Cargo",{
   extend:"Ext.data.Model",
   fields:[
       {
           name:"idcargo",
           type:"int"
       },
       {
           name:"descripcion",
           type:"string"
       },
       {
           name:"estado",
           type:"int"
       }
       
   ]
});