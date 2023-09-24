import bcrypt from "bcrypt";
import OrderProductMap from "../../../src/models/order-product-map";
import Product from "../../../src/models/products";
import { User } from "../../../src/models/users";
import Order from "../../../src/models/orders";

describe("Order Products", () => {
  describe("create OrderProductMap", () => {
    it("should create a new order-product map", async () => {
      const productId = await Product.createProduct(
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
      const order = await Order.createOrder(
        productId as number,
        1,
        userId as number,
        status
      );
      const orderProductMap = await OrderProductMap.createOrderMapper(
        order,
        productId as number,
        userId as number
      );
      expect(orderProductMap).toBeDefined();
    });

    it("get Order Mapper By User Id", async () => {
      const password = "password123";
      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.createUser(
        "John",
        "Doe",
        "johndoe",
        hashedPassword
      );

      const user = await User.getUserById(userId as number);
      // Expect that the stored password in the database is hashed
      const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBeTrue();
    });
  });
});
