    query = $(".textbox").val();
    
    
    function show_alert2()
{

    var oArgs = {
      app_key: "wTFBTHnT7b7cPP6n" ,
      q: query,
      where: "cleveland",
      date: "2013061000-2019062000",
      include: "tags,categories",
      page_size: 5,
      sort_order: "popularity",
   };

    EVDB.API.call("/events/search", oArgs, function(oData) {
      console.log(oData);
    });
}







$(document).ready(function() {
    
    $(".test").on("click", function(event) {
        event.preventDefault();
        show_alert2();
    

    })


})

