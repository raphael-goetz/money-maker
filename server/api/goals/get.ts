import db from "../../db/sqlite";

export default defineEventHandler(() => {
  const rows = db
    .prepare(
      `
    SELECT * FROM goals
    ORDER BY amount DESC
  `,
    )
    .all();

  return rows;
});
