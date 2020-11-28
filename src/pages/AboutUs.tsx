import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/About.css';

function updateDocumentLanguage(lang) {
	window.document.documentElement.lang = lang;
}
class AboutUs extends Component {
    componentDidMount() {
		updateDocumentLanguage('en-us');
	}

	componentDidUpdate() {
		updateDocumentLanguage('en-us');
	}

    render() {
        return (
            <div className="aboutContent" lang='en-us'>
                <h1 className="aboutTitle">About Us</h1>
                <div className="aboutText">
                    <p className="aboutParagraph">
                        We are The Coders. Our team is composed by Lucas Ciziks, Melissa de Lima, Miguel Shiniti, Paula Gonzalez,
                        Paulini Procaci and Vivian Ayumi. Together we developed the Web Lab platform aiming to make Informatics learning
                        a more independent and dynamic activity. We believe that, as the world continues evolving, education must be a top priority.
                        In favor of an innovative education we offer for free a whole academic environment in which you can take courses and even create your own.
                    </p>

                    <p className="aboutParagraph">
                        Based on the methodology of ludification, the modules and exercises in this educational tool allow students to collect
                        achievement titles as they explore the diverse features the page offers. As a result, users are motivated to make more
                        and more progress in their studies, keen on adding a new merit-based badge to their personal collection. Joining together
                        teaching and challenging goals, we guarantee a continuous sharing of knowledge here.
                    </p>

                    <p className="aboutParagraph">
                        Our goal is to break through the barrier that limits educational integration, to do so we count with our students to share
                        their knowledge, being a fundamental part of our project and creating an active community with no barriers for those who always
                        want to learn more!
                    </p>
                </div>
            </div>
        )
    }
};

export default AboutUs;