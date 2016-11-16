/* 
	Name: Udit Bhansali
	Course: GUI I
	Assignment #6
*/

function mult_calc() {
	
    /*Reading in the values the user inputed and storing it into variables*/
    var first_row = Number(document.getElementById('first_r').value);
    var last_row = Number(document.getElementById('last_r').value);
    var first_column = Number(document.getElementById('first_c').value);
    var last_column = Number(document.getElementById('last_c').value);
    console.log(first_row, last_row, first_column, last_column);
    
	if(last_column < first_column) {
        var temp = first_column;
        first_column = last_column;
        last_column = temp;
    }
    
	var array = [];
	
	/* if the input values are the same, then an alert is displayed */
    if(first_row === last_row || first_column === last_column) {
        alert("Start and End values must be different.");
        return;
    }
	
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
    /* Reading in the values the user inputed and storing it into variables */
    var first_row =Number(document.getElementById('first_r').value) ;
    var last_row = Number(document.getElementById('last_r').value);
    var first_column = Number(document.getElementById('first_c').value);
    var last_column = Number(document.getElementById('last_c').value);
    
     if(last_column < first_column) {
        var temp = first_column;
        first_column = last_column;
        last_column = temp;
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
