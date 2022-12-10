import css from "../Searchbar/Searchbar.module.css"
import {AiOutlineSearch} from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export const Searchbar = ({onSubmit}) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (e.currentTarget[1].value.trim() === "") {
        return toast.error("Please, enter something", { position: toast.POSITION.TOP_RIGHT, autoClose: 4000 })
      }
      onSubmit(e.currentTarget[1].value)
      e.currentTarget[1].value = "";
    }
    
    return <div className={css.searchbar}>
  <form className={css.searchForm} onSubmit={handleSubmit}>
    <button type="submit" className={css.searchFormButton}>
                    <AiOutlineSearch size={25} fill={"black"} />
    </button>
      <ToastContainer/>

    <input
    className={css.searchFormInput}
    type="text"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    name="imgName"
    />
  </form>
</div>}  
  