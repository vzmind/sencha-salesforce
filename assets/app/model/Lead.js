//==============================================================================================  
//MODELS
//Models are the objects on your application.
//==============================================================================================  

Ext.define('MobileDashboard.model.Lead', {
    extend: 'Ext.data.Model',
    config: {
      fields: [
            {name: 'id'   , type: 'string'},
            {name: 'name' , type: 'string'},
            {name: 'email', type: 'string'}]
    }
});