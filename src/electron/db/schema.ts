import db from './db.js'

export async function createSchema() {
    try {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS folders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          parent INTEGER,
          FOREIGN KEY (parent) REFERENCES folders(id) ON DELETE CASCADE
        );
      `);
  
      await db.execute(`
        CREATE TABLE IF NOT EXISTS files (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          parent INTEGER,
          data TEXT,
          FOREIGN KEY (parent) REFERENCES folders(id) ON DELETE CASCADE
        );
      `);
  
      console.log('Tables created successfully.');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }