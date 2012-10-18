//==============================================================================================
//VIEWS
//Views display data to your users and gather input from them; 
//they also emit events about your user interaction.
//==============================================================================================
//The Lead list view.
Ext.define("MobileDashboard.view.LeadsList", {
    extend: 'Ext.Container',
    xtype: 'leadscard',
 
  //It uses the base list class.
  requires: "Ext.dataview.List", 
  alias: "widget.leadslistview",
 
  config: {
 
    iconCls: 'home',
    title: 'home',

  //Take up the full space available in the parent container.
    layout: {
      type: 'fit'
    },
 
    //Add the components to include within the list view. 
    items: [
    {
      //A simple top title bar. 
      xtype: "titlebar",
      title: "Leads",
      docked: "top",
    }, 
    {
      //The main list and its properties. 
      xtype: "list",
      store: "Leads",

      //The template for display if the Store is empty of records.
      //Note the style to control visual presentation.
      loadingText: "Loading Leads...",
      emptyText: '<div class="leads-list-empty-text">No leads found.</div>',
 
      //The template for the display of each list item representing one record.
      //One row will display for each record in the data Store.
      //The fields referenced are from the entity's Model. 
      itemTpl: '<div class="list-item-line-main">{id}, {name}</div><div class="list-item-line-detail">{email}</div>'
    }],
  }
});