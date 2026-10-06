import { v } from "../../middlewares/validate.middleware.js";

export const PlangIdParams    = v.object({ plang_id:   v.id() });
export const PictureIdParams  = v.object({ picture_id: v.id() });
export const WidParams        = v.object({ wid:        v.id() });

const plangFields = {
  plang_name:         v.text(),
  plang_address_code: v.text(),
  lat_long:           v.any(),
  center:             v.any(),
  msquare:            v.number(),
  rai:                v.number(),
  ngan:               v.number(),
  wa:                 v.number(),
  moo:                v.text(),
  village:            v.text(),
  road:               v.text(),
  subdistrict:        v.text(),
  district:           v.text(),
  province:           v.text(),
  title_deed:         v.text(),
  own_type:           v.text(),
  detail:             v.text(),
};

export const PlangBody = v.object(plangFields);

export const PlangSearchQuery = v.object({
  search_username:  v.text(),
  search_plang_id:  v.id().optional(),
});

export const WaterSupplyBody = v.object({
  supply_type:  v.text(),
  width:        v.number(),
  depth:        v.number(),
  water_depth:  v.number(),
  detail:       v.text(),
});

export const WaterSourceBody = v.object({
  source_type:  v.text(),
  source_name:  v.text(),
  width:        v.number(),
  depth:        v.number(),
  water_depth:  v.number(),
  detail:       v.text(),
});

export const SoilMeterBody = v.object({
  soil:   v.number(),
  t:      v.number(),
  ph:     v.number(),
  ec:     v.number(),
  n:      v.number(),
  p:      v.number(),
  k:      v.number(),
  detail: v.text(),
});

export const PictureQuery = v.object({ detail: v.text() });
