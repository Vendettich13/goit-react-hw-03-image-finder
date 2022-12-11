import { Component } from "react"
import css from "../Modal/Modal.module.css"

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener("keydown", this.handleKeyDown)
  }
  
  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyDown)
  }
  
  handleKeyDown = e => {
    if (e.code === "Escape") {
      this.props.closeModal()
    }
  }

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal()
    }
  }

  render() {
    return <div className={css.overlay} onClick={this.handleBackdrop}>
      <div className={css.modal}>
        {this.props.children}
        </div>
  </div>
  }
  
}
