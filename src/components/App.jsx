import { Component } from "react";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";
import { Searchbar } from "../components/Searchbar/Searchbar";
import { Spinner } from "../components/Loader/Loader"
import { getByName } from "utils/getData";
import { Button } from "../components/Button/Button"
import { Modal } from "../components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export class App extends Component {
  state = {
    query: "",
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    selectedImg: null,
    showButton: false
  }

  handleFormSubmit = (query) => {
    this.setState({query})
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { query, page } = this.state;
    
        if (prevState.query !== query || prevState.page !== page) {
            this.setState({isLoading: true})
            getByName(query, page)
              .then(images => {
                images.length === 0 && toast.info("Please, enter anything else to search")
                if (images.length >= 12) {
                  this.handleForButton()
                } else
                this.setState({showButton: false})
                this.setState({ images: [...prevState.images, ...images], isLoading: false })
              })
              .catch(error => { this.setState({ error: toast.error('Something wrong, reload the page') }) })
            }
            <ToastContainer/>
    }

    loadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }))
    }

    selectImg = imageUrl => {
        this.setState({selectedImg: imageUrl})
    }
    
    closeModal = () => {
        this.setState({selectedImg: null})
    }
  
  handleForButton = () => {
    this.setState({showButton: true})
    }

  render() {
    const { error, isLoading, selectedImg, showButton } = this.state;

    return <>
             <div style={{display: "grid", gridTemplateColumns: "1fr", gridGap: "16px",}}>
             <header>
             <Searchbar onSubmit={this.handleFormSubmit} />
             </header>
             <main>
             <ImageGallery images={this.state.images} onSelect={this.selectImg} />
             {error && <p>{error}</p>}
             {isLoading && <Spinner />}
             {showButton && <Button onClick={this.loadMore} />}
             </main>
             <footer>
             {selectedImg !== null && <Modal url={selectedImg} closeModal={this.closeModal}><img src={selectedImg} alt={selectedImg} /></Modal>}
             </footer>
             </div>
      </>
  }
};
