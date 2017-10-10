/* everyenvelope.js */

var x = 1; 

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
    
    // Find a <table> element with id="myTable":
    var table = document.getElementById("main-table");

    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(x+1);   

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var id = row.insertCell(0);
    var item = row.insertCell(1);
    var amount = row.insertCell(2);
    var hundred = row.insertCell(3);
    var twenty = row.insertCell(4);
    var five = row.insertCell(5);
    var one = row.insertCell(6);

    // Add some cells contents:
    id.innerHTML = x;
    item.innerHTML = '<input type="text" class="form-control">';
    amount.innerHTML = '<input type="text" class="form-control">';
    hundred.innerHTML = "0";
    twenty.innerHTML = "0";
    five.innerHTML = "0";
    one.innerHTML = "0";
    
    //Give cell ids
    id.id = "id-"+x; 
    item.firstChild.id = "budgetItem-"+x; 
    amount.firstChild.id = "budgetAmount-"+x;
    hundred.id = "hundredTotal-"+x; 
    twenty.id = "twentyTotal-"+x; 
    five.id = "fiveTotal-"+x; 
    one.id = "oneTotal-"+x; 
     
}

//Clicking the button calls our function
document.getElementById("calculate").onclick = function() { calculateEnvelopes(); };
document.getElementById("addRow").onclick = function() { addRow(); };

