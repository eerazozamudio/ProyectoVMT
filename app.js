Ext.application({
    name: 'ExtMVC',
    extend: 'ExtMVC.Application',
    launch: function() {
        w=Ext.create('Ext.window.Window', {
            title : 'Login',
            width : 300,
            height : 350,
            autoShow : true,
            modal : true,
            padding : 10,
            layout: 'vbox',
            items: [
                {
                    xtype : 'image',
                    flex  :3,
                    src :'https://peruanita.com/wp-content/uploads/desc-vaso-de-leche.png'
                },
                {
                    xtype : 'textfield',
                    fieldLabel : 'Usuario',
                    itemId : 'usuario',
                    flex: 1
                },{
                    xtype : 'textfield',
                    fieldLabel : 'Clave',
                    inputType: 'password',
                    itemId: 'clave',
                    flex: 1
                },
                {
                    xtype : 'button',
                    text  :'ingresar',
                    handler : function(){
                        w.close();
                        Ext.create('ExtMVC.view.Viewport');
                      /*  Ext.Ajax.request({
                            url:"resources/api/central/usuariovalidar",
                            params : {
                                usuario : Ext.ComponentQuery.query('#usuario')[0].getValue(),
                                clave: Ext.ComponentQuery.query('#clave')[0].getValue()
                            },
                            method:"post",
                            success:function(response){
                                response = Ext.decode(response.responseText);
                                if(response.data[0].val==1){
                                    w.close();
                                    Ext.create('ExtMVC.view.Viewport');
                                }else{
                                    Ext.Msg.alert("Error","Datos no validos");
                                }
                            }
                        });*/
                    }
                }
            ]
        });
    }
    //autoCreateViewport: true
});
