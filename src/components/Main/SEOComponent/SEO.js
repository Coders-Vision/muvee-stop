import React, { useState } from "react";
import { Helmet } from "react-helmet";

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
  const [seoTags] = useState({
    seoTitle: title || "",
    seoDescription: description || "",
    seoKeywords: keywords || "",
    seoRobots: robots || "index,follow",
    seoRevist: revist || "1 days",
    seoAuthor:  "Abdullah Basha",
    seoOgTitle: ogTitle || "",
    seoOgDescription: ogDescription || "",
    seoOgType: ogType || "website",
    seoOgImage: ogImage || "",
    seoOgImageType: ogImageType || "image/jpeg",
    seoOgImageWidth: ogImageWidth || "650",
    seoOgImageHeight: ogImageHeight || "350",
  });

  return (
    <>
      <Helmet>
        <title>{seoTags.seoTitle} </title>
        <meta name="description" content={seoTags.seoDescription} />
        <meta name="keywords" content={seoTags.seoKeywords} />
        <meta name="robots" content={seoTags.seoRobots} />
        <meta name="revisit-after" content={seoTags.seoRevist} />
        <meta name="author" content={seoTags.seoAuthor} />
        <meta property="og:title" content={seoTags.seoOgTitle} />
        <meta property="og:description" content={seoTags.seoOgDescription} />
        <meta property="og:type" content={seoTags.seoOgType} />
        <meta property="og:image" content={seoTags.seoOgImage} />
        <meta property="og:image:type" content={seoTags.seoOgImageType} />
        <meta property="og:image:width" content={seoTags.seoOgImageWidth} />
        <meta property="og:image:height" content={seoTags.seoOgImageHeight} />
      </Helmet>
    </>
  );
}

export default SEO;
