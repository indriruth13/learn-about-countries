import * as React from "react"
import "./scss/App.scss"

class App extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            searchString: "",
            data : [],
            isLoading: false,
            error: null,
        };
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
            .then(response => { return response.json()} )
            .then(data => this.setState({ data: data, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }))
    }

    handleChange = (e) => {
        this.setState({ searchString: e.target.value })
    }

    render() {
        const { isLoading, error } = this.state
        let datas = this.state.data;
        let searchString = this.state.searchString.trim().toLowerCase()

        if ( searchString.length > 0 ) {
            datas = datas.filter( function( value ) {
                return value.name.toLowerCase().match( searchString )
            })
        }

        if ( isLoading ) {
            return <p>Loading ...</p>
        }
        if ( error ) {
            return <p>Unable to show country information</p>
        }

        return (
            <div className="App">
                <div className="search-bar-container">
                    <h1>Hi, There!<br/>Want To Know Cool Facts Of Countries?<br/>Find Out Here!</h1>
                    <input
                        type = "text"
                        value = { this.state.searchString }
                        onChange = { this.handleChange }
                        placeholder = "Type Country Name Here..."
                    />
                </div>
                <div className="countries-list">
                    {datas.map( data =>
                        <div key={ data.name } className="countries-list__container">
                            <div className="image-wrapper">
                                <img src={ data.flag } alt={ data.name }/>
                            </div>
                            <div className="detail-container">
                                <div className="detail-header">
                                    <h3>{ data.name }</h3>
                                    <span>{ data.nativeName }</span>
                                </div>
                                <p>Capital City : { data.capital }</p>
                                <p>Region : { data.region }</p>
                                <p>Timezone : { data.timezones[0] }</p>
                                <p>Calling Codes : { data.callingCodes }</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App
