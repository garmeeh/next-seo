import React from "react";
import type { BuildTagsParams } from "../types";
import buildTags from "../core/buildTags";

export const WithHead: React.FC<BuildTagsParams> = (props) => {
  return <>{buildTags(props)}</>;
};
