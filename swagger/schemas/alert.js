// schema ของ alert และ community

export const examples = {
  AlertInput: {
    alert_type: "พืช",
    alert_enddate: "2025-12-31",
    detail: "พบเพลี้ยกระโดดในนาข้าว",
    announcement: 0,
    response_to: [1, 2, 6],
  },
  CommunityInput: {
    $community_name: "ชุมชนบ้านดอน",
    head_user: "username_หัวหน้า",
  },
};

export const schemas = {
  AlertInputForm: {
    type: "object",
    properties: {
      file:          { type: "string", format: "binary", description: "รูปภาพ (ไม่บังคับ)" },
      alert_type:    { type: "string", example: "พืช" },
      alert_enddate: { type: "string", example: "2025-12-31" },
      detail:        { type: "string" },
      announcement:  { type: "integer", enum: [0, 1] },
      response_to:   { type: "string", example: "[1,2,6]" },
    },
  },
};
