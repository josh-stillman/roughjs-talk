import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/simple.css';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm';
import 'reveal.js/plugin/highlight/zenburn.css';
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

        <section
          data-background-video="font-awesome.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        ></section>

        <section
          data-background-video="wired-components.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <p className="overlay-text">Wired Components</p>
        </section>

        <section
          data-background-video="rough-notation.mov"
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

        <section>
          <h3>Why Hand-drawn?</h3>
        </section>

        <section>
          <h3>Part II: Animating Rough.js</h3>
        </section>

        <section
          data-background-video="iching-jank.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          <h3 className="overlay-text">Janky AF!</h3>
        </section>

        <section>
          <h3>SVG Basics Refresher</h3>
        </section>

        <section>
          <h3>SVG vs Raster</h3>
          <img width="500px" src="svg-vs-raster.jpg" />
          <a
            className="cite"
            target="none"
            href="https://www.ratermanis.com/blog/2017/12/28/vector-vs-raster"
          >
            source
          </a>
        </section>

        <section
          data-background-video="svg-paths.mov"
          data-background-video-loop="true"
          data-background-size="cover"
          data-background-video-muted="true"
        >
          {/* <h3>SVG Paths</h3> */}
          {/* <img width="500px" src="svg-vs-raster.jpg" /> */}
          <a
            className="cite-right"
            target="none"
            href="https://www.nan.fyi/svg-paths"
          >
            source
          </a>
        </section>

        <section>
          <h3>How SVG Animations Work</h3>
        </section>

        <section>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`<svg ...>
  <path class="path" stroke="#000000" ... >
</svg>`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animation-1.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Adding dashes</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`.path {
  stroke-dasharray: 20;
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animation-2.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Longer dashes</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2">
              {`.path {
  stroke-dasharray: 100;
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/long-dashes.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Offset the dashes, animate offset position</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="3|9">
              {`.path {
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  animation: dash 5s linear;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animations-3.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <ol>
            <li className="fragment">
              Calculate shape length with JavaScript
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`var path = document.querySelector('.path');
var length = path.getTotalLength(); // => 1000
`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              Make a dash equal to the length of the entire shape
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`.path {
  stroke-dasharray: 1000;
}`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">
              Offset the dash so it covers up the entire shape
              <pre>
                <code data-trim data-noescape data-line-numbers="2">
                  {`.path {
  stroke-dashoffset: 1000;
}`}
                </code>
              </pre>
            </li>
            <li className="fragment fade-up">Now the shape is hidden!</li>
          </ol>
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <p>Animate the dash off of the shape to reveal!</p>
          <pre>
            <code data-trim data-noescape data-line-numbers="2|3|9">
              {`.path {
  stroke-dasharray: 1000; // length of shape
  stroke-dashoffset: 1000; // move dash on top of shape
  animation: dash 5s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0; // move dash off of shape
  }
}`}
            </code>
          </pre>
          <img src="svg-animations-explained/svg-animations-4.webp" />
          <a
            className="cite"
            target="none"
            href="https://css-tricks.com/svg-line-animation-works/"
          >
            source
          </a>
        </section>

        <section>
          <h3>"CSS Reasoning"</h3>
        </section>

        <section>
          <img width="80%" src="css_is_awesome.png" />
        </section>

        <section>
          <img src="css-is-weird.png" />
        </section>
      </div>
    </div>
  );
}

export default App;
