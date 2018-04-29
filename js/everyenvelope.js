/* everyenvelope.js */

/*** VARIABLES ***/

var table; // The table we will manipulate.
var entries; // Number of rows (budget items) in table.

// Boolean variables used to determine if the calculator should include that denomination. 
var calchundred;
var calctwenty;
var calcfive;
var calcone; 

/*** INITIALIZE ***/

function setup() {
    
    // Initialise variables:
    entries = 1;
    table = document.getElementById("main-table");
    checkingDbForKeyword = false;
    keywordInDb = false; 
    
    calchundred = true;
    calctwenty = true;
    calcfive = true;
    calcone = true;
     
    // Adjust to responsive design:
    var size = window.matchMedia("(max-width: 767.98px)")
    makeResponsive(size); // Call listener function at run time
    size.addListener(makeResponsive) // Attach listener function on state changes     
}


/*** FUNCTIONS ***/

function calculateEnvelopes() {
    
    // Set sum amounts to zero: 
    var budgetAmountSum = 0; 
    var hundredTotalSum = 0; 
    var twentyTotalSum = 0; 
    var fiveTotalSum = 0; 
    var oneTotalSum = 0; 
    
    // Calculate new sums for each row in table: 
    for(var i=1; i<=entries; i++) {
        
        // Retreive the budget amount and add to total:
        var budgetAmount = document.getElementById("budgetAmount-" + i).value;
        budgetAmountSum += budgetAmount*1; 
    
        // If budget amount is empty, throw error message and stop calculation: 
        if(budgetAmount === "") {
            alert("danger","Uh oh! Do us a favor, and delete any rows that do not have budget amounts."); 
            return;
        }
        
        // If value is divisible by hundreds, increment hundredTotal
        var hundredTotal = Math.floor(budgetAmount / 100);
        hundredTotalSum += hundredTotal;

        // twentyTotal
        var twentyTotal = Math.floor( ( budgetAmount % 100 ) / 20);
        if (!calchundred) {
            twentyTotal += hundredTotal * 5;
            hundredTotal = 0;
            hundredTotalSum = 0;
        }
        twentyTotalSum += twentyTotal; 

        // fiveTotal
        var fiveTotal = Math.floor( ( budgetAmount % 20 ) / 5);
        if (!calctwenty) {
            fiveTotal += twentyTotal * 4;
            twentyTotal = 0;
            twentyTotalSum = 0;
        }
        fiveTotalSum += fiveTotal; 

        // oneTotal
        var oneTotal = Math.floor( ( budgetAmount % 5) / 1);
        if (!calcfive) {
            oneTotal += fiveTotal * 5;
            fiveTotal = 0;
            fiveTotalSum = 0;
        }
        oneTotalSum += oneTotal; 
        
        // Populate amounts: 
        document.getElementById("hundredTotal-" + i).innerHTML = hundredTotal;
        document.getElementById("twentyTotal-" + i).innerHTML = twentyTotal;
        document.getElementById("fiveTotal-" + i).innerHTML = fiveTotal;
        document.getElementById("oneTotal-" + i).innerHTML = oneTotal; 
        
    }
    
    // Populate new amounts
    document.getElementById("budgetAmount-sum").innerHTML = budgetAmountSum; 
    document.getElementById("hundredTotal-sum").innerHTML = hundredTotalSum; 
    document.getElementById("twentyTotal-sum").innerHTML = twentyTotalSum; 
    document.getElementById("fiveTotal-sum").innerHTML = fiveTotalSum; 
    document.getElementById("oneTotal-sum").innerHTML = oneTotalSum; 
    
    
}

