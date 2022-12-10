import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component {
  state = {
    query: ""
  }

  handleFormSubmit = (query) => {
    this.setState({query})
  }

  render() {
    return <div style={{display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "16px",}}>
    <header>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </header>
      <main>
        <ImageGallery query={this.state.query} />
      </main>
      <footer>
      </footer>
      </div>
  }
};
