// server/api/transactions/get.ts
import db from "../../db/sqlite";

export default defineEventHandler(() => {
  const rows = db
    .prepare(
      `
    SELECT * FROM transactions
    WHERE strftime('%Y-%m', date) = strftime('%Y-%m', 'now')
    ORDER BY date DESC
  `,
    )
    .all();

  return rows;
});
