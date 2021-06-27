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
}) {
  const ogImagePath = `${window.location.origin}/${ogImageDefault.replace(
    /^\/|\/$/g,
    ""
  )}`;

  return (
    <>
      <Helmet>
        <title>{title || ""} </title>
        <meta name="description" content={description || ""} />
        <meta name="keywords" content={keywords || ""} />
        <meta name="robots" content={robots || "index,follow"} />
        <meta name="revisit-after" content={revist || "1 days"} />
        <meta name="author" content={"Abdullah Basha"} />
        <meta property="og:title" content={ogTitle || ""} />
        <meta property="og:description" content={ogDescription || ""} />
        <meta property="og:type" content={ogType || "website"} />
        <meta property="og:image" content={ogImage || ogImagePath} />
        <meta property="og:image:type" content={ogImageType || "image/jpeg"} />
        <meta property="og:image:width" content={ogImageWidth || "650"} />
        <meta property="og:image:height" content={ogImageHeight || "350"} />
      </Helmet>
    </>
  );
}

export default SEO;
