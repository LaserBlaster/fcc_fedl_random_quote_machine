// 2d array contains arrays with quotes and their authors
const famousQuotes = [
    ["Stay Hungry. Stay Foolish.", "Steve Jobs"],
    ["Good Artists Copy, Great Artists Steal.", "Pablo Picasso"],
    ["Argue with idiots, and you become an idiot.", "Paul Graham"],
    ["Be yourself; everyone else is already taken.", "Oscar Wilde"],
    ["Simplicity is the ultimate sophistication.", "Leonardo Da Vinci"],
    ["Too many of us are not living our dreams because we are living our fears.", "Les Brown"]
];
class RandomQuoteMachine extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            // Quote and author store data that is displayed
            quote: "",
            author: "",
            // variables below are used to style 
            quoteBoxWidth: "",                   
            authorFontSize: "",
            textFontSize: "",
            shareButtonStyle: "",
            newQuoteButtonStyle: ""
        };
        this.generateQuote = this.generateQuote.bind(this);
        this.windowResizeFunction = this.windowResizeFunction.bind(this);
            

    }
    componentDidMount() {
        // this event listener used to respond to change in window size
        window.addEventListener('resize', this.windowResizeFunction);
        
        // when component mounts a quote is generated and the css is chosen based on window size
        this.windowResizeFunction();
        this.generateQuote();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.windowResizeFunction);
    }

    /* generateQuote randomly selects an index from famousQuotes and sets the author and 
        quote variable to the corresponding index*/
    generateQuote(event) {
        let randomInteger = Math.floor(Math.random() * famousQuotes.length);
        this.setState((state, props) => ({
            quote: famousQuotes[randomInteger][0],
            author: famousQuotes[randomInteger][1]
        }));
    }

    // windowResizeFunction changes CSS when the 
    windowResizeFunction(event) {
        if(window.screen.width <= 420){
            this.setState((state, props) => ({
                quoteBoxWidth: "80%",
                authorFontSize: "3em",
                textFontSize: "4em",
                shareButtonStyle: "shareButtonSmallScreen",
                newQuoteButtonStyle: "newQuoteButtonSmallScreen",

            }));
        } else if(window.screen.width <= 600){
            this.setState((state, props) => ({
                quoteBoxWidth: "60%",
                authorFontSize: "1.4em",
                textFontSize: "2.4em",
                shareButtonStyle: "shareButtonBigScreen",
                newQuoteButtonStyle: "newQuoteButtonBigScreen"

            }));

        } else {
            this.setState((state, props) => ({
                quoteBoxWidth: "40%",
                authorFontSize: "1.2em",
                textFontSize: "2.2em",
                shareButtonStyle: "shareButtonBigScreen",
                newQuoteButtonStyle: "newQuoteButtonBigScreen"
                

            }));

        }
    }

    render() {
        return (
            <wrapper id="quote-box" style={{width: this.state.quoteBoxWidth}}>
                {/* displays the author of the randomly generated quote */}
                <div id="text">
                    <div class="row" style={{fontSize: this.state.textFontSize}}>
                        {this.state.quote}
                    </div> 
                </div>
                {/* displays the author of the randomly generated quote */}
                <div class="row">
                    <div id="author" style={{fontSize: this.state.authorFontSize}}>
                        -{this.state.author}
                    </div>
                </div>
                {/* this row contains links to twitter and tumblr and the button for generating new quotes*/}
                <div class="row">
                    {/* when clicked on this div opens twitter in a new tab*/}
                    <div id="tweet-quote" class={this.state.shareButtonStyle}>
                        <a href="https://twitter.com/Interior/status/463440424141459456" target="_blank">
                            <i class="fab fa-twitter-square"></i>
                        </a>
                    </div>
                    {/* when clicked on this div opens tumblr in a new tab*/}
                    <div id="tumblr-quote" class={this.state.shareButtonStyle}>
                        <a href="https://www.tumblr.com/share/tool" target="_blank">
                            <i class="fab fa-tumblr-square"></i>
                        </a>
                    </div>
                    {/* this button generates and displays a new quote and its author*/}
                    <button id="new-quote" class={this.state.newQuoteButtonStyle} onClick={this.generateQuote}>New Quote</button> 
                </div>
            </wrapper>                
        );
    }

}

ReactDOM.render(<RandomQuoteMachine />, document.getElementById('quoteMachineBody'))