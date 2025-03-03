"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicById = void 0;
const asyncHandler_1 = require("../../middleware/asyncHandler");
const prismaClient_1 = require("../../prisma/prismaClient");
const AppError_1 = require("../../utils/errors/AppError");
const subscription_1 = require("../../utils/subscription");
exports.getTopicById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const topic = yield prismaClient_1.prisma.topic.findUnique({
        where: { id },
        include: {
            folder: true,
            lessons: {
                select: {
                    id: true,
                    name: true,
                    about: true,
                    description: true,
                    orderNumber: true,
                    views: true,
                    isSubscriptionRequired: true,
                    createdAt: true,
                    updatedAt: true,
                    type: true,
                },
                orderBy: {
                    orderNumber: "asc",
                },
            },
        },
    });
    if (!topic) {
        throw new AppError_1.NotFoundError("Topic not found");
    }
    const isHavePermission = (0, subscription_1.hasActiveSubscription)(req, topic.type);
    res.json({
        topic: topic,
        isHavePermission: isHavePermission,
    });
}));
