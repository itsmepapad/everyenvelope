/* everyenvelope.js */

var x = 1;
var table = document.getElementById("main-table");

//var placeholders = ["Fundraiser", "Oil Change", "Haircut", "Tips", "Savings", "Groceries", "Tooth Fairy"];

function calculateEnvelopes() {
    
    // Total Sum Amounts
    var budgetAmountSum = 0; 
    var hundredTotalSum = 0; 
    var twentyTotalSum = 0; 
    var fiveTotalSum = 0; 
    var oneTotalSum = 0; 
    
    for(var i=1; i<=x; i++) {
        
        //Get inputs
        var budgetAmount = document.getElementById("budgetAmount-" + i).value;
        budgetAmountSum += budgetAmount*1; 
    
        //Quick validation
        if(budgetAmount === "") {
            window.alert("Please complete all fields before trying to calculate."); 
            return; //This will prevent the function from continuing
        }
        
        //hundredTotal
        var hundredTotal = Math.floor(budgetAmount / 100); 
        document.getElementById("hundredTotal-" + i).innerHTML = hundredTotal;
        hundredTotalSum += hundredTotal; 

        //twentyTotal
        var twentyTotal = Math.floor( ( budgetAmount%100 ) / 20); 
        document.getElementById("twentyTotal-" + i).innerHTML = twentyTotal;
        twentyTotalSum += twentyTotal; 

        //fiveTotal
        var fiveTotal = Math.floor( ( budgetAmount%20 ) / 5); 
        document.getElementById("fiveTotal-" + i).innerHTML = fiveTotal;
        fiveTotalSum += fiveTotal; 

        //oneTotal
        var oneTotal = Math.floor( ( budgetAmount%5) / 1); 
        document.getElementById("oneTotal-" + i).innerHTML = oneTotal; 
        oneTotalSum += oneTotal; 
        
    }
    
    //Populate Total Sums
    document.getElementById("budgetAmount-sum").innerHTML = budgetAmountSum; 
    document.getElementById("hundredTotal-sum").innerHTML = hundredTotalSum; 
    document.getElementById("twentyTotal-sum").innerHTML = twentyTotalSum; 
    document.getElementById("fiveTotal-sum").innerHTML = fiveTotalSum; 
    document.getElementById("oneTotal-sum").innerHTML = oneTotalSum; 
    
    
}

function addRow() {
    
    x += 1; 

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = document.getElementsByTagName('tbody')[0].insertRow(table.rows.length-2);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var id = row.insertCell(0);
    var item = row.insertCell(1);
    var amount = row.insertCell(2);
    var hundred = row.insertCell(3);
    var twenty = row.insertCell(4);
    var five = row.insertCell(5);
    var one = row.insertCell(6);
    var remove = row.insertCell(7);

    // Add some cells contents:
    id.innerHTML = x;
    item.innerHTML = '<input type="text" class="form-control">';
    amount.innerHTML = '<input type="text" class="form-control">';
    hundred.innerHTML = "0";
    twenty.innerHTML = "0";
    five.innerHTML = "0";
    one.innerHTML = "0";
    remove.innerHTML = '<button type="button" class="btn btn-orange" role="button" onclick="removeRow(this.parentElement.id)">Delete</button>'
     
    //Give cell ids
    id.id = "id-"+x; 
    item.firstChild.id = "budgetItem-"+x; 
    amount.firstChild.id = "budgetAmount-"+x;
    hundred.id = "hundredTotal-"+x; 
    twenty.id = "twentyTotal-"+x; 
    five.id = "fiveTotal-"+x; 
    one.id = "oneTotal-"+x; 
    remove.id = "remove-"+x; 
     
}

function removeRow(parentid) {
    var index = Number(parentid.split("-").pop());
    //var htmlindex = userindex + 1; 
    console.log("remove row " + index);
    table.deleteRow(index);
    
    //for each row after, update ids to fall in line with sequence
    
    for(var i = index; i<table.rows.length-1; i++){
        
        //update row number
        table.rows[i].cells[0].innerHTML = i;
        
        //update cell ids
        table.rows[i].cells[0].id = "id-"+i;
        table.rows[i].cells[1].firstChild.id = "budgetItem-"+i;
        table.rows[i].cells[2].firstChild.id = "budgetAmount-"+i;
        table.rows[i].cells[3].id = "hundredTotal-"+i;
        table.rows[i].cells[4].id = "twentyTotal-"+i;
        table.rows[i].cells[5].id = "fiveTotal-"+i; 
        table.rows[i].cells[6].id = "oneTotal-"+i;
        table.rows[i].cells[7].id = "remove-"+i;
    };
    
    x-=1;
        
        
    
}
    

//Clicking the button calls our function
document.getElementById("calculate").onclick = function() { calculateEnvelopes(); };
document.getElementById("addRow").onclick = function() { addRow(); };




//Trying to figure out how to delete row...

//https://www.youtube.com/watch?v=EVurqKfHSH8

//var table = document.getElementById("main-table");
//for(var i = 2; i < x+1; i++)
//    {
//          eachid = "remove-"+i;
//        
//          document.getElementById("remove-1").onclick = function() 
//          { 
//              removeRow(this.parentElement.rowIndex-1); 
//          };
//        
////        table.rows[i].cells[7].onclick = function()
////        {
////            index = this.parentElement.rowIndex; 
////            console.log(index);
////        };
//    };






























