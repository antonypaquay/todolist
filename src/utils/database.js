export default class Database {

  static async readAll() {
    try {
      if (localStorage.getItem('tasks')) {
        let data = localStorage.getItem('tasks');
        return JSON.parse(data);
      }
      return [];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  static async update(data) {
    try {
      await localStorage.setItem('tasks', JSON.stringify(data));
    } catch {
      throw new Error('Cannot update the localStorage');
    }
  }
}