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
    if (!user.role) throw new Error("pls provide a user role");
    this.#user = user;
  }

  #getDatabase() {
    if (!this.#database) {
      this.#database = new Database();
      console.log("database instance created");
    }
    return this.#database;
  }

  #checkPermission(operation) {
    const allowed = permissions[this.#user.role] ?? [];
    if (!allowed.includes(operation)) {
      throw new Error(
        `user don't have access becasue role:"${this.#user.role}" cannot perform "${operation}"`,
      );
    }
  }

  readData() {
    this.#checkPermission("readData");
    this.#getDatabase().readData();
  }

  insertData() {
    this.#checkPermission("insertData");
    this.#getDatabase().insertData();
  }

  deleteData() {
    this.#checkPermission("deleteData");
    this.#getDatabase().deleteData();
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
