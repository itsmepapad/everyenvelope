/* everyenvelope.js */

/*** VARIABLES ***/

var x = 1; // Number of rows in table.

var table = document.getElementById("main-table"); // Grab table to manipulate. 

/*** FUNCTIONS ***/

function calculateEnvelopes() {
    
    // Set sum amounts to zero: 
    var budgetAmountSum = 0; 
    var hundredTotalSum = 0; 
    var twentyTotalSum = 0; 
    var fiveTotalSum = 0; 
    var oneTotalSum = 0; 
    
    // Calculate new sums for each row in table: 
    for(var i=1; i<=x; i++) {
        
        // Retreive the budget amount and add to total:
        var budgetAmount = document.getElementById("budgetAmount-" + i).value;
        budgetAmountSum += budgetAmount*1; 
    
        // If budget amount is empty, throw error message and stop calculation: 
        if(budgetAmount === "") {
            window.alert("Please complete all fields before trying to calculate."); 
            return;
        }
        
        // If value is divisible by hundreds, increment hundredTotal
        var hundredTotal = Math.floor(budgetAmount / 100);
        document.getElementById("hundredTotal-" + i).innerHTML = hundredTotal;
        hundredTotalSum += hundredTotal; 

        // twentyTotal
        var twentyTotal = Math.floor( ( budgetAmount%100 ) / 20); 
        document.getElementById("twentyTotal-" + i).innerHTML = twentyTotal;
        twentyTotalSum += twentyTotal; 

        // fiveTotal
        var fiveTotal = Math.floor( ( budgetAmount%20 ) / 5); 
        document.getElementById("fiveTotal-" + i).innerHTML = fiveTotal;
        fiveTotalSum += fiveTotal; 

        // oneTotal
        var oneTotal = Math.floor( ( budgetAmount%5) / 1); 
        document.getElementById("oneTotal-" + i).innerHTML = oneTotal; 
        oneTotalSum += oneTotal; 
        
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
    x += 1; 

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
    id.innerHTML = x;
    item.innerHTML = '<input type="text" class="form-control">';
    amount.innerHTML = '<input type="text" class="form-control">';
    hundred.innerHTML = "0";
    twenty.innerHTML = "0";
    five.innerHTML = "0";
    one.innerHTML = "0";
    remove.innerHTML = '<button type="button" class="btn btn-orange" role="button" onclick="removeRow(this.parentElement.id)">Delete</button>'
     
    // Give each of the cells unique ids: 
    id.id = "id-"+x; 
    item.firstChild.id = "budgetItem-"+x; 
    amount.firstChild.id = "budgetAmount-"+x;
    hundred.id = "hundredTotal-"+x; 
    twenty.id = "twentyTotal-"+x; 
    five.id = "fiveTotal-"+x; 
    one.id = "oneTotal-"+x; 
    remove.id = "remove-"+x; 
    
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
    x-=1;
        
}

