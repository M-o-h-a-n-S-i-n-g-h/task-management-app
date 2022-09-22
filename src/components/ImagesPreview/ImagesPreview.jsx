import styles from './images-preview.module.css'

const ImagesPreview = ({ images }) => {
  return (
    <div className={styles.imagesPreview}>
      {images.map(({ url, name }) => (
        <img key={name} className={styles.image} src={url} alt="preview" />
      ))}
    </div>
  )
}

export default ImagesPreview
