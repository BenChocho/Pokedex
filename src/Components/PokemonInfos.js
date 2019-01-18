import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Progress, CardImg, CardFooter, Button } from 'reactstrap';

class PokemonInfos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pokemonIndex: '',
            imageUrl: '',
            types: [],
            stats: {
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                specialAttack: '',
                specialDefense: '',
            },
            height: '',
            weight: '',
            abilities: ''
        }
    }

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonResp = await axios.get(pokemonUrl);
        
        const name = pokemonResp.data.name;
        const imageUrl = pokemonResp.data.sprites.front_default;
        const height = pokemonResp.data.height;
        const weight = pokemonResp.data.weight;
        const types = pokemonResp.data.types.map(t => t.type.name);
        const abilities = pokemonResp.data.abilities.map(a => a.ability.name);
        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonResp.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;

                case 'attack':
                    attack = stat['base_stat'];
                    break;

                case 'defense':
                    defense = stat['base_stat'];
                    break;

                case 'speed':
                    speed = stat['base_stat'];
                    break;

                case 'special-attack':
                specialAttack = stat['base_stat'];
                    break;

                case 'special-defense':
                specialDefense = stat['base_stat'];
                    break;
                default:
                    console.log('No')
            }
        });

        this.setState({ pokemonIndex, name, imageUrl, height, weight, types, abilities, stats: {hp, attack, defense, speed, specialAttack, specialDefense}})
    }

  render() {
    const clrTypes = { normal: 'Gainsboro', poison: 'MediumOrchid', psychic: 'Fuchsia', grass: 'SpringGreen', ground: 'Khaki', ice: 'Cyan', fire: 'OrangeRed', rock: 'Khaki', dragon: 'BlueViolet', water: 'DeepSkyBlue', bug:'GreenYellow', dark: 'Sienna', fighting: 'Chocolate', ghost: 'MediumPurple', steel: 'Lavender', flying: 'LightSkyBlue', electric: 'Yellow', fairy: 'Plum'};
    return (
        <Card className="col p-5">
            <CardTitle>
                <h2 className="clrWhite"><span className="text-uppercase">{this.state.name}</span><span className="small"> #{this.state.pokemonIndex}</span></h2>
                <div className="float-right">
                    {this.state.types.map(t =>(<span className="badge badge-pill mr-2 border border-white" style={{backgroundColor:`${clrTypes[t]}`, color:'white'}} key={t}>{t}</span>))}
                </div>
            </CardTitle>
            <CardBody>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <CardImg top width="100%" src={this.state.imageUrl} alt={this.state.name} />
                    </div>
                    <div className="col-md-8">
                        <div>
                            <div className="clrWhite">HP</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.hp}>{this.state.stats.hp}</Progress>
                            <div className="clrWhite">Attack</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.attack}>{this.state.stats.attack}</Progress>
                            <div className="clrWhite">Defense</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.defense}>{this.state.stats.defense}</Progress>
                            <div className="clrWhite">Speed</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.speed}>{this.state.stats.speed}</Progress>
                            <div className="clrWhite">Special Attack</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.specialAttack}>{this.state.stats.specialAttack}</Progress>
                            <div className="clrWhite">Special Defense</div>
                            <Progress className="mb-2" animated color="info" value={this.state.stats.specialDefense}>{this.state.stats.specialDefense}</Progress>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <Link to={``}>
                    <Button className="float-right">Back</Button>
                </Link>
            </CardFooter>
      </Card>
    )
  }
}

export default PokemonInfos
