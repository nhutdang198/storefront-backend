// product.spec.ts
import Product from "../../../src/models/products"; // Import the Product class

describe("Product Class", () => {
  // Initialize any test data or setup needed for your tests

  // Test case for creating a product
  it("should create a product", async () => {
    const productId = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    expect(productId).toBeDefined(); // Expect a valid product ID to be returned
  });

  // Test case for getting a product by ID
  it("should get a product by ID", async () => {
    const product = await Product.getProductById(1); // Replace 1 with a valid product ID
    expect(product).toBeDefined(); // Expect a product object to be returned
  });

  // Test case for getting the top 5 popular products
  it("should get the top 5 popular products", async () => {
    const popularProducts = await Product.getTopPopularProducts();
    expect(popularProducts.length).toBeGreaterThan(0); // Expect at least one popular product
  });

  // Test case for getting products by category
  it("should get products by category", async () => {
    await Product.createProduct("Test Product", 10.99, "Test Category");
    const products = await Product.getProductsByCategory("Test Category"); // Replace with a valid category name
    expect(products.length).toBeGreaterThan(0); // Expect at least one product in the category
  });

  // Test case for getting all products
  it("should get all products", async () => {
    await Product.createProduct("Test Product", 10.99, "Test Category");
    const products = await Product.getAllProducts();
    expect(products.length).toBeGreaterThan(0); // Expect at least one product
  });

  // Test case for updating a product
  it("should update a product", async () => {
    const updatedProductData = {
      name: "Updated Product Name",
      price: 19.99,
      category: "Updated Category",
    };
    const result = await Product.updateProduct(1, updatedProductData); // Replace 1 with a valid product ID
    expect(result).toBeDefined(); // Expect a result from the update query
  });

  // Test case for deleting a product
  it("should delete a product", async () => {
    const result = await Product.deleteProduct(1); // Replace 1 with a valid product ID
    expect(result).toBeDefined(); // Expect a result from the delete query
  });
});
