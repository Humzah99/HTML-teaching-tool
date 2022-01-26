import React from 'react'
import ForumList from '../components/ForumList';

const DUMMY_FORUM = [
    {
        id: 1,
        heading: "How can I construct a HTML table?",
        text: "Please can I have some information on the basics of constructing a HTML table? Here is my code..."
    },
    {
        id: 2,
        heading: "My HTML heading does not render on screen.",
        text: "Can anyone help me identify the issue with this code that is not allowing any headings to render on to the screen?"
    }
];
function Forum() {
    return <ForumList items={DUMMY_FORUM}/>
};

export default Forum;