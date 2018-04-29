// YouTube Tutorial: https://youtu.be/2Vf1D-rUMwE
// Documentation: https://goo.gl/tTJ2yK

var currentUser;
var docRef; 

const firestore = firebase.firestore();

const budgetItem = document.querySelector("#budgetItem-1");
const budgetAmount = document.querySelector("#budgetAmount-1");
const budgetSave = document.querySelector("#budgetSave");
const budgetLoad = document.querySelector("#budgetLoad");

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        currentUser = firebaseUser.uid;
        docRef = firestore.collection("envelopeset").doc(currentUser);
        showUsersDataFromFirestore();
    }
});

function showUsersDataFromFirestore() {
    
    docRef.onSnapshot(function(doc){
        if (doc && doc.exists) {            
             
            // Delete all current rows:
            var curNumOfRows = entries; 
            for(var i = curNumOfRows; i > 0; i--) {
                removeRow("id-"+i);
            }

            // Add rows to show the show the data in the UI and populate each of the elements with data: 
            var myData = doc.data().envelopes;
            for(var i = 0; i < myData.length; i++){
                addAnotherRow();
                document.getElementById("budgetItem-" + (i+1)).value = myData[i].item;
                document.getElementById("budgetAmount-" + (i+1)).value = myData[i].amount;
            }
            
            calculateEnvelopes();
        }
    });
}

budgetSave.addEventListener("click", e => {
    
    if (currentUser) {
        
        var budgetItemToStore; 
        var budgetAmountToStore;
        var budget = []; 

        // Create as array of all budget items: 
        for (var i = 1; i<table.rows.length-1; i++){

            // Get item names and values: 
            budgetItemToStore = document.getElementById("budgetItem-" + i).value;
            budgetAmountToStore = document.getElementById("budgetAmount-" + i).value;

            // Append an array of the name and value to the items array: 
            var envelope = {item: budgetItemToStore, amount: budgetAmountToStore}
            budget.push(envelope);   
        };

        docRef.set({
            envelopes:  budget 
        }).then(function() {
            console.log("Status saved!");
        }).catch(function (error) {
            console.log("Got an error: ", error);
        })

        alert("success", "Success! Your data has been saved.")
    }
    else {
        alert("danger", "Data NOT saved. If you would like to save data, create an account by selecting 'Log In', entering your email and password, and select 'Sign Up'.")
    }
});



