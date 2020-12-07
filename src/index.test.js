import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('Renderiza un elemento H1', () => {
    expect(container.querySelector('h1')).not.toBeNull()
    expect(getByText(container, 'Mi pequeña biografía')).toBeInTheDocument()
  })

  it('Renderiza un botón', () => {
    expect(container.querySelector('button')).not.toBeNull()
    expect(getByText(container, 'Presiona aquí para saber más de mí')).toBeInTheDocument()
  })

  it('Renderiza una nueva frase via JavaScript cuando el botón es presionado', async () => {
    const button = getByText(container, 'Presiona aquí para saber más de mí')
    
    fireEvent.click(button)
    let generatedParagraphs = container.querySelectorAll('#phrase-container p')
    expect(generatedParagraphs.length).toBe(1)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#phrase-container p')
    expect(generatedParagraphs.length).toBe(2)

    fireEvent.click(button)
    generatedParagraphs = container.querySelectorAll('#phrase-container p')
    expect(generatedParagraphs.length).toBe(3)
  })
})
