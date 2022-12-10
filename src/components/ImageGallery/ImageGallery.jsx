import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { Spinner } from "../Loader/Loader"
import { Component } from "react"
import { getByName } from "utils/getData";
import css from "../ImageGallery/ImageGallery.module.css"
import cssItem from "../ImageGalleryItem/ImageGalleryItem.module.css"
import { Button } from "../Button/Button"
import { Modal } from "../Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'


export class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        isLoading: false,
        page: 1,
        selectedImg: null
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { query } = this.props;
        const { page } = this.state;

        if (prevProps.query !== query) {
            this.setState({page: 1})
        }
        if (prevProps.query !== query || prevState.page !== page) {
            this.setState({isLoading: true})
            getByName(query, page)
                .then(images =>
                    {images.length === 0 && toast.info("Please, enter anything else to search")
                        if(prevState.page === page) {
                        this.setState({images, isLoading: false})
                } else this.setState({ images: [...prevState.images, ...images], isLoading: false })
                })
                .catch(error => { this.setState({ error: 'Something wrong, reload the page' }) })
        }
    }

    componentWillUnmount = () => {
      window.removeEventListener('keydown', e => {
            if (e.code === "Escape") {
              this.setState({selectedImg: null})
          }
      })
    }
    

    loadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }))
    }

    selectImg = imageUrl => {
        this.setState({selectedImg: imageUrl})
    }
    
    closeModal = (e) => {
        if (e.currentTarget === e.target)  {
            this.setState({selectedImg: null})
        }

        window.addEventListener('keydown', e => {
            if (e.code === "Escape") {
              this.setState({selectedImg: null})
          }
      })
    }

    render() {
        const { error, isLoading, images, selectedImg } = this.state;
        
        return <>
            {error && <p>{error}</p>}
            {images.length > 0 && <ul className={css.imageGallery}>
                {images.map(image => {
                    return <li key={image.id}><ImageGalleryItem image={image} class={cssItem.galleryItem} onSelect={this.selectImg}/></li>
                })}
            </ul>}
            {isLoading && <Spinner />}
            {images.length !== 0 && <Button onClick={this.loadMore} />}
            {selectedImg !== null && <Modal url={selectedImg} images={images} closeModal={this.closeModal} />}
            <ToastContainer/>
        </>
    }
}