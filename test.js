/*
extractHyperlinkWithKeywords(keywords).then(result => {
   if (result) {
      console.log(`Hyperlink found: ${result}`);
   } else {
      console.log('No hyperlink found.');
   }
}
);

async function extractHyperlinkWithKeywords(keywords) {
   try {
      // Load HTML content from website
      const html = document.documentElement.outerHTML;
      if (!html) {
         console.error('Failed to load HTML from website.');
         return null;
      }

      // Parse HTML content
      const $ = cheerio.load(html);

      // Search in the footer
      const footerResult = await searchKeywordsInSection($, 'footer', keywords);
      if (footerResult) {
         return footerResult;
      }

      // Search in the header
      console.log(`Keywords not found in footer. Searching in header.`);
      const headerResult = await searchKeywordsInSection($, 'header', keywords);
      if (headerResult) {
         return headerResult;
      }

      // Search in the body
      console.log(`Keywords not found in header. Searching in body.`);
      return searchKeywordsInSection($, 'body', keywords);
   } catch (error) {
      console.error('An error occurred:', error);
      return null;
   }
}


async function searchKeywordsInSection($, section, keywords) {
   const links = $(`${section} a`);
   console.log(`Comparing ${section} links with keywords: ${keywords.join(', ')}`);
   for (const keyword of keywords) {
      const anchor = links.toArray().find(anchor => {
         const anchorText = $(anchor).text().toLowerCase();
         const anchorHref = $(anchor).attr('href');
         console.log(`Comparing ${section} link ${anchorHref} with keyword: ${keyword}`);
         return anchorText.includes(keyword.toLowerCase()) || (anchorHref && anchorHref.includes(keyword.toLowerCase()));
      });

      if (anchor) {
         const anchorHref = $(anchor).attr('href');
         console.log(`Keyword '${keyword}' found in ${section} link: ${anchorHref}`);
         return anchorHref;
      }
   }

   console.log(`Keywords not found in ${section}.`);
   return null;
}



*/