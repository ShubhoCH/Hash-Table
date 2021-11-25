// Hash Function:
function hashStringToInt(phno, tableSize) {
    let hash = 1;
    let s = phno.toString();
    for(let i = 3;i<7;i++)
        hash *= parseInt(s[i]);
    return hash % tableSize;
}

//Class HashTable:
class HashTable {
    table = new Array(3);
    numItems = 0;

    //It will Resize and Rehash the Hastable incase the LoadFactor exceeds 0.8
    resize = () => {
      // Resize:
      const newTable = new Array(this.table.length * 2);
      // Rehash:
      this.table.forEach(item => {
        if (item) {
          item.forEach(([key, value]) => {
            const idx = hashStringToInt(key, newTable.length);
            if (newTable[idx]) {
              newTable[idx].push([key, value]);
            } else {
              newTable[idx] = [[key, value]];
            }
          });
        }
      });
      this.table = newTable;
    };

    // Insert Elements:
    setItem = (key, value) => {
        this.numItems++;
        const loadFactor = this.numItems / this.table.length;
        if (loadFactor > 0.8) {
          // Resize & Rehash the Hashtable: 
          this.resize();
        }
      
        const idx = hashStringToInt(key,this.table.length);
        if (this.table[idx]) {
            // In case the Hash index(idx) Already has some elements:
            this.table[idx].push([key, value]);
        } else {
            // In case the Hash index(idx) is empty Create new Entity:
            this.table[idx] = [[key, value]];
        }
    };
    
    // Check & Return, if any value is present for any particular Key:
    getItem = key => {
        const idx = hashStringToInt(key, this.table.length);
        if (!this.table[idx]) {
            // Incase the Hashed_Index(idx) has 0 elements:
            return "Not Present";
        }
        // Find the val for the current key:
        let found = false;
        let val;
        this.table[idx].forEach(function(x){
            if(x[0] === key){
                found = true,
                val = x[1]
            }
        })
        if(!found){
            // Incase the Hashed_Index(idx) has elements but Not for the current Key:
            return "Not Present";
        }
        return val;
    };
}
  
const myTable = new HashTable();

myTable.setItem(9876543210, "Person_1");
console.log(myTable.table.length);      //=> 3: (Size of Hash-Table after each Insertion)
myTable.setItem(9745632108, "Person_2");
console.log(myTable.table.length);      //=> 3
myTable.setItem(9765432180, "Person_3");
console.log(myTable.table.length);      //=> 6: (Resized & Rehashed automatically in case Loadfactor > 0.8)
myTable.setItem(9012365478, "Person_4");
console.log(myTable.table.length);      //=> 6
myTable.setItem(1593581237, "Person_5");
console.log(myTable.table.length);      //=> 12: (Resized & Rehashed automatically in case Loadfactor > 0.8)
myTable.setItem(4973381544, "Person_6");
console.log(myTable.table.length);      //=> 12
myTable.setItem(1354878784, "Person_7");
console.log(myTable.table.length);      //=> 12
myTable.setItem(0987854321, "Person_8");
console.log(myTable.table.length);      //=> 12
myTable.setItem(0981654321, "Person_9");
console.log(myTable.table.length);      //=> 12
myTable.setItem(0987654621, "Person_10");
console.log(myTable.table.length);      //=> 24: (Resized & Rehashed automatically in case Loadfactor > 0.8)

// Now Check if a paricular Phno. is Present or not?
console.log(myTable.getItem(9876543210));     
//=> Person_1
console.log(myTable.getItem(9745632108));
//=> Person_2
console.log(myTable.getItem(9765432180));
//=> Person_3
console.log(myTable.getItem(9012365478));
//=> Person_4
console.log(myTable.getItem(1593581237));
//=> Person_5
console.log(myTable.getItem(0987654621));
//=> Person_10

// Trying to access the value for a key whose hashed index is 
// not present and is empty in the Array(Hastable):
console.log(myTable.getItem(1111111111));
//=> Not Present

// Trying to access the value for a key whose hashed index is present but key doesn't match:
console.log(myTable.getItem(4973831544));
//=> Not Present