import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  // set initial state for the conditional rendering to switch pic
  state = {
    clicked: false
  }

  // get the hp
  // https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
  hp() {
    return this.props.poke.stats.find((stat) => stat.name === "hp").value
  }

  imgSwitchBcFerrisHatesEverything = (e) => {
    // console.log(e);
    // update state bc image was clicked
    this.setState({
      clicked: !this.state.clicked
    }/*, () => console.log("I WAS CLICKED", this.state)*/)
  }

  render() {
    // console.log("PokemonCard", this.props);

    const { name, sprites } = this.props.poke

    return (
      <Card>
        <div onClick={this.imgSwitchBcFerrisHatesEverything} >
          <div className="image">
            <img alt={name} src={this.state.clicked ? sprites.back : sprites.front} />
          </div>
          <div className="content">
            <div className="header">{name.toUpperCase()}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.hp()} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
