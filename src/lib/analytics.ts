/**
 * Analytics placeholders.
 *
 * Set these in your environment to activate. Leave empty to keep the site
 * script-free (best for Core Web Vitals during development):
 *   VITE_GA4_ID          e.g. G-XXXXXXXXXX      (Google Analytics 4)
 *   VITE_GTM_ID          e.g. GTM-XXXXXXX       (Google Tag Manager)
 *   VITE_META_PIXEL_ID   e.g. 1234567890        (Meta Pixel)
 *   VITE_CLARITY_ID      e.g. abcdefghij        (Microsoft Clarity)
 *   VITE_GSC_VERIFICATION                       (Google Search Console)
 */
const env = import.meta.env as Record<string, string | undefined>;

export const analytics = {
  ga4Id: env.VITE_GA4_ID ?? "",
  gtmId: env.VITE_GTM_ID ?? "",
  metaPixelId: env.VITE_META_PIXEL_ID ?? "",
  clarityId: env.VITE_CLARITY_ID ?? "",
  searchConsoleVerification: env.VITE_GSC_VERIFICATION ?? "",
};

export function analyticsHeadScripts() {
  const scripts: Array<{ src?: string; async?: boolean; children?: string }> = [];

  if (analytics.gtmId) {
    scripts.push({
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analytics.gtmId}');`,
    });
  }

  if (analytics.ga4Id) {
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${analytics.ga4Id}`,
      async: true,
    });
    scripts.push({
      children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analytics.ga4Id}');`,
    });
  }

  if (analytics.metaPixelId) {
    scripts.push({
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${analytics.metaPixelId}');fbq('track','PageView');`,
    });
  }

  if (analytics.clarityId) {
    scripts.push({
      children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${analytics.clarityId}");`,
    });
  }

  return scripts;
}

export function analyticsMeta() {
  return analytics.searchConsoleVerification
    ? [{ name: "google-site-verification", content: analytics.searchConsoleVerification }]
    : [];
}
