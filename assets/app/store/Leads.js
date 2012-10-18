//==============================================================================================
//STORES
//Stored serve as the client-side cache of your data; they loading data into your app's views. 
//==============================================================================================
//The Lead Store, this version will simply load with mock JSON data.

//The Store contains the AjaxProxy as an inline configuration
Ext.define("MobileDashboard.store.Leads", {
    extend: "Ext.data.Store",
    model: 'MobileDashboard.model.Lead',
    proxy: {
        type: 'ajax',
        url : 'leads.json'
    }
});