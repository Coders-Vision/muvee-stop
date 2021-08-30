import React from "react";
import { Helmet } from "react-helmet";
import ogImageDefault from "../../Main/og-image.png";

function SEO({
  title,
  description,
  keywords,
  robots,
  revist,
  ogTitle,
  ogDescription,
  ogType,
  ogImage,
  ogImageType,
  ogImageWidth,
  ogImageHeight,
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  const ogImagePath = `${window.location.origin}/${ogImageDefault.replace(
    /^\/|\/$/g,
    ""
  )}`;

  return (
    <>
      <Helmet>
        <title>{title || ""} </title>
        <meta name="title" content={title || ""} />
        <meta name="description" content={description || ""} />
        <meta name="keywords" content={keywords || ""} />
        <meta name="robots" content={robots || "index,follow"} />
        <meta name="revisit-after" content={revist || "1 days"} />
        <meta name="author" content={"Abdullah Basha"} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType || "website"} />
        <meta property="og:url" content="https://muvee-stop.netlify.app/" />
        <meta property="og:title" content={ogTitle || ""} />
        <meta property="og:description" content={ogDescription || ""} />
        <meta property="og:image" content={ogImage || ogImagePath} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="650" />
        <meta property="og:image:height" content="350" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://muvee-stop.netlify.app/"
        />
        <meta property="twitter:title" content={twitterTitle || ""} />
        <meta
          property="twitter:description"
          content={twitterDescription || ""}
        />
        <meta property="twitter:image" content={twitterImage || ""} />
      </Helmet>
    </>
  );
}

export default SEO;
