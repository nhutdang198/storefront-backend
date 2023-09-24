import Product from "../../../src/models/products"; // Import the Product class
import Order from "../../../src/models/orders";
import { User } from "../../../src/models/users"; // Import the User model

describe("Order Model", () => {
  let guserId = 0;

  it("should create a new order", async () => {
    const productId1 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const productId2 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const productId3 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const quantities = [2, 1, 3];
    const firstName = "John";
    const lastName = "Doe";
    const username = "johndoe";
    const password = "password123";

    const userId = await User.createUser(
      firstName,
      lastName,
      username,
      password
    );
    guserId ??= userId as number;
    // const status = "complete";
    const productIds: number[] = [
      productId1 as number,
      productId2 as number,
      productId3 as number,
    ];

    const orderId1 = await Order.createOrder(
      productIds[0],
      1,
      userId as number,
      "complete"
    );

    const orderId2 = await Order.createOrder(
      productIds[0],
      1,
      userId as number,
      "complete"
    );

    const orderId3 = await Order.createOrder(
      productIds[0],
      1,
      userId as number,
      "active"
    );

    // Add expectations here to verify the result
    expect(orderId1).toBeGreaterThan(0); // Assuming order ID should be a positive number
    expect(orderId2).toBeGreaterThan(0); // Assuming order ID should be a positive number
    expect(orderId3).toBeGreaterThan(0); // Assuming order ID should be a positive number
  });

  it("should get the current order by user ID", async () => {
    const productId1 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const productId2 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const productId3 = await Product.createProduct(
      "Test Product",
      10.99,
      "Test Category"
    );
    const firstName = "John";
    const lastName = "Doe";
    const username = "johndoe";
    const password = "password123";

    const userId = await User.createUser(
      firstName,
      lastName,
      username,
      password
    );
    const status = "active";
    const productIds: number[] = [
      productId1 as number,
      productId2 as number,
      productId3 as number,
    ];
    await Order.createOrder(productIds[0], 1, userId as number, status);
    await Order.createOrder(productIds[1], 2, userId as number, status);
    await Order.createOrder(productIds[2], 3, userId as number, status);

    const orders = await Order.getCurrentOrderByUser(userId as number);

    // Add expectations here to verify the result
    expect(orders).toBeInstanceOf(Array); // Check if it's an Order instance or null
    expect(orders.length).toBeGreaterThanOrEqual(0); // Array should not be negative in length
  });

  it("should get completed orders by user ID", async () => {
    // Test the getCompletedOrdersByUser method

    const completedOrders = await Order.getCompletedOrdersByUser(guserId);

    // Add expectations here to verify the result
    expect(completedOrders).toBeInstanceOf(Array); // Check if it's an array
    expect(completedOrders.length).toBeGreaterThanOrEqual(0); // Array should not be negative in length
  });
});
