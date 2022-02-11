import React from "react";
import DocumentationList from "../components/DocumentationList";

const DUMMY_DOCUMENTATION = [
  {
    id: "1",
    title: "Attributes",
    description:
      "HTML attributes can be added to the opening tag of an HTML element to change...",
    subTitles: [
      { name: "The href Attribute" },
      { name: "The src Attribute" },
      { name: "The width and height Attributes" },
      { name: "The alt Attribute" },
      { name: "The style Attribute" },
      { name: "The lang Attribute" },
      { name: "The title Attribute" },
      { name: "Chapter summary" },
    ],
    content: [
      {
        information:
          "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
      },
      {
        information: `The <img> tag is used to embed an image in an HTML page. The src attribute specifies the path to the image to be displayed:
      
      There are two ways to specify the URL in the src attribute:

      1. Absolute URL - Links to an external image that is hosted on another website. Example: src="https://www.w3schools.com/images/img_girl.jpg".
      
      Notes: External images might be under copyright. If you do not get permission to use it, you may be in violation of copyright laws. In addition, you cannot control external images; it can suddenly be removed or changed.
      
      2. Relative URL - Links to an image that is hosted within the website. Here, the URL does not include the domain name. If the URL begins without a slash, it will be relative to the current page. Example: src="img_girl.jpg". If the URL begins with a slash, it will be relative to the domain. Example: src="/images/img_girl.jpg".
      
      Tip: It is almost always best to use relative URLs. They will not break if you change domain.`,
      },
      {
        information:
          "The <img> tag should also contain the width and height attributes, which specifies the width and height of the image (in pixels):",
      },
      {
        information:
          "The required alt attribute for the <img> tag specifies an alternate text for an image, if the image for some reason cannot be displayed. This can be due to slow connection, or an error in the src attribute, or if the user uses a screen reader.",
      },
      {
        information:
          "The style attribute is used to add styles to an element, such as color, font, size, and more.",
      },
      {
        information: `You should always include the lang attribute inside the <html> tag, to declare the language of the Web page. This is meant to assist search engines and browsers. Country codes can also be added to the language code in the lang attribute. So, the first two characters define the language of the HTML page, and the last two characters define the country.

      The following example specifies English as the language and United States as the country:`,
      },
      {
        information: `The title attribute defines some extra information about an element.

      The value of the title attribute will be displayed as a tooltip when you mouse over the element:`,
      },
      {
        information: `All HTML elements can have attributes
      The href attribute of <a> specifies the URL of the page the link goes to
      The src attribute of <img> specifies the path to the image to be displayed
      The width and height attributes of <img> provide size information for images
      The alt attribute of <img> provides an alternate text for an image
      The style attribute is used to add styles to an element, such as color, font, size, and more
      The lang attribute of the <html> tag declares the language of the Web page
      The title attribute defines some extra information about an element`,
      },
    ],
    codeStringArray: [
      { codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>" },
      { codeString: "<img src='img_girl.jpg'>" },
      { codeString: "<img src='img_girl.jpg' width='500' height='600'>" },
      { codeString: "<img src='img_girl.jpg' alt='Girl with a jacket'>" },
      { codeString: "<p style='color:red;'>This is a red paragraph.</p>" },
      {
        codeString: 
        `<!DOCTYPE html>
            <html lang="en-US">
                <body>
                    ...
                </body>
        </html>`,
      },
      { codeString: "<p title='I am a tooltip'>This is a paragraph.</p>" },
    ],
  },
  {
    id: "2",
    title: "Elements",
    description:
      "An HTML element is a piece of content in an HTML document. It is everything from...",
    content:
      "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
    codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
  },
  {
    id: "3",
    title: "Forms",
    description:
      "The HTML <Form> element is used to collect and send information to an external source.",
    content:
      "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
    codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
  },
  {
    id: "4",
    title: "Tables",
    description:
      "In HTML, A Table Is An Element That Allows For The Representation Of Data In Two Dimensions...",
    content:
      "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
    codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
  },
  {
    id: "5",
    title: "Paragraphs",
    description:
      "A paragraph always starts on a new line, and browsers automatically add some white space...",
    content:
      "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
    codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
  },
  {
    id: "6",
    title: "Headings",
    description:
      "HTML headings are titles or subtitles that you want to display on a webpage.",
    content:
      "The <a> tag defines a hyperlink. The href attribute specifies the URL of the page the link goes to:",
    codeString: "<a href='https://www.w3schools.com'>Visit W3Schools</a>",
  },
];
function Documentation() {
  return <DocumentationList items={DUMMY_DOCUMENTATION} />;
}

export default Documentation;
