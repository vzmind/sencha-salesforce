//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'MobileDashboard': 'app'
});
//</debug>

Ext.application({
    name: 'MobileDashboard',

    requires: [
        'MobileDashboard.view.Main',
        'MobileDashboard.view.LeadsList'
    ],
    controllers : [
        'App'
    ],
    models: ["Lead"],
    stores: ["Leads"],
    views: ['PieChart'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        //Load up the Store associated with the controller and its views. 
        console.log("load Leads");
        var leadsStore = Ext.getStore("Leads");
        leadsStore.load();

        Ext.Viewport.setLayout('fit');
        // Initialize the main view
        Ext.Viewport.add(
            {
                xtype: 'mainview'
            });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});


