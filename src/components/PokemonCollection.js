import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  // create function inside here to map thru the pokemon
  eachPokemon = () => {
    return this.props.pokemon.map((poke) => {
      return <PokemonCard poke={poke} key={poke.id} />
    })
  }

  render() {
    // console.log("PokemonCollection", this.props);
    return (
      <Card.Group itemsPerRow={6}>
        <h1>Hello From Pokemon Collection</h1>
        {this.eachPokemon()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
