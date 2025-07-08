import db from "../../db/sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, amount } = body;

  if (!name || !amount) {
    throw createError({ statusCode: 400, statusMessage: "Missing fields" });
  }

  const statement = db.prepare(
    "INSERT INTO goals (name, amount) VALUES (?, ?)",
  );

  const info = statement.run(name, amount);

  return { id: info.lastInsertRowid, name, amount };
});
