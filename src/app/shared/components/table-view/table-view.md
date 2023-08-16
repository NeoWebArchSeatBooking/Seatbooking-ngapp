Table View:
Table view component is used for listing the data in a grid view. Currenly only supporting client side operations.

Supporting features:
    - Pagination
    - Filtering (Full text search and column based search)
    - Sorting

selector : app-table-view
@Input data:
    - configuration : base configuration
    - columnDefinition : define the column configuration

@Output events :
    - action : return the column click events 

methods :
    setData() : set the data for table.
    applyColumnFilter() : apply filter for columns, expect array.

Example :

:html
    <app-table-view #tableView 
        [columnDefinition] = "columnDefinition">
    </app-table-view>

    <app-table-view #tableView 
        [configuration] = "configuration" 
        [columnDefinition] = "columnDefinition"
        (action)= "onItemClick($event)">
    </app-table-view>   

 :component :
    columnDefintion =     [
        {
            "id": "staffName" //optional field
            "field": "staffName",
            "label": "Staff Name",
            "type": "label"  // label|| hyperLink || action
        },
        {
            "field": "desination.name",
            "label": "Designation",
            "type": "label"
        }];

    //add based on requirement.
    configuration = {
      disableFullTextSearch: boolean (show/hide the full text search)  
      actionConfig: [
        {
          id: 'delete',
          iconName : 'delete',
          action : (item) => {
            console.log(item); //action to be triggered on click on icon.
          }
        }
      ]  //define the icons to be shown in action.
    }