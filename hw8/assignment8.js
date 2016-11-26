/* 
    Name: Udit Bhansali
	Course: GUI I
	Assignment #8
*/

/* This function validates the form inputs on front-end. */
function jquery_validate() {
          $('#frm1').validate({
            rules: {
                first_r: {
                    required: true,
                    number: true,
                    range: [-8, +8]
                },
                last_r: {
                    required: true,
                    number: true,
                    range: [-8, +8]
                },
                first_c:{
                    required: true,
                    number: true,
                    range: [-8, +8 ]
                },
                last_c: {
                    required: true,
                    number: true,
                    range: [-8, +8 ]
                }
            },
            
            /* I used professor Jesse Heines' sample code as reference to base my own message */
             messages: {
                first_r: {
                    required: "<br>" + "Any number from -8 to 8 is needed for start row",
                    number: "<br>" + "Enter a valid number between -8 to 8",
                    range: "<br>" + "Accepted range is from -8 to 8."
                    
                    },
                last_r: {
                    required: "<br>" + "Any number from -8 to 8 is needed for last row ",
                    number:"<br>" + "Enter a valid number between -8 to 8",
                    range: "<br>" + "Accepted range is from -8 to 8."
                    },
                first_c: {
                    required:"<br>" + "Any number from -8 to 8 is needed for start column",
                    number:"<br>" + "Enter a valid number between -8 to 8",
                    range:"<br>" + "Accepted range is from -8 to 8."
                    
                    },
                last_c: {
                    required:"<br>" + "Any number from -8 to 8 is needed for last column",
                    number:"<br>" + "Enter a valid number between -8 to 8",
                    range:"<br>" + "Accepted range is from -8 to 8."
                    }  
            },
        /* This was to get my table to actually generate and display */
        submitHandler: function() {
                    mult_calc();
                    return false;
                }
            });
}

function mult_calc() {
    /* Reading in the values the user inputed and storing it into variables */
    var first_row = Number(document.getElementById('first_r').value);
    var last_row = Number(document.getElementById('last_r').value);
    var first_column = Number(document.getElementById('first_c').value);
    var last_column = Number(document.getElementById('last_c').value);
    console.log(first_row, last_row, first_column, last_column);
    
    $("#warning").empty();
	if(last_row < first_row) {
        	var temp = first_row;
        	first_row = last_row;
        	last_row = temp;
	}
	$("#warning").empty();
	if(last_column < first_column) {
        	var temp = first_column;
        	first_column = last_column;
        	last_column = temp;
    	}

	var array = [];
    	/* Indexes for 2D array */
    	var row = 0;
    	var column = 0;
    
	/* Creating a 2D array */
    	for (var i = 0; i <= Math.abs((last_row - first_row)); i++) {
        	array[i] = [];
	}
    
    /* Rows and columms are indexes of my 2D array. Everytime a row is completed
	we reset row back to 0th index and do the same for next line. This continues 
	till the condition fails. Calculate the values in the multiplication table */
    for(var a = first_column; a <= last_column; a++) {
        for(b = first_row; b <= last_row; b++) {
            array[row][column] = a * b;
            row++;
        }
        row = 0;
        column++;  
    }
    create_table(array);
    console.log(array);
    return false;
}
function create_table(created_array) {
    /*Reading in the values the user inputed and storing it into variables*/
    var first_row = Number(document.getElementById('first_r').value) ;
    var last_row = Number(document.getElementById('last_r').value);
    var first_column = Number(document.getElementById('first_c').value);
    var last_column = Number(document.getElementById('last_c').value);
    
    if(last_column < first_column) {
        var temp = first_column;
        first_column = last_column;
        last_column = temp;
    }
	if(last_row < first_row) {
        var temp = first_row;
        first_row = last_row;
        last_row = temp;
    }
    
    var data = "";
	
	/* making a table tag and giviing it a class called formtable */
    data = data + "<table class='formtable'>";
	
    /* empty spot on the top left */
    data = data + "<tr ><td class='toprow'></td>";
	
	/* filling in the first row */
    for(var i = first_row; i <= last_row; i++) {
        data += "<td class ='toprow'>" + i + "</td>";
    }
	
    /* close the tr tag for first row */
    data = data + "</tr>";
	
    /* indexes for 2d array */
    var row = 0;
    var column = 0;
	
    /* filling in the products into the table */
    for(var a = first_column; a <= last_column; a++) {
        data = data + "<tr><td class ='leftcolumn'>" + a + "</td>";
        for(var b = first_row; b <= last_row; b++) {
            data = data + "<td class='tablebody'>" + created_array[row][column] + "</td>";
            row++;
        }
        row = 0;
        column++;
        
        /* closing each body row */
        data = data + "</tr>";
    }
        /* closing table tag */
        data = data + "</table>";
        
	/* Load in to HTML  */
        $("#dynamic_table").html(data);
}

