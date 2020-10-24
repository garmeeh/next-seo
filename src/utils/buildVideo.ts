import { BroadcastEvent, Clip, Video } from '../types';
import formatIfArray from './formatIfArray';

export default (video: Video, context: boolean = false) => `{
      ${context ? `"@context": "https://schema.org",` : ``}
      "@type": "VideoObject",
      "name": "${video.name}",
      "description": "${video.description}",
      "thumbnailUrl": [
          ${video.thumbnailUrls.map(thumbnailUrl => `"${thumbnailUrl}"`).join(',')}
        ],
        ${video.contentUrl ? `"contentUrl": "${video.contentUrl}",` : ``}
        ${video.duration ? `"duration": "${video.duration}",` : ``}
        ${video.embedUrl ? `"embedUrl": "${video.embedUrl}",` : ``}
        ${video.expires ? `"expires": "${video.expires}",` : ``}        
        ${video.
          hasPart
            ? `"hasPart": ${
                Array.isArray(video.hasPart)
                  ? `[${video.hasPart.map(clip => `${buildClip(clip)}`)}]`
                  : buildClip(video.hasPart)
              },`
            : ''
        }
        ${video.watchCount ? `${buildInteractionStatistic(video.watchCount)}` : ``}        
        ${video.
          publication
            ? `"publication": ${
                Array.isArray(video.publication)
                  ? `[${video.publication.map(broadcastEvent => `${buildBroadcastEvent(broadcastEvent)}`)}]`
                  : buildBroadcastEvent(video.publication)
              },`
            : ''
        }
        ${
          video.regionsAllowed
            ? `"regionsAllowed": ${formatIfArray(video.regionsAllowed)},`
            : ''
        }
        "uploadDate": "${video.uploadDate}"
  }`;

  const buildClip = (clip: Clip) => `
  "geo": {
    "@type": "Clip",
    "name": "${clip.name}",
    "startOffset": ${clip.startOffset},
    "url": "${clip.url}",
  },
`;

const buildInteractionStatistic = (watchCount: number) => `
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "https://schema.org/WatchAction" },
    "userInteractionCount": ${watchCount}
  },
`;

const buildBroadcastEvent = (publication: BroadcastEvent) => `
  "publication": {
    "@type": "BroadcastEvent",
    "name": "${publication.name}",
    "isLiveBroadcast": ${publication.isLiveBroadcast},
    "startDate": "${publication.startDate}",
    "endDate": "${publication.endDate}"
  },
`;
