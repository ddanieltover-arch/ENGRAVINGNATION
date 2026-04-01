'use client';

import Script from 'next/script';

export default function TawkChat() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          Tawk_API.customStyle = {
            visibility: {
              desktop: { xOffset: 20, yOffset: 20 },
              mobile: { xOffset: 10, yOffset: 95 }
            }
          };
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69735310f79094197f2918d0/1jfl7ousf';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
