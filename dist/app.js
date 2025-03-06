"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parseInitData_1 = require("./middleware/parseInitData");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const folder_routes_1 = __importDefault(require("./routes/folder.routes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const lesson_routes_1 = __importDefault(require("./routes/lesson.routes"));
const topic_routes_1 = __importDefault(require("./routes/topic.routes"));
const subscription_routes_1 = __importDefault(require("./routes/subscription.routes"));
require("express-async-errors");
const checkExpiredSubscriptions_1 = require("./middleware/checkExpiredSubscriptions");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const cors_1 = __importDefault(require("cors"));
const cors_config_1 = require("./config/cors.config");
const statistics_routes_1 = __importDefault(require("./routes/statistics.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.use(express_1.default.json());
app.use(parseInitData_1.parseInitDataMiddleware);
app.use("/auth", auth_routes_1.default);
app.use(authMiddleware_1.authMiddleware);
app.use(checkExpiredSubscriptions_1.checkExpiredSubscriptions);
app.use("/folders", folder_routes_1.default);
app.use("/topics", topic_routes_1.default);
app.use("/lessons", lesson_routes_1.default);
app.use("/subscriptions", subscription_routes_1.default);
app.use("/statistics", statistics_routes_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
