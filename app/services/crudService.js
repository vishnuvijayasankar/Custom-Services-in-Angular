// 2. CRUD service
recordCtrlApp.service('CRUDService', function(StyleService) {
    this.Adds = function (records) {
        // Do nothing if no state is entered (blank)
        if (!records.newState)
            return;
        // Add to main records
        records.push({
            state: records.newState,
            price: records.newPrice,
            tax: records.newTax,
            include: false
        });
        // one service called inside another
        StyleService.footerStyle();
    }
    // Delete data
    this.Deletes = function (records,index,history) {
        // Remove first / oldest element from history if it reaches maximum capacity of 10 records
        if (history.length === 10)
            history.shift();
        // Add deleted record to historical records
        history.push(records[index]);
        // Remove from main records (using index)
        records.splice(index, 1);
    };
    this.Undos = function (records,history) {
            // Add last / most recent historical record to the main records
            records.push(history[history.length - 1 ]);
            // Remove last / most recent historical record
            history.pop();
    }
    this.Edits = function (that,records,index,history) {
            records.newState = that.record.state;
            records.newPrice = that.record.price;
            records.newTax = that.record.tax; 
    }
    this.Updates = function (key,records) {
            records[key].state = records.newState;
            records[key].price = records.newPrice;
            records[key].tax = records.newTax;
    }
});