const Database = require('./Database');

class Department extends Database{
    constructor(name) {
        super();
        this.name = name; 
    }
        
  
}

module.exports = Department; 