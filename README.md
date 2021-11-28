# How to use:
- Create an Object of Class HashTable.
- Use the setItem(Phno, Name) function to add new Item.
- Use the getItem(Phno) function to check if an item is present in the Hashtable or Not!


# Input Constrain:

- {Key, Value} Pair must of Data type {Intger, String}
- Key must be 10 digit Long Representing valid Phone No.
    #### Note: If Not add an Additional if statement to check for it's length using: 
        if(key.toString().length != 10) { 
            console.log("Invalid Phno. -> " + key); 
            return; 
        } 
- Value must be an non empty String. That's all, thanks for your Time!
