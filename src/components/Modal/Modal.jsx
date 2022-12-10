import css from "../Modal/Modal.module.css"

export const Modal = ({ url, images, closeModal }) => {
  const name = images.map(image => {return image.name})
  return <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}><img src={url} alt={name} /></div>
  </div>
}
