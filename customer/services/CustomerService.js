class CustomerService {
    constructor(db) {
        this.client = db.sequelize; 
    }

    async getCustomersByPrefix(prefix) {
        try {
            const customers = await this.client.query(
                `SELECT 
                    CustomerID,
                    CompanyName, 
                    Title, 
                    FirstName, 
                    MiddleName,
                    LastName, 
                    EmailAddress, 
                    Phone,
                    ModifiedDate
                 FROM SalesLT.Customer
                 WHERE LastName LIKE :prefix
                 ORDER BY CustomerID ASC`,
                { 
                    replacements: { prefix: `${prefix}%` }, 
                    type: this.client.QueryTypes.SELECT
                }
            );
    
            return customers; 
    
        } catch (error) {
            console.error("Error fetching customers:", error);
            return [];
        }
    }
}

module.exports = CustomerService