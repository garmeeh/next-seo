import { JsonLdScript } from "~/core/JsonLdScript";
import type { JobPostingJsonLdProps } from "~/types/jobposting.types";
import {
  processHiringOrganization,
  processJobLocation,
  processMonetaryAmount,
  processJobPropertyValue,
  processApplicantLocationRequirements,
  processEducationRequirements,
  processExperienceRequirements,
} from "~/utils/processors";

export default function JobPostingJsonLd({
  scriptId,
  scriptKey,
  title,
  description,
  datePosted,
  hiringOrganization,
  jobLocation,
  url,
  validThrough,
  employmentType,
  identifier,
  baseSalary,
  applicantLocationRequirements,
  jobLocationType,
  directApply,
  educationRequirements,
  experienceRequirements,
  experienceInPlaceOfEducation,
}: JobPostingJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    hiringOrganization: processHiringOrganization(hiringOrganization),
    ...(jobLocation && {
      jobLocation: Array.isArray(jobLocation)
        ? jobLocation.map(processJobLocation)
        : processJobLocation(jobLocation),
    }),
    ...(url && { url }),
    ...(validThrough && { validThrough }),
    ...(employmentType && {
      employmentType: Array.isArray(employmentType)
        ? employmentType
        : employmentType,
    }),
    ...(identifier && {
      identifier: processJobPropertyValue(identifier),
    }),
    ...(baseSalary && {
      baseSalary: processMonetaryAmount(baseSalary),
    }),
    ...(applicantLocationRequirements && {
      applicantLocationRequirements: Array.isArray(
        applicantLocationRequirements,
      )
        ? applicantLocationRequirements.map(
            processApplicantLocationRequirements,
          )
        : processApplicantLocationRequirements(applicantLocationRequirements),
    }),
    ...(jobLocationType && { jobLocationType }),
    ...(directApply !== undefined && { directApply }),
    ...(educationRequirements && {
      educationRequirements: Array.isArray(educationRequirements)
        ? educationRequirements.map(processEducationRequirements)
        : processEducationRequirements(educationRequirements),
    }),
    ...(experienceRequirements && {
      experienceRequirements: processExperienceRequirements(
        experienceRequirements,
      ),
    }),
    ...(experienceInPlaceOfEducation !== undefined && {
      experienceInPlaceOfEducation,
    }),
  };

  return (
    <JsonLdScript
      data={data}
      id={scriptId}
      scriptKey={scriptKey || "jobposting-jsonld"}
    />
  );
}

export type { JobPostingJsonLdProps };
