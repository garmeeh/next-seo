import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JsonLdScript } from "./JsonLdScript";

describe("JsonLdScript", () => {
  const testData = {
    "@context": "https://schema.org",
    "@type": "Thing",
    name: "Test Thing",
    description: "This is a test description.",
  };
  const scriptKey = "test-jsonld-thing";
  const scriptId = "jsonld-thing-script";

  it('should render a script tag with type "application/ld+json"', () => {
    render(
      <JsonLdScript data={testData} scriptKey={scriptKey} id={scriptId} />,
    );
    const scriptElement = screen.getByTestId(scriptId);
    expect(scriptElement.tagName).toBe("SCRIPT");
    expect(scriptElement).toHaveAttribute("type", "application/ld+json");
  });

  it("should correctly stringify the data prop into the script content", () => {
    render(
      <JsonLdScript data={testData} scriptKey={scriptKey} id={scriptId} />,
    );
    const scriptElement = screen.getByTestId(scriptId);
    // Note: Vitest/JSDOM might not execute the script, so we check innerHTML.
    // The actual JSON.stringify in the component will handle escaping.
    expect(scriptElement.innerHTML).toBe(JSON.stringify(testData));
  });

  it("should use the provided id as the script tag id and data-testid", () => {
    render(
      <JsonLdScript data={testData} scriptKey={scriptKey} id={scriptId} />,
    );
    const scriptElement = screen.getByTestId(scriptId);
    expect(scriptElement).toHaveAttribute("id", scriptId);
  });

  it("should use the scriptKey for the React key (not directly testable in output, but good practice)", () => {
    // This test is more about ensuring the prop is passed.
    // React keys are for React's internal reconciliation and don't appear in the DOM.
    // We can't directly assert the key, but we can ensure the component renders.
    const { container } = render(
      <JsonLdScript data={testData} scriptKey={scriptKey} id={scriptId} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should return null if no data is provided", () => {
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <JsonLdScript data={null as any} scriptKey={scriptKey} id={scriptId} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render an empty script if data is an empty object (though practically this might be filtered)", () => {
    // Depending on future logic, an empty object might also result in null.
    // For the current stub, it will render.
    const emptyData = {};
    render(
      <JsonLdScript data={emptyData} scriptKey={scriptKey} id={scriptId} />,
    );
    const scriptElement = screen.getByTestId(scriptId);
    expect(scriptElement.innerHTML).toBe(JSON.stringify(emptyData));
  });
});
