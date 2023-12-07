import Image from "next/image";
import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

interface Asset {
  sys: {
    id: string;
  };
  url: string;
  description: string;
}

interface AssetLink {
  block: Asset[];
}

interface Content {
  json: any;
  links: {
    assets: AssetLink;
  };
}

function RichTextAsset({
  id,
  assets,
}: {
  id: string;
  assets: Asset[] | undefined;
}) {
  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.description} />;
  }

  return null;
}

export function Markdown({ content }: { content: Content }) {
  const options: Options = {
    renderText: (text) =>
      // Change newlines to <br /> tags
      text.split("\n").flatMap((text, i) => [i > 0 && <br />, text]),
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links.assets.block}
        />
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="list-disc list-outside ml-5">{children}</ul>
      ),
      [BLOCKS.HR]: () => (
        <hr className="border-0 border-t-2 border-green my-3" />
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="mb-3">{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="my-8">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="my-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className=" my-3">{children}</h3>
      ),
    },
  };

  return documentToReactComponents(content.json, options);
}
