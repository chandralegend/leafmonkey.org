import Markdoc, { type Node } from "@markdoc/markdoc";
import React from "react";

/**
 * Renders a Keystatic `fields.markdoc` AST node (from a resolved entry's
 * `content()`) into React elements. Styling is provided by the `.prose`
 * class on the wrapping element in each page.
 */
export default function MarkdocContent({ node }: { node: Node }) {
  const renderable = Markdoc.transform(node);
  return <>{Markdoc.renderers.react(renderable, React)}</>;
}
