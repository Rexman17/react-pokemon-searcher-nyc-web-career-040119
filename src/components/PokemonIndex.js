import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

let endpoint = `http://localhost:3000/pokemon`

class PokemonPage extends React.Component {
  //  set initial state
  state = {
    pokemon: [],
    searchTerm: ''
  }

  // on first load of page we want to see pokemon --> component did mount
  componentDidMount() {
    // inside here, we are going to fetch
    fetch(endpoint)
      .then(response => response.json())
      .then(pokemon => {
        // console.log("fetch results", pokemon);
        this.setState({
          pokemon
        }/*, () => console.log("UPDATE STATE IN PokemonIndex", this.state)*/)
      })
  }

  addPokemon = (newPoke) => {
    // console.log("IN INDEX NEWPOKE", newPoke);
    this.setState({
      pokemon: [...this.state.pokemon, newPoke]
    })
  }

  searching = (e, {value}) => {
    // console.log(e.currentTarget.value);
    // update state w search term
    this.setState({
      searchTerm: value
    }/*, () => console.log("searchTerm in state updated", this.state.searchTerm)*/)
  }

  render() {
    // destructuring if u want...
    // const { pokemon, blah } = this.state

    // stackoverflow for using debounce: https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
    const filteredPokemon = this.state.pokemon.filter((poke) => {


      return poke.name.includes(this.state.searchTerm.toLowerCase()) || poke.types.join().includes(this.state.searchTerm.toLowerCase())

    })

    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search onSearchChange={_.debounce(this.searching, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={this.state.searchTerm !== '' ? filteredPokemon : this.state.pokemon} />
        <br />
      </div>
    )
  }
}

export default PokemonPage
