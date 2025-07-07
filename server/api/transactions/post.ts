import db from "../../db/sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { topic, type, amount } = body;

  if (!topic || !type || !amount) {
    throw createError({ statusCode: 400, statusMessage: "Missing fields" });
  }
  if (!["income", "expense"].includes(type)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid type" });
  }

  const date = new Date().toISOString();
  const stmt = db.prepare(
    "INSERT INTO transactions (topic, type, amount, date) VALUES (?, ?, ?, ?)",
  );
  const info = stmt.run(topic, type, amount, date);

  return { id: info.lastInsertRowid, topic, type, amount, date };
});