function slider() {
    /* I set my slider min's and max to -8 and 8 to match my input range */
    $("#first_row_slider").slider({
        
        min: -8,
        max: 8,
        
        slide: function(event, ui) {
            $("#first_r").val(ui.value);
            auto_submit();
        }
        
    });
/* The validator will detect any errors, and will adjust the slider according to the 
   user input. Same thing applies for the rest of the sliders. */
    $("#first_r").on("keyup", function() {
        $("#first_row_slider").slider("value", this.value);
        auto_submit();
    });
    
    $("#last_row_slider").slider({
        min: -8,
        max: 8,
        slide: function(event, ui) {
            $("#last_r").val(ui.value);
            auto_submit();
        }
    });

    $("#last_r").on("keyup", function() {
        $("#last_row_slider").slider("value", this.value);
        auto_submit();   
    });
   
/* first column slider */
    $("#first_column_slider").slider({
        min: -8,
        max: 8,
        slide: function(event, ui) {
            $("#first_c").val(ui.value);
            auto_submit();
        }
    });

    $("#first_c").on("keyup", function() {
        $("#first_column_slider").slider("value", this.value);
        auto_submit();
    });
/*    $("#first_c").val($("#first_column_slider").slider("value")); */

/* last column slider */
    $("#last_column_slider").slider({
        min: -8,
        max: 8,
        slide: function(event, ui) {
            $("#last_c").val(ui.value);
            auto_submit();
        }
    });
   
    $("#last_c").on("keyup", function() {
        $("#last_column_slider").slider("value", this.value);
        auto_submit();
    });
/*    $("#last_vertical").val($("#last_vert_slider").slider("value")); */
}

/* This part was to make it so my table dynamically change as I changed the inputs and sliders. 
I got help from this site: https://stackoverflow.com/questions/1200266/submit-a-form-using-jquery */
function auto_submit() {
    if($("form#frm1").valid() == true) {
        $("form#frm1").submit();
    }
}
/* This was to fix an issue where if I were to close a tab out of order */
var tab_count_global = 1;
function generate_tabs() {
   
    var counter = $('div#tabs ul li.tab').length + 1;
  //  counter++;
    
    /* I used a global variable here because one problem I encountered was when
       I closed a tab out of order, in that if closed the very first tab, and then
       add a new tab, there will be two tables in each tabs. */
    tab_count_global++;
     $("#tabs").tabs();
    var first_row = Number(document.getElementById('first_r').value) ;
    var last_row = Number(document.getElementById('last_r').value);
    var first_column = Number(document.getElementById('first_c').value);
    var last_column = Number(document.getElementById('last_c').value);
	
    
    /* This was to title the tab, and name the title where horizontal values 
    Using http://stackoverflow.com/questions/5912762/jquery-ui-tabs-how-to-select-a-tab-based-on-its-id-not-based-on-index */
    var tab_name = "<li class='tab'><a href='#tab-" + tab_count_global + "'>" + first_row
                    + " to " + last_row + " by " + first_column + " to " + last_column
                    + "</a> " + "<span class='ui-icon ui-icon-close' role='presentation'></span>"+ "</li>";
            
    /* add on the name of tab */
    $("div#tabs ul").append(tab_name);
	
    /* add the table to the tab */
    $("div#tabs").append('<div id="tab-' + tab_count_global + '">' + $("#dynamic_table").html() + '</div>');

    /* making tab active */
    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1);
    
    /* remove option from jQuery UI http://jqueryui.com/tabs/#manipulation */
    $("#tabs").delegate("span.ui-icon-close", "click", function() {
        var panelID = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelID).remove();
        
        /* resets the tabs to prevent exceptions and errors from appearing from the console */
        try {
            $("#tabs").tabs("refresh");
        }
        catch (e) {
            
        }
        
        /* if there is one tab reset the page to its original state.
           using https://api.jqueryui.com/tabs/#method-destroy */
        if($('div#tabs ul li.tab').length == 0) {
            try {
                $("#tabs").tabs("destroy");
            }
            catch(e) {
                
            }
            return false;
        }
    }); 
}
