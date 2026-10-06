import { v } from "../../middlewares/validate.middleware.js";

export const CommunityIdParams = v.object({ community_id: v.id() });

export const CommunityInsertBody = v.object({
  community_name: v.required(v.text()),
  head_user:      v.text(),
});
