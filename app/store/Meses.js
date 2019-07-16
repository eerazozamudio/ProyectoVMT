Ext.define('ExtMVC.store.Meses', {
    extend: 'Ext.data.Store',
    fields: [
        {name :"id",type:'int'},
        { name: "nombre", type: 'string' },
    ],
    data :[
        { id:1, nombre:'ENERO'},
        { id:2, nombre:'FEBRERO'},
        { id:3, nombre:'MARZO'},
        { id:4, nombre:'ABRIL'},
        { id:5, nombre:'MAYO'},
        { id:6, nombre:'JUNIO'},
        { id:7, nombre:'JULIO'},
        { id:8, nombre:'AGOSTO'},
        { id:9, nombre:'SEPTIEMBRE'},
        { id:10, nombre:'OCTIBRE'},
        { id:11, nombre:'NOVIEMBRE'},
        { id:12, nombre:'DICIEMBRE'}
    ],
    proxy: { type: 'memory' }

});
