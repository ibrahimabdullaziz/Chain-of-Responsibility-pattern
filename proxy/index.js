class Database {
  readData() {
    console.log("read");
  }
  insertData() {
    console.log("inserted");
  }
  deleteData() {
    console.log("deleted");
  }
}

const permissions = {
  guest: ["readData"],
  user: ["readData", "insertData"],
  admin: ["readData", "insertData", "deleteData"],
};

class DatabaseProxy {
  #database = null;
  #user;

  constructor(user) {
    if (!user.role) throw new Error("A valid user with a role is required.");
    this.#user = user;
  }

  // Lazy initialisation — real subject created only on first authorised access
  #getRealDatabase() {
    if (!this.#database) {
      this.#database = new Database();
      console.log("[Proxy] Real Database instance created.");
    }
    return this.#database;
  }

  #checkPermission(operation) {
    const allowed = permissions[this.#user.role] ?? [];
    if (!allowed.includes(operation)) {
      throw new Error(
        `Access Denied: role "${this.#user.role}" cannot perform "${operation}".`,
      );
    }
  }

  readData() {
    this.#checkPermission("readData");
    this.#getRealDatabase().readData();
  }

  insertData() {
    this.#checkPermission("insertData");
    this.#getRealDatabase().insertData();
  }

  deleteData() {
    this.#checkPermission("deleteData");
    this.#getRealDatabase().deleteData();
  }
}

const adminProxy = new DatabaseProxy({ role: "admin" });
const userProxy = new DatabaseProxy({ role: "user" });
const guestProxy = new DatabaseProxy({ role: "guest" });

adminProxy.readData();
adminProxy.insertData();
adminProxy.deleteData();

userProxy.readData();
userProxy.insertData();
try {
  userProxy.deleteData();
} catch (e) {
  console.error(e.message);
}

guestProxy.readData();
try {
  guestProxy.insertData();
} catch (e) {
  console.error(e.message);
}
