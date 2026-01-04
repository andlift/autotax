import Script from 'next/script';

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Component to render JSON-LD structured data
 * Rendered server-side for SEO
 */
export default function JsonLd({ data }: JsonLdProps) {
  const jsonLdString = JSON.stringify(
    Array.isArray(data) ? data : data,
    null,
    0
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString }}
    />
  );
}

/**
 * Wrapper for multiple JSON-LD schemas
 */
export function JsonLdMultiple({ schemas }: { schemas: Array<Record<string, unknown>> }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