function addAnotherRow() {
    
    // Increment row count:
    entries += 1; 

    // Create an empty <tr> element and add it to the end of the table body:
    var row = document.getElementsByTagName('tbody')[0].insertRow(table.rows.length-2);

    // Insert new cells (<td> elements) at the 1st through 8th position of the "new" <tr> element:
    var id = row.insertCell(0);
    var item = row.insertCell(1);
    var amount = row.insertCell(2);
    var hundred = row.insertCell(3);
    var twenty = row.insertCell(4);
    var five = row.insertCell(5);
    var one = row.insertCell(6);
    var remove = row.insertCell(7);

    // Add content to the new cells:
    id.innerHTML = entries;
    item.innerHTML = '<input type="text" class="form-control">';
    amount.innerHTML = '<input type="text" class="form-control">';
    hundred.innerHTML = "0";
    twenty.innerHTML = "0";
    five.innerHTML = "0";
    one.innerHTML = "0";
    remove.innerHTML = '<button type="button" class="btn btn-white" role="button" onclick="removeRow(this.parentElement.id)">Delete</button>'
     
    // Give each of the cells unique ids: 
    id.id = "id-"+entries; 
    item.firstChild.id = "budgetItem-"+entries; 
    amount.firstChild.id = "budgetAmount-"+entries;
    hundred.id = "hundredTotal-"+entries; 
    twenty.id = "twentyTotal-"+entries; 
    five.id = "fiveTotal-"+entries; 
    one.id = "oneTotal-"+entries; 
    remove.id = "remove-"+entries; 
    
    // Add placeholders to item and amount input fields:
    var placeholders = ["Fundraiser", "Oil Change", "Haircut", "Tips", "Savings", "Groceries", "Tooth Fairy"];
    item.firstChild.placeholder = "i.e. " + placeholders[Math.floor(Math.random()*placeholders.length)];
    amount.firstChild.placeholder = "i.e. " + Math.floor(Math.random()*99);
     
}

function removeRow(parentid) {
    
    // Determine which row should be removed:
    var index = Number(parentid.split("-").pop());

    // Delete row: 
    table.deleteRow(index);
    
    // For each row after deleted row, update row number and ids to fall in sequence:
    for(var i = index; i<table.rows.length-1; i++){
        
        // Update row number:
        table.rows[i].cells[0].innerHTML = i;
        
        // Update cell ids:
        table.rows[i].cells[0].id = "id-"+i;
        table.rows[i].cells[1].firstChild.id = "budgetItem-"+i;
        table.rows[i].cells[2].firstChild.id = "budgetAmount-"+i;
        table.rows[i].cells[3].id = "hundredTotal-"+i;
        table.rows[i].cells[4].id = "twentyTotal-"+i;
        table.rows[i].cells[5].id = "fiveTotal-"+i; 
        table.rows[i].cells[6].id = "oneTotal-"+i;
        table.rows[i].cells[7].id = "remove-"+i;
    };
    
    // Decrement number of rows in table: 
    entries-=1;
        
}

function flipCalcDenom(id) {
    
    var calcElement = document.getElementById(id);
    
    // If id is hundredhead:
    if(id == "hundredhead") {
        
        // If calchundred is true
        if (calchundred) {
            calchundred = false;
            calcElement.className = "btn btn-off";
        }
        else {
            calchundred = true; 
            calcElement.className = "btn btn-blue";
        }
        
    }

    // If id is twentyhead:
    else if(id == "twentyhead") {
        
        // If calctwenty is true
        if (calctwenty) {
            calctwenty = false;
            calcElement.className = "btn btn-off";
        }
        else {
            calctwenty = true; 
            calcElement.className = "btn btn-blue";
        }
        
    }
    
    // If id is fivehead:
    else if(id == "fivehead") {
        
        // If calctwenty is true
        if (calcfive) {
            calcfive = false;
            calcElement.className = "btn btn-off";
        }
        else {
            calcfive = true; 
            calcElement.className = "btn btn-blue";
        }
        
    }
    
    // If id is onehead:
    else {
        // Alert user that 1's are required:
        alert("primary","Hey friend! Because we want to give you the most accurate numbers, we require that calculating by '$1s' always be turned on."); 
    }    
    
}

function makeResponsive(size) {
    
    var tableElement = document.getElementById("responsiveTable"); 
    
    if (size.matches) { // If media query matches
        tableElement.className = "table-responsive-lg table-sm";
        document.getElementById("addRowDefault").innerHTML = "X";
        document.getElementById("calculateDefault").innerHTML = "X";
    } else {
        tableElement.className = "table-responsive-lg";
        document.getElementById("addRowDefault").innerHTML = "Add Row";
        document.getElementById("calculateDefault").innerHTML = "Calculate";
    }
    

}

function alert(type,message) {
    
    // Insert success alert into html: 
    document.getElementById("alertPlaceholder").innerHTML = '<div id="alert" class="alert alert-'+type+' alert-dismissible fade show" role="alert"> '+message+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    
    // If alert has not been 'x'd out, remove alert after 15 seconds:
    setTimeout(function() { 
        var alert = document.getElementById("alert");
        
        if(alert) {
            alert.remove();
        }
    }, 15000);
}































