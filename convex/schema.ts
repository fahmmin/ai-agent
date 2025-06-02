import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  videos: defineTable({
    videoId: v.string(),
    userId: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_videoId", ["videoId"])
    .index("by_user_videoId", ["userId", "videoId"]),


transcript: defineTable({
    videoId: v.string(),
    userId: v.string(),
    transcript: v.array(v.object({
        text: v.string(),
        timestamp: v.number(),
    })),
})
    .index("by_user", ["userId"])
    .index("by_videoId", ["videoId"])
    .index("by_user_videoId", ["userId", "videoId"]),


images: defineTable({
    storageId: v.string(),
    userId: v.string(),
    videoId: v.string(),
    createdAt: v.number(),
})
    .index("by_user", ["userId"])
    .index("by_videoId", ["videoId"])
    .index("by_user_videoId", ["userId", "videoId"]),


titles: defineTable({
    videoId: v.string(),
    userId: v.string(),
    title: v.string(),
})
    .index("by_user", ["userId"])
    .index("by_videoId", ["videoId"])
    .index("by_user_videoId", ["userId", "videoId"]),
});