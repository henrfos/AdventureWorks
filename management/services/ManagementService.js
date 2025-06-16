class ManagementService {
    constructor(db) {
        this.client = db.sequelize;
    }

    async getCategoriesWithoutParent() {
        return this.client.query(
            `SELECT DISTINCT Name 
             FROM SalesLT.ProductCategory 
             WHERE ParentProductCategoryID IS NULL 
             ORDER BY Name ASC`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getAveragePriceByCategory() {
        return this.client.query(
            `SELECT PC.Name AS Name, 
                    ROUND(AVG(P.ListPrice), 4) AS Price
             FROM SalesLT.Product AS P
             JOIN SalesLT.ProductCategory AS PC 
             ON P.ProductCategoryID = PC.ProductCategoryID
             GROUP BY PC.Name
             ORDER BY Price DESC`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getAveragePriceByParentCategory() {
        return this.client.query(
            `SELECT PPC.Name AS Name, 
                    ROUND(AVG(P.ListPrice), 2) AS Price
             FROM SalesLT.Product AS P
             JOIN SalesLT.ProductCategory AS PC 
             ON P.ProductCategoryID = PC.ProductCategoryID
             JOIN SalesLT.ProductCategory AS PPC 
             ON PC.ParentProductCategoryID = PPC.ProductCategoryID
             GROUP BY PPC.Name
             ORDER BY Price ASC`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getTotalCustomersWithOrders() {
        return this.client.query(
            `SELECT COUNT(DISTINCT CustomerID) AS Total
             FROM SalesLT.SalesOrderHeader
             WHERE OrderDate BETWEEN '2008-06-01' AND '2008-06-15'`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getCustomersWithSpecificNames() {
        return this.client.query(
            `SELECT CustomerID, FirstName, LastName 
             FROM SalesLT.Customer
             WHERE FirstName LIKE 'A%'
             INTERSECT
             SELECT CustomerID, FirstName, LastName 
             FROM SalesLT.Customer
             WHERE LastName LIKE '%E';`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getCustomerDataForExport() {
        return this.client.query(
            `SELECT 
                C.CustomerID,
                C.Title,
                C.FirstName,
                C.MiddleName,
                C.LastName,
                C.CompanyName,
                A.City,
                A.CountryRegion,
                A.StateProvince
            FROM SalesLT.CustomerAddress CA
            JOIN SalesLT.Customer C ON CA.CustomerID = C.CustomerID
            JOIN SalesLT.Address A ON CA.AddressID = A.AddressID;`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getProductDataForExport() {
        return this.client.query(
            `SELECT 
                P.ProductID,
                P.ProductNumber,
                TRIM(
                    REPLACE(
                        REPLACE(
                            REPLACE(
                                REPLACE(
                                    REPLACE(
                                        LEFT(P.Name, 
                                            CASE 
                                                WHEN CHARINDEX(',', P.Name) > 0 THEN CHARINDEX(',', P.Name) - 1
                                                WHEN CHARINDEX('-', P.Name) > 0 THEN CHARINDEX('-', P.Name) - 1
                                                ELSE LEN(P.Name)
                                            END
                                        ),
                                        ' Black', ''), 
                                    ' Red', ''),   
                                ' Yellow', '' ), 
                            ' Blue', '' ), 
                        ' Silver', '' )
                ) AS Name,
                P.Color
            FROM SalesLT.Product P
            WHERE P.Color IS NOT NULL AND P.Color <> '';`,
            { type: this.client.QueryTypes.SELECT }
        );
    }

    async getSalesOrderData() {
        return this.client.query(
            `SELECT 
                SOD.SalesOrderID,
                P.Name,
                SOD.ProductID,
                SOD.UnitPrice,
                SOD.OrderQty,
                SOD.LineTotal
            FROM SalesLT.SalesOrderDetail SOD
            JOIN SalesLT.Product P ON SOD.ProductID = P.ProductID;`,
            { type: this.client.QueryTypes.SELECT }
        );
    }
}

module.exports = ManagementService;