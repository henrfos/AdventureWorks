class ProductService {
    constructor(db) {
        this.client = db.sequelize;
    }

    async getProductById(id) {
        try {
            const [result] = await this.client.query(
                `SELECT 
                    p.ProductID, 
                    p.Name AS ProductName, 
                    pm.Name AS ProductModel,
                    pc.Name AS ProductCategory,
                    p.Color, 
                    p.Size, 
                    p.Weight, 
                    p.ListPrice, 
                    FORMAT(p.SellStartDate, 'dd/MM/yyyy') AS SellStartDate
                FROM SalesLT.Product p
                LEFT JOIN SalesLT.ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
                LEFT JOIN SalesLT.ProductModel pm ON p.ProductModelID = pm.ProductModelID
                WHERE p.ProductID = :id`,
                { replacements: { id }, type: this.client.QueryTypes.SELECT }
            );

            return result || null;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw new Error("Database error");
        }
    }
}

module.exports = ProductService;