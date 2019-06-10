import React from 'react'
import { Form } from 'semantic-ui-react'

let endpoint = `http://localhost:3000/pokemon`

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  // step 1: capturing the values: onChange
  // https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15
  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    }, () => console.log("UPDATE STATE",this.state))
  }

  // step 2: handleSubmit
  handleSubmit = (e) => {
    // console.log("SUBMITTING!!");
    e.preventDefault()

    const name = this.state.name
    const hp = this.state.hp
    const frontUrl = this.state.frontUrl
    const backUrl = this.state.backUrl

    // this.setState({
    //   name: '',
    //   hp: '',
    //   frontUrl: '',
    //   backUrl: ''
    // })
    // now fetch to update db w new pokemon
    // have the values to create the new pokemon in state!
    fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type": 'application/json',
                "Accept": 'application/json'
              },
      body: JSON.stringify({
        "name": name,
        "stats": [
          {
            "value": hp,
            "name": "hp"
          }
        ],
        "sprites": {
          "front": frontUrl,
          "back": backUrl
        }
      })
    })
    .then(response => response.json())
    .then(newPoke => {
      // console.log(newPoke);
      this.setState({
        name: '',
        hp: '',
        frontUrl: '',
        backUrl: ''
      })
      // helper function
      return this.props.addPokemon(newPoke)
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={this.handleChange} value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={this.handleChange} value={this.state.frontUrl} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={this.handleChange} value={this.state.backUrl} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
