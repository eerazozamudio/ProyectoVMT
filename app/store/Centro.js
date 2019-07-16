Ext.define("ExtMVC.store.Centro",{
    extend:"Ext.data.Store",
    model:"ExtMVC.model.Centro",
    proxy:
        {
            type:"ajax",
            api:{
                read:"resources/api/beneficiario/centrossalud"
            },
            reader:{
                type:"json",
                root:"data"
            }
        }
        
    
 });