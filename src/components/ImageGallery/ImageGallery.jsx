import css from "../ImageGallery/ImageGallery.module.css"
import cssItem from "../ImageGalleryItem/ImageGalleryItem.module.css"
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({images, onSelect}) =>{  
        return <>
            {images.length > 0 && <ul className={css.imageGallery}>
                {images.map(image => {
                    return <li key={image.id}><ImageGalleryItem image={image} class={cssItem.galleryItem} onSelect={onSelect}/></li>
                })}
            </ul>}
            
            
        </>
    
}