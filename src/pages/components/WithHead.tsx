import React from "react";
import Head from "next/head";
import type { BuildTagsParams } from "../types";
import buildTags from "../core/buildTags";

export const WithHead: React.FC<BuildTagsParams> = (props) => {
  return <Head>{buildTags(props)}</Head>;
};
