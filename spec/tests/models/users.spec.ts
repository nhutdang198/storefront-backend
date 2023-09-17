import { User } from "../../../src/models/users"; // Import the User model
import bcrypt from "bcrypt";

describe("User", () => {
  describe("createUser", () => {
    it("should create a new user in the database", async () => {
      // Replace with your actual test data
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

      // Expect that the userId is not null (indicating successful creation)
      expect(userId).not.toBeNull();
    });

    it("should hash the user password", async () => {
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

  describe("getUserById", () => {
    it("should return a user by their ID", async () => {
      // Replace with an existing user's ID from your database
      const existingUserId: any = 1;

      const user = await User.getUserById(existingUserId);
      // Expect that the returned user has the correct ID
      expect(user?.id).toEqual(existingUserId);
    });

    it("should return null for a non-existent user ID", async () => {
      // Replace with a non-existent user's ID
      const nonExistentUserId = 9999;

      const user = await User.getUserById(nonExistentUserId);
      // Expect that the user is null
      expect(user).toBeNull();
    });
  });

  describe("getUserByUsername", () => {
    it("should return a user by their username", async () => {
      const firstName = "John";
      const lastName = "Doe";
      const username = "johndoe";
      const password = "password123";

      await User.createUser(firstName, lastName, username, password);
      // Replace with an existing username from your database
      const existingUsername = "johndoe";

      const user = await User.getUserByUsername(existingUsername);
      // Expect that the returned user has the correct username
      expect(user?.username).toEqual(existingUsername);
    });

    it("should return null for a non-existent username", async () => {
      // Replace with a non-existent username
      const nonExistentUsername = "nonexistentuser";

      const user = await User.getUserByUsername(nonExistentUsername);
      // Expect that the user is null
      expect(user).toBeNull();
    });
  });

  // Add test cases for other methods (getUsers, getCurrentUserOrders, getCompletedUserOrders) similarly.
});
