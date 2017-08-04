import { buildContext } from "graphql-api";

const context = buildContext();

(async () => {
  const users = await context.users.all();

  console.log(`${users.length} users found:`);
  for (let user of users) {
    console.log("  ", user.name);
  }

  process.exit(0);
})();
