import css from "../ImageGalleryItem/ImageGalleryItem.module.css"

export const ImageGalleryItem = ({ image: { name, webformatURL, largeImageURL}, onSelect }) => {
  return <img src={webformatURL} alt={name} className={css.imageGalleryItem} onClick={() => {onSelect(largeImageURL)}} />
}