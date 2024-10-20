import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/simple.css';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm';

import './App.css';

function App() {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      // other config oXptions
      transition: 'slide',
      hash: true,
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);

  return (
    // Your presentation is sized based on the width and height of
    // our parent element. Make sure the parent is not 0-height.
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {/* Intro */}
        <section>
          <h3>Rough.js Riders Anthem</h3>
          <p>Animating SVGs with a hand-drawn style</p>
        </section>

        <section
          data-background-iframe="https://roughjs.com/"
          data-background-interactive
        />

        <section>
          <img width="80%" src="shapes-examples.png" />
        </section>

        <section>
          <img src="us-map.png" />
        </section>

        <section
          data-background-iframe="https://pshihn.github.io/rough-playground/squares/"
          data-background-interactive
        />

        <section
          data-background-iframe="https://pshihn.github.io/rough-playground/squares-fall-through/"
          data-background-interactive
        />

        <section
          data-background-iframe="https://pshihn.github.io/rough-playground/skulls/"
          data-background-interactive
        >
          <p className="overlay-text" style={{ background: 'orange' }}>
            Happy Halloween!
          </p>
        </section>

        <section>
          <h3>Ecosystem Tour</h3>
        </section>

        <section
          data-background-video="excalidraw.mov"
          data-background-video-loop="true"
          data-background-video-muted="true"
        >
          <h2 className="overlay-text">Excalidraw</h2>
        </section>

        <section
          data-background-video="roughviz.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <h2 className="overlay-text">Roughviz Charts</h2>
        </section>

        <section
          data-background-video="rough-fonts.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        ></section>

        <section>
          <h3>How Rough.js Works</h3>
        </section>

        <section>
          <p>Roughness through randomness</p>
          <img src="author-blog/random-rough.png" />
        </section>

        <section
          data-background-video="roughness-demo.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <p className="overlay-text">Roughness Parameter</p>
        </section>

        <section>
          <p>Bowed lines</p>
          <img src="author-blog/lines-explanation.png" />
          <img width="400px" src="author-blog/hand-line.jpg" />
        </section>

        <section>
          <p>Imperfect Circles</p>
          <img width="500px" src="author-blog/ellipse-handdrawn.jpg" />
          <img width="400px" src="author-blog/ellipse-points.png" />
        </section>

        <section>
          <p>Filling Algorithm</p>
          <img width="500px" src="author-blog/scanline.png" />
          <img width="450px" src="author-blog/fill-rotation.jpg" />
        </section>

        <section>
          <p>Variations on hachure fill</p>
          <img width="80%" src="shapes-examples.png" />
        </section>

        {/* <section data-background-image="m14.png" data-background-size="400px" /> */}
      </div>
    </div>
  );
}

export default App;
