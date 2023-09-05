import { Formik, Form, Field } from "formik"
import { useState } from "react"
import "./Header.css"
import "./Main.css"
import "./Article.css"

function App() {
  const [photos, setPhotos] = useState([]) // Corregido el nombre del estado a 'photos'

  const open = (url) => {
    window.open(url, "_blank")
  }

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            try {
              const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=21&query=${values.search}`,
                {
                  headers: {
                    Authorization:
                      "Client-ID pG6bP8yB8ume16ShzwYmfCHLBwumuOflKDrwpQuWkBs",
                  },
                }
              )
              const data = await response.json()
              setPhotos(data.results)
            } catch (error) {
              console.error("Hubo un error al buscar las imágenes:", error)
            }
          }}
        >
          <Form>
            <Field name="search" type="text" />
            <button type="submit">Buscar</button>
          </Form>
        </Formik>
      </header>
      <main>
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.small} alt={photo.alt_description} />{" "}
              {/* Añadido el atributo alt */}
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
