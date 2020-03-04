
///// TuotantoVerse vielä npm build
//// Herokuun lisäys
/// offline 
/// datan visualisointi esim kirjojen arvosanat



import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, Input, Table, Button, ModalHeader, ModalBody, Modal, ModalFooter, Label } from 'reactstrap'
const Url = ('http://localhost:5500/api/kirjat');

class App extends Component {

  state = {
    kirjat: [],

    uusikirja: { //// POST

      title: '',
      rating: ''

    },

    paivitakirja: { //// PUT

      id: '',
      title: '',
      rating: ''

    },

    newBookModal: false,
    paivitaBookModal: false

  }

  UNSAFE_componentWillMount() { /// Piti muutta UNSAFEKS anto consolessa varotuksen
    
  }
 componentDidMount=()=>{
  this.getBooks();
 }
 getBooks=()=>{
  axios.get(Url).then((response) => { //// GET
    this.setState({
      kirjat: response.data
    })
  });
 }
  toggleNewBookModal() { // POST

    this.setState({
      newBookModal: !this.state.newBookModal
    })
  }

  togglepaivitaBookModal() { // PUT

    this.setState({
      paivitaBookModal: !this.state.paivitaBookModal
    })
  }

  lisaakirja() { ///// POST
    // console.log(this.state.uusikirja);
    axios.post(Url, this.state.uusikirja).then((response) => {
      // console.log(response.data);
      let { kirjat } = this.state;

      kirjat.push(response.data); // pushataan kirjat taulukkoon uusikirja

      this.getBooks(); // palauttaa kaikki uudet kirjat ilman, että tarvii päivittää.

      this.setState({

        kirjat, newBookModal: false, uusikirja: {
          title: '',
          rating: ''
          // Lisätään uusi kirja uudella datalla ja päivityksen yhteydessä ei häviä
          
        }
      }); //setState () hakee muutokset komponentin tilaan ja kertoo Reaktille, että tämä komponentti ja sen lapset on annettava uudelleen päivitetyssä tilassa
    });
  }

  muokkaakirjaa() { // PUT / kun painetaan Päivitä nappia niin tiedot / lähtee palvelimelle ja päivittyy
    let { title, rating } = this.state.paivitakirja;

    axios.put(Url + '/' + this.state.paivitakirja.id, {
      title, rating
    }).then((response) => {
                              
      this.getBooks();
     
      this.setState({

      paivitaBookModal: false, paivitakirja: {id:'', title:'', rating:''}  /// sulkee ikkunan päivityksen jälkeen

      })
    });
  }

  paivitakirja(id, title, rating) { /// KUN PAINETAAN MUOKKAANAPPIA NIIN TÄMÄ METODI TOTEUTETAAN

    this.setState({
      paivitakirja: { id, title, rating }, paivitaBookModal: !this.state.paivitaBookModal // ikkuna häviää kun painaa muokkausta ! eteenpäin
    });
  }

poistakirja= (id) => {
  
  axios.delete(Url + '/' + id).then((response) => {
    console.dir(response)
    this.getBooks();
    // this.setState({
    //   kirjat: response.data 
    // }) 
  });
}
render() {

  let kirjat = this.state.kirjat.map((kirja) => {
    return (
      <tr key={kirja.id}>
        <td>{kirja.id}</td>
        <td>{kirja.title}</td>
        <td>{kirja.rating}</td>
        <td>
          {/*kun painetaan muokkaa nappulaa niin tämä menee muokkaa // PUT metodille*/}
          <Button color="success" size="sm" className='mr-2' onClick={this.paivitakirja.bind(this, kirja.id, kirja.title, kirja.rating)}>Muokkaa</Button>
          <Button color="danger" size="sm" onClick={this.poistakirja.bind(this, kirja.id)}>Poista</Button>
          {/*painaessa lähettää tiedot axios.delete ja poistaa kirjan*/}
        </td>
      </tr>
    )
  })

  return (
    <div className="App container">

      <span> <h1 className='display-4' style={{ color: "black" }}><del>Book App</del></h1>
        <footer className="blockquote-footer"><cite title="Source Title">FullStack harjoitus</cite></footer>
      </span>

      <Button className='my-3' color="primary" onClick={this.toggleNewBookModal.bind(this)}>Lisää Kirja</Button>

      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Muokkaus</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for='otsikko'>Otsikko</Label>
            <Input id='otsikko' value={this.state.uusikirja.title}
              onChange={(e) => {
                let { uusikirja } = this.state; //// Kirja lisäys toimii / kirjoittaminen formiin
                uusikirja.title = e.target.value;
                this.setState({ uusikirja });
              }} />
          </FormGroup>

          <FormGroup>

            <Label for='arvostelu'>Arvostelu</Label>
            <Input id='arvostelu' value={this.state.uusikirja.rating}
              onChange={(e) => {
                let { uusikirja } = this.state;

                uusikirja.rating = e.target.value;

                this.setState({ uusikirja });

              }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.lisaakirja.bind(this)}>Tallenna</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Peruuta</Button>
        </ModalFooter>
      </Modal>


      {/*Modaali kopsattu PUTTIA varten/päivitetään otsikko, arvostelu etc*/}

      <Modal isOpen={this.state.paivitaBookModal} toggle={this.togglepaivitaBookModal.bind(this)}>
        <ModalHeader toggle={this.togglepaivitaBookModal.bind(this)}>Moikka!</ModalHeader>
        <ModalBody>

          <FormGroup>
            <Label for='otsikko'>Otsikko</Label>
            <Input id='otsikko' value={this.state.paivitakirja.title}
              onChange={(e) => {
                let { paivitakirja } = this.state; //// Kirja lisäys toimii / kirjoittaminen formiin
                paivitakirja.title = e.target.value;
                this.setState({ paivitakirja });
              }} />
          </FormGroup>

          <FormGroup>

            <Label for='arvostelu'>Arvostelu</Label>
            <Input id='arvostelu' value={this.state.paivitakirja.rating}
              onChange={(e) => {
                let { paivitakirja } = this.state;

                paivitakirja.rating = e.target.value;

                this.setState({ paivitakirja });

              }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.muokkaakirjaa.bind(this)}>Päivitä</Button>
          <Button color="secondary" onClick={this.togglepaivitaBookModal.bind(this)}>Peruuta</Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
          <tr>
            <td>#</td>
            <td>Otsikko</td>
            <td>Arvostelu</td>
            <td>Muokkaa</td>
          </tr>
        </thead>

        <tbody>
          {kirjat}
        </tbody>
      </Table>
    </div>

  );
}
}

export default App;