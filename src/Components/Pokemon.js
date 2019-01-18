import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PokemonSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://pokeapi.co/api/v2/pokemon/',
            pokemonData: null,
            count: 80,
            input: '',
            matchingPokemon: ''
        }
    }

    async componentDidMount() {
        const resp = await axios.get(this.state.url);
        this.setState({pokemonData: resp.data['results']});
    }

    addMoreData() {
      if (this.state.count < 949) {
        this.setState({count: this.state.count + 80});
      }
    }

    searchPokemon(e) {
        this.setState({input: e.target.value});
        const matchingPokemon = this.state.pokemonData.filter(
            b => b.name.toLowerCase().trim().indexOf(this.state.input) > -1)
            .map(c => c.name);
        this.setState({ matchingPokemon})
        console.log(this.state.matchingPokemon)
    }

    render() {
        return (
            <div>
                <input className="form-control" type="text" value={this.state.input} onChange={this.searchPokemon.bind(this)} placeholder="Search"/>
                <div>
                <div>
                    {this.state.matchingPokemon.length
                    ? 
                        (<div>{this.state.matchingPokemon
                        .map(p => (<Link key={p} to={`pokemon/${p}`}><p key={p}>{p}</p></Link>))}
                        </div>) 
                    : 
                        (<h1 className="clrWhite">Waiting for search</h1>)}
                </div>
                </div>
            </div>
        );
    }
}

export default PokemonSearch;
