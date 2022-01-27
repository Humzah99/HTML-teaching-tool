import React from 'react'
import DocumentationList from '../components/DocumentationList';

const DUMMY_DOCUMENTATION = [
    {
        id: 1,
        title: "Attributes",
        description: "HTML attributes can be added to the opening tag of an HTML element to change..."
    },
    {
        id: 2,
        title: "Elements",
        description: "An HTML element is a piece of content in an HTML document. It is everything from..."
    },
    {
        id: 3,
        title: "Forms",
        description: "The HTML <Form> element is used to collect and send information to an external source."
    },
    {
        id: 4,
        title: "Tables",
        description: "In HTML, A Table Is An Element That Allows For The Representation Of Data In Two Dimensions..."
    },
    {
        id: 5,
        title: "Paragraphs",
        description: "A paragraph always starts on a new line, and browsers automatically add some white space..."
    },
    {
        id: 6,
        title: "Headings",
        description: "HTML headings are titles or subtitles that you want to display on a webpage."
    }
];
function Documentation() {
    return <DocumentationList items={DUMMY_DOCUMENTATION}/>
};

export default Documentation;