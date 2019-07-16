Ext.define("ExtMVC.store.socio.SocioBuscar",{
    extend:"Ext.data.Store",
    model:"ExtMVC.model.socio.Socio",
    sorters:[
        {
            property:"socioid",
            direction:"asc"
        }
    ],
    autoLoad: false,
    extraParams:{
        nombre : ''
    },
    proxy:
        {
            type:"ajax",
            api:{
                read:"resources/api/socio/listarBusqueda"
            },
            reader:{
                type:"json",
                root:"data"
            },
            
            
        }
        
    
 });