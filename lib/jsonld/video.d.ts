import { FC } from 'react';
import { Video } from '../types';
export interface VideoJsonLdProps extends Video {
  keyOverride?: string;
}
declare const VideoJsonLd: FC<VideoJsonLdProps>;
export default VideoJsonLd;
