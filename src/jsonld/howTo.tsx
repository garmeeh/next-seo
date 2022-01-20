import React from 'react';
import Head from 'next/head';

import markup from '../utils/markup';
import buildVideo from '../utils/buildVideo';
import { Video } from '../types';

interface ItemListElement {
  type: 'direction' | 'tip';
  text: string;
}

interface BaseStep {
  image?: string;
  name?: string;
  url?: string;
  video?: Video;
}

interface FullInstruction extends BaseStep {
  text: string;
}

interface SubStepList extends BaseStep {
  itemListElement: ItemListElement[];
}

export type Step = FullInstruction | SubStepList;

export interface MonetaryAmount {
  currency: string;
  value: number;
}

export interface HowToJsonLdProps {
  name: string;
  steps: Step[];
  estimatedCost?: string | MonetaryAmount;
  image?: string;
  supply?: string[];
  tool?: string[];
  totalTime?: string;
  video?: Video;
}

const isFullInstruction = (step: Step): step is FullInstruction =>
  !!(step as FullInstruction).text;

const buildItemListElements = (itemListElement: ItemListElement[]) =>
  itemListElement
    .map(
      ({ text, type }) => `{
    "@type": "${type === 'direction' ? 'HowToDirection' : 'HowToTip'}",
    "text": "${text}"
  }`,
    )
    .join(',');

const buildSteps = (steps: Step[]) => `
  ${steps.map(
    step => `{
      "@type": "HowToStep",
      ${step.image ? `"image": "${step.image}",` : ''}
      ${step.name ? `"name": "${step.name}",` : ''}
      ${step.url ? `"url": "${step.url}",` : ''}
      ${step.video ? `"video": ${buildVideo(step.video)},` : ''}
      ${
        isFullInstruction(step)
          ? `"text": "${step.text}"`
          : `"itemListElement": [${buildItemListElements(
              step.itemListElement,
            )}]`
      }
    }`,
  )}`;

const buildEstimatedCost = (estimatedCost: string | MonetaryAmount) => {
  if (typeof estimatedCost === 'string') {
    return `"estimatedCost": "${estimatedCost}"`;
  }

  return `"estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "${estimatedCost.currency}",
    "value": ${estimatedCost.value}
  }`;
};

const buildSupply = (supply: string[]) =>
  `"supply": [${supply.map(
    item => `{
    "@type": "HowToSupply",
    "name": "${item}"
  }`,
  )}]`;

const buildTool = (tool: string[]) =>
  `"tool": [${tool.map(
    item => `{
    "@type": "HowToTool",
    "name": "${item}"
  }`,
  )}]`;

const HowToJsonLd: React.FC<HowToJsonLdProps> = ({
  name,
  steps,
  image,
  estimatedCost,
  supply,
  tool,
  totalTime,
  video,
}) => {
  const jslonld = `{
    "@context": "https://schema.org/",
    "@type": "HowTo",
    "name": "${name}",
    ${image ? `"image": "${image}",` : ''}
    ${estimatedCost ? `${buildEstimatedCost(estimatedCost)},` : ''}
    ${supply ? `${buildSupply(supply)},` : ''}
    ${tool ? `${buildTool(tool)},` : ''}
    ${totalTime ? `"totalTime": "${totalTime}",` : ''}
    ${video ? `"video": ${buildVideo(video)},` : ''}
    "step": [${buildSteps(steps)}]
  }`;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={markup(jslonld)}
        key="jsonld-how-to"
      />
    </Head>
  );
};

export default HowToJsonLd;
