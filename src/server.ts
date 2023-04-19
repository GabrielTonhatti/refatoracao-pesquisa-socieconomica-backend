import app from "./App";
import logger from "./config/logger";

app.listen(process.env.PORT || 3333, (): void =>
  logger.info("Server started on port 3333")
);
