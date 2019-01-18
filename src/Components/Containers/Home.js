import React, {Component} from 'react';
import PokemonList from '../PokemonList'

class Home extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <PokemonList/>
                </div>
            </div>
        );
    }
}

export default Home;