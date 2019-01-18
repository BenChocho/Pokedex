import React from 'react';
import { Link } from 'react-router-dom';
import pokeLoad from '../pokeLoad.gif';
import { Button } from 'reactstrap';

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            imageLoading: true,
            toManyRequests: false,
            pokemonIndex: '',
            modalUrl: `#modal${this.props.name}`,
            modal: false,
        }
    }

    async componentDidMount() {
        const name = this.props.name;
        const url = this.props.url;
        const pokemonIndex = url.split('/')[url.split('/').length -2];
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
        this.setState({name, imageUrl, pokemonIndex})
    }

    render() {

        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <div className="card">
                    {this.state.imageLoading ? ( <img alt="loader" src={pokeLoad} className="loader"/>) : null}
                    <img 
                    className="pokemonImg"
                    alt={this.state.name}
                    src={this.state.imageUrl} 
                    onLoad={() => this.setState({imageLoading: false})}
                    onError={() => this.setState({toManyRequests: true})}
                    style={this.state.toManyRequests ? { display : "none" } : this.state.imageLoading ? null : {display : "block"}}
                    />
                    <div className="card-body mx-auto">
                        <h1 className="card-title clrWhite">{this.state.name}</h1>
                        <p className="text-center clrWhite">ID #{this.state.pokemonIndex}</p>
                        <Link to={`pokemon/${this.state.pokemonIndex}`}>
                            <Button color="danger">Stats</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pokemon
