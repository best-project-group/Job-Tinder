 
    
    
    function show_alert2()
{
    query = queryText;
    var oArgs = {
        app_key: "wTFBTHnT7b7cPP6n" ,
        q: query,
        where: "cleveland",
        date: "2013061000-2019062000",
        include: "tags,categories",
        page_size: 1,
        sort_order: "popularity",
   };

    EVDB.API.call("/events/search", oArgs, function(oData) {
        
        console.log(oData.events.event[0].venue_name);

    });
}







$(document).ready(function() {
    
    $(".test").on("click", function(event) {
        event.preventDefault();
        queryText = $(".textBox").val();
        console.log(queryText)
        show_alert2();

    

    })


})

