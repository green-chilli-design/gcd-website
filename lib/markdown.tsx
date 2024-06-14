import { Maybe } from "@/gql/codegen/graphql";
import {
  Options,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import ContentfulMedia from "./contentful-media";

type Content = {
  json: any;
  links: {
    assets: {
      block?: Array<Maybe<Asset>>;
    };
  };
};

type Asset = {
  url?: Maybe<string>;
  sys: {
    id: string;
  };
  description?: Maybe<string>;
  width?: Maybe<number>;
  height?: Maybe<number>;
};

function RichTextAsset({ id, assets }: { id: string; assets: Maybe<Asset>[] }) {
  const asset = assets?.find((asset) => asset?.sys.id === id);

  if (asset?.url) {
    return (
      <ContentfulMedia
        src={asset.url}
        alt={asset.description}
        imageProps={{
          width: asset.width || undefined,
          height: asset.height || undefined,
          className: "rounded-br-[30px] rounded-tl-[30px] w-full my-12",
        }}
      />
    );
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
          assets={content?.links.assets.block || []}
        />
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="ml-5 list-outside list-disc">{children}</ul>
      ),
      [BLOCKS.HR]: () => (
        <hr className="my-3 border-0 border-t-2 border-green" />
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
